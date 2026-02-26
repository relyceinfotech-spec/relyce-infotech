import React from 'react';
import { auth, googleProvider, db } from '../firebase';
import { signInWithPopup } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const AdminLogin = ({ onLoginSuccess }) => {
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Ensure the user exists in the adminusers collection before letting them continue
      const adminRef = doc(db, 'adminusers', user.uid);
      const adminSnap = await getDoc(adminRef);

      if (!adminSnap.exists()) {
        // Automatically create them as a 'user' (not an admin) and block access
        await setDoc(adminRef, {
          email: user.email,
          role: 'user', // Default role. You'll need to manually change this to 'admin' in Firestore
          createdAt: new Date().toISOString()
        });
        
        alert(`Account created, but not authorized. Please ask a system administrator to change the role for ${user.email} from 'user' to 'admin' in Firestore (UID: ${user.uid}).`);
        auth.signOut(); // Log them back out since they don't have access
      } else {
        if (adminSnap.data().role === 'admin') {
          onLoginSuccess(user);
        } else {
           alert("You do not have admin permissions to access this dashboard.");
           auth.signOut();
        }
      }
    } catch (error) {
      console.error("Authentication Error:", error);
      alert(error.message);
    }
  };

  return (
    <div style={{
      minHeight: '100vh', backgroundColor: '#0a0a0a',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      padding: '1.5rem', fontFamily: "'Inter', 'Outfit', sans-serif",
    }}>
      <div style={{
        maxWidth: '380px', width: '100%', textAlign: 'center',
      }}>
        <h1 style={{
          fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 300,
          color: '#e8e4df', letterSpacing: '-0.02em', marginBottom: '0.6rem',
        }}>
          Admin Login
        </h1>
        <p style={{
          fontSize: '0.82rem', color: 'rgba(255,255,255,0.3)',
          lineHeight: 1.6, marginBottom: '2rem',
        }}>
          Sign in with your authorized Google account.
        </p>
        
        <button 
          onClick={handleGoogleSignIn}
          style={{
            width: '100%', padding: '0.75rem 1.5rem', borderRadius: '50px',
            border: '1px solid rgba(212, 168, 83, 0.4)',
            backgroundColor: 'transparent', color: '#D4A853',
            fontSize: '0.8rem', fontWeight: 500, letterSpacing: '0.08em',
            textTransform: 'uppercase', cursor: 'pointer',
            transition: 'all 0.3s ease', fontFamily: "'Inter', sans-serif",
          }}
          onMouseEnter={e => {
            e.target.style.backgroundColor = 'rgba(212, 168, 83, 0.1)';
            e.target.style.borderColor = 'rgba(212, 168, 83, 0.6)';
          }}
          onMouseLeave={e => {
            e.target.style.backgroundColor = 'transparent';
            e.target.style.borderColor = 'rgba(212, 168, 83, 0.4)';
          }}
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default AdminLogin;
