import React from 'react';

export default function SignupPage() {
  return (
    <div
      className="h-screen w-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('/signup-background.jpg')" }} 
    >
      <div className="bg-black bg-opacity-70 p-10 rounded-md shadow-md text-white w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center">Sign Up</h2>
        
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Email or phone number"
            className="w-full p-3 rounded bg-gray-800 placeholder-gray-400 focus:outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded bg-gray-800 placeholder-gray-400 focus:outline-none"
          />
          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded font-semibold"
          >
            Sign Up
          </button>
        </form>

        <p className="text-xs text-gray-400 mt-4">
          This page is protected by Google reCAPTCHA to ensure you're not a bot. <a href="#" className="underline">Learn more.</a>
        </p>
      </div>
    </div>
  );
}