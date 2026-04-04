import LabelAuth from "../components/Auth/LabelAuth";
import InputAuth from "../components/Auth/InputAuth";
import { Link } from "react-router-dom";
import HeadingAuth from "../components/Auth/HeadingAuth";
import ButtonAuth from "../components/Auth/ButtonAuth";
import GroupFormAuth from "../components/Auth/GroupFormAuth";
import FooterAuth from "../components/Auth/FooterAuth";
import { useState } from "react";

const Registrar = () => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <>
      <div className="w-full max-w-md mt-20">
        {/* <!-- Heading --> */}
        <HeadingAuth
          titulo={"¿Nuevo por aquí?"}
          mensaje={"Registrate para acceder a nuestro sistema"}
        />

        {/* <!-- Form Toggle --> */}
        <div className="inline-flex p-1 bg-surface-container-low rounded-xl mb-8 w-full">
          <ButtonAuth
            className="text-on-surface-variant hover:text-primary transition-all"
            mensaje={"Iniciar sesión"}
            url={"/"}
          />
          <ButtonAuth
            className="transition-all bg-[#14B86A] text-white shadow-sm"
            mensaje={"Registrarse"}
            url={"/sign-up"}
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
                type={showPassword ? "text" : "password"}
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

          <button
            className="w-full py-4 px-6 cursor-pointer bg-[#14B86A] text-white rounded-lg font-bold text-lg hover:bg-[#14B86A]/90 transition-all transform hover:scale-[1.01] active:scale-[0.98] shadow-lg shadow-[#14B86A]/20"
            type="submit"
          >
            Crear cuenta
          </button>
        </form>
        {/* <!-- Footer Link --> */}
        <FooterAuth
          mensaje={"¿Ya tienes una cuenta?"}
          link={"Iniciar sesión"}
          url={"/"}
        />
      </div>
    </>
  );
};

export default Registrar;
