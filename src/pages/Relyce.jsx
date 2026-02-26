import React, { useEffect, useState } from 'react';
import { db, auth, storage } from '../firebase';
import { collection, getDocs, doc, getDoc, deleteDoc } from 'firebase/firestore';
import * as XLSX from 'xlsx';
import { Helmet } from 'react-helmet';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { getDownloadURL, ref as storageRef } from 'firebase/storage';
import AdminLogin from '../components/AdminLogin';

const Relyce = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState('contact'); // 'contact' or 'internship'

  const userDataExists = (arr) => Array.isArray(arr) && arr.length > 0;

  const sanitizeForExcel = (value) => {
    if (typeof value !== 'string') return value;
    const trimmed = value.trimStart();
    if (/^[=+\-@]/.test(trimmed)) return `'${value}`;
    return value;
  };

  const excelSafe = (value) => {
    if (value === undefined || value === null || value === '') return 'N/A';
    if (typeof value === 'number') return value;
    return sanitizeForExcel(String(value));
  };

  const openResume = async (resumePath, fallbackUrl) => {
    try {
      if (!resumePath && !fallbackUrl) return;
      const url = fallbackUrl || await getDownloadURL(storageRef(storage, resumePath));
      window.open(url, '_blank', 'noopener,noreferrer');
    } catch (err) {
      console.error('Unable to open resume:', err);
      alert('Unable to open resume. Please try again.');
    }
  };

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        if (!currentUser) return; // Don't fetch if no user
        
        // 1. Diagnostics step. Verifying account mapping matches the DB
        console.log("---- DIAGNOSTICS START ----");
        console.log("Current Logged-in UID:", currentUser.uid);
        try {
          const adminCheck = await getDoc(doc(db, 'adminusers', currentUser.uid));
          if (adminCheck.exists()) {
             console.log("Firestore adminusers doc Role:", adminCheck.data().role);
          } else {
             console.error("Firestore adminusers doc is completely MISSING!");
          }
        } catch (adminErr) {
          console.error("Permissions error reading your OWN adminusers doc:", adminErr);
        }

        console.log("Fetching primary users collection...");
        const usersSnapshot = await getDocs(collection(db, 'users'));
        console.log("Success! Found users:", usersSnapshot.docs.length);
        const usersList = [];

        for (const userDoc of usersSnapshot.docs) {
          const userData = { id: userDoc.id, ...userDoc.data() };
          
          try {
            const contactSnapshot = await getDocs(collection(db, `users/${userDoc.id}/contact`));
            userData.contact = contactSnapshot.empty ? [] : contactSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          } catch (cErr) {
            console.error(`Permission denied reading contact for ${userDoc.id}`, cErr);
            userData.contact = [];
          }

          try {
            const internshipSnapshot = await getDocs(collection(db, `users/${userDoc.id}/internship`));
            userData.internship = internshipSnapshot.empty ? [] : internshipSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          } catch (iErr) {
            console.error(`Permission denied reading internship for ${userDoc.id}`, iErr);
            userData.internship = [];
          }

          usersList.push(userData);
        }

        setUsers(usersList);
      } catch (err) {
        console.error("CRITICAL error fetching data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsersData();
  }, [currentUser]); // Re-run when user state changes

  const handleAccept = async (userId, collectionName, docId) => {
    if (window.confirm("Are you sure you want to accept and remove this application?")) {
      try {
        await deleteDoc(doc(db, `users/${userId}/${collectionName}`, docId));
        
        // Update local state to remove the deleted item immediately
        setUsers(prevUsers => prevUsers.map(user => {
          if (user.id === userId) {
            return {
              ...user,
              [collectionName]: user[collectionName].filter(item => item.id !== docId)
            };
          }
          return user;
        }));
      } catch (error) {
        console.error("Error deleting document:", error);
        alert("Failed to delete the application. Make sure you have admin permissions.");
      }
    }
  };

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
            setCurrentUser(user);
        } else {
            setCurrentUser(null);
            setLoading(false); // Stop loading if definitely not logged in
        }
    });

    return () => unsubscribe();
  }, []);

  const downloadExcel = () => {
    const dataToExport = [];

    users.forEach(user => {
      // Add Contact Data
      (user.contact || []).forEach(c => {
        dataToExport.push({
          Type: 'Contact Inquiry',
          FullName: excelSafe(user.fullName || c.fullName),
          Email: excelSafe(user.email || c.email),
          Phone: excelSafe(c.phone),
          Company: excelSafe(c.company),
          Method: excelSafe(c.contactMethod),
          Details: excelSafe(c.projectDetails),
          Requirements: excelSafe(c.requirements),
          Domain: 'N/A',
          College: 'N/A',
          LinkedIn: 'N/A',
          AboutYou: 'N/A',
          WhyInternship: 'N/A',
          ResumeLink: 'N/A',
          ResumePath: 'N/A',
          SubmittedAt: excelSafe(c.submittedAt || user.lastSubmissionAt)
        });
      });

      // Add Internship Data
      (user.internship || []).forEach(i => {
        dataToExport.push({
          Type: 'Internship Application',
          FullName: excelSafe(user.fullName || i.fullName),
          Email: excelSafe(user.email || i.email),
          Phone: excelSafe(i.phone),
          Company: 'N/A',
          Method: excelSafe(i.contactMethod),
          Details: 'N/A',
          Requirements: 'N/A',
          Domain: excelSafe(i.domain),
          College: excelSafe(i.college),
          LinkedIn: excelSafe(i.linkedin),
          AboutYou: excelSafe(i.aboutYou),
          WhyInternship: excelSafe(i.whyInternship),
          ResumeLink: excelSafe(i.resumeUrl),
          ResumePath: excelSafe(i.resumePath),
          SubmittedAt: excelSafe(i.submittedAt || user.lastSubmissionAt)
        });
      });
    });

    if (dataToExport.length === 0) {
      alert("No data available to export.");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users Data");
    XLSX.writeFile(workbook, "Relyce_Users_Data.xlsx");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="w-12 h-12 border-3 rounded-full animate-spin" style={{ border: '3px solid rgba(255,255,255,0.08)', borderTopColor: '#D4A853' }}></div>
      </div>
    );
  }

  // Not logged in -> Show Login Component
  if (!currentUser) {
      return <AdminLogin onLoginSuccess={(user) => setCurrentUser(user)} />;
  }

  // Logged in -> Show Dashboard
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white py-24 px-6 lg:px-12 relative" style={{ fontFamily: "'Inter', 'Outfit', sans-serif" }}>
      <Helmet>
        <title>Admin Dashboard | Relyce Infotech</title>
      </Helmet>
      
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between flex-start gap-4 mb-10 items-center">
          <div>
            <h1 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 300, color: '#e8e4df', letterSpacing: '-0.02em' }}>Admin Dashboard</h1>
            <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.3)' }}>View and export all form submissions and applications.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => signOut(auth)}
              style={{ padding: '0.5rem 1.2rem', borderRadius: '50px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'transparent', color: 'rgba(255,255,255,0.4)', fontSize: '0.78rem', fontWeight: 500, cursor: 'pointer', transition: 'all 0.3s ease', letterSpacing: '0.05em' }}
            >
              Sign Out
            </button>
            <button 
              onClick={downloadExcel}
              style={{ padding: '0.5rem 1.2rem', borderRadius: '50px', border: '1px solid rgba(212,168,83,0.4)', backgroundColor: 'transparent', color: '#D4A853', fontSize: '0.78rem', fontWeight: 500, cursor: 'pointer', transition: 'all 0.3s ease', letterSpacing: '0.05em' }}
            >
              Download as Excel
            </button>
          </div>
        </div>

        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab('contact')}
            style={{
              padding: '0.5rem 1.5rem', borderRadius: '50px', fontSize: '0.78rem', fontWeight: 500,
              cursor: 'pointer', transition: 'all 0.3s ease', letterSpacing: '0.05em',
              border: activeTab === 'contact' ? '1px solid rgba(212,168,83,0.5)' : '1px solid rgba(255,255,255,0.08)',
              backgroundColor: activeTab === 'contact' ? 'rgba(212,168,83,0.1)' : 'transparent',
              color: activeTab === 'contact' ? '#D4A853' : 'rgba(255,255,255,0.35)',
            }}
          >
            Contact Inquiries
          </button>
          <button
            onClick={() => setActiveTab('internship')}
            style={{
              padding: '0.5rem 1.5rem', borderRadius: '50px', fontSize: '0.78rem', fontWeight: 500,
              cursor: 'pointer', transition: 'all 0.3s ease', letterSpacing: '0.05em',
              border: activeTab === 'internship' ? '1px solid rgba(212,168,83,0.5)' : '1px solid rgba(255,255,255,0.08)',
              backgroundColor: activeTab === 'internship' ? 'rgba(212,168,83,0.1)' : 'transparent',
              color: activeTab === 'internship' ? '#D4A853' : 'rgba(255,255,255,0.35)',
            }}
          >
            Internship Applications
          </button>
        </div>

        {error ? (
          <div className="bg-red-900/30 border border-red-800 p-8 rounded-xl text-center">
            <h2 className="text-xl font-bold text-red-500 mb-2">Error Fetching Data</h2>
            <p className="text-gray-300">{error}</p>
            <p className="text-gray-400 text-sm mt-4 italic">If this is a permissions error, verify your Google UID has role="admin" in the `adminusers` Firestore collection.</p>
          </div>
        ) : users.length === 0 ? (
          <div className="bg-[#111] border border-gray-800 p-8 rounded-xl text-center">
            <p className="text-gray-400">No data found in Firebase.</p>
          </div>
        ) : (
          <div className="grid gap-8">
            {users
              .filter(user => activeTab === 'contact' ? userDataExists(user.contact) : userDataExists(user.internship))
              .map((user) => (
              <div key={user.id} className="bg-[#111] border border-gray-800 p-6 rounded-xl flex flex-col space-y-4">
                <div className="flex justify-between items-center border-b border-gray-800 pb-4">
                  <h2 style={{ fontSize: '1.1rem', fontWeight: 500, color: '#D4A853', letterSpacing: '-0.02em' }}>{user.fullName}</h2>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>

                {/* Contact Submissions */}
                {activeTab === 'contact' && userDataExists(user.contact) && (
                  <div>
                    <h3 style={{ fontSize: '0.88rem', fontWeight: 500, color: 'rgba(255,255,255,0.6)', marginBottom: '0.8rem', paddingLeft: '0.8rem', borderLeft: '2px solid rgba(212,168,83,0.4)' }}>Contact Inquiries</h3>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {user.contact.map((c) => (
                        <div key={c.id} className="bg-gray-900/50 p-4 rounded-lg border border-gray-800 text-sm flex flex-col justify-between">
                          <div>
                            <p><span className="text-gray-400 font-semibold">Phone:</span> {c.phone}</p>
                            <p><span className="text-gray-400 font-semibold">Company:</span> {c.company}</p>
                            <p><span className="text-gray-400 font-semibold">Pref. Method:</span> {c.contactMethod}</p>
                            <p className="mt-2 text-gray-300"><span className="text-gray-400 font-semibold">Details:</span> {c.projectDetails}</p>
                            <p className="mt-2 text-gray-500 text-xs">Submitted: {new Date(c.submittedAt || user.lastSubmissionAt).toLocaleString()}</p>
                          </div>
                          <button 
                            onClick={() => handleAccept(user.id, 'contact', c.id)}
                            className="mt-4 w-full bg-green-500/10 hover:bg-green-500/20 text-green-400 border border-green-500/30 py-2 rounded transition font-semibold"
                          >
                            Accept & Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Internship Submissions */}
                {activeTab === 'internship' && userDataExists(user.internship) && (
                  <div>
                    <h3 style={{ fontSize: '0.88rem', fontWeight: 500, color: 'rgba(255,255,255,0.6)', marginBottom: '0.8rem', paddingLeft: '0.8rem', borderLeft: '2px solid rgba(212,168,83,0.4)' }}>Internship Applications</h3>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {user.internship.map((i) => (
                        <div key={i.id} className="bg-gray-900/50 p-4 rounded-lg border border-gray-800 text-sm flex flex-col justify-between">
                          <div>
                            <p><span className="text-gray-400 font-semibold">Phone:</span> {i.phone}</p>
                            <p><span className="text-gray-400 font-semibold">Domain:</span> {i.domain}</p>
                            <p><span className="text-gray-400 font-semibold">College:</span> {i.college}</p>
                            <p className="mt-2 mb-2"><span className="text-gray-400 font-semibold">LinkedIn:</span> <a href={i.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: '#D4A853', wordBreak: 'break-all' }}>{i.linkedin}</a></p>
                            {(i.resumePath || i.resumeUrl) && (
                              <button
                                type="button"
                                onClick={() => openResume(i.resumePath, i.resumeUrl)}
                                style={{ display: 'inline-block', marginTop: '0.5rem', padding: '0.25rem 0.8rem', borderRadius: '50px', border: '1px solid rgba(212,168,83,0.25)', color: '#D4A853', fontSize: '0.72rem', textDecoration: 'none', transition: 'all 0.3s ease', backgroundColor: 'transparent', cursor: 'pointer' }}
                              >
                                View Resume
                              </button>
                            )}
                            <p className="mt-3 text-gray-500 text-xs">Submitted: {new Date(i.submittedAt || user.lastSubmissionAt).toLocaleString()}</p>
                          </div>
                          <button 
                            onClick={() => handleAccept(user.id, 'internship', i.id)}
                            className="mt-4 w-full bg-green-500/10 hover:bg-green-500/20 text-green-400 border border-green-500/30 py-2 rounded transition font-semibold"
                          >
                            Accept & Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            {/* Show a fallback if the filtered array is completely empty */}
            {users.filter(user => activeTab === 'contact' ? userDataExists(user.contact) : userDataExists(user.internship)).length === 0 && (
               <div className="bg-[#111] border border-gray-800 p-8 rounded-xl text-center">
                 <p className="text-gray-400">No {activeTab} data found. All clear!</p>
               </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Relyce;
