import clienteFetch from "../config/clienteFetch";
import config from "../config/authorization";
const obtenerEstadisticas = async (setResumenAnual) => {
  try {
    const token = localStorage.getItem("token");
    const request = await clienteFetch("/dashboard", config(token));
    const response = await request.json();
    setResumenAnual(response.resumenAnual);
  } catch (error) {
    console.log(error);
  }
};

export default obtenerEstadisticas;
