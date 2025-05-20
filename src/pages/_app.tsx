// _app.tsx
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { decodeJWT } from "@/helper/decodeJWT";
import { routeAccessMap } from "@/helper/routeAccess";
import { Loading } from "@/components/Loading";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const GlobalInit = dynamic(() => import("../components/GlobalInit"), {
  ssr: false,
});

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true); // State loading untuk menghindari tampilan kosong

  useEffect(() => {
    const token = Cookies.get("token");

    // Jika tidak ada token
    if (!token) {
      if (router.pathname !== "/auth/login") {
        router.replace("/auth/login");
      }
      setLoading(false); // Set loading ke false setelah cek selesai
      return;
    }

    try {
      const decoded = decodeJWT();
      const timeLeft = decoded.exp * 1000 - Date.now();

      if (timeLeft <= 0) {
        Cookies.remove("token");
        if (router.pathname !== "/auth/login") {
          router.replace("/auth/login");
        }
        setLoading(false); // Set loading ke false setelah cek selesai
        return;
      }

      // Logout otomatis jika token kadaluarsa
      const timeout = setTimeout(() => {
        Cookies.remove("token");
        router.replace("/auth/login");
        setLoading(false); // Set loading ke false setelah cek selesai
      }, timeLeft);

      // CEK AKSES BERDASARKAN DEPARTEMEN
      const allowedRoutes = routeAccessMap[decoded.departemen] || [];
      const currentPath = router.pathname;

      if (!allowedRoutes.includes(currentPath)) {
        // router.replace("/");
        setLoading(false); // Set loading ke false setelah cek selesai
        // return;
      }

      setIsAuthorized(true); // ✅ Set authorized jika lolos semua pengecekan
      setLoading(false); // Set loading ke false setelah cek selesai

      return () => clearTimeout(timeout);
    } catch (err) {
      console.error("Token tidak valid:", err);
      Cookies.remove("token");
      if (router.pathname !== "/auth/login") {
        router.replace("/auth/login");
      }
      setLoading(false); // Set loading ke false setelah cek selesai
    }
  }, [router]);

  // Jika loading true, tampilkan indikator loading
  if (loading) {
    return <Loading />;
  }

  // Jangan render halaman jika belum authorized
  if (!isAuthorized && router.pathname !== "/auth/login") return null;

  return (
    <>
      <Component {...pageProps} />
      <ToastContainer />
      <GlobalInit />
    </>
  );
}
