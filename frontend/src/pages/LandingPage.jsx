import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <main className="flex flex-1 flex-col md:flex-row items-center justify-between px-10 md:px-20">
        <div className="md:w-1/2 space-y-6 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-white leading-tight">
            Lost it? <span className="text-indigo-600">Track it Back!</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            TrackBack helps you report, search, and recover lost items within
            your community using AI-powered matching and real-time
            notifications.
          </p>
          <div className="flex justify-center md:justify-start gap-4">
            <Link
              to="/login"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg text-lg font-medium transition"
            >
              Get Started
            </Link>
            <a
              href="#features"
              className="border border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white px-6 py-3 rounded-lg text-lg font-medium transition"
            >
              Learn More
            </a>
          </div>
        </div>

        {/* Hero Image */}
        <div className="md:w-1/2 mt-10 md:mt-0">
          <img
            src="https://illustrations.popsy.co/violet/lost-and-found.svg"
            alt="Lost and Found Illustration"
            className="w-full max-w-lg mx-auto drop-shadow-lg"
          />
        </div>
      </main>

      {/* Features Section */}
      <section
        id="features"
        className="py-20 px-8 md:px-20 bg-white dark:bg-gray-900"
      >
        <h3 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-10">
          Why Choose <span className="text-indigo-600">TrackBack?</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="p-6 bg-indigo-50 dark:bg-gray-800 rounded-2xl shadow hover:shadow-lg transition">
            <h4 className="text-xl font-semibold mb-2 text-indigo-700 dark:text-indigo-400">
              🔍 Smart Search
            </h4>
            <p className="text-gray-600 dark:text-gray-300">
              AI-powered matching helps you find your lost items quickly and
              accurately.
            </p>
          </div>
          <div className="p-6 bg-indigo-50 dark:bg-gray-800 rounded-2xl shadow hover:shadow-lg transition">
            <h4 className="text-xl font-semibold mb-2 text-indigo-700 dark:text-indigo-400">
              📸 Easy Reporting
            </h4>
            <p className="text-gray-600 dark:text-gray-300">
              Upload item details with images and locations to report losses or
              found items instantly.
            </p>
          </div>
          <div className="p-6 bg-indigo-50 dark:bg-gray-800 rounded-2xl shadow hover:shadow-lg transition">
            <h4 className="text-xl font-semibold mb-2 text-indigo-700 dark:text-indigo-400">
              🔔 Real-time Alerts
            </h4>
            <p className="text-gray-600 dark:text-gray-300">
              Get instant notifications when a matching item or report is found
              near you.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
        <p>
          © {new Date().getFullYear()} TrackBack — Built by{" "}
          <span className="font-medium text-indigo-600 dark:text-indigo-400">
            Nidhi Walke
          </span>
        </p>
      </footer>
    </div>
  );
}
