import CameraPage from "../../components/Camera";

export default function AmbilHpPage() {
  return (
    <>
      <main className="relative w-full h-screen">
        <CameraPage />

        <h1 className="absolute top-6 left-1/2 -translate-x-1/2 text-white text-2xl font-bold bg-black/50 px-4 py-2 rounded-lg">
          Ambil HP 📱
        </h1>
      </main>
    </>
  );
}
