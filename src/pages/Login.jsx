import LabelAuth from "../components/Auth/LabelAuth";
import InputAuth from "../components/Auth/InputAuth";
import HeadingAuth from "../components/Auth/HeadingAuth";
import ButtonAuth from "../components/Auth/ButtonAuth";
import GroupFormAuth from "../components/Auth/GroupFormAuth";
import FooterAuth from "../components/Auth/FooterAuth";
import useAuth from "../hooks/useAuth";
import Alerta from "../components/Alerta";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import clienteFetch from "../../config/clienteFetch";
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alerta, setAlerta] = useState({});

  const { setAuth } = useAuth();

  // Redirreccionamiento de pagina
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([email.trim(), password.trim()].includes("")) {
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }

    try {
      const request = await clienteFetch("/auth/autenticar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const response = await request.json();

      response.token ? setAuth(response) : setAuth({});
      response.token
        ? localStorage.setItem("token", response.token)
        : setAlerta({
            msg: response.msg,
            error: true,
          });
      response.token ? navigate("/dashboard") : "";
    } catch (error) {
      console.log(error);
    }
  };

  const { msg } = alerta;

  return (
    <>
      <div className="w-full max-w-md mt-20">
        {/* <!-- Heading --> */}
        <HeadingAuth
          titulo={"Bienvenido de nuevo"}
          mensaje={"Ingresa tus credenciales para acceder a tu cuenta"}
        />

        {/* <!-- Form Toggle --> */}
        <div className="inline-flex p-1 bg-surface-container-low rounded-xl mb-8 w-full">
          <ButtonAuth
            className="transition-all bg-[#14B86A] text-white shadow-sm"
            mensaje={"Iniciar sesión"}
            url={"/"}
          />
          <ButtonAuth
            className="text-on-surface-variant hover:text-primary transition-all"
            mensaje={"Registrarse"}
            url={"/sign-up"}
          />
        </div>
        {/* <!-- Login Form --> */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <LabelAuth contenido={"Correo Electronico"} id={"email"} />
            <div className="relative group">
              <GroupFormAuth logo={"mail"} />
              <InputAuth
                id="email"
                name="email"
                placeholder="ejemplo@fintrack.com"
                type="email"
                value={email}
                fn={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <LabelAuth contenido={"Contraseña"} id={"password"} />
              <Link
                className="text-xs font-semibold text-on-tertiary-container hover:underline"
                to="/forgot-password"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
            <div className="relative group">
              <GroupFormAuth logo={"lock"} />

              <InputAuth
                id="password"
                name="password"
                placeholder="••••••••"
                type={showPassword ? "text" : "password"}
                value={password}
                fn={(e) => {
                  setPassword(e.target.value);
                }}
              />

              <button
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-outline hover:text-primary transition-colors cursor-pointer"
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                <span
                  className="material-symbols-outlined"
                  data-icon="visibility"
                >
                  visibility
                </span>
              </button>
            </div>
          </div>

          {msg && <Alerta alerta={alerta} />}
          <button
            className="w-full py-4 px-6 cursor-pointer bg-[#14B86A] text-white rounded-lg font-bold text-lg hover:bg-[#14B86A]/90 transition-all transform hover:scale-[1.01] active:scale-[0.98] shadow-lg shadow-[#14B86A]/20"
            type="submit"
          >
            Iniciar sesión
          </button>
        </form>
        {/* <!-- Footer Link --> */}
        <FooterAuth
          mensaje={"¿No tienes cuenta?"}
          link={"Regístrate"}
          url={"/sign-up"}
        />
      </div>
    </>
  );
};

export default Login;
