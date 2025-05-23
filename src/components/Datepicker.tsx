import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Datepicker = ({ value, onChange, month, year, day }) => {
  const today = new Date();
  const [date, setDate] = useState(value || today);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(date.getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(date.getFullYear());
  const [selectedDay, setSelectedDay] = useState(date.getDate());
  const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false);
  const [currentPicker, setCurrentPicker] = useState(
    day ? "day" : month ? "month" : year ? "year" : null
  );

  const calendarRef = useRef(null);
  const dropdownRef = useRef(null);
  const selectedYearRef = useRef(null);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const years = Array.from(
    { length: 50 },
    (_, i) => today.getFullYear() - 25 + i
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setIsOpen(false);
        setIsYearDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isYearDropdownOpen && selectedYearRef.current) {
      selectedYearRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [isYearDropdownOpen]);

  const handleDateChange = () => {
    const newDate = new Date(selectedYear, selectedMonth - 1, selectedDay);
    setDate(newDate);
    setIsOpen(false);

    if (typeof window !== "undefined") {
      if (month) {
        localStorage.setItem("selectedMonth", selectedMonth.toString());
      }
      if (year) {
        localStorage.setItem("selectedYear", selectedYear.toString());
      }
      if (day) {
        localStorage.setItem("selectedDay", selectedDay.toString());
      }
      window.dispatchEvent(new Event("localStorageUpdated"));
    }

    if (onChange) onChange(newDate);
  };

  const getDaysInMonth = (year, month) => {
    return new Date(year, month, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month - 1, 1).getDay();
  };

  let displayValue = "";
  if (month && year && day) {
    displayValue = `${selectedDay} ${
      months[selectedMonth - 1]
    } ${selectedYear}`;
  } else if (month && year) {
    displayValue = `${months[selectedMonth - 1]} ${selectedYear}`;
  } else if (month && day) {
    displayValue = `${selectedDay} ${months[selectedMonth - 1]}`;
  } else if (year && day) {
    displayValue = `${selectedDay} ${selectedYear}`;
  } else if (month) {
    displayValue = months[selectedMonth - 1];
  } else if (year) {
    displayValue = selectedYear.toString();
  } else if (day) {
    displayValue = selectedDay.toString();
  }

  let filterGrid = 0;
  if (day) {
    filterGrid += 1;
  }
  if (month) {
    filterGrid += 1;
  }
  if (year) {
    filterGrid += 1;
  }

  return (
    <div
      className="relative inline-block w-full h-10 max-w-56 min-w-56"
      ref={calendarRef}
    >
      {month || year || day ? (
        <>
          <div className="shadow-md shadow-gray-300 flex items-center border-2 rounded-lg dark:border-gray-300 dark:bg-gray-100 dark:text-gray-800 border-gray-300 bg-white text-black">
            {/* <input
              className="rounded-md w-full px-4 py-2 focus:ring-0 cursor-pointer text-xs font-semibold dark:bg-gray-100 dark:text-gray-800 bg-white text-black"
              placeholder="Select Date"
              type="text"
              value={displayValue}
              readOnly
              onClick={() => setIsOpen(!isOpen)}
              style={{ pointerEvents: "none" }}
            /> */}
            <span className="px-4 w-full text-sm">{displayValue}</span>
            <button
              className="btn rounded-md text-white dark:text-gray-900 btn-icon transition-transform hover:scale-[105%] active:scale-[105%] dark:bg-blue-700 dark:border-blue-700 bg-blue-600 border-blue-600"
              onClick={() => setIsOpen(!isOpen)}
            >
              <i className="ki-filled ki-calendar"></i>
            </button>
          </div>
        </>
      ) : null}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute z-10 mt-2 w-full shadow-md shadow-gray-300 rounded-lg p-4 border flex flex-col space-y-4 dark:bg-gray-100 dark:border-gray-300 bg-white border-gray-300"
          >
            <div className={`grid grid-cols-${filterGrid} gap-2`}>
              {day && (
                <motion.button
                  key="day-button"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className={`px-4 py-2 rounded-lg border dark:border-gray-300 border-gray-300 relative flex items-center justify-center`} // Menambahkan flex items-center justify-center
                  onClick={() => setCurrentPicker("day")}
                >
                  Day
                  {currentPicker === "day" && (
                    <motion.div
                      layoutId="active-indicator"
                      className="absolute bottom-0 left-0 w-full h-1 bg-blue-600 dark:bg-blue-700 rounded-b-lg"
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </motion.button>
              )}
              {month && (
                <motion.button
                  key="month-button"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className={`px-4 py-2 rounded-lg border dark:border-gray-300 border-gray-300 relative flex items-center justify-center`} // Menambahkan flex items-center justify-center
                  onClick={() => setCurrentPicker("month")}
                >
                  Month
                  {currentPicker === "month" && (
                    <motion.div
                      layoutId="active-indicator"
                      className="absolute bottom-0 left-0 w-full h-1 bg-blue-600 dark:bg-blue-700 rounded-b-lg"
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </motion.button>
              )}
              {year && (
                <motion.button
                  key="year-button"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                  className={`px-4 py-2 rounded-lg border dark:border-gray-300 border-gray-300 relative flex items-center justify-center`} // Menambahkan flex items-center justify-center
                  onClick={() => setCurrentPicker("year")}
                >
                  Year
                  {currentPicker === "year" && (
                    <motion.div
                      layoutId="active-indicator"
                      className="absolute bottom-0 left-0 w-full h-1 bg-blue-600 dark:bg-blue-700 rounded-b-lg"
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </motion.button>
              )}
            </div>

            <AnimatePresence initial={false} mode="wait">
              <motion.div
                key={currentPicker}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {currentPicker === "day" && day && (
                  <div>
                    <div className="grid grid-cols-7 gap-2 mb-2">
                      {daysOfWeek.map((dayName) => (
                        <div
                          key={dayName}
                          className="text-center text-xs font-semibold dark:text-gray-800"
                        >
                          {dayName}
                        </div>
                      ))}
                    </div>
                    <div className="grid grid-cols-7 gap-2">
                      {Array.from(
                        {
                          length:
                            getFirstDayOfMonth(selectedYear, selectedMonth) +
                            getDaysInMonth(selectedYear, selectedMonth),
                        },
                        (_, i) =>
                          i -
                          getFirstDayOfMonth(selectedYear, selectedMonth) +
                          1
                      ).map((d) => (
                        <div
                          key={d}
                          className={`flex items-center justify-center w-7 h-7 text-sm font-semibold text-center rounded-full border cursor-pointer transition-transform hover:scale-[115%] active:scale-[100%]
                            border-blue-400 hover:bg-blue-400 dark:border-blue-500 dark:text-gray-800 hover:text-white dark:hover:text-white dark:hover:bg-blue-500
                            ${
                              selectedDay === d && d > 0
                                ? "bg-blue-600 !border-blue-600 dark:bg-blue-700 dark:!border-blue-700 !text-white"
                                : ""
                            }
                            ${
                              today.getDate() === d &&
                              today.getMonth() + 1 === selectedMonth &&
                              today.getFullYear() === selectedYear &&
                              d > 0
                                ? "font-bold"
                                : ""
                            }
                            ${d <= 0 ? "opacity-0 pointer-events-none" : ""}
                          `}
                          onClick={() => d > 0 && setSelectedDay(d)}
                        >
                          {d > 0 && d}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {currentPicker === "month" && month && (
                  <div className="grid grid-cols-3 gap-2">
                    {months.map((m, index) => (
                      <div
                        key={index}
                        className={`flex items-center justify-center px-4 py-2 text-center rounded-lg border cursor-pointer transition-transform hover:scale-[110%] active:scale-[100%]
                          border-blue-400 hover:bg-blue-400 dark:border-blue-500 dark:text-gray-800 hover:text-white dark:hover:text-white dark:hover:bg-blue-500
                          ${
                            selectedMonth === index + 1
                              ? "bg-blue-600 !border-blue-600 dark:bg-blue-700 dark:!border-blue-700 !text-white"
                              : ""
                          }
                        `}
                        onClick={() => setSelectedMonth(index + 1)}
                      >
                        {m.slice(0, 3)}
                      </div>
                    ))}
                  </div>
                )}

                {currentPicker === "year" && year && (
                  <div className="relative">
                    <motion.div
                      className="w-full px-4 py-2 rounded-lg !shadow-md !shadow-gray-300 !border-2 !border-gray-300 bg-white text-sm font-semibold cursor-pointer transition-all dark:bg-gray-100 dark:text-gray-800"
                      initial={{ borderColor: "#d1d5db" }}
                      animate={{
                        borderColor: isYearDropdownOpen ? "#3b82f6" : "#d1d5db",
                      }}
                      whileHover={{ borderColor: "#60a5fa" }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      onClick={() => setIsYearDropdownOpen(!isYearDropdownOpen)}
                    >
                      {selectedYear}
                    </motion.div>

                    <AnimatePresence>
                      {isYearDropdownOpen && (
                        <motion.div
                          ref={dropdownRef}
                          className="absolute w-full bg-white text-xs font-semibold shadow-lg border border-gray-300 max-h-40 overflow-y-auto mt-1 rounded-lg z-20 dark:bg-gray-100 dark:border-gray-300 dark:text-gray-800"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          style={{
                            scrollbarWidth: "thin",
                            scrollbarColor: "#cbd5e1 transparent",
                          }}
                        >
                          {years.slice(0, 30).map((y) => (
                            <div
                              key={y}
                              ref={selectedYear === y ? selectedYearRef : null}
                              className={`px-4 py-2 cursor-pointer ${
                                selectedYear === y
                                  ? "bg-blue-600 dark:bg-blue-700 text-white rounded-lg"
                                  : "hover:bg-blue-300 dark:hover:bg-blue-400 hover:rounded-lg dark:hover:text-gray-100"
                              }`}
                              onClick={() => {
                                setSelectedYear(y);
                                setIsYearDropdownOpen(false);
                              }}
                            >
                              {y}
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            <button
              className="w-full rounded-lg text-md font-semibold text-white px-4 py-1 transition-transform hover:scale-[105%] active:scale-[100%] dark:bg-green-700 dark:hover:bg-green-800 bg-green-600 hover:bg-green-700"
              onClick={handleDateChange}
            >
              Submit
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Datepicker;
