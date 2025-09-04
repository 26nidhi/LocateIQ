import React from "react";
import {
  UserGroupIcon,
  BoltIcon,
  ShieldCheckIcon,
  MapPinIcon,
} from "@heroicons/react/24/solid";

export default function LocateIQLanding() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <header className="flex justify-between items-center px-8 py-4 shadow-sm bg-white">
        <div className="flex items-center space-x-2">
          <MapPinIcon className="w-8 h-8 text-green-500" />
          <h1 className="text-xl font-bold">LocateIQ</h1>
        </div>
        <div className="flex items-center space-x-4">
          <button className="text-gray-700">Sign In</button>
          <button className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600">
            Get Started
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="text-center bg-gray-50 py-20 px-6">
        <h2 className="text-4xl font-bold text-gray-800">
          Find What's Lost, Return What's Found
        </h2>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          A secure, privacy-first platform connecting communities to reunite
          people with their belongings. Join location-based groups and get
          instant match notifications when someone reports your lost item.
        </p>
        <div className="mt-8 flex justify-center space-x-4">
          <button className="bg-green-500 text-white px-6 py-3 rounded-lg shadow hover:bg-green-600">
            Join a Community
          </button>
          <button className="bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-lg shadow hover:bg-gray-100">
            Create Community
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-8 bg-white">
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="p-6 shadow rounded-lg">
            <UserGroupIcon className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h3 className="font-bold text-xl mb-2">Join Communities</h3>
            <p className="text-gray-600">
              Connect with location-based communities in your area. Create or
              join groups for your neighborhood, campus, or workplace.
            </p>
          </div>
          <div className="p-6 shadow rounded-lg">
            <BoltIcon className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h3 className="font-bold text-xl mb-2">Smart Matching</h3>
            <p className="text-gray-600">
              Report lost or found items privately. Our system automatically
              detects potential matches and sends secure notifications.
            </p>
          </div>
          <div className="p-6 shadow rounded-lg">
            <ShieldCheckIcon className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h3 className="font-bold text-xl mb-2">Privacy First</h3>
            <p className="text-gray-600">
              Your reports stay private. Only you see your posts, and matches
              are handled through secure, anonymous notifications.
            </p>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 px-6 bg-gray-50 text-center">
        <h2 className="text-2xl font-bold mb-10">Simple 3-Step Process</h2>
        <div className="space-y-10 max-w-xl mx-auto">
          <div>
            <div className="bg-green-500 text-white w-10 h-10 flex items-center justify-center rounded-full mx-auto mb-4">
              1
            </div>
            <h3 className="font-bold text-xl">Report an Item</h3>
            <p className="text-gray-600 mt-2">
              Upload photos and details of your lost or found item. All reports
              are kept private and secure.
            </p>
          </div>
          <div>
            <div className="bg-green-500 text-white w-10 h-10 flex items-center justify-center rounded-full mx-auto mb-4">
              2
            </div>
            <h3 className="font-bold text-xl">Get Matched</h3>
            <p className="text-gray-600 mt-2">
              Our intelligent system scans for potential matches and sends you
              instant notifications when found.
            </p>
          </div>
          <div>
            <div className="bg-green-500 text-white w-10 h-10 flex items-center justify-center rounded-full mx-auto mb-4">
              3
            </div>
            <h3 className="font-bold text-xl">Safe Return</h3>
            <p className="text-gray-600 mt-2">
              Coordinate safe meetups and optional rewards through our secure
              platform. Your privacy is always protected.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-green-500 py-16 text-center text-white">
        <h2 className="text-3xl font-bold">Ready to Get Started?</h2>
        <p className="mt-3 text-lg">
          Join thousands of community members already using LocateIQ to reunite
          with their belongings.
        </p>
        <button className="mt-6 bg-white text-green-600 px-6 py-3 rounded-lg shadow hover:bg-gray-100">
          Find My Community
        </button>
      </section>

      {/* Footer */}
      <footer className="flex justify-between items-center px-8 py-6 bg-white shadow-sm">
        <div className="flex items-center space-x-2">
          <MapPinIcon className="w-8 h-8 text-green-500" />
          <h1 className="text-lg font-bold">LocateIQ</h1>
        </div>
        <div className="flex space-x-6 text-gray-600">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Help & Support</a>
        </div>
      </footer>
    </div>
  );
}
