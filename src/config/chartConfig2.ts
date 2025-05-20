// chartConfig2.ts

interface GetChartOptionsParams {
  seriesVisibility: boolean[];
  seriesColors: string[];
  hoveredIndex: number | null;
}

const updateIncidentType = (newValue: string) => {
  localStorage.setItem("incidentType", newValue);
  window.dispatchEvent(new Event("localStorageUpdated"));
};

export const getChartOptions = ({
  seriesVisibility,
  seriesColors,
  hoveredIndex,
}: GetChartOptionsParams) => {
  const seriesColorsWithOpacity = seriesColors.map((hex, i) => {
    const isVisible = seriesVisibility[i];

    let opacity = 1;
    if (!isVisible) {
      opacity = 0;
    } else if (hoveredIndex !== null) {
      opacity = hoveredIndex === i ? 1 : 0.3;
    } else {
      opacity = 1;
    }

    const bigint = parseInt(hex.replace("#", ""), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgba(${r},${g},${b},${opacity})`;
  });

  return {
    chart: {
      id: "main-bar-chart", // HARUS SAMA
      type: "bar",
      height: "100%",
      width: "100%",
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 400,
        animateGradually: { enabled: true, delay: 100 },
        dynamicAnimation: { enabled: true, speed: 400 },
      },
      toolbar: { show: false },
      events: {
        dataPointSelection: function (event, chartContext, config) {
          const seriesName =
            chartContext.w.config.series[config.seriesIndex]?.name;
          if (seriesName) {
            const event = new CustomEvent("incidentBarClicked", {
              detail: seriesName,
            });
            window.dispatchEvent(event);
            updateIncidentType(seriesName);
            // localStorage.setItem("incidentType", seriesName);
          }

          setTimeout(() => {
            const el = document.getElementById("table-incident");
            if (el) {
              el.scrollIntoView({ behavior: "smooth" });
            }
          }, 600); // coba 500ms - 800ms
        },
        mouseMove: function (event, chartContext, config) {
          // Dapatkan posisi mouse
          const { offsetX, offsetY } = event;
          // Arahkan tooltip ke posisi mouse
          const tooltip = document.querySelector(".apexcharts-tooltip");
          if (tooltip) {
            tooltip.style.left = `${offsetX}px`;
            tooltip.style.top = `${offsetY + 15}px`;
          }
        },
      },
    },
    colors: seriesColorsWithOpacity.filter((_, i) => seriesVisibility[i]),
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "75%",
        borderRadius: 5,
        borderRadiusApplication: "end",
      },
    },
    dataLabels: { enabled: false },
    stroke: { show: true, width: 2, colors: ["transparent"] },
    xaxis: {
      categories: ["Week 1", "Week 2", "Week 3", "Week 4"],
      title: {
        text: "Weeks",
        style: {
          fontSize: "14px",
          fontWeight: 600,
          color: "#6B7280", // gray-500
        },
        offsetY: 5,
      },
      labels: {
        style: {
          fontSize: "12px",
          fontWeight: 500,
          colors: "#6B7280", // gray-500
        },
        rotate: -10,
        trim: true,
        offsetY: 2,
      },
      axisBorder: {
        show: true,
        color: "#E5E7EB", // tetap terang agar halus
        height: 1,
      },
      axisTicks: {
        show: false,
      },
      crosshairs: {
        show: true,
        stroke: {
          color: "#CBD5E1",
          width: 1,
          dashArray: 3,
        },
      },
    },
    yaxis: {
      title: {
        text: "Counts",
        style: {
          fontSize: "14px",
          fontWeight: 600,
          color: "#6B7280", // gray-500
        },
        offsetX: 0,
      },
      labels: {
        style: {
          fontSize: "12px",
          fontWeight: 500,
          colors: "#6B7280", // gray-500
        },
        formatter: (val: number) => (val > 0 ? val.toLocaleString() : ""),
        offsetX: 5,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      min: 0,
      decimalsInFloat: 0,
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      // y: {
      //   formatter: (val: number) => (val === 0 ? "" : val + " data"),
      // },
      shared: true,
      intersect: false,
      custom: function ({ series, seriesIndex, dataPointIndex, w }) {
        const categories = w.config.xaxis?.categories || [];
        const currentCategory =
          categories[dataPointIndex] || `Data ${dataPointIndex + 1}`;

        const total = series.reduce(
          (sum, s) => sum + (s[dataPointIndex] ?? 0),
          0
        );

        let tooltipContent = `
      <div style="font-weight:600; margin-bottom:2px;">${currentCategory}</div>
      <hr style="border-top: 0.8px solid #a4acc4; margin-bottom: 6px;" />
      <table style="font-family:monospace; font-size:13px;">`;

        w.config.series.forEach((s, i) => {
          const value = series[i][dataPointIndex];
          const color = w.config.colors?.[i] || "#000";

          tooltipContent += `
        <tr>
          <td><div style="width:10px;height:10px;background:${color};border-radius:50%;display:inline-block;margin-right:6px;"></div></td>
          <td style="white-space:nowrap;">${s.name}</td>
          <td style="padding-left:10px;">:</td>
          <td style="padding-left:6px; font-weight:600;">${value ?? 0} data</td>
        </tr>`;
        });

        tooltipContent += `
        <tr><td colspan="4"><hr style="border-top: 0.8px solid #a4acc4; margin-bottom: 2px;" /></td></tr>
        <tr>
          <td colspan="2" style="white-space:nowrap; font-weight:600;">TOTAL</td>
          <td style="padding-left:10px;">:</td>
          <td style="padding-left:6px; font-weight:600;">${total} data</td>
        </tr>
      </table>`;

        return `<div style="padding:10px 14px;">${tooltipContent}</div>`;
      },
    },
    // tooltip: {
    //   enabled: false, // matikan tooltip default
    // },
    legend: { show: false },
    responsive: [
      {
        breakpoint: 1024,
        options: {
          plotOptions: { bar: { columnWidth: "70%" } },
          xaxis: { labels: { style: { fontSize: "11px" } } },
          yaxis: { labels: { style: { fontSize: "11px" } } },
        },
      },
      {
        breakpoint: 640,
        options: {
          plotOptions: { bar: { columnWidth: "80%" } },
          xaxis: { labels: { style: { fontSize: "10px" } } },
          yaxis: { labels: { style: { fontSize: "10px" } } },
        },
      },
    ],
  };
};
