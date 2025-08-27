import CameraPage from "../../components/Camera";

export default function KembaliLaptopPage() {
  return (
    <>
      <main className="relative w-full items-center">
        <CameraPage />
        <h1 className="absolute top-6 left-1/2 -translate-x-1/2 text-white text-2xl font-bold bg-black/50 px-4 py-2 rounded-lg">
          Kembalikan Laptop 🔁💻
        </h1>
      </main>
    </>
  );
}
