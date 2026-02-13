import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
// Make sure you have firebase configured and initialized in a file like '../firebase.js'
import { db, storage } from "../firebase"; 
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { Helmet } from "react-helmet";

// --- Loading Modal Component ---
const LoadingModal = () => (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
        <div className="bg-white border-4 border-black p-8 flex flex-col items-center justify-center space-y-4 shadow-hard-xl max-w-sm w-full mx-4">
            <div className="w-16 h-16 border-4 border-t-neo-green border-black rounded-full animate-spin"></div>
            <p className="text-black font-black uppercase text-xl">Uploading...</p>
        </div>
    </div>
);

const domainOptions = [
    "Web Development", "App Development", "Software Development", "Cloud Computing",
    "Digital Marketing & Graphic Design", "Data Analysis", "AI Engineer",
];

// Schema matching the form fields
const schema = z.object({
    email: z.string().email("Enter a valid email"),
    fullName: z.string().min(1, "Full name is required"),
    college: z.string().min(1, "College name is required"),
    phone: z.string().min(10, "Phone number is required"),
    contactMethod: z.enum(["Email", "Phone", "WhatsApp"], {
        errorMap: () => ({ message: "Select a contact method" }),
    }),
    domain: z.string().min(1, "Select a preferred domain"),
    linkedin: z.string().url("Enter a valid LinkedIn URL").min(1, "LinkedIn URL is required"),
    aboutYou: z.string().min(10, "Please tell us about yourself (min 10 characters)"),
    whyInternship: z.string().min(10, "Please explain why you want this internship (min 10 characters)"),
});

// Reusable Input Component
const Input = ({ label, name, register, error, ...rest }) => (
    <div>
        <label className="block text-sm font-black uppercase text-black mb-2">{label} *</label>
        <input
            {...register(name)}
            placeholder={`Your ${label}`}
            className="w-full px-4 py-3 bg-white border-2 border-black text-black font-mono focus:outline-none focus:bg-neo-green focus:shadow-hard-sm transition-all placeholder:text-gray-500"
            {...rest}
        />
        {error && <p className="text-neo-red font-bold text-xs mt-1 bg-black text-white inline-block px-1">{error.message}</p>}
    </div>
);

// Reusable Textarea Component
const Textarea = ({ label, name, register, error, ...rest }) => (
    <div className="md:col-span-2">
        <label className="block text-sm font-black uppercase text-black mb-2">{label} *</label>
        <textarea
            {...register(name)}
            placeholder="..."
            className="w-full px-4 py-3 bg-white border-2 border-black text-black font-mono focus:outline-none focus:bg-neo-green focus:shadow-hard-sm transition-all placeholder:text-gray-500 resize-none"
            rows={3}
            {...rest}
        ></textarea>
        {error && <p className="text-neo-red font-bold text-xs mt-1 bg-black text-white inline-block px-1">{error.message}</p>}
    </div>
);

const Internship = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: zodResolver(schema),
    });

    const [file, setFile] = useState(null);
    const [result, setResult] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit = async (data) => {
        if (!file) {
            setResult("📄 Please upload your resume (PDF only)");
            return;
        }
        if (file.type !== "application/pdf") {
            setResult("❌ Only PDF files are accepted!");
            return;
        }

        setIsSubmitting(true);
        setResult("");

        try {
            // 1. Upload resume to Firebase Storage
            const storageRef = ref(storage, `resumes/${Date.now()}_${file.name}`);
            const snapshot = await uploadBytes(storageRef, file);
            const resumeUrl = await getDownloadURL(snapshot.ref);

            // 2. Save application data to Firestore
            await addDoc(collection(db, "internship_applications"), {
                ...data,
                resumeUrl,
                submittedAt: Timestamp.now(),
            });
           
            // 3. Send notification via Web3Forms
            const formData = new FormData();
            formData.append("access_key", "7ffec1c1-3393-49f9-9c33-447a607e5112");
            formData.append("Full Name", data.fullName);
            formData.append("Email", data.email);
            formData.append("Phone", data.phone);
            formData.append("College/Institute", data.college);
            formData.append("Preferred Contact Method", data.contactMethod);
            formData.append("Preferred Domain", data.domain);
            formData.append("LinkedIn URL", data.linkedin);
            formData.append("About", data.aboutYou);
            formData.append("Why Internship", data.whyInternship);
            formData.append("Resume Link", resumeUrl);

            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData,
            });

            const resultData = await response.json();

            if (resultData.success) {
                setResult("✅ Application submitted successfully!");
                reset();
                setFile(null);
                if(document.getElementById('resume-upload')) {
                    document.getElementById('resume-upload').value = null;
                }
            } else {
                setResult("❌ Error: " + resultData.message);
            }
        } catch (err) {
            console.error("Submission Error:", err);
            setResult("Something went wrong. Try again!");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-neo-purple py-20 sm:py-24 relative border-t-4 border-black">
            <Helmet>
                <title>Internship Application | Relyce Infotech</title>
                <meta name="description" content="Apply for an internship at Relyce Infotech and kickstart your career in tech." />
            </Helmet>

            {isSubmitting && <LoadingModal />}
            <div className="max-w-4xl mx-auto px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-black tracking-tight text-white text-stroke-black sm:text-6xl uppercase drop-shadow-[5px_5px_0_rgba(0,0,0,1)]">Apply for an Internship</h2>
                    <p className="mt-4 text-xl leading-8 text-black font-mono font-bold bg-white inline-block px-4 border-2 border-black shadow-hard transform -rotate-1">
                        Join our team and kickstart your career in tech.
                    </p>
                </div>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="bg-white border-4 border-black w-full p-8 shadow-hard-xl space-y-6"
                >
                    <div className="grid md:grid-cols-2 gap-6">
                        <Input label="Full Name" name="fullName" register={register} error={errors.fullName} />
                        <Input label="Email" name="email" register={register} error={errors.email} />
                        <Input label="College/Institute" name="college" register={register} error={errors.college} />
                        <Input label="Phone Number" name="phone" type="tel" register={register} error={errors.phone} />
                    </div>

                    {/* Contact Method */}
                    <div>
                        <label className="block text-sm font-black uppercase text-black mb-2">Preferred Contact Method *</label>
                        <div className="flex flex-wrap gap-x-6 gap-y-2 mt-2">
                            {["Email", "Phone", "WhatsApp"].map((method) => (
                                <label key={method} className="flex items-center gap-2 text-sm text-black font-bold cursor-pointer hover:opacity-75">
                                    <input type="radio" value={method} {...register("contactMethod")} className="h-5 w-5 appearance-none border-2 border-black bg-white checked:bg-black checked:border-black focus:ring-0 transition-all"/>
                                    {method}
                                </label>
                            ))}
                        </div>
                        {errors.contactMethod && <p className="text-neo-red font-bold text-xs mt-1 bg-black text-white inline-block px-1">{errors.contactMethod.message}</p>}
                    </div>

                    {/* Domain */}
                    <div>
                        <label className="block text-sm font-black uppercase text-black mb-2">Preferred Domain *</label>
                        <div className="relative">
                            <select {...register("domain")} className="w-full px-4 py-3 bg-white border-2 border-black text-black font-mono focus:outline-none focus:bg-neo-green focus:shadow-hard-sm transition-all appearance-none">
                                <option value="">-- Select a Domain --</option>
                                {domainOptions.map((domain) => (<option key={domain} value={domain}>{domain}</option>))}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-black">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                            </div>
                        </div>
                        {errors.domain && <p className="text-neo-red font-bold text-xs mt-1 bg-black text-white inline-block px-1">{errors.domain.message}</p>}
                    </div>

                    <Input label="LinkedIn Profile URL" name="linkedin" register={register} error={errors.linkedin} />
                    <Textarea label="Tell us about yourself" name="aboutYou" register={register} error={errors.aboutYou} />
                    <Textarea label="Why do you want this internship?" name="whyInternship" register={register} error={errors.whyInternship} />
                    
                    {/* Resume Upload */}
                    <div>
                        <label className="block text-sm font-black uppercase text-black mb-2">Upload Resume (PDF only) *</label>
                        <input id="resume-upload" type="file" accept=".pdf" onChange={(e) => setFile(e.target.files[0])} className="w-full text-sm text-black font-mono border-2 border-black file:mr-4 file:py-3 file:px-4 file:border-0 file:border-r-2 file:border-black file:text-sm file:font-black file:bg-neo-yellow file:text-black hover:file:bg-neo-green cursor-pointer bg-gray-50"/>
                    </div>

                    {/* Social Links */}
                    <div className="text-center pt-8 border-t-4 border-black">
                         <p className="text-sm text-black font-black uppercase bg-neo-yellow inline-block px-2 border-2 border-black shadow-hard-sm">✨ Follow us for updates (Compulsory)</p>
                         <div className="flex justify-center gap-6 mt-4">
                           <a href="https://www.linkedin.com/company/relyce-infotech/" target="_blank" rel="noopener noreferrer" className="text-black font-bold hover:text-neo-blue hover:underline transition uppercase border-2 border-black px-2 bg-white shadow-hard-sm hover:translate-y-1 hover:shadow-none">LinkedIn</a>
                           <a href="https://www.instagram.com/relyce_infotech/" target="_blank" rel="noopener noreferrer" className="text-black font-bold hover:text-neo-pink hover:underline transition uppercase border-2 border-black px-2 bg-white shadow-hard-sm hover:translate-y-1 hover:shadow-none">Instagram</a>
                           <a href="https://chat.whatsapp.com/Faseq5B8hWgAjDdDpmhntt" target="_blank" rel="noopener noreferrer" className="text-black font-bold hover:text-neo-green hover:underline transition uppercase border-2 border-black px-2 bg-white shadow-hard-sm hover:translate-y-1 hover:shadow-none">WhatsApp</a>
                         </div>
                    </div>

                    {result && (
                        <div className="text-center p-2 border-2 border-black bg-neo-yellow text-black font-black uppercase shadow-hard-sm">
                            {result}
                        </div>
                    )}

                    <button type="submit" disabled={isSubmitting} className="w-full bg-black text-white hover:bg-white hover:text-black border-4 border-black font-black uppercase text-xl py-4 shadow-hard hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed">
                        Submit Application
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Internship;
