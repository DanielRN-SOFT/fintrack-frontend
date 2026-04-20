import config from "../config/authorization";
import clienteFetch from "../config/clienteFetch";
const obtenerTransacciones = async (setTransacciones) => {
  try {
    const token = localStorage.getItem("token");
    const request = await clienteFetch("/transacciones", config(token));
    const response = await request.json();
    setTransacciones(response);
    // setCargando(false);
  } catch (error) {
    console.log(error);
  }
};

export default obtenerTransacciones;
