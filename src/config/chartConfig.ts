import { ApexOptions } from "apexcharts";
import { tr } from "date-fns/locale";

// export const categories = [
//   "Jan",
//   "Feb",
//   "Mar",
//   "Apr",
//   "May",
//   "Jun",
//   "Jul",
//   "Aug",
//   "Sep",
//   "Oct",
//   "Nov",
//   "Dec",
// ];

// export const categoriesTooltip = [
//   "January",
//   "February",
//   "March",
//   "April",
//   "May",
//   "June",
//   "July",
//   "August",
//   "September",
//   "October",
//   "November",
//   "December",
// ];

export const categories = ["Week 1", "Week 2", "Week 3", "Week 4"];

export const getAreaChartConfig = (
  chartData: number[],
  month: number,
  year: number,
  type?: string
): ApexOptions => {
  let monthName: string;
  switch (month) {
    case 1:
      monthName = "January";
      break;
    case 2:
      monthName = "February";
      break;
    case 3:
      monthName = "March";
      break;
    case 4:
      monthName = "April";
      break;
    case 5:
      monthName = "May";
      break;
    case 6:
      monthName = "June";
      break;
    case 7:
      monthName = "July";
      break;
    case 8:
      monthName = "August";
      break;
    case 9:
      monthName = "September";
      break;
    case 10:
      monthName = "October";
      break;
    case 11:
      monthName = "November";
      break;
    case 12:
      monthName = "December";
      break;
  }

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
        show: true,
        tools: {
          download: false,
          selection: false,
          zoom: false,
          zoomin: false,
          zoomout: false,
          pan: false,
          reset: false,
          // customIcons: [
          //   {
          //     icon: '<i class="ki-duotone ki-file-down text-blue-900 dark:text-blue-400"></i>',
          //     title: "Download PNG",
          //     class: "download-icon",
          //     click: function (chart) {
          //       chart
          //         .dataURI()
          //         .then(({ imgURI }) => {
          //           const link = document.createElement("a");
          //           link.href = imgURI;
          //           link.download = `chart-${type}-${monthName}-${new Date().getFullYear()}.png`;
          //           document.body.appendChild(link); // append link to body to avoid restrictions
          //           link.click();
          //           document.body.removeChild(link); // clean up after click
          //         })
          //         .catch((error) => {
          //           console.error("Error downloading chart:", error);
          //         });
          //     },
          //   },
          //   {
          //     icon: '<i class="ki-duotone ki-arrows-circle text-yellow-600 dark:text-yellow-400"></i>',
          //     title: "Reset",
          //     class: "reset-icon",
          //     click: function (chart) {
          //       chart.updateOptions({
          //         xaxis: {
          //           categories: categories,
          //           min: undefined,
          //           max: undefined,
          //         },
          //       });
          //     },
          //   },
          // ],
        },
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
        show: true,
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
        const week = categories[dataPointIndex];

        const formatter = new Intl.NumberFormat("id-ID", {
          style: "decimal", // Display as a regular number
        });

        const formattedValue = formatter.format(value);

        return `
          <div class="flex flex-col gap-2 p-3.5">
            <div class="font-medium text-2sm text-gray-600">
              Data ${week} ${monthName} ${year}
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
