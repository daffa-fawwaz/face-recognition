"use client";

import { useState } from "react";
import { Users, Activity, Laptop, Home, Menu, X } from "lucide-react";
import DashboardContent from "@/components/DashboardPage";
import AbsensiContent from "@/components/AbsensiContent";
import SantriContent from "@/components/SantriContent";
import RiwayatContent from "@/components/RiwayatContent";

export default function PondokAbsensiDashboard() {
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "absensi", label: "Absensi Perangkat", icon: Laptop },
    { id: "santri", label: "Data Santri", icon: Users },
    { id: "riwayat", label: "Riwayat Peminjaman", icon: Activity },
  ];

  const renderContent = () => {
    switch (activeMenu) {
      case "dashboard":
        return <DashboardContent />;
      case "absensi":
        return <AbsensiContent />;
      case "santri":
        return <SantriContent />;
      case "riwayat":
        return <RiwayatContent />;
      default:
        return <DashboardContent />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-50 text-black shadow-lg transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="flex border items-center justify-between h-16 px-6 bg-white-900">
          <div>
            <h1 className="text-lg font-bold">Absensi Perangkat</h1>
            <p className="text-xs text-black">Pondok Pesantren</p>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden">
            <X size={24} />
          </button>
        </div>

        <nav className="mt-8">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveMenu(item.id);
                  setIsSidebarOpen(false);
                }}
                className={`w-full flex items-center px-6 py-3 text-left hover:bg-gray-200 transition-colors ${
                  activeMenu === item.id
                    ? "bg-gray-200 border-r-4 border-gray-300"
                    : ""
                }`}
              >
                <IconComponent className="mr-3" size={20} />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 lg:ml-0">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="flex items-center justify-between h-16 px-6">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden"
            >
              <Menu size={24} />
            </button>
            <h2 className="text-xl font-semibold text-gray-800 capitalize">
              {menuItems.find((item) => item.id === activeMenu)?.label ||
                "Dashboard"}
            </h2>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">Admin Pondok</div>
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                A
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-6">{renderContent()}</main>
      </div>
    </div>
  );
}
