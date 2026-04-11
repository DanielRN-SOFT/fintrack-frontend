import LabelAuth from "../components/Auth/LabelAuth";
import InputAuth from "../components/Auth/InputAuth";
import HeadingAuth from "../components/Auth/HeadingAuth";
import ButtonAuth from "../components/Auth/ButtonAuth";
import GroupFormAuth from "../components/Auth/GroupFormAuth";
import FooterAuth from "../components/Auth/FooterAuth";
import clienteFetch from "../config/clienteFetch";
import Alerta from "../components/Alerta";
import { useState } from "react";

const Registrar = () => {
  // Datos del formulario
  const [formulario, setFormulario] = useState({});

  // Hook para mostrar o ocultar el input de contrasñea
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  // Datos del componente de la alerta
  const [alerta, setAlerta] = useState({});

  // Obtener el formdata y modificarlo para una estructura json deseada
  const serializarFormulario = (formulario) => {
    const formData = new FormData(formulario);
    const objetoDatos = {};

    // Llenar el objeto de manera dinamica
    for (const [name, value] of formData) {
      objetoDatos[name] = value;
    }

    return objetoDatos;
  };

  // Evento para guardar la informacion a la hora de enviar el formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Transformar la informacion
    const datos = serializarFormulario(e.target);

    //  d qmgiq4 3l
    setFormulario(datos);

    if (Object.entries(formulario).some((obj) => obj.includes(""))) {
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });

      return;
    }

    if (formulario.password !== formulario.repetirPassword) {
      setAlerta({
        msg: "Las contraseñas no coinciden entre si",
        error: true,
      });
      return;
    }

    const { nombre, email, password } = formulario;

    const datosPeticion = {
      nombre,
      email,
      password,
      roles_id: 2,
    };

    try {
      const request = await clienteFetch("/usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datosPeticion),
      });

      const response = await request.json();
      console.log(response);

      response.success === false
        ? setAlerta({
            msg: response.msg,
            error: true,
          })
        : setAlerta({
            msg: "Usuario creado correctamente, revisa tú email",
            error: false,
          });
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  // Evento para actualizar el objeto del usuario con los inputs
  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFormulario({ ...formulario, [name]: value });
  };

  const { msg } = alerta;

  return (
    <>
      <div className="w-full max-w-md mt-12">
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
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <LabelAuth contenido={"Nombre"} id={"nombre"} />
            <div className="relative group">
              <GroupFormAuth logo={"account_circle"} />
              <InputAuth
                id="nombre"
                name="nombre"
                placeholder="Daniel Felipe Ramirez Navarro"
                type="text"
                fn={handleChange}
              />
            </div>
          </div>
          <div>
            <LabelAuth contenido={"Correo Electronico"} id={"email"} />
            <div className="relative group">
              <GroupFormAuth logo={"mail"} />
              <InputAuth
                id="email"
                name="email"
                placeholder="ejemplo@fintrack.com"
                type="email"
                fn={handleChange}
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <LabelAuth contenido={"Contraseña"} id={"password"} />
            </div>
            <div className="relative group">
              <GroupFormAuth logo={"lock"} />

              <InputAuth
                id="password"
                name="password"
                placeholder="••••••••"
                type={showPassword ? "text" : "password"}
                fn={handleChange}
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

          <div>
            <div className="flex items-center justify-between mb-2">
              <LabelAuth
                contenido={"Repetir contraseña"}
                id={"repetirPassword"}
              />
            </div>
            <div className="relative group">
              <GroupFormAuth logo={"lock"} />

              <InputAuth
                id="repetirPassword"
                name="repetirPassword"
                placeholder="••••••••"
                type={showRepeatPassword ? "text" : "password"}
                fn={handleChange}
              />
              <button
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-outline hover:text-primary transition-colors cursor-pointer"
                type="button"
                onClick={() => setShowRepeatPassword(!showRepeatPassword)}
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

          {/* Alerta de error */}
          {msg && <Alerta alerta={alerta} onClose={() => setAlerta({})} />}

          <button
            className="w-full py-3 px-6 cursor-pointer bg-[#14B86A] text-white rounded-lg font-bold text-lg hover:bg-[#14B86A]/90 transition-all transform hover:scale-[1.01] active:scale-[0.98] shadow-lg shadow-[#14B86A]/20"
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
