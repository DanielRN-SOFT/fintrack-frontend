import { Routes, Route } from "react-router-dom";
import AuthLayout from "./layout/AuthLayout";
import Login from "./pages/Login";
import Registrar from "./pages/Registrar";
import ForgotPassword from "./pages/ForgotPassword";
import NuevoPassword from "./pages/NuevoPassword";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<AuthLayout />}>
          <Route index element={<Login />}></Route>
          <Route path="sign-up" element={<Registrar />}></Route>
          <Route path="forgot-password" element={<ForgotPassword />}></Route>
          <Route path="change-password/:token" element={<NuevoPassword />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
