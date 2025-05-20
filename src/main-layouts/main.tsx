import React, { ReactNode, useRef, useEffect, useState } from "react";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import SearchModal from "../components/SearchModal";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

interface CardProps {
  children: ReactNode;
}

const Main: React.FC<CardProps> = ({ children }) => {
  const router = useRouter();
  const topRef = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const [isAtBottom, setIsAtBottom] = useState(false);

  const handleLogout = () => {
    Cookies.remove("token");
    router.push("/auth/login");
  };

  const handleScrollToTop = () => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleScrollToBottom = () => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const mainContent = document.getElementById("content");
      if (mainContent) {
        const isBottom =
          Math.abs(
            mainContent.scrollHeight -
              mainContent.scrollTop -
              mainContent.clientHeight
          ) < 1;
        setIsAtBottom(isBottom);
      }
    };

    const mainContent = document.getElementById("content");
    if (mainContent) {
      mainContent.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (mainContent) {
        mainContent.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <>
      <div className="flex w-full min-h-screen">
        <Sidebar />
        <div className="wrapper flex grow flex-col w-full">
          <Header onLogout={handleLogout} />
          <main
            className="grow w-full relative  p-6"
            id="content"
            role="content"
            style={{
              overflowY: "scroll",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            <div ref={topRef} />
            {children}
            <div ref={bottomRef} />
            <button
              onClick={isAtBottom ? handleScrollToTop : handleScrollToBottom}
              className="fixed bottom-12 right-12 z-50 flex items-center justify-center w-10 h-10
           rounded-full bg-gradient-to-br from-[#3b82f6] to-[#06b6d4] text-white
           shadow-lg hover:shadow-xl active:shadow-md
           transition-all duration-300 ease-in-out transform hover:scale-105"
              aria-label={isAtBottom ? "Scroll to top" : "Scroll to bottom"}
            >
              <i
                className={`ki-outline ${
                  isAtBottom ? "ki-double-up" : "ki-double-down"
                } text-2xl transition-transform duration-300 ease-in-out`}
              ></i>
            </button>
            {/* <div className="container-fixed w-full">
              
            </div> */}
          </main>
          <Footer />
        </div>
      </div>
      <SearchModal />
    </>
  );
};

export default Main;
