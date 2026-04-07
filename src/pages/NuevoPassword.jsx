import LabelAuth from "../components/Auth/LabelAuth";
import InputAuth from "../components/Auth/InputAuth";
import HeadingAuth from "../components/Auth/HeadingAuth";
import GroupFormAuth from "../components/Auth/GroupFormAuth";
import FooterAuth from "../components/Auth/FooterAuth";
import { useEffect, useState, useRef } from "react";
import clienteFetch from "../../config/clienteFetch";
import { useParams } from "react-router-dom";
import Alerta from "../components/Alerta";

const NuevoPassword = () => {
  const params = useParams();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [alerta, setAlerta] = useState({});
  const [tokenValido, setTokenValido] = useState(false);
  const [passwordModificado, setPasswordModificado] = useState(false);
  const ejecutado = useRef(false);
  const { token } = params;
  useEffect(() => {
    if (ejecutado.current) return;

    ejecutado.current = true;

    const comprobarToken = async () => {
      try {
        const request = await clienteFetch(`/auth/olvide-password/${token}`);
        const response = await request.json();

        response.success === true
          ? setAlerta({
              msg: "Ingresa tu nueva contraseña",
              error: false,
            })
          : setAlerta({
              msg: response.msg,
              error: true,
            });

        console.log(response);
        if (response.success) {
          setTokenValido(true);
        }
      } catch (error) {
        setAlerta({
          msg: "Ocurrio un error...",
          error: true,
        });
      }
    };

    comprobarToken();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.trim().length === 0) {
      setAlerta({
        msg: "Agregue una contraseña valida",
        error: true,
      });
      return;
    }

    if (password.length < 6) {
      setAlerta({
        msg: "La contraseña debe ser minimo de 6 caracteres",
        error: true,
      });

      return;
    }

    try {
      const request = await clienteFetch(`/auth/olvide-password/${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      const response = await request.json();

      response.success === true
        ? setAlerta({
            msg: response.msg,
            error: false,
          })
        : setAlerta({
            msg: response.msg,
            error: true,
          });

      if (response.success) {
        setPasswordModificado(true);
      }
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
          titulo={"¿Una nueva oportunidad?"}
          mensaje={
            "Ingresa una nueva contraseña y maneja tus finanzas de nuevo"
          }
        />

        {/* <!-- Login Form --> */}
        {tokenValido && (
          <form onSubmit={handleSubmit} className="space-y-6">
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
                  fn={(e) => setPassword(e.target.value)}
                  value={password}
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
              Enviar instrucciones
            </button>
          </form>
        )}

        {/* <!-- Footer Link --> */}
        {passwordModificado && (
          <FooterAuth mensaje={""} link={"Iniciar sesión"} url={"/"} />
        )}
      </div>
    </>
  );
};

export default NuevoPassword;
