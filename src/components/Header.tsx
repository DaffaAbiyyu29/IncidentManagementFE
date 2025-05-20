import { decodeJWT } from "@/helper/decodeJWT";
import { useEffect, useState } from "react";
import Notifications from "./Notifications";

type HeaderProps = {
  onLogout: () => void;
};

function Header({ onLogout }: HeaderProps) {
  const [name, setName] = useState<string>();
  const [departemen, setDepartemen] = useState<string>();

  useEffect(() => {
    const decodeToken = decodeJWT();
    setName(decodeToken.name);
    setDepartemen(decodeToken.departemen);
  }, []);

  return (
    <header
      className="header fixed top-0 z-10 left-0 right-0 flex items-stretch shrink-0 bg-[#fefefe] dark:bg-coal-500 border-b border-border active"
      data-sticky="true"
      data-sticky-class="shadow-sm dark:border-b dark:border-b-coal-100"
      data-sticky-name="header"
      id="header"
    >
      {/* begin: container */}
      <div
        className="container-fixed flex justify-between items-stretch lg:gap-4"
        id="header_container"
      >
        <div className="flex gap-1 lg:hidden items-center -ml-1">
          {/* <a className="shrink-0" href="/">
            <img
              alt=""
              className="max-h-[25px] w-full"
              src="/media/app/mini-logo.svg"
            />
          </a> */}
          <a className="shrink-0 dark:hidden" href="/">
            <img
              alt=""
              className="max-h-[60px] w-full"
              src="/media/app/patria-light.png"
            />
          </a>
          <a className="shrink-0 hidden dark:block" href="/">
            <img
              alt=""
              className="max-h-[60px] w-full"
              src="/media/app/patria-dark.png"
            />
          </a>
          <div className="flex items-center">
            <button
              className="btn btn-icon btn-light btn-clear btn-sm"
              data-drawer-toggle="#sidebar"
            >
              <i className="ki-solid ki-menu"></i>
            </button>
          </div>
        </div>

        <div className="flex items-stretch" id="megamenu_container">
          <div
            className="flex items-stretch"
            data-reparent="true"
            data-reparent-mode="prepend|lg:prepend"
            data-reparent-target="body|lg:#megamenu_container"
          ></div>
        </div>

        <div className="flex items-center gap-2">
          <Notifications />

          <button
            className="ml-1 btn btn-icon btn-icon-lg relative cursor-pointer size-9 rounded-full hover:bg-primary-light hover:text-primary text-gray-500 dark:hidden"
            data-theme-toggle="true"
            data-tooltip="#theme_mode_dark"
          >
            <i className="ki-outline ki-sun"></i>
          </button>
          <button
            className="btn btn-icon btn-icon-lg relative cursor-pointer size-9 rounded-full hover:bg-primary-light hover:text-primary text-gray-500 hidden dark:flex"
            data-theme-toggle="true"
            data-tooltip="#theme_mode_light"
          >
            <i className="ki-outline ki-moon"></i>
          </button>

          <div className="menu" data-menu="true">
            <div
              className="menu-item"
              data-menu-item-offset="20px, 10px"
              data-menu-item-placement="bottom-end"
              data-menu-item-toggle="dropdown"
              data-menu-item-trigger="click|lg:click"
            >
              <div className="menu-toggle btn btn-icon rounded-full">
                <img
                  alt=""
                  className="size-9 rounded-full border-2 border-success shrink-0"
                  src="/media/avatars/300-2.png"
                />
              </div>
              <div className="menu-dropdown menu-default light:border-gray-300 w-full max-w-[300px]">
                <div className="flex items-center justify-between px-5 py-1.5 gap-1.5">
                  <div className="flex items-center gap-2">
                    <img
                      alt=""
                      className="size-9 rounded-full border-2 border-success"
                      src="/media/avatars/300-2.png"
                    />
                    <div className="flex flex-col gap-1.5">
                      <span className="text-sm text-gray-800 font-semibold leading-none">
                        {name}
                      </span>
                      <a
                        className="text-xs text-gray-600 hover:text-primary font-medium leading-none"
                        href="html/demo1/account/home/get-started.html"
                      >
                        {departemen}
                      </a>
                    </div>
                  </div>
                  {/* <span className="badge badge-xs badge-primary badge-outline">
                    Pro
                  </span> */}
                </div>
                <div className="menu-separator"></div>
                <div className="flex flex-col">
                  <div className="menu-item mb-0.5">
                    <div className="menu-link">
                      <span className="menu-icon">
                        <i className="ki-solid ki-moon"></i>
                      </span>
                      <span className="menu-title">Dark Mode</span>
                      <label className="switch switch-sm">
                        <input
                          data-theme-state="dark"
                          data-theme-toggle="true"
                          name="check"
                          type="checkbox"
                          defaultValue={1}
                        />
                      </label>
                    </div>
                  </div>
                  <div className="menu-item px-4 py-1.5">
                    <button
                      className="btn btn-sm btn-light justify-center"
                      onClick={onLogout}
                    >
                      Log out
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
