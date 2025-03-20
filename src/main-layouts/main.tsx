import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import SearchModal from "../components/SearchModal";
import React, { ReactNode } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

interface CardProps {
  children: ReactNode;
}

const Main: React.FC<CardProps> = ({ children }) => {
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove("token");
    router.push("/auth/login");
  };

  return (
    <>
      <div
        className="flex w-full min-h-screen"
        style={{
          overflowY: "scroll", // Pastikan bisa scroll
          scrollbarWidth: "none", // Hilangkan scrollbar di Firefox
          msOverflowStyle: "none", // Hilangkan scrollbar di Edge
        }}
      >
        <Sidebar />
        <div className="wrapper flex grow flex-col w-full">
          <Header onLogout={handleLogout} />
          <main
            className="grow w-full pt-5"
            id="content"
            role="content"
            style={{
              overflowY: "scroll", // Pastikan bisa scroll
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            <div
              className="container-fixed w-full"
              id="content_container"
            ></div>
            <div className="container-fixed w-full">{children}</div>
          </main>
          <Footer />
        </div>
      </div>
      <SearchModal />
    </>
  );
};

export default Main;
