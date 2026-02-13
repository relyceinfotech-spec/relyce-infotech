import React from 'react';

// Icon components
const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-neo-black flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const LocationIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-neo-black flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const EmailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-neo-black flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);


const Footer = () => {
  return (
    <div className="bg-neo-black py-12 px-4 border-t-4 border-black mt-12">
        <footer className="text-neo-white">
          <div className="max-w-screen-xl mx-auto bg-neo-white text-neo-black border-4 border-black shadow-hard-xl p-8 md:p-12 relative overflow-hidden">
             
              {/* Decorative background element */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-neo-yellow border-l-4 border-b-4 border-black rounded-bl-full -mr-2 -mt-2 z-0"></div>

            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
                
                {/* Column 1: Company Info */}
                <div className="sm:col-span-2 lg:col-span-1">
                  <h3 className="text-3xl font-black uppercase text-black mb-3 font-display">Relyce<br/>Infotech</h3>
                  <p className="text-black font-mono font-bold text-sm bg-neo-green inline-block px-2 border-2 border-black mb-2">
                    STATUS: ONLINE
                  </p>
                  <p className="text-gray-800 text-sm font-mono border-l-4 border-neo-purple pl-3">
                    Empowering businesses through innovative technology solutions.
                  </p>
                </div>

                {/* Column 2: Services */}
                <div>
                  <h4 className="font-bold text-xl text-black mb-4 uppercase bg-neo-blue inline-block px-2 border-2 border-black shadow-hard-sm transform -rotate-2">Services</h4>
                  <ul className="space-y-2 font-mono font-bold text-sm">
                    <li><a href="#" className="hover:bg-black hover:text-white px-1 transition-all">Web Development</a></li>
                    <li><a href="#" className="hover:bg-black hover:text-white px-1 transition-all">Mobile Apps</a></li>
                    <li><a href="#" className="hover:bg-black hover:text-white px-1 transition-all">Cloud Solutions</a></li>
                    <li><a href="#" className="hover:bg-black hover:text-white px-1 transition-all">Digital Marketing</a></li>
                  </ul>
                </div>

                {/* Column 3: Company */}
                <div>
                  <h4 className="font-bold text-xl text-black mb-4 uppercase bg-neo-pink inline-block px-2 border-2 border-black shadow-hard-sm transform rotate-1">Company</h4>
                   <ul className="space-y-2 font-mono font-bold text-sm">
                    <li><a href="#" className="hover:bg-black hover:text-white px-1 transition-all">About Us</a></li>
                    <li><a href="#" className="hover:bg-black hover:text-white px-1 transition-all">Our Team</a></li>
                    <li><a href="#" className="hover:bg-black hover:text-white px-1 transition-all">Careers</a></li>
                    <li><a href="#" className="hover:bg-black hover:text-white px-1 transition-all">Contact</a></li>
                  </ul>
                </div>

                {/* Column 4: Resources */}
                <div>
                  <h4 className="font-bold text-xl text-black mb-4 uppercase bg-neo-orange inline-block px-2 border-2 border-black shadow-hard-sm transform -rotate-1">Resources</h4>
                   <ul className="space-y-2 font-mono font-bold text-sm">
                    <li><a href="#" className="hover:bg-black hover:text-white px-1 transition-all">Blog</a></li>
                    <li><a href="#" className="hover:bg-black hover:text-white px-1 transition-all">FAQ</a></li>
                    <li><a href="#" className="hover:bg-black hover:text-white px-1 transition-all">Portfolio</a></li>
                  </ul>
                </div>

                {/* Column 5: Contact Us */}
                <div>
                  <h4 className="font-bold text-xl text-black mb-4 uppercase bg-neo-red inline-block px-2 border-2 border-black shadow-hard-sm transform rotate-2">Contact Us</h4>
                  <ul className="space-y-3 text-black font-mono font-bold text-sm">
                    <li className="flex items-center">
                      <PhoneIcon />
                      <a href="tel:+919787963935" className="hover:underline">+91 9787963935</a>
                    </li>
                    <li className="flex items-start">
                      <LocationIcon />
                      <span>Chennai, Tamilnadu, India</span>
                    </li>
                    <li className="flex items-center">
                      <EmailIcon />
                      <a href="mailto:relyceinfotech@gmail.com" className="hover:underline break-all">relyceinfotech@gmail.com</a>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Bottom Copyright Section */}
              <div className="mt-12 pt-8 border-t-4 border-black text-center text-black font-mono text-sm font-bold flex flex-col md:flex-row justify-between items-center">
                <p>&copy; 2026 Relyce Infotech. All rights reserved.</p>
                <div className="flex gap-2 mt-4 md:mt-0">
                    <div className="w-4 h-4 bg-neo-red border border-black"></div>
                    <div className="w-4 h-4 bg-neo-yellow border border-black"></div>
                    <div className="w-4 h-4 bg-neo-green border border-black"></div>
                </div>
              </div>
          </div>
        </footer>
    </div>
  );
};

export default Footer;
