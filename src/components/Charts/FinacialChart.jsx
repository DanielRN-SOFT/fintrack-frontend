import {
  Chart as ChartJS,
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Chart } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
);

const FinancialChart = ({ labels, ingresos, egresos, balance }) => {
  const data = {
    labels,
    datasets: [
      // INGRESOS (línea)
      {
        type: "line",
        label: "Ingresos",
        data: ingresos,
        borderColor: "#006d3c", // secondary
        backgroundColor: "rgba(0,109,60,0.1)",
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: "#006d3c",
      },

      // EGRESOS (línea)
      {
        type: "line",
        label: "Egresos",
        data: egresos,
        borderColor: "#ba1a1a", // error
        backgroundColor: "rgba(186,26,26,0.1)",
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: "#ba1a1a",
      },

      // BALANCE (barras)
      {
        type: "bar",
        label: "Balance",
        data: balance,
        backgroundColor: balance.map(
          (v) => (v >= 0 ? "#002d5e" : "#ba1a1a"), // primary vs error
        ),
        borderRadius: 6,
      },
    ],
  };


  const options = {
    responsive: true,
    maintainAspectRatio: false, // clave para Tailwind
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#161c27", // on-surface
          font: {
            family: "Inter",
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#43474f", // on-surface-variant
        },
        grid: {
          color: "rgba(0,0,0,0.05)",
        },
      },
      y: {
        ticks: {
          color: "#43474f",
        },
        grid: {
          color: "rgba(0,0,0,0.05)",
        },
      },
    },
  };

  return <Chart data={data} options={options} />;
};

export default FinancialChart;
