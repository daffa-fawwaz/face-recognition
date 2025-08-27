"use client";

import React, { useRef, useState, useEffect } from "react";
import FloatingButton from "./FloatingButton";
import BackButton from "./BackButton";

export default function CameraComponent() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [isActive, setIsActive] = useState(false);

  // Start kamera
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      streamRef.current = stream;
      setIsActive(true);
    } catch (err) {
      console.error("Gagal akses kamera:", err);
    }
  };

  // Stop kamera
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsActive(false);
  };

  // ✅ Matikan kamera otomatis kalau keluar dari halaman
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <div className="relative w-screen h-screen flex flex-col items-center gap-4">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="absolute w-full h-full object-cover bg-black"
      ></video>

      <div className="absolute bottom-8 flex gap-4">
        <button
          onClick={startCamera}
          disabled={isActive}
          className="px-4 py-2 bg-green-500 text-white rounded-lg disabled:opacity-50"
        >
          Start
        </button>
        <button
          onClick={stopCamera}
          disabled={!isActive}
          className="px-4 py-2 bg-red-500 text-white rounded-lg disabled:opacity-50"
        >
          Stop
        </button>
      </div>

      <BackButton />

      <FloatingButton />
    </div>
  );
}
