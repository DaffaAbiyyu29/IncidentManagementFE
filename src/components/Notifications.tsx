import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/router";

const Notifications = () => {
  const router = useRouter();
  const [groupedNotifications, setGroupedNotifications] = useState<
    Record<string, any[]>
  >({});
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchNotifications = async () => {
      const token = Cookies.get("token");

      if (!token) {
        console.error("Token tidak ditemukan di cookie.");
        return;
      }

      let name = "";
      let role: any = "";

      try {
        const decoded = jwtDecode<{ name: string; role: any }>(token);
        name = decoded.name;
        role = decoded.role;
      } catch (err) {
        console.error("Token tidak valid.");
        return;
      }

      switch (role) {
        case 1:
          role = "Admin";
          break;
        case 2:
          role = "BA";
          break;
        case 3:
          role = "User";
          break;
        default:
          role = "-";
      }

      try {
        const response = await axios.get(
          `${
            process.env.NEXT_PUBLIC_API_URL
          }/api/notifications?name=${encodeURIComponent(
            name
          )}&type=${encodeURIComponent(role)}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const groupedData: Record<string, any[]> = response.data.data;

        // Hitung total unread
        let unreadCount = 0;
        Object.values(groupedData).forEach((list) => {
          unreadCount += list.filter(
            (notif) => notif.emailStatus !== "Read"
          ).length;
        });

        setGroupedNotifications(groupedData);
        setTotal(unreadCount);
      } catch (error) {
        console.error("Gagal mengambil notifikasi:", error);
      }
    };

    fetchNotifications();
  }, []);

  const getEmailProviderURL = (email: string, id?: any): string | null => {
    const domain = email.split("@")[1];
    if (!domain) return null;

    if (domain.includes("gmail.com"))
      return `https://mail.google.com/#advanced-search/from=daffaabiyyu04%40gmail.com&query=${id}&isrefinement=true&fromdisplay=Muhammad+Daffa+Abiyyu+Syaddad`;
    if (domain.includes("yahoo.com")) return "https://mail.yahoo.com/";
    if (domain.includes("outlook.com") || domain.includes("hotmail.com"))
      return "https://outlook.live.com/mail/";
    if (domain.includes("patria.com"))
      return "https://outlook.office.com/mail/";

    return null;
  };

  return (
    <div
      className="dropdown"
      data-dropdown="true"
      data-dropdown-offset="70px, 10px"
      data-dropdown-placement="bottom-end"
      data-dropdown-trigger="click|lg:click"
    >
      <button className="dropdown-toggle btn btn-icon btn-icon-lg relative cursor-pointer size-9 rounded-full hover:bg-primary-light hover:text-primary text-gray-500">
        <i className="ki-solid ki-notification-on text-lg"></i>
        {total > 0 && (
          <span className="badge badge-pill badge-outline badge-primary h-2 w-6 text-center text-[8px] font-bold absolute top-[1px] right-[-10px]">
            {total > 99 ? "99+" : total}
          </span>
        )}
      </button>

      <div className="dropdown-content w-full max-w-[460px] bg-white dark:bg-gray-100 rounded-xl shadow-md shadow-gray-300 border border-gray-200 dark:border-gray-100">
        <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-800">
            Notifications
          </h3>
          <div className="flex items-center gap-2">
            <button
              className="btn btn-sm btn-icon btn-light dark:btn-dark"
              data-dropdown-dismiss="true"
            >
              <i className="ki-solid ki-cross"></i>
            </button>
          </div>
        </div>

        <div
          className="max-h-[350px] overflow-y-auto divide-y divide-gray-200 dark:divide-gray-600"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "#cbd5e1 transparent",
          }}
        >
          {Object.entries(groupedNotifications).map(([date, notifs]) => (
            <div key={date} className="p-4">
              <h4 className="text-xs font-bold text-gray-600 mb-2">
                {new Date(date).toLocaleDateString("id-ID", {
                  weekday: "short",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </h4>

              {notifs.map((notif) => {
                const isRead = notif.emailStatus === "Read";

                return (
                  <div
                    key={notif.id}
                    className={`flex items-start gap-3 px-2 py-3 rounded-md hover:bg-gray-50 dark:hover:bg-gray-200 transition-colors ${
                      isRead ? "opacity-60" : ""
                    }`}
                  >
                    <div className="flex flex-col flex-1 gap-1">
                      <div
                        className={`text-sm ${
                          isRead
                            ? "text-gray-500 dark:text-gray-500"
                            : "text-gray-700 dark:text-gray-600"
                        }`}
                      >
                        <span
                          className={`font-semibold ${
                            isRead
                              ? "text-gray-700 dark:text-gray-500"
                              : "text-gray-900 dark:text-gray-800"
                          } hover:text-primary dark:hover:text-primary cursor-pointer`}
                        >
                          {notif.name}
                        </span>{" "}
                        {notif.message}{" "}
                        <span className="text-primary font-medium hover:underline cursor-pointer">
                          {notif.target}
                        </span>
                      </div>
                      <div className="flex items-center text-xs text-gray-500 dark:text-gray-600 gap-2">
                        <span>{new Date(notif.time).toLocaleString()}</span>
                        <span className="w-1 h-1 bg-gray-400 dark:bg-gray-500 rounded-full"></span>
                        <span>{notif.company}</span>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {notif.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="badge badge-xs badge-light dark:badge-dark border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-600"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {notif.email && (
                        <div className="mt-2 flex items-center gap-2">
                          <a
                            href={getEmailProviderURL(notif.email, notif.id)!}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-sm btn-primary text-white"
                          >
                            Open Email Inbox
                          </a>

                          {isRead && (
                            <span className="text-xs text-green-600 font-medium">
                              Dibaca
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        <div className="px-5 py-3 text-sm text-gray-700 dark:text-gray-600">
          Please check your email for further details.
        </div>
      </div>
    </div>
  );
};

export default Notifications;
