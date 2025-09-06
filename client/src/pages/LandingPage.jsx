// import React from "react";
// import {
//   UserGroupIcon,
//   BoltIcon,
//   ShieldCheckIcon,
//   MapPinIcon,
// } from "@heroicons/react/24/solid";

// export default function LocateIQLanding() {
//   return (
//     <div className="min-h-screen flex flex-col">
//       {/* Navbar */}
//       <header className="flex justify-between items-center px-8 py-4 shadow-lg bg-gradient-to-r from-emerald-50 to-teal-50 backdrop-blur-sm">
//         <div className="flex items-center space-x-3">
//           <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl shadow-lg">
//             <MapPinIcon className="w-6 h-6 text-white" />
//           </div>
//           <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-700 to-teal-700 bg-clip-text text-transparent">
//             LocateIQ
//           </h1>
//         </div>
//         <div className="flex items-center space-x-4">
//           <button className="text-slate-700 hover:text-emerald-700 transition-colors font-medium">
//             Sign In
//           </button>
//           <button className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-2.5 rounded-xl shadow-lg hover:shadow-xl hover:from-emerald-600 hover:to-teal-700 transition-all duration-200 font-medium">
//             Get Started
//           </button>
//         </div>
//       </header>

//       {/* Hero Section */}
//       <section className="text-center bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 py-24 px-6 relative overflow-hidden">
//         {/* Background Pattern */}
//         <div className="absolute inset-0 opacity-5">
//           <div className="absolute top-20 left-20 w-72 h-72 bg-emerald-500 rounded-full filter blur-3xl"></div>
//           <div className="absolute bottom-20 right-20 w-96 h-96 bg-teal-500 rounded-full filter blur-3xl"></div>
//         </div>

//         <div className="relative z-10">
//           <h2 className="text-5xl font-bold text-slate-800 leading-tight">
//             Find What's{" "}
//             <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
//               Lost
//             </span>
//             ,<br />
//             Return What's{" "}
//             <span className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
//               Found
//             </span>
//           </h2>
//           <p className="mt-6 text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
//             A secure, privacy-first platform connecting communities to reunite
//             people with their belongings. Join location-based groups and get
//             instant match notifications when someone reports your lost item.
//           </p>
//           <div className="mt-10 flex justify-center space-x-6">
//             <button className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-8 py-4 rounded-xl shadow-xl hover:shadow-2xl hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 font-semibold text-lg">
//               Join a Community
//             </button>
//             <button className="bg-white/80 backdrop-blur-sm border-2 border-emerald-200 text-emerald-800 px-8 py-4 rounded-xl shadow-xl hover:shadow-2xl hover:bg-emerald-50 hover:border-emerald-300 transition-all duration-300 font-semibold text-lg">
//               Create Community
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="py-20 px-8 bg-gradient-to-b from-white to-emerald-50/30">
//         <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
//           <div className="p-8 bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-emerald-100 group hover:-translate-y-1">
//             <div className="p-4 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl w-fit mx-auto mb-6 group-hover:from-emerald-200 group-hover:to-teal-200 transition-all duration-300">
//               <UserGroupIcon className="w-12 h-12 text-emerald-600" />
//             </div>
//             <h3 className="font-bold text-2xl mb-4 text-slate-800">
//               Join Communities
//             </h3>
//             <p className="text-slate-600 leading-relaxed">
//               Connect with location-based communities in your area. Create or
//               join groups for your neighborhood, campus, or workplace.
//             </p>
//           </div>
//           <div className="p-8 bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-teal-100 group hover:-translate-y-1">
//             <div className="p-4 bg-gradient-to-br from-teal-100 to-cyan-100 rounded-2xl w-fit mx-auto mb-6 group-hover:from-teal-200 group-hover:to-cyan-200 transition-all duration-300">
//               <BoltIcon className="w-12 h-12 text-teal-600" />
//             </div>
//             <h3 className="font-bold text-2xl mb-4 text-slate-800">
//               Smart Matching
//             </h3>
//             <p className="text-slate-600 leading-relaxed">
//               Report lost or found items privately. Our system automatically
//               detects potential matches and sends secure notifications.
//             </p>
//           </div>
//           <div className="p-8 bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-cyan-100 group hover:-translate-y-1">
//             <div className="p-4 bg-gradient-to-br from-cyan-100 to-emerald-100 rounded-2xl w-fit mx-auto mb-6 group-hover:from-cyan-200 group-hover:to-emerald-200 transition-all duration-300">
//               <ShieldCheckIcon className="w-12 h-12 text-cyan-600" />
//             </div>
//             <h3 className="font-bold text-2xl mb-4 text-slate-800">
//               Privacy First
//             </h3>
//             <p className="text-slate-600 leading-relaxed">
//               Your reports stay private. Only you see your posts, and matches
//               are handled through secure, anonymous notifications.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* Process Section */}
//       <section className="py-20 px-6 bg-gradient-to-br from-emerald-50 to-teal-50 text-center relative overflow-hidden">
//         {/* Background Elements */}
//         <div className="absolute inset-0 opacity-10">
//           <div className="absolute top-10 left-10 w-64 h-64 bg-teal-400 rounded-full filter blur-3xl"></div>
//           <div className="absolute bottom-10 right-10 w-80 h-80 bg-emerald-400 rounded-full filter blur-3xl"></div>
//         </div>

//         <div className="relative z-10">
//           <h2 className="text-4xl font-bold mb-16 bg-gradient-to-r from-emerald-700 to-teal-700 bg-clip-text text-transparent">
//             Simple 3-Step Process
//           </h2>
//           <div className="space-y-16 max-w-2xl mx-auto">
//             <div className="relative">
//               <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white w-16 h-16 flex items-center justify-center rounded-full mx-auto mb-6 shadow-xl text-xl font-bold">
//                 1
//               </div>
//               <h3 className="font-bold text-2xl text-slate-800 mb-3">
//                 Report an Item
//               </h3>
//               <p className="text-slate-600 text-lg leading-relaxed">
//                 Upload photos and details of your lost or found item. All
//                 reports are kept private and secure behind our encryption.
//               </p>
//             </div>
//             <div className="relative">
//               <div className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white w-16 h-16 flex items-center justify-center rounded-full mx-auto mb-6 shadow-xl text-xl font-bold">
//                 2
//               </div>
//               <h3 className="font-bold text-2xl text-slate-800 mb-3">
//                 Get Matched
//               </h3>
//               <p className="text-slate-600 text-lg leading-relaxed">
//                 Our intelligent system scans for potential matches and sends you
//                 instant notifications when a match is found in your area.
//               </p>
//             </div>
//             <div className="relative">
//               <div className="bg-gradient-to-r from-cyan-500 to-emerald-600 text-white w-16 h-16 flex items-center justify-center rounded-full mx-auto mb-6 shadow-xl text-xl font-bold">
//                 3
//               </div>
//               <h3 className="font-bold text-2xl text-slate-800 mb-3">
//                 Safe Return
//               </h3>
//               <p className="text-slate-600 text-lg leading-relaxed">
//                 Coordinate safe meetups and optional rewards through our secure
//                 platform. Your privacy and safety are always protected.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 py-20 text-center text-white relative overflow-hidden">
//         {/* Background Pattern */}
//         <div className="absolute inset-0 opacity-20">
//           <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_80%,_rgba(255,255,255,0.2)_0%,_transparent_50%)]"></div>
//           <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_20%,_rgba(255,255,255,0.2)_0%,_transparent_50%)]"></div>
//         </div>

//         <div className="relative z-10">
//           <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
//           <p className="mt-4 text-xl opacity-90 max-w-2xl mx-auto leading-relaxed">
//             Join thousands of community members already using LocateIQ to
//             reunite with their belongings safely and securely.
//           </p>
//           <button className="mt-8 bg-white text-emerald-700 px-8 py-4 rounded-xl shadow-xl hover:shadow-2xl hover:bg-emerald-50 transition-all duration-300 font-semibold text-lg">
//             Find My Community
//           </button>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="flex justify-between items-center px-8 py-8 bg-gradient-to-r from-slate-50 to-emerald-50 shadow-inner">
//         <div className="flex items-center space-x-3">
//           <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl shadow-md">
//             <MapPinIcon className="w-6 h-6 text-white" />
//           </div>
//           <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-700 to-teal-700 bg-clip-text text-transparent">
//             LocateIQ
//           </h1>
//         </div>
//         <div className="flex space-x-8 text-slate-600">
//           <a
//             href="#"
//             className="hover:text-emerald-700 transition-colors font-medium"
//           >
//             Privacy Policy
//           </a>
//           <a
//             href="#"
//             className="hover:text-emerald-700 transition-colors font-medium"
//           >
//             Terms of Service
//           </a>
//           <a
//             href="#"
//             className="hover:text-emerald-700 transition-colors font-medium"
//           >
//             Help & Support
//           </a>
//         </div>
//       </footer>
//     </div>
//   );
// }
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  UserGroupIcon,
  BoltIcon,
  ShieldCheckIcon,
  MapPinIcon,
} from "@heroicons/react/24/solid";

export default function LocateIQLanding() {
  const navigate = useNavigate();

  // Navigation handler for all relevant buttons
  const goToAuth = () => navigate("/auth");

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <header className="flex justify-between items-center px-8 py-4 shadow-lg bg-gradient-to-r from-emerald-50 to-teal-50 backdrop-blur-sm">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl shadow-lg">
            <MapPinIcon className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-700 to-teal-700 bg-clip-text text-transparent">
            LocateIQ
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          <button
            className="text-slate-700 hover:text-emerald-700 transition-colors font-medium"
            onClick={goToAuth}
          >
            Sign In
          </button>
          <button
            className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-2.5 rounded-xl shadow-lg hover:shadow-xl hover:from-emerald-600 hover:to-teal-700 transition-all duration-200 font-medium"
            onClick={goToAuth}
          >
            Get Started
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="text-center bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 py-24 px-6 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-72 h-72 bg-emerald-500 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-teal-500 rounded-full filter blur-3xl"></div>
        </div>

        <div className="relative z-10">
          <h2 className="text-5xl font-bold text-slate-800 leading-tight">
            Find What's{" "}
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Lost
            </span>
            ,<br />
            Return What's{" "}
            <span className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
              Found
            </span>
          </h2>
          <p className="mt-6 text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            A secure, privacy-first platform connecting communities to reunite
            people with their belongings. Join location-based groups and get
            instant match notifications when someone reports your lost item.
          </p>
          <div className="mt-10 flex justify-center space-x-6">
            <button
              className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-8 py-4 rounded-xl shadow-xl hover:shadow-2xl hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 font-semibold text-lg"
              onClick={goToAuth}
            >
              Join a Community
            </button>
            <button
              className="bg-white/80 backdrop-blur-sm border-2 border-emerald-200 text-emerald-800 px-8 py-4 rounded-xl shadow-xl hover:shadow-2xl hover:bg-emerald-50 hover:border-emerald-300 transition-all duration-300 font-semibold text-lg"
              onClick={goToAuth}
            >
              Create Community
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-8 bg-gradient-to-b from-white to-emerald-50/30">
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          <div className="p-8 bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-emerald-100 group hover:-translate-y-1">
            <div className="p-4 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl w-fit mx-auto mb-6 group-hover:from-emerald-200 group-hover:to-teal-200 transition-all duration-300">
              <UserGroupIcon className="w-12 h-12 text-emerald-600" />
            </div>
            <h3 className="font-bold text-2xl mb-4 text-slate-800">
              Join Communities
            </h3>
            <p className="text-slate-600 leading-relaxed">
              Connect with location-based communities in your area. Create or
              join groups for your neighborhood, campus, or workplace.
            </p>
          </div>
          <div className="p-8 bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-teal-100 group hover:-translate-y-1">
            <div className="p-4 bg-gradient-to-br from-teal-100 to-cyan-100 rounded-2xl w-fit mx-auto mb-6 group-hover:from-teal-200 group-hover:to-cyan-200 transition-all duration-300">
              <BoltIcon className="w-12 h-12 text-teal-600" />
            </div>
            <h3 className="font-bold text-2xl mb-4 text-slate-800">
              Smart Matching
            </h3>
            <p className="text-slate-600 leading-relaxed">
              Report lost or found items privately. Our system automatically
              detects potential matches and sends secure notifications.
            </p>
          </div>
          <div className="p-8 bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-cyan-100 group hover:-translate-y-1">
            <div className="p-4 bg-gradient-to-br from-cyan-100 to-emerald-100 rounded-2xl w-fit mx-auto mb-6 group-hover:from-cyan-200 group-hover:to-emerald-200 transition-all duration-300">
              <ShieldCheckIcon className="w-12 h-12 text-cyan-600" />
            </div>
            <h3 className="font-bold text-2xl mb-4 text-slate-800">
              Privacy First
            </h3>
            <p className="text-slate-600 leading-relaxed">
              Your reports stay private. Only you see your posts, and matches
              are handled through secure, anonymous notifications.
            </p>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-emerald-50 to-teal-50 text-center relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-teal-400 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-emerald-400 rounded-full filter blur-3xl"></div>
        </div>

        <div className="relative z-10">
          <h2 className="text-4xl font-bold mb-16 bg-gradient-to-r from-emerald-700 to-teal-700 bg-clip-text text-transparent">
            Simple 3-Step Process
          </h2>
          <div className="space-y-16 max-w-2xl mx-auto">
            <div className="relative">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white w-16 h-16 flex items-center justify-center rounded-full mx-auto mb-6 shadow-xl text-xl font-bold">
                1
              </div>
              <h3 className="font-bold text-2xl text-slate-800 mb-3">
                Report an Item
              </h3>
              <p className="text-slate-600 text-lg leading-relaxed">
                Upload photos and details of your lost or found item. All
                reports are kept private and secure behind our encryption.
              </p>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white w-16 h-16 flex items-center justify-center rounded-full mx-auto mb-6 shadow-xl text-xl font-bold">
                2
              </div>
              <h3 className="font-bold text-2xl text-slate-800 mb-3">
                Get Matched
              </h3>
              <p className="text-slate-600 text-lg leading-relaxed">
                Our intelligent system scans for potential matches and sends you
                instant notifications when a match is found in your area.
              </p>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-r from-cyan-500 to-emerald-600 text-white w-16 h-16 flex items-center justify-center rounded-full mx-auto mb-6 shadow-xl text-xl font-bold">
                3
              </div>
              <h3 className="font-bold text-2xl text-slate-800 mb-3">
                Safe Return
              </h3>
              <p className="text-slate-600 text-lg leading-relaxed">
                Coordinate safe meetups and optional rewards through our secure
                platform. Your privacy and safety are always protected.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 py-20 text-center text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_80%,_rgba(255,255,255,0.2)_0%,_transparent_50%)]"></div>
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_20%,_rgba(255,255,255,0.2)_0%,_transparent_50%)]"></div>
        </div>

        <div className="relative z-10">
          <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="mt-4 text-xl opacity-90 max-w-2xl mx-auto leading-relaxed">
            Join thousands of community members already using LocateIQ to
            reunite with their belongings safely and securely.
          </p>
          <button
            className="mt-8 bg-white text-emerald-700 px-8 py-4 rounded-xl shadow-xl hover:shadow-2xl hover:bg-emerald-50 transition-all duration-300 font-semibold text-lg"
            onClick={goToAuth}
          >
            Find My Community
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="flex justify-between items-center px-8 py-8 bg-gradient-to-r from-slate-50 to-emerald-50 shadow-inner">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl shadow-md">
            <MapPinIcon className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-700 to-teal-700 bg-clip-text text-transparent">
            LocateIQ
          </h1>
        </div>
        <div className="flex space-x-8 text-slate-600">
          <a
            href="#"
            className="hover:text-emerald-700 transition-colors font-medium"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="hover:text-emerald-700 transition-colors font-medium"
          >
            Terms of Service
          </a>
          <a
            href="#"
            className="hover:text-emerald-700 transition-colors font-medium"
          >
            Help & Support
          </a>
        </div>
      </footer>
    </div>
  );
}
