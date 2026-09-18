import React, { useState } from "react";
import {
  Camera,
  Shield,
  User,
  Mail,
  Phone,
  Save,
  Lock,
  CheckCircle2,
} from "lucide-react";

export default function MyProfile() {
  // Personal Info Form State
  const [personalInfo, setPersonalInfo] = useState({
    fullName: "Alex Sterling",
    email: "admin@solara.com",
    phone: "+1 (555) 234-5678",
  });
  const [infoSavedNotice, setInfoSavedNotice] = useState(false);

  // Password Form State
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordNotice, setPasswordNotice] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const handleInfoSubmit = (e) => {
    e.preventDefault();
    setInfoSavedNotice(true);
    setTimeout(() => setInfoSavedNotice(false), 3000);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    setPasswordError("");
    if (!passwordData.currentPassword) {
      setPasswordError("Please enter your current password.");
      return;
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError("New passwords do not match.");
      return;
    }
    if (passwordData.newPassword.length < 6) {
      setPasswordError("New password must be at least 6 characters.");
      return;
    }

    setPasswordNotice(true);
    setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    setTimeout(() => setPasswordNotice(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
          My Profile
        </h1>
        <p className="text-sm sm:text-base text-gray-500 dark:text-[#B9C4BB] mt-1">
          View and update your personal account information.
        </p>
      </div>

      {/* Grid Layout (1/3 + 2/3 on desktop) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* LEFT COLUMN: Avatar Card */}
        <div className="bg-white dark:bg-[#17221B] border border-gray-200 dark:border-[#293227] rounded-2xl p-6 shadow-sm flex flex-col items-center text-center">
          {/* Large Avatar with Camera Icon Overlay */}
          <div className="relative mb-4">
            <div className="w-24 h-24 rounded-full bg-[#1F5C3E] text-white text-2xl font-bold flex items-center justify-center shadow-md border-2 border-white dark:border-[#293227]">
              AS
            </div>
            <button
              type="button"
              title="Upload photo"
              className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 flex items-center justify-center shadow-md hover:scale-105 transition-transform cursor-pointer border-2 border-white dark:border-[#17221B]"
            >
              <Camera className="w-4 h-4" />
            </button>
          </div>

          {/* User Details */}
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            {personalInfo.fullName}
          </h2>
          <p className="text-xs text-gray-500 dark:text-[#B9C4BB] mt-0.5 mb-3">
            {personalInfo.email}
          </p>

          {/* Role Pill Badge */}
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800/50">
            <Shield className="w-3.5 h-3.5" />
            Admin
          </span>
        </div>

        {/* RIGHT COLUMN: Stacked Cards (Personal Info & Change Password) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Card 1: Personal Information */}
          <div className="bg-white dark:bg-[#17221B] border border-gray-200 dark:border-[#293227] rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-5 border-b border-gray-100 dark:border-[#293227] pb-4">
              <div className="w-9 h-9 rounded-full bg-[#EFF3EC] dark:bg-[#1C2A21] text-[#1F5C3E] dark:text-[#4ADE80] flex items-center justify-center shrink-0">
                <User className="w-4.5 h-4.5" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                  Personal Information
                </h3>
                <p className="text-xs text-gray-500 dark:text-[#B9C4BB]">
                  Update your display name and contact details.
                </p>
              </div>
            </div>

            <form onSubmit={handleInfoSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-[#B9C4BB] mb-1.5">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none" />
                    <input
                      type="text"
                      required
                      value={personalInfo.fullName}
                      onChange={(e) =>
                        setPersonalInfo({ ...personalInfo, fullName: e.target.value })
                      }
                      className="w-full pl-10 pr-3.5 py-2.5 bg-white dark:bg-[#0E1712] border border-gray-200 dark:border-[#293227] rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#1F5C3E]/30 focus:border-[#1F5C3E] transition-colors"
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-[#B9C4BB] mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none" />
                    <input
                      type="email"
                      required
                      value={personalInfo.email}
                      onChange={(e) =>
                        setPersonalInfo({ ...personalInfo, email: e.target.value })
                      }
                      className="w-full pl-10 pr-3.5 py-2.5 bg-white dark:bg-[#0E1712] border border-gray-200 dark:border-[#293227] rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#1F5C3E]/30 focus:border-[#1F5C3E] transition-colors"
                    />
                  </div>
                </div>

                {/* Phone Number (Spans 2 columns) */}
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-gray-700 dark:text-[#B9C4BB] mb-1.5">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none" />
                    <input
                      type="tel"
                      value={personalInfo.phone}
                      onChange={(e) =>
                        setPersonalInfo({ ...personalInfo, phone: e.target.value })
                      }
                      className="w-full pl-10 pr-3.5 py-2.5 bg-white dark:bg-[#0E1712] border border-gray-200 dark:border-[#293227] rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#1F5C3E]/30 focus:border-[#1F5C3E] transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Action */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 bg-[#1F5C3E] hover:bg-[#184931] text-white text-sm font-medium rounded-xl px-4 py-2.5 transition-colors shadow-sm cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </button>
                {infoSavedNotice && (
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="w-4 h-4" />
                    Personal details updated!
                  </span>
                )}
              </div>
            </form>
          </div>

          {/* Card 2: Change Password */}
          <div className="bg-white dark:bg-[#17221B] border border-gray-200 dark:border-[#293227] rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-5 border-b border-gray-100 dark:border-[#293227] pb-4">
              <div className="w-9 h-9 rounded-full bg-[#EFF3EC] dark:bg-[#1C2A21] text-[#1F5C3E] dark:text-[#4ADE80] flex items-center justify-center shrink-0">
                <Lock className="w-4.5 h-4.5" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                  Change Password
                </h3>
                <p className="text-xs text-gray-500 dark:text-[#B9C4BB]">
                  Ensure your account is using a long, random password to stay secure.
                </p>
              </div>
            </div>

            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              {passwordError && (
                <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 text-xs text-red-600 dark:text-red-400">
                  {passwordError}
                </div>
              )}

              {/* Current Password (Full width) */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-[#B9C4BB] mb-1.5">
                  Current Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={passwordData.currentPassword}
                  onChange={(e) =>
                    setPasswordData({ ...passwordData, currentPassword: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 bg-white dark:bg-[#0E1712] border border-gray-200 dark:border-[#293227] rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#1F5C3E]/30 focus:border-[#1F5C3E] transition-colors"
                />
              </div>

              {/* New Password & Confirm Password (2-column grid) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-[#B9C4BB] mb-1.5">
                    New Password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={passwordData.newPassword}
                    onChange={(e) =>
                      setPasswordData({ ...passwordData, newPassword: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 bg-white dark:bg-[#0E1712] border border-gray-200 dark:border-[#293227] rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#1F5C3E]/30 focus:border-[#1F5C3E] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-[#B9C4BB] mb-1.5">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={passwordData.confirmPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        confirmPassword: e.target.value,
                      })
                    }
                    className="w-full px-3.5 py-2.5 bg-white dark:bg-[#0E1712] border border-gray-200 dark:border-[#293227] rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#1F5C3E]/30 focus:border-[#1F5C3E] transition-colors"
                  />
                </div>
              </div>

              {/* Secondary Outlined Action Button */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="submit"
                  className="border border-[#1F5C3E] text-[#1F5C3E] dark:border-[#4ADE80] dark:text-[#4ADE80] hover:bg-[#1F5C3E]/10 text-sm font-medium rounded-xl px-4 py-2.5 transition-colors cursor-pointer"
                >
                  Update Password
                </button>
                {passwordNotice && (
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="w-4 h-4" />
                    Password updated successfully!
                  </span>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
