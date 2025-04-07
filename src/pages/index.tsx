import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Main from "../main-layouts/main";
import { getAreaChartConfig } from "../config/chartConfig";
import Datepicker from "../components/Datepicker";
import axios from "axios";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const Home = () => {
  const [mounted, setMounted] = useState(false);
  const [chartDataMH, setChartDataMH] = useState<number[]>([]);
  const [chartDataAR, setChartDataAR] = useState<number[]>([]);
  const [chartDataBilling, setChartDataBilling] = useState<number[]>([]);
  const [chartDataOperation, setChartDataOperation] = useState<number[]>([]);
  const [chartDataVendor, setChartDataVendor] = useState<number[]>([]);
  const [chartDataSubcont, setChartDataSubcont] = useState<number[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
    fetchDataMH();
    fetchDataAR();
    fetchDataBilling();
    fetchDataOperation();
    fetchDataVendor();
    fetchDataSubcont();
  }, [selectedDate]);

  const fetchDataMH = async () => {
    setLoading(true);
    try {
      const year = selectedDate
        ? selectedDate.getFullYear()
        : new Date().getFullYear();
      const response = await axios.get(
        `http://localhost:3000/api/process-mh-unit-count?year=${year}`
      );

      if (response.data.success) {
        const monthlyData = {};
        for (let i = 1; i <= 12; i++) {
          monthlyData[i] = 0;
        }

        response.data.data.data.forEach((item) => {
          monthlyData[item.month] = item.count;
        });

        setChartDataMH(Object.values(monthlyData));
      } else {
        console.error("Failed to fetch data:", response.data.data.message);
        setChartDataMH([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setChartDataMH([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchDataAR = async () => {
    setLoading(true);
    try {
      const year = selectedDate
        ? selectedDate.getFullYear()
        : new Date().getFullYear();
      const response = await axios.get(
        `http://localhost:3000/api/pending-ar-count?year=${year}`
      );

      if (response.data.success) {
        const monthlyData = {};
        for (let i = 1; i <= 12; i++) {
          monthlyData[i] = 0;
        }

        response.data.data.data.forEach((item) => {
          monthlyData[item.month] = item.count;
        });

        setChartDataAR(Object.values(monthlyData));
      } else {
        console.error("Failed to fetch data:", response.data.data.message);
        setChartDataAR([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setChartDataAR([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchDataBilling = async () => {
    setLoading(true);
    try {
      const year = selectedDate
        ? selectedDate.getFullYear()
        : new Date().getFullYear();
      const response = await axios.get(
        `http://localhost:3000/api/pending-billing-count?year=${year}`
      );

      if (response.data.success) {
        const monthlyData = {};
        for (let i = 1; i <= 12; i++) {
          monthlyData[i] = 0;
        }

        response.data.data.data.forEach((item) => {
          monthlyData[item.month] = item.count;
        });

        setChartDataBilling(Object.values(monthlyData));
      } else {
        console.error("Failed to fetch data:", response.data.data.message);
        setChartDataBilling([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setChartDataBilling([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchDataOperation = async () => {
    setLoading(true);
    try {
      const year = selectedDate
        ? selectedDate.getFullYear()
        : new Date().getFullYear();
      const response = await axios.get(
        `http://localhost:3000/api/schedule-recommendation-count?year=${year}`
      );

      if (response.data.success) {
        const monthlyData = {};
        for (let i = 1; i <= 12; i++) {
          monthlyData[i] = 0;
        }

        response.data.data.data.forEach((item) => {
          monthlyData[item.month] = item.count;
        });

        setChartDataOperation(Object.values(monthlyData));
      } else {
        console.error("Failed to fetch data:", response.data.data.message);
        setChartDataOperation([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setChartDataOperation([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchDataVendor = async () => {
    setLoading(true);
    try {
      const year = selectedDate
        ? selectedDate.getFullYear()
        : new Date().getFullYear();
      const response = await axios.get(
        `http://localhost:3000/api/vendor-performance-count?year=${year}`
      );

      if (response.data.success) {
        const monthlyData = {};
        for (let i = 1; i <= 12; i++) {
          monthlyData[i] = 0;
        }

        response.data.data.data.forEach((item) => {
          monthlyData[item.month] = item.count;
        });

        setChartDataVendor(Object.values(monthlyData));
      } else {
        console.error("Failed to fetch data:", response.data.data.message);
        setChartDataVendor([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setChartDataVendor([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchDataSubcont = async () => {
    setLoading(true);
    try {
      const year = selectedDate
        ? selectedDate.getFullYear()
        : new Date().getFullYear();
      const response = await axios.get(
        `http://localhost:3000/api/vendor-performance-count?year=${year}`
      );

      if (response.data.success) {
        const monthlyData = {};
        for (let i = 1; i <= 12; i++) {
          monthlyData[i] = 0;
        }

        response.data.data.data.forEach((item) => {
          monthlyData[item.month] = item.count;
        });

        setChartDataSubcont(Object.values(monthlyData));
      } else {
        console.error("Failed to fetch data:", response.data.data.message);
        setChartDataSubcont([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setChartDataSubcont([]);
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) {
    return null;
  }

  const areaChartConfigMH = getAreaChartConfig(chartDataMH);
  const areaChartConfigAR = getAreaChartConfig(chartDataAR);
  const areaChartConfigBilling = getAreaChartConfig(chartDataBilling);
  const areaChartConfigOperation = getAreaChartConfig(chartDataOperation);
  const areaChartConfigVendor = getAreaChartConfig(chartDataVendor);
  const areaChartConfigSubcont = getAreaChartConfig(chartDataSubcont);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <Main>
      <div className="p-6 shadow-md shadow-gray-300 rounded-lg dark:border-gray-300 dark:bg-[#111217] dark:text-white border-gray-300 bg-white text-black mb-2">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold dark:text-gray-800">
            INCIDENT MANAGEMENT SYSTEM
          </h2>
          <Datepicker
            value={selectedDate}
            onChange={handleDateChange}
            day={false}
            month={false}
            year={true}
          />
        </div>

        <hr className="h-0.5 bg-gray-300 dark:bg-gray-400 border-none mb-4" />

        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="w-full md:w-1/2">
            <div className="card shadow-md shadow-gray-300">
              <div className="card-header">
                <h3 className="card-title dark:text-gray-800">Pending AR</h3>
              </div>
              <div className="px-3 py-1">
                {loading ? (
                  <p className="dark:text-gray-800">Loading...</p>
                ) : (
                  <ReactApexChart
                    options={areaChartConfigAR}
                    series={areaChartConfigAR.series}
                    type="area"
                    height={250}
                  />
                )}
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2">
            <div className="card shadow-md shadow-gray-300">
              <div className="card-header">
                <h3 className="card-title dark:text-gray-800">
                  Pending Billing
                </h3>
              </div>
              <div className="px-3 py-1">
                {loading ? (
                  <p className="dark:text-gray-800">Loading...</p>
                ) : (
                  <ReactApexChart
                    options={areaChartConfigBilling}
                    series={areaChartConfigBilling.series}
                    type="area"
                    height={250}
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="w-full md:w-1/2">
            <div className="card shadow-md shadow-gray-300">
              <div className="card-header">
                <h3 className="card-title dark:text-gray-800">
                  Manhour Utilization
                </h3>
              </div>
              <div className="px-3 py-1">
                {loading ? (
                  <p className="dark:text-gray-800">Loading...</p>
                ) : (
                  <ReactApexChart
                    options={areaChartConfigMH}
                    series={areaChartConfigMH.series}
                    type="area"
                    height={250}
                  />
                )}
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2">
            <div className="card shadow-md shadow-gray-300">
              <div className="card-header">
                <h3 className="card-title dark:text-gray-800">
                  Delay Operation
                </h3>
              </div>
              <div className="px-3 py-1">
                {loading ? (
                  <p className="dark:text-gray-800">Loading...</p>
                ) : (
                  <ReactApexChart
                    options={areaChartConfigOperation}
                    series={areaChartConfigOperation.series}
                    type="area"
                    height={250}
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-1/2">
            <div className="card shadow-md shadow-gray-300">
              <div className="card-header">
                <h3 className="card-title dark:text-gray-800">
                  Vendor Performance
                </h3>
              </div>
              <div className="px-3 py-1">
                {loading ? (
                  <p className="dark:text-gray-800">Loading...</p>
                ) : (
                  <ReactApexChart
                    options={areaChartConfigVendor}
                    series={areaChartConfigVendor.series}
                    type="area"
                    height={250}
                  />
                )}
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2">
            <div className="card shadow-md shadow-gray-300">
              <div className="card-header">
                <h3 className="card-title dark:text-gray-800">
                  Subcont Performance
                </h3>
              </div>
              <div className="px-3 py-1">
                {loading ? (
                  <p className="dark:text-gray-800">Loading...</p>
                ) : (
                  <ReactApexChart
                    options={areaChartConfigSubcont}
                    series={areaChartConfigSubcont.series}
                    type="area"
                    height={250}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Main>
  );
};

export default Home;
