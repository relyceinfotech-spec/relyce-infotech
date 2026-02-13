import React, { useState, useRef, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
// GSAP is expected to be available globally

// --- Loading Modal Component ---
const LoadingModal = () => (
    // Main overlay with solid background pattern instead of blur
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        {/* Hard border pop-up window */}
        <div className="bg-white border-4 border-black p-8 flex flex-col items-center justify-center space-y-6 shadow-hard-xl max-w-sm w-full mx-4">
            <div className="w-16 h-16 border-4 border-t-neo-pink border-black rounded-full animate-spin"></div>
            <p className="text-black font-black text-xl uppercase tracking-wider">Submitting...</p>
        </div>
    </div>
);

// --- Zod Schema for Validation ---
const schema = z.object({
    fullName: z.string().min(1, "Full name is required"),
    email: z.string().email("Please enter a valid email"),
    company: z.string().min(1, "Company name is required"),
    phone: z.string().min(10, "Please enter a valid phone number"),
    contactMethod: z.enum(["Email", "Phone", "WhatsApp"], {
        errorMap: () => ({ message: "Please select a contact method" }),
    }),
    projectDetails: z.string().min(10, "Please provide at least 10 characters"),
    requirements: z.string().min(10, "Please provide at least 10 characters"),
});


// --- Main ContactForm Component ---
const ContactForm = () => {
    const formRef = useRef(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [result, setResult] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: zodResolver(schema),
    });

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        setResult("");

        const formData = new FormData();
        // Append all data from the form to FormData
        for (const key in data) {
            formData.append(key, data[key]);
        }

        const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
        if (!accessKey) {
            setResult("Access Key is missing.");
            setIsSubmitting(false);
            return;
        }
        formData.append("access_key", accessKey);

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData,
            });
            const resData = await response.json();
            if (resData.success) {
                setResult("Form Submitted Successfully 🚀");
                reset(); // Reset form using react-hook-form's reset
            } else {
                setResult(resData.message || "Submission failed");
            }
        } catch (error) {
            console.error("Submission Error:", error); // Use the error variable
            setResult("An error occurred.");
        } finally {
            setIsSubmitting(false);
        }
    };
    
    useEffect(() => {
        if(window.gsap) {
            const gsap = window.gsap;
            const { ScrollTrigger } = gsap;
            gsap.registerPlugin(ScrollTrigger);

            gsap.from(formRef.current.children, {
                opacity: 0, y: 50, duration: 0.8, stagger: 0.1, ease: 'power3.out',
                scrollTrigger: { trigger: formRef.current, start: 'top 85%', toggleActions: 'play none none reverse' }
            });
        }
    }, []);

    return (
        <div className="bg-neo-pink py-20 sm:py-24 relative border-t-4 border-black">
            {isSubmitting && <LoadingModal />}
            <div className="max-w-4xl mx-auto px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-black tracking-tight text-white text-stroke-black sm:text-5xl uppercase drop-shadow-[4px_4px_0_rgba(0,0,0,1)]">Let's Build Something Great</h2>
                    <p className="mt-4 text-xl leading-8 text-black font-mono font-bold bg-white inline-block px-4 border-2 border-black shadow-hard transform -rotate-1">
                        Fill out the form below, and we'll get back to you to discuss your project.
                    </p>
                </div>
                <form
                    ref={formRef}
                    onSubmit={handleSubmit(onSubmit)}
                    className="bg-white border-4 border-black w-full p-8 shadow-hard-xl space-y-6"
                >
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Full Name */}
                        <div>
                            <label className="block text-sm font-black uppercase text-black mb-2">Full Name *</label>
                            <input {...register("fullName")} placeholder="Name" className="w-full px-4 py-3 bg-white border-2 border-black text-black font-mono focus:outline-none focus:bg-neo-yellow focus:shadow-hard-sm transition-all placeholder:text-gray-500" />
                            {errors.fullName && <p className="text-neo-red font-bold text-xs mt-1 bg-black text-white inline-block px-1">{errors.fullName.message}</p>}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-black uppercase text-black mb-2">Email *</label>
                            <input {...register("email")} placeholder="your@email.com" className="w-full px-4 py-3 bg-white border-2 border-black text-black font-mono focus:outline-none focus:bg-neo-yellow focus:shadow-hard-sm transition-all placeholder:text-gray-500" />
                            {errors.email && <p className="text-neo-red font-bold text-xs mt-1 bg-black text-white inline-block px-1">{errors.email.message}</p>}
                        </div>

                        {/* Company */}
                        <div>
                            <label className="block text-sm font-black uppercase text-black mb-2">Company Name *</label>
                            <input {...register("company")} placeholder="Your Company" className="w-full px-4 py-3 bg-white border-2 border-black text-black font-mono focus:outline-none focus:bg-neo-yellow focus:shadow-hard-sm transition-all placeholder:text-gray-500" />
                            {errors.company && <p className="text-neo-red font-bold text-xs mt-1 bg-black text-white inline-block px-1">{errors.company.message}</p>}
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="block text-sm font-black uppercase text-black mb-2">Phone Number *</label>
                            <input {...register("phone")} type="tel" placeholder="+91 98765 43210" className="w-full px-4 py-3 bg-white border-2 border-black text-black font-mono focus:outline-none focus:bg-neo-yellow focus:shadow-hard-sm transition-all placeholder:text-gray-500" />
                            {errors.phone && <p className="text-neo-red font-bold text-xs mt-1 bg-black text-white inline-block px-1">{errors.phone.message}</p>}
                        </div>
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

                    {/* Project Details */}
                    <div>
                        <label className="block text-sm font-black uppercase text-black mb-2">Project Details *</label>
                        <textarea {...register("projectDetails")} placeholder="Tell us a bit about your project goals, tech stack, timeline..." className="w-full px-4 py-3 bg-white border-2 border-black text-black font-mono focus:outline-none focus:bg-neo-yellow focus:shadow-hard-sm transition-all placeholder:text-gray-500 resize-none" rows={4}></textarea>
                        {errors.projectDetails && <p className="text-neo-red font-bold text-xs mt-1 bg-black text-white inline-block px-1">{errors.projectDetails.message}</p>}
                    </div>

                    {/* Requirements */}
                    <div>
                        <label className="block text-sm font-black uppercase text-black mb-2">Additional Requirements *</label>
                        <textarea {...register("requirements")} placeholder="Anything else you want to share?" className="w-full px-4 py-3 bg-white border-2 border-black text-black font-mono focus:outline-none focus:bg-neo-yellow focus:shadow-hard-sm transition-all placeholder:text-gray-500 resize-none" rows={3}></textarea>
                        {errors.requirements && <p className="text-neo-red font-bold text-xs mt-1 bg-black text-white inline-block px-1">{errors.requirements.message}</p>}
                    </div>

                    {/* Result message */}
                    {result && (
                        <div className="text-center p-2 border-2 border-black bg-neo-green text-black font-black uppercase shadow-hard-sm">
                            {result}
                        </div>
                    )}

                    {/* Submit */}
                    <button type="submit" disabled={isSubmitting} className="w-full bg-black text-white hover:bg-white hover:text-black border-4 border-black font-black uppercase text-xl py-4 shadow-hard hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed">
                        Submit Inquiry
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ContactForm;
