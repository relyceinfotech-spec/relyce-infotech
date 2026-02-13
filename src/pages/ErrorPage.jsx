import React from "react";

const ErrorPage = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center text-center bg-neo-red border-t-4 border-black">
      <h1 className="text-9xl font-black text-white text-stroke-black drop-shadow-[8px_8px_0_rgba(0,0,0,1)]">404</h1>
      <p className="mt-8 text-2xl font-mono font-bold text-black bg-white border-4 border-black p-4 shadow-hard transform -rotate-2">
        Oops! Page Lost in Space
      </p>
      <a 
        href="/" 
        className="mt-12 px-8 py-4 bg-black text-white font-black uppercase text-xl border-4 border-transparent hover:bg-white hover:text-black hover:border-black hover:shadow-hard transition-all duration-300"
      >
        Go Home
      </a>
    </div>
  );
};

export default ErrorPage;
