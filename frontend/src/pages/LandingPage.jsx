// client/src/pages/LandingPage.jsx
import React from "react";
import ThemeToggle from "../components/ThemeToggle";
import { motion } from "framer-motion";

export default function LandingPage() {
  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <h1 className="text-5xl font-bold mb-6 text-center">
        Welcome to LocateIQ
      </h1>
      <p className="text-lg text-center max-w-xl mb-6">
        Private, secure, AI-powered lost & found platform for your community.
      </p>
      <ThemeToggle />
    </motion.div>
  );
}
