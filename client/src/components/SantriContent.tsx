import { Laptop, Smartphone } from "lucide-react";

export default function SantriContent() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold">Data Santri</h3>
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
          Tambah Santri Baru
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nama Santri
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  No. Induk
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kelas
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Perangkat Dipinjam
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[
                {
                  nama: "Ahmad Fauzi",
                  noInduk: "S001",
                  kelas: "3 SMP",
                  status: "Meminjam",
                  perangkat: "LP-001 (Laptop)",
                  type: "laptop",
                },
                {
                  nama: "Siti Aisyah",
                  noInduk: "S002",
                  kelas: "2 SMP",
                  status: "Meminjam",
                  perangkat: "HG-015 (HP)",
                  type: "hp",
                },
                {
                  nama: "Muhammad Rizki",
                  noInduk: "S003",
                  kelas: "2 SMP",
                  status: "Tidak Meminjam",
                  perangkat: "-",
                  type: null,
                },
                {
                  nama: "Abdullah Aziz",
                  noInduk: "S004",
                  kelas: "1 SMA",
                  status: "Meminjam",
                  perangkat: "LP-008 (Laptop)",
                  type: "laptop",
                },
                {
                  nama: "Yusuf Hakim",
                  noInduk: "S005",
                  kelas: "3 SMA",
                  status: "Tidak Meminjam",
                  perangkat: "-",
                  type: null,
                },
                {
                  nama: "Fatimah Zahra",
                  noInduk: "S006",
                  kelas: "1 SMP",
                  status: "Meminjam",
                  perangkat: "HG-008 (HP)",
                  type: "hp",
                },
              ].map((santri, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">
                        {santri.nama.charAt(0)}
                      </div>
                      {santri.nama}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {santri.noInduk}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {santri.kelas}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        santri.status === "Meminjam"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {santri.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center">
                      {santri.type === "laptop" && (
                        <Laptop className="text-blue-500 mr-2" size={16} />
                      )}
                      {santri.type === "hp" && (
                        <Smartphone
                          className="text-purple-500 mr-2"
                          size={16}
                        />
                      )}
                      {santri.perangkat}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-green-600 hover:text-green-900 mr-4">
                      Edit
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      Hapus
                    </button>
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
