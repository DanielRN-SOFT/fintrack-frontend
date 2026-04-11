import LabelAuth from "../components/Auth/LabelAuth";
import InputAuth from "../components/Auth/InputAuth";
import HeadingAuth from "../components/Auth/HeadingAuth";
import GroupFormAuth from "../components/Auth/GroupFormAuth";
import FooterAuth from "../components/Auth/FooterAuth";
import Alerta from "../components/alerta";
import { useState } from "react";
import clienteFetch from "../config/clienteFetch";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [alerta, setAlerta] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email.trim().length <= 0) {
      setAlerta({
        msg: "El email es obligatorio",
        error: true,
      });

      return;
    }

    try {
      const request = await clienteFetch("/auth/olvide-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
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
          titulo={"¿Sin acceso?"}
          mensaje={"No pierdas tú informacion y recupera tú contraseña"}
        />

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
          <div></div>

          {msg && <Alerta alerta={alerta} />}

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

export default ForgotPassword;
