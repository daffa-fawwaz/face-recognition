import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function FloatingButton() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const menus = [
    { href: "/ambil-laptop", emot: "🫴💻", label: "Ambil Laptop" },
    { href: "/ambil-hp", emot: "🫴📱", label: "Ambil HP" },
    { href: "/kembali-laptop", emot: "🔁💻", label: "Kembalikan Laptop" },
    { href: "/kembali-hp", emot: "🔁📱", label: "Kembalikan HP" },
  ];
  return (
    <>
      <Button
        onClick={() => setMenuOpen((prev) => !prev)}
        className="fixed bottom-5 left-5 py-5 rounded-full px-4 shadow-lg cursor-pointer"
      >
        {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </Button>
      {/* Slide-in Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-20 left-5 bg-slate-950 shadow-2xl rounded-xl px-6 pb-2 pt-6 flex flex-col gap-4"
          >
            {/* <h2 className="text-4xl text-center font-extrabold mb-4">Menu</h2> */}
            <div className="grid grid-cols-2 gap-3 h-full mb-4">
              {menus.map((menu) => {
                return (
                  <Link
                    key={menu.href}
                    href={menu.href}
                    className={`w-44 h-32 bg-slate-800 text-slate-300 hover:text-slate-300 border flex flex-col justify-center items-center rounded-lg cursor-pointer ${
                      pathname === menu.href
                        ? "border-cyan-500 border-2 bg-slate-200"
                        : "border-slate-700 hover:bg-slate-900"
                    }`}
                  >
                    <p>{menu.emot}</p>
                    <p>{menu.label}</p>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
