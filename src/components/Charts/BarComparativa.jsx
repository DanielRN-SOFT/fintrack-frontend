import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const BarComparativa = ({ labels, ingresos, egresos }) => {
  const data = {
    labels,
    datasets: [
      {
        label: "Ingresos",
        data: ingresos,
        backgroundColor: "#006d3c", // secondary
        borderRadius: 6,
        barPercentage: 0.5,
        categoryPercentage: 0.5,
      },
      {
        label: "Egresos",
        data: egresos,
        backgroundColor: "#ba1a1a", // error
        borderRadius: 6,
        barPercentage: 0.5,
        categoryPercentage: 0.5,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#161c27",
          font: {
            family: "Inter",
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (ctx) =>
            `${ctx.dataset.label}: $${ctx.raw.toLocaleString("es-CO")}`,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#43474f",
        },
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          color: "#43474f",
          callback: (value) => `$${value.toLocaleString("es-CO")}`,
        },
        grid: {
          color: "rgba(0,0,0,0.05)",
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default BarComparativa;
