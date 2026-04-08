import { Outlet, Navigate } from "react-router-dom";
import SideBar from "../components/Private-Routes/SideBar";
import useAuth from "../hooks/useAuth";
import NavBar from "../components/Private-Routes/NavBar";
const PrivadoLayout = () => {
  const { auth, cargando } = useAuth();

  console.log(auth);
  console.log(cargando);
  if (cargando) return "cargando...";

  return (
    <>
      <SideBar />
      <NavBar/>
      <main>{auth.id ? <Outlet /> : <Navigate to="/" />}</main>
    </>
  );
};
export default PrivadoLayout;
