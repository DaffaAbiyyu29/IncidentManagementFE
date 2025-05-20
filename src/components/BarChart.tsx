import axios from "axios";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { getChartOptions } from "@/config/chartConfig2";
import { useMemo } from "react";
import html2canvas from "html2canvas";
const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

export const BarChart = (selectedDate) => {
  const [loading, setLoading] = useState(false);
  const [chartDataBilling, setChartDataBilling] = useState(null);
  const [chartDataAR, setChartDataAR] = useState(null);
  const [chartDataMH, setChartDataMH] = useState([]);
  const [chartDataPredictiveDelay, setChartDataPredictiveDelay] =
    useState(null);
  const [chartDataVendor, setChartDataVendor] = useState(null);
  const [chartDataSubcont, setChartDataSubcont] = useState(null);

  const extractChartData = (result: any, key: string) => {
    const countsObj = result?.[key]?.counts || {};
    const weeks = Object.keys(countsObj).sort((a, b) => {
      // Extract week numbers to sort them in order (week 1, week 2, etc.)
      const weekNumberA = parseInt(a.split(" ")[1]);
      const weekNumberB = parseInt(b.split(" ")[1]);
      return weekNumberA - weekNumberB;
    });
    return weeks.map((week) => countsObj[week]?.count ?? 0);
  };

  const date = selectedDate.selectedDate;

  const fetchChartData = async () => {
    setLoading(true);
    try {
      const month = date
        ? date.getMonth()
        : new Date().getMonth();
      const year = date
        ? date.getFullYear()
        : new Date().getFullYear();

      const response = await axios.get(
        `http://localhost:3000/api/chart?month=${month + 1}&year=${year}`
      );

      const result = response.data?.data?.result;

      // Extract chart data for all categories
      setChartDataBilling(extractChartData(result, "Pending Billing"));
      setChartDataAR(extractChartData(result, "Pending AR"));
      setChartDataMH(extractChartData(result, "Manhour Discrepancy"));
      setChartDataPredictiveDelay(
        extractChartData(result, "Predictive Potential Delay")
      );
      setChartDataVendor(extractChartData(result, "Vendor Delivery"));
      setChartDataSubcont(extractChartData(result, "Subcont Delivery"));
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // setMounted(true);
    fetchChartData();
  }, [selectedDate]);

  // Initial series data
  function generateRandomData(length, min = 1, max = 10) {
    return Array.from(
      { length },
      () => Math.floor(Math.random() * (max - min + 1)) + min
    );
  }

  // const initialSeries = useMemo(
  //   () => [
  //     { name: "Pending Billing", data: generateRandomData(4) },
  //     { name: "Pending AR", data: generateRandomData(4) },
  //     { name: "Manhour Discrepancy", data: generateRandomData(4) },
  //     { name: "Predictive Potential Delay", data: generateRandomData(4) },
  //     { name: "Vendor Delivery", data: generateRandomData(4) },
  //     { name: "Subcont Delivery", data: generateRandomData(4) },
  //   ],
  //   []
  // );

  const initialSeries = [
    { name: "Pending Billing", data: chartDataBilling || [] },
    { name: "Pending AR", data: chartDataAR || [] },
    { name: "Manhour Discrepancy", data: chartDataMH || [] },
    {
      name: "Predictive Potential Delay",
      data: chartDataPredictiveDelay || [],
    },
    { name: "Vendor Delivery", data: chartDataVendor || [] },
    { name: "Subcont Delivery", data: chartDataSubcont || [] },
  ];

  const iconMap: Record<string, string> = {
    "Pending Billing": "ki-notepad-bookmark",
    "Pending AR": "ki-dollar",
    "Manhour Discrepancy": "ki-users",
    "Predictive Potential Delay": "ki-wrench",
    "Vendor Delivery": "ki-delivery",
    "Subcont Delivery": "ki-parcel",
  };

  // Warna sesuai urutan series
  const seriesColors = [
    "#255F38",
    "#DDA853",
    "#8A2D3B",
    "#BB3E00",
    "#27548A",
    "#60B5FF",
  ];

  // State visibility per series
  const [seriesVisibility, setSeriesVisibility] = useState<boolean[]>(
    initialSeries.map(() => true)
  );

  // State untuk menyimpan index series yang sedang di-hover
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Toggle series visibility
  const toggleSeries = (index: number) => {
    const updated = [...seriesVisibility];
    updated[index] = !updated[index];
    setSeriesVisibility(updated);
  };

  // Series yang hanya visible
  const processedSeries = initialSeries.filter((_, i) => seriesVisibility[i]);

  // Chart options
  const chartOptions = getChartOptions({
    seriesVisibility,
    seriesColors,
    hoveredIndex, // Tambah ini
  });

  const handleDownload = async () => {
    const chartElement = document.querySelector(".apexcharts-canvas");

    // Pastikan elemen yang ditemukan adalah HTMLElement
    if (!(chartElement instanceof HTMLElement)) {
      return alert("Chart belum ketemu!");
    }

    try {
      const canvas = await html2canvas(chartElement); // Ambil screenshot chart
      const pngData = canvas.toDataURL("image/png"); // Convert ke PNG

      const a = document.createElement("a");
      a.href = pngData;
      a.download = `chart-${new Date().toISOString().slice(0, 10)}.png`;
      a.click();
    } catch (error) {
      console.error("Error capturing screenshot", error);
    }
  };
  return (
    <>
      <div className="flex flex-wrap justify-center gap-2 mb-4">
        {initialSeries.map((s, i) => {
          const color = seriesColors[i];
          const isVisible = seriesVisibility[i];

          return (
            <button
              key={i}
              onMouseEnter={() => setHoveredIndex(i)} // Saat hover
              onMouseLeave={() => setHoveredIndex(null)} // Saat keluar hover
              onClick={() => toggleSeries(i)}
              className={`flex flex-col items-center justify-center gap-1 w-[180px] h-24 rounded-lg text-sm font-medium border-t border-l border-r border-b-4 transition-all duration-300 ${
                isVisible ? "text-white" : "text-gray-600 dark:text-gray-300"
              }`} // Perbaikan di sini
              style={{
                borderColor: isVisible ? "#1b84ff" : "#b5b7c8", // Sama rata menggunakan warna biru jika terlihat, abu-abu jika tidak
                borderBottomColor: isVisible ? "#1b84ff" : "#b5b7c8", // Border bawah biru saat terlihat
                backgroundColor: "transparent", // Background transparan karena menggunakan kelas tailwind
                color: isVisible ? "#1b84ff" : "#b5b7c8", // Warna teks biru saat terlihat
              }}
            >
              <i className={`ki-solid ${iconMap[s.name]} text-2xl`}></i>
              <span className="capitalize text-center">{s.name}</span>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[5fr_1fr] gap-6">
        {/* Chart Card */}
        <div className="bg-gray-50 dark:bg-[#1a1c23] border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm p-4">
          {loading ? (
            <div className="flex items-center justify-center h-40">
              <svg
                className="animate-spin h-8 w-8 text-gray-600 dark:text-gray-300"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                ></path>
              </svg>
            </div>
          ) : (
            <div style={{ minHeight: 300, height: "100%", width: "100%" }}>
              <ApexCharts
                key={JSON.stringify(seriesVisibility)}
                options={chartOptions}
                series={processedSeries}
                type="bar"
                height={350}
              />
            </div>
          )}
        </div>

        {/* Keterangan Card */}

        <div className="bg-gray-50 dark:bg-[#1a1c23] border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm p-4">
          <ul className="space-y-2">
            {initialSeries.map((s, i) => (
              <li key={i} className="flex items-center gap-2 text-sm">
                {/* Kotak warna */}
                <span
                  className="inline-block w-3 h-3 rounded-sm"
                  style={{ backgroundColor: seriesColors[i] }}
                ></span>
                {/* Nama series */}
                <span className="capitalize font-bold dark:text-gray-800">
                  {s.name}
                </span>
              </li>
            ))}
          </ul>

          <button
            onClick={handleDownload}
            className="mt-4 w-full flex items-center justify-center gap-2 bg-primary text-white font-medium py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors duration-200"
          >
            <i className="ki-solid ki-arrow-down"></i>
            Download
          </button>
        </div>
      </div>
    </>
  );
};
