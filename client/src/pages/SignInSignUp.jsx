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

  // Demo handlers (replace with API calls)
  const handleSignIn = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!signInForm.email || !signInForm.password) {
      setError("Please enter both email and password.");
    } else {
      setSuccess("Signed in successfully! (Demo)");
    }
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (
      !signUpForm.name ||
      !signUpForm.email ||
      !signUpForm.password ||
      !signUpForm.confirmPassword
    ) {
      setError("Please fill in all fields.");
    } else if (signUpForm.password !== signUpForm.confirmPassword) {
      setError("Passwords do not match.");
    } else {
      setSuccess("Account created! (Demo)");
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gradient-to-br from-emerald-50 to-teal-50">
      {/* Left Brand Section */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex-col justify-center items-center p-12">
        <MapPinIcon className="w-16 h-16 mb-6" />
        <h1 className="text-4xl font-bold">LocateIQ</h1>
        <p className="mt-4 text-lg text-emerald-100 text-center max-w-sm">
          Smart location insights at your fingertips. Sign in or create an
          account to continue.
        </p>
      </div>

      {/* Right Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8">
          {/* Tabs */}
          <div className="flex mb-8 rounded-xl overflow-hidden border border-slate-200">
            {["signin", "signup"].map((tab) => (
              <button
                key={tab}
                className={`flex-1 px-6 py-2 font-semibold transition-colors ${
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

          {/* Sign In Form */}
          {activeTab === "signin" && (
            <form className="flex flex-col gap-5" onSubmit={handleSignIn}>
              {/* Email */}
              <div className="relative">
                <input
                  type="email"
                  className="peer w-full px-4 pt-5 pb-2 rounded-xl border border-emerald-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition"
                  placeholder=" "
                  value={signInForm.email}
                  onChange={(e) =>
                    setSignInForm({ ...signInForm, email: e.target.value })
                  }
                  required
                />
                <label className="absolute left-4 top-2 text-slate-500 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-emerald-600">
                  Email Address
                </label>
              </div>

              {/* Password */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="peer w-full px-4 pt-5 pb-2 rounded-xl border border-emerald-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition"
                  placeholder=" "
                  value={signInForm.password}
                  onChange={(e) =>
                    setSignInForm({ ...signInForm, password: e.target.value })
                  }
                  required
                />
                <label className="absolute left-4 top-2 text-slate-500 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-emerald-600">
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
                className="mt-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-3 rounded-xl font-semibold shadow hover:from-emerald-600 hover:to-teal-700 transition"
              >
                Sign In
              </button>

              <div className="text-right mt-1">
                <button
                  type="button"
                  className="text-emerald-700 hover:underline text-sm"
                  onClick={() => alert("Forgot Password feature coming soon!")}
                >
                  Forgot password?
                </button>
              </div>

              {/* Social Login */}
              <div className="flex items-center my-4">
                <div className="flex-grow border-t border-slate-200"></div>
                <span className="mx-3 text-slate-400 text-sm">or</span>
                <div className="flex-grow border-t border-slate-200"></div>
              </div>
              <div className="flex flex-col gap-3">
                <button
                  type="button"
                  className="flex items-center justify-center gap-3 border border-slate-200 rounded-xl py-2.5 hover:bg-slate-50 transition"
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
                  className="flex items-center justify-center gap-3 border border-slate-200 rounded-xl py-2.5 hover:bg-slate-50 transition"
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
          )}

          {/* Sign Up Form */}
          {activeTab === "signup" && (
            <form className="flex flex-col gap-5" onSubmit={handleSignUp}>
              {[
                { key: "name", label: "Full Name", type: "text" },
                { key: "email", label: "Email Address", type: "email" },
                {
                  key: "password",
                  label: "Password",
                  type: showPassword ? "text" : "password",
                },
                {
                  key: "confirmPassword",
                  label: "Confirm Password",
                  type: showPassword ? "text" : "password",
                },
              ].map((field) => (
                <div key={field.key} className="relative">
                  <input
                    type={field.type}
                    className="peer w-full px-4 pt-5 pb-2 rounded-xl border border-teal-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition"
                    placeholder=" "
                    value={signUpForm[field.key]}
                    onChange={(e) =>
                      setSignUpForm({
                        ...signUpForm,
                        [field.key]: e.target.value,
                      })
                    }
                    required
                  />
                  <label className="absolute left-4 top-2 text-slate-500 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-teal-600">
                    {field.label}
                  </label>
                </div>
              ))}

              <button
                type="submit"
                className="mt-2 bg-gradient-to-r from-teal-500 to-cyan-600 text-white py-3 rounded-xl font-semibold shadow hover:from-teal-600 hover:to-cyan-700 transition"
              >
                Sign Up
              </button>

              {/* Social Sign Up */}
              <div className="flex items-center my-4">
                <div className="flex-grow border-t border-slate-200"></div>
                <span className="mx-3 text-slate-400 text-sm">or</span>
                <div className="flex-grow border-t border-slate-200"></div>
              </div>
              <div className="flex flex-col gap-3">
                <button
                  type="button"
                  className="flex items-center justify-center gap-3 border border-slate-200 rounded-xl py-2.5 hover:bg-slate-50 transition"
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
                  className="flex items-center justify-center gap-3 border border-slate-200 rounded-xl py-2.5 hover:bg-slate-50 transition"
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
