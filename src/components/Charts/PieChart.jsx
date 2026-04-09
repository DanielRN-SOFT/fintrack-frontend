import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

const themeColors = [
  "#002d5e",
  "#006d3c",
  "#003434",
  "#ba1a1a",
  "#3e5f92",
  "#70fda7",
  "#93f2f2",
  "#a9c7ff",
];

const getThemeColors = (count) => {
  return Array.from({ length: count }, (_, i) => {
    return themeColors[i % themeColors.length];
  });
};

const DoughnutChart = ({ labels, datasets }) => {
  const colors = getThemeColors(labels.length);

  const data = {
    labels,
    datasets: datasets.map((dataset) => ({
      ...dataset,
      backgroundColor: colors,
      borderWidth: 0,
    })),
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#43474f", // on-surface-variant
        },
      },
    },
  };

  return <Doughnut data={data} options={options} />;
};

export default DoughnutChart;
