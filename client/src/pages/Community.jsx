import React, { useState } from "react";
import {
  MapPinIcon,
  MagnifyingGlassIcon,
  UserGroupIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";

export default function CommunitiesPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const myCommunities = [
    {
      id: 1,
      name: "Downtown Seattle",
      location: "Seattle, WA",
      description: "Lost & found for downtown Seattle area",
      members: 1247,
      status: "Joined",
    },
    {
      id: 2,
      name: "Capitol Hill Neighborhood",
      location: "Seattle, WA",
      description: "Local community for Capitol Hill residents",
      members: 634,
      status: "Joined",
    },
  ];

  const availableCommunities = [
    {
      id: 3,
      name: "University of Washington",
      location: "Seattle, WA",
      description: "UW campus community for students and staff",
      members: 892,
      status: "Available",
    },
    {
      id: 4,
      name: "Pike Place Market",
      location: "Seattle, WA",
      description: "For items lost or found around Pike Place Market",
      members: 445,
      status: "Available",
    },
  ];

  const CommunityCard = ({ community, showJoinButton = false }) => (
    <div className="bg-white rounded-2xl shadow-lg border border-emerald-100 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-slate-800 mb-2">
            {community.name}
          </h3>
          <div className="flex items-center text-slate-500 mb-3">
            <MapPinIcon className="w-4 h-4 mr-2" />
            <span className="text-sm">{community.location}</span>
          </div>
        </div>
        {!showJoinButton && (
          <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium">
            Joined
          </span>
        )}
      </div>

      <p className="text-slate-600 mb-4 text-sm leading-relaxed">
        {community.description}
      </p>

      <div className="flex justify-between items-center">
        <div className="flex items-center text-slate-500">
          <UserGroupIcon className="w-4 h-4 mr-2" />
          <span className="text-sm">
            {community.members.toLocaleString()} members
          </span>
        </div>

        {showJoinButton ? (
          <button className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-4 py-2 rounded-lg hover:from-emerald-600 hover:to-teal-700 transition-all duration-200 font-medium text-sm">
            Join Community
          </button>
        ) : (
          <button className="bg-white border border-slate-300 text-slate-700 px-4 py-2 rounded-lg hover:bg-slate-50 transition-all duration-200 font-medium text-sm">
            View Reports
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-emerald-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl shadow-lg">
                <MapPinIcon className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-700 to-teal-700 bg-clip-text text-transparent">
                LocateIQ
              </h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a
                href="#"
                className="text-slate-700 hover:text-emerald-700 transition-colors font-medium"
              >
                Dashboard
              </a>
              <a
                href="#"
                className="text-slate-700 hover:text-emerald-700 transition-colors font-medium"
              >
                Profile
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-slate-800 mb-4">
            Communities
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl">
            Join location-based communities to connect with people in your area
          </p>
        </div>

        {/* Search and Create */}
        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          <div className="relative flex-1">
            <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search communities by name or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white shadow-sm"
            />
          </div>
          <button className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl hover:from-emerald-600 hover:to-teal-700 transition-all duration-200 font-medium flex items-center space-x-2 whitespace-nowrap">
            <PlusIcon className="w-5 h-5" />
            <span>Create Community</span>
          </button>
        </div>

        {/* My Communities Section */}
        <section className="mb-12">
          <h3 className="text-2xl font-bold text-slate-800 mb-6">
            My Communities
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {myCommunities.map((community) => (
              <CommunityCard key={community.id} community={community} />
            ))}
          </div>
        </section>

        {/* Available Communities Section */}
        <section>
          <h3 className="text-2xl font-bold text-slate-800 mb-6">
            Available Communities
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {availableCommunities.map((community) => (
              <CommunityCard
                key={community.id}
                community={community}
                showJoinButton={true}
              />
            ))}
          </div>
        </section>

        {/* Mobile Navigation */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-4 py-2">
          <div className="flex justify-around">
            <button className="flex flex-col items-center py-2 text-slate-600 hover:text-emerald-700">
              <MapPinIcon className="w-6 h-6 mb-1" />
              <span className="text-xs">Communities</span>
            </button>
            <button className="flex flex-col items-center py-2 text-slate-600 hover:text-emerald-700">
              <UserGroupIcon className="w-6 h-6 mb-1" />
              <span className="text-xs">Dashboard</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
