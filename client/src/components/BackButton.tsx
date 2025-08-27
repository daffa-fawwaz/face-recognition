"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function BackButton() {
  const router = useRouter();

  const handleConfirm = () => {
    router.push("/dashboard");
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className="absolute bg-slate-950 text-white hover:bg-slate-950 hover:text-white top-8 left-3 rounded-full cursor-pointer"
          variant="outline"
        >
          <ArrowLeft />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-slate-950 text-white border-none">
        <AlertDialogHeader>
          <AlertDialogTitle>Yakin mau kembali?</AlertDialogTitle>
          <AlertDialogDescription>
            Kamu akan meninggalkan halaman ini. Pastikan sudah selesai sebelum
            kembali.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="text-black">Batal</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm}>
            Ya, kembali
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
