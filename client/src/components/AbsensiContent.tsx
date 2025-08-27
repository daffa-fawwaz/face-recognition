import { Camera, Laptop, LogIn, LogOut, Smartphone } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function AbsensiContent() {
  const [selectedDevice, setSelectedDevice] = useState("laptop");

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">
          Absensi Perangkat Santri
        </h2>
        <p className="text-gray-600 mt-2">
          Gunakan face recognition untuk mengambil atau mengembalikan perangkat
        </p>
      </div>

      {/* Device Selection */}
      <div className="flex justify-center mb-8">
        <div className="bg-white p-2 rounded-lg shadow-md">
          <button
            onClick={() => setSelectedDevice("laptop")}
            className={`px-6 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors ${
              selectedDevice === "laptop"
                ? "bg-blue-500 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <Laptop size={18} />
            <span>Laptop</span>
          </button>
        </div>
        <div className="bg-white p-2 rounded-lg shadow-md ml-2">
          <button
            onClick={() => setSelectedDevice("hp")}
            className={`px-6 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors ${
              selectedDevice === "hp"
                ? "bg-purple-500 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <Smartphone size={18} />
            <span>HP</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-center">
            <LogOut className="inline-block mr-2 text-blue-500" size={24} />
            Ambil {selectedDevice === "laptop" ? "Laptop" : "HP"}
          </h3>
          <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center mb-4">
            <Camera className="text-gray-400" size={64} />
          </div>
          <Link
            href={selectedDevice === "laptop" ? "/ambil-laptop" : "ambil-hp"}
          >
            <button className="w-full cursor-pointer bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors font-medium">
              Mulai Face Recognition - Ambil{" "}
              {selectedDevice === "laptop" ? "Laptop" : "HP"}
            </button>
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-center">
            <LogIn className="inline-block mr-2 text-green-500" size={24} />
            Kembalikan {selectedDevice === "laptop" ? "Laptop" : "HP"}
          </h3>
          <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center mb-4">
            <Camera className="text-gray-400" size={64} />
          </div>
          <Link href={selectedDevice === "laptop" ? "/kembali-laptop" : "kembali-hp"}>
            <button className="w-full cursor-pointer bg-green-500 text-white py-3 px-4 rounded-lg hover:bg-green-600 transition-colors font-medium">
              Mulai Face Recognition - Kembalikan{" "}
              {selectedDevice === "laptop" ? "Laptop" : "HP"}
            </button>
          </Link>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Status Absensi Terakhir</h3>
        <div className="text-center py-8 text-gray-500">
          Belum ada aktivitas absensi. Silakan gunakan face recognition untuk
          memulai.
        </div>
      </div>
    </div>
  );
}
