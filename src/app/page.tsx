"use client";
import "@/cssFiles/homeanimations.css";
import axios from "axios";
import { useRef, useEffect } from "react";
import toast from "react-hot-toast";
import NavBar from "@/components/NavBar";


export default function Home() {
  useEffect(() => {
    // Your useEffect logic here for any JavaScript animations or functionality
  }, []);

  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-700 text-white font-sans spacebg">
    <NavBar />
    {/* Hero Section */}
    <div className="flex flex-row-reverse items-center justify-center h-screen">
      <section className="hero-section relative flex items-center justify-center h-screen w-1/2 bg-cover bg-center border-b-8 border-gray-900 mb-8 homebg">
        <div className="absolute inset-0 bg-black opacity-25"></div>
      </section>
      <div className="w-1/2 flex items-center justify-center flex-col animate-slide-in ">
        <div className="text-white text-center px-6">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white typed-out leading-tight">
            <span className="text-blue-500 font-bold text-6xl">
              Welcome to
            </span>{" "}
            <span className="text-6xl">Cobalt</span>
          </h2>
          <div className="mt-6 flex flex-col items-center">
            <p className="text-base sm:text-lg md:text-xl text-white leading-relaxed text-left animate-slide-in1">
              A one-Stop Place For Coding Enthusiasts
            </p>
            <a
              href="/guide"
              className="mt-4 px-6 py-3 bg-white text-gray-800 font-semibold rounded-md transition animate-slide-in1 duration-300 transform hover:scale-105 hover:bg-blue-500 hover:text-white"
            >
              Get Started
            </a>
          </div>
        </div>
      </div>
    </div>
        {/* Categories Section */}
        <div className="container mx-auto py-8 px-8 md:px-16 lg:px-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* AI-driven insights */}
            <div className="category bg-gray-800 p-4 md:p-6 rounded-xl shadow-md transition duration-300 transform hover:scale-105 hover:shadow-blue-500">
              <h5 className="text-lg md:text-xl font-semibold mb-4 transition duration-300 transform hover:scale-105">
                <span className="font-bold text-lg md:text-xl">
                  AI-driven insights
                </span>
              </h5>
              <span className="category_icon bg-primary p-3 md:p-4 rounded-full">
                <i className="uil uil-bitcoin-circle"></i>
              </span>
              <p className="text-sm md:text-base mt-4">
                Effortlessly gain insights with AI technology.
              </p>
            </div>
            {/* efficient codebase utilization */}
            <div className="category bg-gray-800 p-4 md:p-6 rounded-xl shadow-md transition duration-300 transform hover:scale-105 hover:shadow-blue-500">
              <h5 className="text-lg md:text-xl font-semibold mb-4 transition duration-300 transform hover:scale-105">
                <span className="font-bold text-lg md:text-xl">
                  Efficient codebase utilization
                </span>
              </h5>
              <span className="category_icon bg-primary p-3 md:p-4 rounded-full">
                <i className="uil uil-bitcoin-circle"></i>
              </span>
              <p className="text-sm md:text-base mt-4">
                Maximize the potential of your codebase with efficiency.
              </p>
            </div>
            {/* secure Code Vault */}
            <div className="category bg-gray-800 p-4 md:p-6 rounded-xl shadow-md transition duration-300 transform hover:scale-105 hover:shadow-blue-500">
              <h5 className="text-lg md:text-xl font-semibold mb-4 transition duration-300 transform hover:scale-105">
                <span className="font-bold text-lg md:text-xl">
                  Secure Code Vault
                </span>
              </h5>
              <span className="category_icon bg-primary p-3 md:p-4 rounded-full">
                <i className="uil uil-bitcoin-circle"></i>
              </span>
              <p className="text-sm md:text-base mt-4">
                Protect your code with the highest level of security.
              </p>
            </div>
            {/* Intelligent Search Functionality */}
            <div className="category bg-gray-800 p-4 md:p-6 rounded-xl shadow-md transition duration-300 transform hover:scale-105 hover:shadow-blue-500">
              <h5 className="text-lg md:text-xl font-semibold mb-4 transition duration-300 transform hover:scale-105">
                <span className="font-bold text-lg md:text-xl">
                  Intelligent Search Functionality
                </span>
              </h5>
              <span className="category_icon bg-primary p-3 md:p-4 rounded-full">
                <i className="uil uil-bitcoin-circle"></i>
              </span>
              <p className="text-sm md:text-base mt-4">
                Find what you need quickly and effortlessly with intelligent
                search.
              </p>
            </div>
            {/* Comprehensive AI and Machine Learning Integration */}
            <div className="category bg-gray-800 p-4 md:p-6 rounded-xl shadow-md transition duration-300 transform hover:scale-105 hover:shadow-blue-500">
              <h5 className="text-lg md:text-xl font-semibold mb-4 transition duration-300 transform hover:scale-105">
                <span className="font-bold text-lg md:text-xl">
                  Comprehensive AI and Machine Learning Integration
                </span>
              </h5>
              <span className="category_icon bg-primary p-3 md:p-4 rounded-full">
                <i className="uil uil-bitcoin-circle"></i>
              </span>
              <p className="text-sm md:text-base mt-4">
                Seamlessly integrate AI and ML into your workflow for enhanced
                capabilities.
              </p>
            </div>
            {/* Boosted Developer Productivity */}
            <div className="category bg-gray-800 p-4 md:p-6 rounded-xl shadow-md transition duration-300 transform hover:scale-105 hover:shadow-blue-500">
              <h5 className="text-lg md:text-xl font-semibold mb-4 transition duration-300 transform hover:scale-105">
                <span className="font-bold text-lg md:text-xl">
                  Boosted Developer Productivity
                </span>
              </h5>
              <span className="category_icon bg-primary p-3 md:p-4 rounded-full">
                <i className="uil uil-bitcoin-circle"></i>
              </span>
              <p className="text-sm md:text-base mt-4">
                Increase productivity with advanced tools and features.
              </p>
            </div>
          </div>
        </div>
      {/* Footer */}
      <footer className="bg-[#101418] text-white py-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Cobalt. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
