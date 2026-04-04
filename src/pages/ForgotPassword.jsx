import LabelAuth from "../components/Auth/LabelAuth";
import InputAuth from "../components/Auth/InputAuth";
import HeadingAuth from "../components/Auth/HeadingAuth";
import ButtonAuth from "../components/Auth/ButtonAuth";
import GroupFormAuth from "../components/Auth/GroupFormAuth";
import FooterAuth from "../components/Auth/FooterAuth";

const ForgotPassword = () => {
  return (
    <>
      <div className="w-full max-w-md mt-20">
        {/* <!-- Heading --> */}
        <HeadingAuth
          titulo={"¿Sin acceso?"}
          mensaje={"No pierdas tú informacion y recupera tú contraseña"}
        />


        {/* <!-- Login Form --> */}
        <form className="space-y-6">
          <div>
            <LabelAuth contenido={"Correo Electronico"} id={"email"} />
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

export default ForgotPassword;
