import LabelAuth from "../components/Auth/LabelAuth";
import InputAuth from "../components/Auth/InputAuth";
import HeadingAuth from "../components/Auth/HeadingAuth";
import GroupFormAuth from "../components/Auth/GroupFormAuth";
import FooterAuth from "../components/Auth/FooterAuth";
import { useState } from "react";

const NuevoPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  
  return (
    <>
      <div className="w-full max-w-md mt-20">
        {/* <!-- Heading --> */}
        <HeadingAuth
          titulo={"¿Una nueva oportunidad?"}
          mensaje={
            "Ingresa una nueva contraseña y maneja tus finanzas de nuevo"
          }
        />

        {/* <!-- Login Form --> */}
        <form className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <LabelAuth contenido={"Nueva contraseña"} id={"password"} />
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

          <div></div>

          <button
            className="w-full py-4 px-6 cursor-pointer bg-[#14B86A] text-white rounded-lg font-bold text-lg hover:bg-[#14B86A]/90 transition-all transform hover:scale-[1.01] active:scale-[0.98] shadow-lg shadow-[#14B86A]/20"
            type="submit"
          >
            Enviar instrucciones
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

export default NuevoPassword;
