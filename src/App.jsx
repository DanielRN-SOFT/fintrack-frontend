import { Routes, Route } from "react-router-dom";
import AuthLayout from "./layout/AuthLayout";
import Login from "./pages/Login";
import Registrar from "./pages/Registrar";
import ForgotPassword from "./pages/ForgotPassword";
import NuevoPassword from "./pages/NuevoPassword";
import ConfirmarCuenta from "./pages/ConfirmarCuenta";
import { AuthProvider } from "./context/AuthProvider";
import PrivadoLayout from "./layout/PrivadoLayout";
import Dashboard from "./pages/Dashboard";
import Transacciones from "./pages/Transacciones";
function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<AuthLayout />}>
            <Route index element={<Login />}></Route>
            <Route path="sign-up" element={<Registrar />}></Route>
            <Route path="forgot-password" element={<ForgotPassword />}></Route>
            <Route
              path="change-password/:token"
              element={<NuevoPassword />}
            ></Route>
            <Route
              path="confirmar/:token"
              element={<ConfirmarCuenta />}
            ></Route>
          </Route>
          <Route path="/admin" element={<PrivadoLayout />}>
            <Route index element={<Dashboard />}></Route>
            <Route path="transacciones" element={<Transacciones/>}></Route>
          </Route>
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
