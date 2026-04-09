import { Outlet, Navigate } from "react-router-dom";
import SideBar from "../components/Private-Routes/SideBar";
import useAuth from "../hooks/useAuth";
import NavBar from "../components/Private-Routes/NavBar";
const PrivadoLayout = () => {
  const { auth, cargando } = useAuth();

  if (cargando) return "cargando...";

  return (
    <>
      <SideBar />
      <NavBar />
      {auth.id ? <Outlet /> : <Navigate to="/" />}
    </>
  );
};
export default PrivadoLayout;
