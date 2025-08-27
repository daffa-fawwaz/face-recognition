import { Laptop, Smartphone } from "lucide-react";

export default function RiwayatContent() {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold">Riwayat Peminjaman Perangkat</h3>

      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex flex-wrap space-x-4 mb-4">
          <input
            type="date"
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <select className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
            <option>Semua Santri</option>
            <option>Ahmad Fauzi</option>
            <option>Siti Aisyah</option>
            <option>Muhammad Rizki</option>
            <option>Abdullah Aziz</option>
            <option>Yusuf Hakim</option>
            <option>Fatimah Zahra</option>
          </select>
          <select className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
            <option>Semua Aksi</option>
            <option>Ambil Perangkat</option>
            <option>Kembalikan Perangkat</option>
          </select>
          <select className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
            <option>Semua Perangkat</option>
            <option>Laptop</option>
            <option>HP</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Waktu
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Santri
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Perangkat
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aksi
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Durasi Pinjam
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[
                {
                  waktu: "14:30 WIB",
                  santri: "Ahmad Fauzi",
                  perangkat: "LP-001",
                  aksi: "Ambil Laptop",
                  durasi: "1 jam 30 menit",
                  type: "laptop",
                },
                {
                  waktu: "14:25 WIB",
                  santri: "Siti Aisyah",
                  perangkat: "HG-015",
                  aksi: "Kembalikan HP",
                  durasi: "2 jam 15 menit",
                  type: "hp",
                },
                {
                  waktu: "14:20 WIB",
                  santri: "Abdullah Aziz",
                  perangkat: "LP-008",
                  aksi: "Ambil Laptop",
                  durasi: "45 menit",
                  type: "laptop",
                },
                {
                  waktu: "14:15 WIB",
                  santri: "Fatimah Zahra",
                  perangkat: "HG-008",
                  aksi: "Kembalikan HP",
                  durasi: "3 jam 20 menit",
                  type: "hp",
                },
                {
                  waktu: "14:10 WIB",
                  santri: "Muhammad Rizki",
                  perangkat: "LP-023",
                  aksi: "Ambil Laptop",
                  durasi: "2 jam 5 menit",
                  type: "laptop",
                },
                {
                  waktu: "14:05 WIB",
                  santri: "Yusuf Hakim",
                  perangkat: "HG-012",
                  aksi: "Kembalikan HP",
                  durasi: "1 jam 45 menit",
                  type: "hp",
                },
              ].map((riwayat, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {riwayat.waktu}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">
                        {riwayat.santri.charAt(0)}
                      </div>
                      {riwayat.santri}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                    <div className="flex items-center">
                      {riwayat.type === "laptop" ? (
                        <Laptop className="text-blue-500 mr-2" size={16} />
                      ) : (
                        <Smartphone
                          className="text-purple-500 mr-2"
                          size={16}
                        />
                      )}
                      {riwayat.perangkat}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        riwayat.aksi.includes("Ambil")
                          ? "bg-blue-100 text-blue-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {riwayat.aksi}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {riwayat.durasi}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
