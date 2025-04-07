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
            className="grow w-full pt-5 relative"
            id="content"
            role="content"
            style={{
              overflowY: "scroll",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            <button
              className="btn btn-light fixed bottom-12 right-12 p-3 rounded-full shadow-md shadow-gray-300 hover:scale-[110%] active:scale-[100%] z-[9999]"
              onClick={isAtBottom ? handleScrollToTop : handleScrollToBottom}
            >
              {isAtBottom ? (
                <i className="ki-outline ki-double-up"></i>
              ) : (
                <i className="ki-outline ki-double-down"></i>
              )}
            </button>

            <div className="container-fixed w-full">
              <div ref={topRef} />
              {children}
              <div ref={bottomRef} />
            </div>
          </main>
          <Footer />
        </div>
      </div>
      <SearchModal />
    </>
  );
};

export default Main;
