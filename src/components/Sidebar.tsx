import { useRouter } from "next/router";
import Link from "next/link";

function Sidebar() {
  const router = useRouter();
  const currentPath = router.pathname;

  return (
    <div
      className="sidebar dark:bg-coal-600 bg-light border-r border-r-gray-200 dark:border-r-coal-100 fixed top-0 bottom-0 z-20 hidden lg:flex flex-col items-stretch shrink-0"
      data-drawer="true"
      data-drawer-class="drawer drawer-start top-0 bottom-0"
      data-drawer-enable="true|lg:false"
      id="sidebar"
    >
      <div
        className="sidebar-header hidden lg:flex items-center relative justify-between px-3 lg:px-6 shrink-0"
        id="sidebar_header"
      >
        <a className="dark:hidden" href="html/demo1.html">
          <img
            alt=""
            className="default-logo min-h-[22px] max-w-none"
            src="/media/app/default-logo.svg"
          />
          <img
            alt=""
            className="small-logo min-h-[22px] max-w-none"
            src="/media/app/mini-logo.svg"
          />
        </a>
        <a className="hidden dark:block" href="html/demo1.html">
          <img
            alt=""
            className="default-logo min-h-[22px] max-w-none"
            src="/media/app/default-logo-dark.svg"
          />
          <img
            alt=""
            className="small-logo min-h-[22px] max-w-none"
            src="/media/app/mini-logo.svg"
          />
        </a>
        <button
          className="btn btn-icon btn-icon-md size-[30px] rounded-lg border border-gray-200 dark:border-gray-300 bg-light text-gray-500 hover:text-gray-700 toggle absolute left-full top-2/4 -translate-x-2/4 -translate-y-2/4"
          data-toggle="body"
          data-toggle-class="sidebar-collapse"
          id="sidebar_toggle"
        >
          <i className="ki-solid ki-black-left-line toggle-active:rotate-180 transition-all duration-300"></i>
        </button>
      </div>
      <div
        className="sidebar-content flex grow shrink-0 py-5 pr-2"
        id="sidebar_content"
      >
        <div
          className="scrollable-y-hover grow shrink-0 flex pl-2 lg:pl-5 pr-1 lg:pr-3"
          data-scrollable="true"
          data-scrollable-dependencies="#sidebar_header"
          data-scrollable-height="auto"
          data-scrollable-offset="0px"
          data-scrollable-wrappers="#sidebar_content"
          id="sidebar_scrollable"
        >
          <div
            className="menu flex flex-col grow gap-0.5"
            data-menu="true"
            data-menu-accordion-expand-all="false"
            id="sidebar_menu"
          >
            <div className={`menu-item ${currentPath === "/" ? "active" : ""}`}>
              <Link
                className="menu-link flex items-center grow cursor-pointer border border-transparent gap-[10px] pl-[10px] pr-[10px] py-[6px]"
                href="/"
                tabIndex={0}
              >
                <span
                  className={`menu-link-hover:!text-primary menu-icon items-start ${
                    currentPath === "/" ? "text-blue-500" : "text-gray-500"
                  } dark:${
                    currentPath === "/" ? "text-blue-400" : "text-gray-400"
                  } w-[20px]`}
                >
                  <i className="ki-solid ki-element-11 text-lg"></i>
                </span>
                <span className="menu-title text-sm font-semibold text-gray-700 menu-item-active:text-primary menu-link-hover:!text-primary">
                  Dashboard
                </span>
              </Link>
            </div>

            <div className="menu-item pt-2.25 pb-px">
              <span className="menu-heading uppercase pl-[10px] pr-[10px] text-2sm font-semibold text-gray-500">
                Problem Identifier
              </span>
            </div>

            <div
              className={`menu-item ${
                currentPath === "/pending_ar" ? "active" : ""
              }`}
            >
              <Link
                className="menu-link flex items-center grow cursor-pointer border border-transparent gap-[10px] pl-[10px] pr-[10px] py-[6px]"
                href="/pending_ar"
                tabIndex={0}
              >
                <span
                  className={`menu-link-hover:!text-primary menu-icon items-start ${
                    currentPath === "/pending_ar"
                      ? "text-blue-500"
                      : "text-gray-500"
                  } dark:${
                    currentPath === "/pending_ar"
                      ? "text-blue-400"
                      : "text-gray-400"
                  } w-[20px]`}
                >
                  <i className="ki-solid ki-dollar text-lg"></i>
                </span>
                <span className="menu-title text-sm font-semibold text-gray-700 menu-item-active:text-primary menu-link-hover:!text-primary">
                  Pending AR
                </span>
              </Link>
            </div>

            <div
              className={`menu-item ${
                currentPath === "/pending_billing" ? "active" : ""
              }`}
            >
              <Link
                className="menu-link flex items-center grow cursor-pointer border border-transparent gap-[10px] pl-[10px] pr-[10px] py-[6px]"
                href="/pending_billing"
                tabIndex={0}
              >
                <span
                  className={`menu-link-hover:!text-primary menu-icon items-start ${
                    currentPath === "/pending_billing"
                      ? "text-blue-500"
                      : "text-gray-500"
                  } dark:${
                    currentPath === "/pending_billing"
                      ? "text-blue-400"
                      : "text-gray-400"
                  } w-[20px]`}
                >
                  <i className="ki-solid ki-wallet text-lg"></i>
                </span>
                <span className="menu-title text-sm font-semibold text-gray-700 menu-item-active:text-primary menu-link-hover:!text-primary">
                  Pending Billing
                </span>
              </Link>
            </div>

            <div
              className={`menu-item ${
                currentPath === "/delay_operation" ? "active" : ""
              }`}
            >
              <Link
                className="menu-link flex items-center grow cursor-pointer border border-transparent gap-[10px] pl-[10px] pr-[10px] py-[6px]"
                href="/delay_operation"
                tabIndex={0}
              >
                <span
                  className={`menu-link-hover:!text-primary menu-icon items-start ${
                    currentPath === "/delay_operation"
                      ? "text-blue-500"
                      : "text-gray-500"
                  } dark:${
                    currentPath === "/delay_operation"
                      ? "text-blue-400"
                      : "text-gray-400"
                  } w-[20px]`}
                >
                  <i className="ki-solid ki-wrench text-lg"></i>
                </span>
                <span className="menu-title text-sm font-semibold text-gray-700 menu-item-active:text-primary menu-link-hover:!text-primary">
                  Delay Operation
                </span>
              </Link>
            </div>

            <div
              className={`menu-item ${
                currentPath.includes("/manhour_utilization") ? "active" : ""
              }`}
            >
              <Link
                className="menu-link flex items-center grow cursor-pointer border border-transparent gap-[10px] pl-[10px] pr-[10px] py-[6px]"
                href="/manhour_utilization"
                tabIndex={0}
              >
                <span
                  className={`menu-link-hover:!text-primary menu-icon items-start ${
                    currentPath.includes("/manhour_utilization")
                      ? "text-blue-500"
                      : "text-gray-500"
                  } dark:${
                    currentPath.includes("/manhour_utilization")
                      ? "text-blue-400"
                      : "text-gray-400"
                  } w-[20px]`}
                >
                  <i className="ki-solid ki-users text-lg"></i>
                </span>
                <span className="menu-title text-sm font-semibold text-gray-700 menu-item-active:text-primary menu-link-hover:!text-primary">
                  Man Hour Utilization
                </span>
              </Link>
            </div>

            <div
              className={`menu-item ${
                currentPath === "/vendor_performance" ? "active" : ""
              }`}
            >
              <Link
                className="menu-link flex items-center grow cursor-pointer border border-transparent gap-[10px] pl-[10px] pr-[10px] py-[6px]"
                href="/vendor_performance"
                tabIndex={0}
              >
                <span
                  className={`menu-link-hover:!text-primary menu-icon items-start ${
                    currentPath === "/vendor_performance"
                      ? "text-blue-500"
                      : "text-gray-500"
                  } dark:${
                    currentPath === "/vendor_performance"
                      ? "text-blue-400"
                      : "text-gray-400"
                  } w-[20px]`}
                >
                  <i className="ki-solid ki-logistic text-lg"></i>
                </span>
                <span className="menu-title text-sm font-semibold text-gray-700 menu-item-active:text-primary menu-link-hover:!text-primary">
                  Vendor Performance
                </span>
              </Link>
            </div>

            <div
              className={`menu-item ${
                currentPath === "/subcont_performance" ? "active" : ""
              }`}
            >
              <Link
                className="menu-link flex items-center grow cursor-pointer border border-transparent gap-[10px] pl-[10px] pr-[10px] py-[6px]"
                href="/subcont_performance"
                tabIndex={0}
              >
                <span
                  className={`menu-link-hover:!text-primary menu-icon items-start ${
                    currentPath === "/subcont_performance"
                      ? "text-blue-500"
                      : "text-gray-500"
                  } dark:${
                    currentPath === "/subcont_performance"
                      ? "text-blue-400"
                      : "text-gray-400"
                  } w-[20px]`}
                >
                  <i className="ki-solid ki-delivery-2 text-lg"></i>
                </span>
                <span className="menu-title text-sm font-semibold text-gray-700 menu-item-active:text-primary menu-link-hover:!text-primary">
                  Subcont Performance
                </span>
              </Link>
            </div>

            <div className="menu-item pt-2.25 pb-px">
              <span className="menu-heading uppercase pl-[10px] pr-[10px] text-2sm font-semibold text-gray-500">
                Others
              </span>
            </div>

            <div
              className={`menu-item ${currentPath === "/pica" ? "active" : ""}`}
            >
              <Link
                className="menu-link flex items-center grow cursor-pointer border border-transparent gap-[10px] pl-[10px] pr-[10px] py-[6px]"
                href="/pica"
                tabIndex={0}
              >
                <span
                  className={`menu-link-hover:!text-primary menu-icon items-start ${
                    currentPath === "/pica" ? "text-blue-500" : "text-gray-500"
                  } dark:${
                    currentPath === "/pica" ? "text-blue-400" : "text-gray-400"
                  } w-[20px]`}
                >
                  <i className="ki-solid ki-folder text-lg"></i>
                </span>
                <span className="menu-title text-sm font-semibold text-gray-700 menu-item-active:text-primary menu-link-hover:!text-primary">
                  PICA
                </span>
              </Link>
            </div>

            <div
              className={`menu-item ${currentPath === "/logs" ? "active" : ""}`}
            >
              <Link
                className="menu-link flex items-center grow cursor-pointer border border-transparent gap-[10px] pl-[10px] pr-[10px] py-[6px]"
                href="/logs"
                tabIndex={0}
              >
                <span
                  className={`menu-link-hover:!text-primary menu-icon items-start ${
                    currentPath === "/logs" ? "text-blue-500" : "text-gray-500"
                  } dark:${
                    currentPath === "/logs" ? "text-blue-400" : "text-gray-400"
                  } w-[20px]`}
                >
                  <i className="ki-solid ki-time text-lg"></i>
                </span>
                <span className="menu-title text-sm font-semibold text-gray-700 menu-item-active:text-primary menu-link-hover:!text-primary">
                  Logs
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
