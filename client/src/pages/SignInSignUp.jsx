import React, { useState } from "react";
import { MapPinIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

export default function SignInSignUp() {
  const [activeTab, setActiveTab] = useState("signin");
  const [signInForm, setSignInForm] = useState({ email: "", password: "" });
  const [signUpForm, setSignUpForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Sign In
  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!signInForm.email || !signInForm.password) {
      return setError("Please enter both email and password.");
    }

    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signInForm),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to sign in");
      setSuccess("Signed in successfully!");
      // redirect
      window.location.href = "/dashboard";
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (
      !signUpForm.name ||
      !signUpForm.email ||
      !signUpForm.password ||
      !signUpForm.confirmPassword
    ) {
      return setError("Please fill in all fields.");
    } else if (signUpForm.password !== signUpForm.confirmPassword) {
      return setError("Passwords do not match.");
    }

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signUpForm),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to sign up");
      setSuccess("Account created! Please sign in.");
      setActiveTab("signin");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogle = () => {
    window.location.href = "/auth/google";
  };

  const handleGitHub = () => {
    window.location.href = "/auth/github";
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gradient-to-br from-emerald-50 to-teal-50">
      {/* Left */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex-col justify-center items-center p-8">
        <MapPinIcon className="w-16 h-16 mb-4" />
        <h1 className="text-3xl lg:text-4xl font-bold">LocateIQ</h1>
        <p className="mt-3 text-base lg:text-lg text-emerald-100 text-center max-w-sm">
          Smart location insights at your fingertips.
        </p>
      </div>

      {/* Right */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8">
        <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6 sm:p-8">
          {/* Tabs */}
          <div className="flex mb-6 rounded-xl overflow-hidden border border-slate-200">
            {["signin", "signup"].map((tab) => (
              <button
                key={tab}
                className={`flex-1 px-4 py-2 font-semibold transition-colors ${
                  activeTab === tab
                    ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white"
                    : "bg-white text-slate-500 hover:text-emerald-700"
                }`}
                onClick={() => {
                  setActiveTab(tab);
                  setError("");
                  setSuccess("");
                }}
              >
                {tab === "signin" ? "Sign In" : "Sign Up"}
              </button>
            ))}
          </div>

          {/* Alerts */}
          {(error || success) && (
            <div
              className={`mb-4 px-4 py-2 rounded-lg text-sm font-medium shadow-inner ${
                error
                  ? "bg-red-100 text-red-700 border border-red-200"
                  : "bg-emerald-100 text-emerald-700 border border-emerald-200"
              }`}
            >
              {error || success}
            </div>
          )}

          {/* Forms */}
          {activeTab === "signin" ? (
            <form className="flex flex-col gap-5" onSubmit={handleSignIn}>
              {/* Email */}
              <div className="relative">
                <input
                  type="email"
                  className="peer w-full px-4 pt-5 pb-2 rounded-xl border border-emerald-200 focus:ring-2 focus:ring-emerald-200 outline-none"
                  placeholder=" "
                  value={signInForm.email}
                  onChange={(e) =>
                    setSignInForm({ ...signInForm, email: e.target.value })
                  }
                  required
                />
                <label className="absolute left-4 top-2 text-slate-500 text-sm peer-placeholder-shown:top-4 peer-placeholder-shown:text-base">
                  Email Address
                </label>
              </div>

              {/* Password */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="peer w-full px-4 pt-5 pb-2 rounded-xl border border-emerald-200 focus:ring-2 focus:ring-emerald-200 outline-none"
                  placeholder=" "
                  value={signInForm.password}
                  onChange={(e) =>
                    setSignInForm({ ...signInForm, password: e.target.value })
                  }
                  required
                />
                <label className="absolute left-4 top-2 text-slate-500 text-sm peer-placeholder-shown:top-4 peer-placeholder-shown:text-base">
                  Password
                </label>
                <button
                  type="button"
                  className="absolute right-4 top-4 text-slate-400 hover:text-emerald-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="w-5 h-5" />
                  ) : (
                    <EyeIcon className="w-5 h-5" />
                  )}
                </button>
              </div>

              <button
                type="submit"
                className="mt-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-3 rounded-xl font-semibold shadow"
              >
                Sign In
              </button>

              {/* Social */}
              <div className="flex items-center my-3">
                <div className="flex-grow border-t border-slate-200"></div>
                <span className="mx-2 text-slate-400 text-sm">or</span>
                <div className="flex-grow border-t border-slate-200"></div>
              </div>
              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  onClick={handleGoogle}
                  className="flex items-center justify-center gap-3 border border-slate-200 rounded-xl py-2 hover:bg-slate-50"
                >
                  <img
                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                    alt="Google"
                    className="w-5 h-5"
                  />
                  <span className="font-medium text-slate-600">
                    Continue with Google
                  </span>
                </button>
                <button
                  type="button"
                  onClick={handleGitHub}
                  className="flex items-center justify-center gap-3 border border-slate-200 rounded-xl py-2 hover:bg-slate-50"
                >
                  <img
                    src="https://www.svgrepo.com/show/475654/github-color.svg"
                    alt="GitHub"
                    className="w-5 h-5"
                  />
                  <span className="font-medium text-slate-600">
                    Continue with GitHub
                  </span>
                </button>
              </div>
            </form>
          ) : (
            <form className="flex flex-col gap-5" onSubmit={handleSignUp}>
              {["name", "email", "password", "confirmPassword"].map((key) => (
                <div key={key} className="relative">
                  <input
                    type={
                      key.includes("password")
                        ? showPassword
                          ? "text"
                          : "password"
                        : key === "email"
                        ? "email"
                        : "text"
                    }
                    className="peer w-full px-4 pt-5 pb-2 rounded-xl border border-teal-200 focus:ring-2 focus:ring-teal-200 outline-none"
                    placeholder=" "
                    value={signUpForm[key]}
                    onChange={(e) =>
                      setSignUpForm({ ...signUpForm, [key]: e.target.value })
                    }
                    required
                  />
                  <label className="absolute left-4 top-2 text-slate-500 text-sm peer-placeholder-shown:top-4 peer-placeholder-shown:text-base">
                    {key === "name"
                      ? "Full Name"
                      : key === "email"
                      ? "Email Address"
                      : key === "password"
                      ? "Password"
                      : "Confirm Password"}
                  </label>
                </div>
              ))}
              <button
                type="submit"
                className="mt-2 bg-gradient-to-r from-teal-500 to-cyan-600 text-white py-3 rounded-xl font-semibold shadow"
              >
                Sign Up
              </button>

              {/* Social */}
              <div className="flex items-center my-3">
                <div className="flex-grow border-t border-slate-200"></div>
                <span className="mx-2 text-slate-400 text-sm">or</span>
                <div className="flex-grow border-t border-slate-200"></div>
              </div>
              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  onClick={handleGoogle}
                  className="flex items-center justify-center gap-3 border border-slate-200 rounded-xl py-2 hover:bg-slate-50"
                >
                  <img
                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                    alt="Google"
                    className="w-5 h-5"
                  />
                  <span className="font-medium text-slate-600">
                    Sign up with Google
                  </span>
                </button>
                <button
                  type="button"
                  onClick={handleGitHub}
                  className="flex items-center justify-center gap-3 border border-slate-200 rounded-xl py-2 hover:bg-slate-50"
                >
                  <img
                    src="https://www.svgrepo.com/show/475654/github-color.svg"
                    alt="GitHub"
                    className="w-5 h-5"
                  />
                  <span className="font-medium text-slate-600">
                    Sign up with GitHub
                  </span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
