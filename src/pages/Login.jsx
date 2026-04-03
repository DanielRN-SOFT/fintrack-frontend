import LabelAuth from "../components/Auth/LabelAuth";
import InputAuth from "../components/Auth/InputAuth";
import { Link } from "react-router-dom";
import HeadingAuth from "../components/Auth/HeadingAuth";
import ButtonAuth from "../components/Auth/ButtonAuth";
import GroupFormAuth from "../components/Auth/GroupFormAuth";
const Login = () => {
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
          />
          <ButtonAuth
            className="text-on-surface-variant hover:text-primary transition-all"
            mensaje={"Registrarse"}
          />
        </div>
        {/* <!-- Login Form --> */}
        <form className="space-y-6">
          <div>
            <LabelAuth contenido={"Correo Electronico"} />
            <div className="relative group">
              <GroupFormAuth logo={"mail"} />
              <InputAuth
                id="email"
                name="email"
                placeholder="ejemplo@fintrack.com"
                type="email"
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <LabelAuth contenido={"Contraseña"} />
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
                type="password"
              />
              <button
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-outline hover:text-primary transition-colors"
                type="button"
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

          <button
            className="w-full py-4 px-6 cursor-pointer bg-[#14B86A] text-white rounded-lg font-bold text-lg hover:bg-[#14B86A]/90 transition-all transform hover:scale-[1.01] active:scale-[0.98] shadow-lg shadow-[#14B86A]/20"
            type="submit"
          >
            Iniciar sesión
          </button>
        </form>
        {/* <!-- Footer Link --> */}
        <div className="mt-8 text-center">
          <p className="text-on-surface-variant text-sm">
            ¿No tienes cuenta?
            <Link
              className="text-on-tertiary-container font-bold hover:underline transition-all ml-1"
              href="/registrarse"
            >
              Regístrate
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
