"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import FloatingButton from "../ui/FloatingButton";
import BackButton from "../ui/BackButton";

interface DetectionResult {
  name?: string;
  status: string;
}

interface WebSocketResponse {
  results: DetectionResult[];
}

export default function OpenCVCameraComponent() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const [isConnected, setIsConnected] = useState(false);
  const [results, setResults] = useState<DetectionResult[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  const getWsConfig = (): {
    url: string;
    action: "mengambil" | "mengembalikan";
  } => {
    const path = window.location.pathname;

    if (path.startsWith("/return-")) {
      if (path === "/return-phone") {
        return {
          url: "ws://localhost:8000/ws/log-hp",
          action: "mengembalikan",
        };
      } else if (path === "/return-laptop") {
        return {
          url: "ws://localhost:8000/ws/log-laptop",
          action: "mengembalikan",
        };
      }
    } else if (path.startsWith("/take-")) {
      if (path === "/take-phone") {
        return { url: "ws://localhost:8000/ws/log-hp", action: "mengambil" };
      } else if (path === "/take-laptop") {
        return {
          url: "ws://localhost:8000/ws/log-laptop",
          action: "mengambil",
        };
      }
    }

    // fallback
    return { url: "ws://localhost:8000/ws/default", action: "mengambil" };
  };

  // 🔹 Kamera langsung nyala begitu komponen muncul
  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        streamRef.current = stream;
      } catch (err) {
        console.error("❌ Gagal akses kamera:", err);
        setError(
          "Tidak bisa mengakses kamera. Pastikan izin kamera sudah diberikan."
        );
      }
    };

    startCamera();

    return () => {
      // Cleanup kamera
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
    };
  }, []);

  // 🔹 Kirim frame ke server
  const sendFrame = useCallback((action: "mengambil" | "mengembalikan") => {
    if (
      !videoRef.current ||
      !wsRef.current ||
      wsRef.current.readyState !== WebSocket.OPEN
    ) {
      return;
    }

    const video = videoRef.current;
    if (video.videoWidth === 0 || video.videoHeight === 0) return;

    try {
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");

      if (!ctx) return;

      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const frameData = canvas.toDataURL("image/jpeg");

      wsRef.current.send(JSON.stringify({ frame: frameData, action: action }));
    } catch (err) {
      console.error("Error saat mengirim frame:", err);
    }
  }, []);

  // 🔹 Connect WebSocket
  const startWebSocket = useCallback(() => {
    try {
      const { url, action } = getWsConfig();
      wsRef.current = new WebSocket(url);

      wsRef.current.onopen = () => {
        console.log("✅ Connected to WebSocket server");
        setIsConnected(true);
        setError(null);

        // Mulai timer
        setElapsedTime(0);
        timerRef.current = setInterval(() => {
          setElapsedTime((prev) => prev + 1);
        }, 1000);

        // Mulai kirim frame
        intervalRef.current = setInterval(() => {
          sendFrame(action);
        }, 2000);
      };

      wsRef.current.onmessage = (event) => {
        try {
          const data: WebSocketResponse = JSON.parse(event.data);
          console.log("📥 Response dari server:", data);
          setResults(data.results || []);
        } catch (err) {
          console.error("Error parsing WebSocket message:", err);
        }
      };

      wsRef.current.onclose = () => {
        console.log("🔌 WebSocket connection closed");
        setIsConnected(false);
      };

      wsRef.current.onerror = (error) => {
        console.error("❌ WebSocket error:", error);
        setError("WebSocket connection error");
        setIsConnected(false);
      };
    } catch (err) {
      console.error("Error creating WebSocket:", err);
      setError("Failed to create WebSocket connection");
    }
  }, [sendFrame]);

  // 🔹 Stop WebSocket
  const stopWebSocket = useCallback(() => {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    setIsConnected(false);
    setResults([]);
    setElapsedTime(0);
  }, []);

  // 🔹 Format waktu dari detik ke MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="relative w-screen h-screen flex flex-col items-center gap-4">
      {/* Kamera selalu ON */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="absolute w-full h-full object-cover bg-black"
      />

      <FloatingButton />

      {/* Timer hanya jalan kalau WS aktif */}
      <div className="px-5 py-2 absolute right-4 top-8 bg-purple-500 text-white rounded-lg text-sm font-medium">
        ⏱️ Timer: {formatTime(elapsedTime)}
      </div>

      {/* Tombol khusus untuk WS */}
      <div className="absolute right-4 top-20 flex gap-4">
        <button
          onClick={startWebSocket}
          disabled={isConnected}
          className="px-4 py-2 bg-green-500 text-white rounded-lg disabled:opacity-50"
        >
          Start
        </button>
        <button
          onClick={stopWebSocket}
          disabled={!isConnected}
          className="px-4 py-2 bg-red-500 text-white rounded-lg disabled:opacity-50"
        >
          Stop
        </button>
      </div>

      {/* Status Indicators */}
      <div className="absolute top-4 left-4 flex flex-col gap-2">
        <BackButton />
      </div>

      {/* Detection Results */}
      <div className="absolute bottom-12 max-w-sm w-full text-center">
        <div className="bg-white/95 backdrop-blur-sm p-4 rounded-lg shadow-xl">
          <h3 className="font-bold text-xl text-gray-800 mb-3 flex items-center justify-center gap-2">
            🎯 Detection Results
          </h3>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded mb-3 text-sm">
              ❌ {error}
            </div>
          )}

          {results.length === 0 ? (
            <p className="text-gray-500 text-sm italic">
              {isConnected ? "Menunggu deteksi..." : "WebSocket belum aktif"}
            </p>
          ) : (
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {results.map((result, index) => (
                <div
                  key={index}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    result.status?.endsWith("_SUCCESS")
                      ? "bg-green-500 text-white"
                      : result.status === "NOT_FOUND"
                      ? "bg-orange-500 text-white"
                      : "bg-red-500 text-white"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="truncate">{result.name || "Unknown"}</span>
                    <span className="ml-2 text-xs opacity-75">
                      {result.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
