import { Laptop, Smartphone, Users } from "lucide-react";
import axios from "axios";
import { useEffect, useState } from "react";

export interface Logbook {
  id: number;
  user_id: number;
  name: string;
  tipe: "LAPTOP" | "HP";
  mengambil: "SUDAH" | "BELUM";
  mengembalikan: "SUDAH" | "BELUM";
  created_at: string;
}

export default function DashboardPage() {
  const [totalUsers, setTotalUsers] = useState<number>(0);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/users/count");
        setTotalUsers(res.data.total_users);
      } catch (err) {
        console.log("Failed To fetch data", err);
      }
    };

    fetchCount();
  }, []);

  const [logs, setLogs] = useState<Logbook[]>([]);
  const [borrowedLaptopCount, setBorrowedLaptopCount] = useState<number>(0);
  const [borrowedHPCount, setBorrowedHPCount] = useState<number>(0);

  useEffect(() => {
    const fetchLogs = async () => {
      const [laptopRes, hpRes] = await Promise.all([
        axios.get("http://127.0.0.1:8000/users/all/log-laptop"),
        axios.get("http://127.0.0.1:8000/users/all/log-hp"),
      ]);

      const laptopLogs = laptopRes.data["log-laptop"];
      const hpLogs = hpRes.data["log-hp"];

      const allLogs = [...laptopLogs, ...hpLogs];
      setLogs(allLogs);

      const activeLaptops = allLogs.filter(
        (item) =>
          item.tipe === "LAPTOP" &&
          item.mengambil === "SUDAH" &&
          item.mengembalikan === "BELUM"
      );

      const activeHp = allLogs.filter(
        (item) =>
          item.tipe === "HP" &&
          item.mengambil === "SUDAH" &&
          item.mengembalikan === "BELUM"
      );

      setBorrowedLaptopCount(activeLaptops.length);
      setBorrowedHPCount(activeHp.length);
    };

    fetchLogs();
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Santri</p>
              <p className="text-2xl font-bold text-gray-900">{totalUsers}</p>
              <p className="text-sm text-gray-500">HSI BS Purworejo</p>
            </div>
            <div className={`bg-blue-500 p-3 rounded-full text-white`}>
              <Users />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Aktivitas Terbaru</h3>
          <div className="space-y-3">
            {logs.map((log, index) => {
              return (
                <div
                  key={index}
                  className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0"
                >
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">
                      {log.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {log.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        Mengambil {log.tipe}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {log.tipe === "LAPTOP" ? (
                      <Laptop className="text-blue-500" size={16} />
                    ) : (
                      <Smartphone className="text-purple-500" size={16} />
                    )}
                    <span className="text-xs text-gray-500">
                      {log.created_at}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Status Perangkat</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center">
                <Laptop className="text-blue-500 mr-3" size={24} />
                <div>
                  <p className="font-medium text-blue-900">Laptop</p>
                  <p className="text-sm text-blue-600">
                    {totalUsers} Unit Total
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-blue-900">
                  {borrowedLaptopCount}
                </p>
                <p className="text-sm text-blue-600">Sedang dipinjam</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
              <div className="flex items-center">
                <Smartphone className="text-purple-500 mr-3" size={24} />
                <div>
                  <p className="font-medium text-purple-900">HP</p>
                  <p className="text-sm text-purple-600">
                    {totalUsers} unit total
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-purple-900">
                  {borrowedHPCount}{" "}
                </p>
                <p className="text-sm text-purple-600">Sedang dipinjam</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
