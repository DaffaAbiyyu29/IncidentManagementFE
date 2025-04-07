import { ApexOptions } from "apexcharts";

export const categories = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const getAreaChartConfig = (
  chartData: number[],
  year: number = new Date().getFullYear()
): ApexOptions => {
  return {
    series: [
      {
        name: "Data",
        data: chartData,
      },
    ],
    chart: {
      height: 250,
      type: "area",
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    stroke: {
      curve: "smooth",
      show: true,
      width: 3,
      colors: ["#3b82f6"],
    },
    xaxis: {
      categories: categories,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          colors: "#6B7280",
          fontSize: "12px",
        },
      },
    },
    yaxis: {
      min: 0,
      tickAmount: 5,
      labels: {
        style: {
          colors: "#6B7280",
          fontSize: "12px",
        },
        formatter: (value: number) => value.toString(), // Format y-axis labels
      },
    },
    tooltip: {
      enabled: true,
      custom({ series, seriesIndex, dataPointIndex, w }: any) {
        const value = series[seriesIndex][dataPointIndex];
        const monthName = categories[dataPointIndex];

        const formatter = new Intl.NumberFormat("id-ID", {
          style: "decimal", // Display as a regular number
        });

        const formattedValue = formatter.format(value);

        return `
          <div class="flex flex-col gap-2 p-3.5">
            <div class="font-medium text-2sm text-gray-600">
              Data ${monthName}, ${year}
            </div>
            <div class="flex items-center gap-1.5">
              <div class="font-semibold text-md text-gray-900">
                ${formattedValue}
              </div>
            </div>
          </div>
        `;
      },
    },
    fill: {
      gradient: {
        opacityFrom: 0.25,
        opacityTo: 0,
      },
    },
    grid: {
      borderColor: "#E5E7EB",
      strokeDashArray: 5,
      yaxis: {
        lines: {
          show: true,
        },
      },
      xaxis: {
        lines: {
          show: false,
        },
      },
    },
  };
};
