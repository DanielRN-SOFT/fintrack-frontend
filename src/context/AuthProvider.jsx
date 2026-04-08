import { useState, useEffect, createContext } from "react";
import clienteFetch from "../../config/clienteFetch";
import config from "../../config/authorization";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const autenticarUsuario = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setCargando(false);
        return;
      }

      try {
        const request = await clienteFetch("/auth/perfil", config(token));
        const response = await request.json();
        setAuth(response);
      } catch (error) {
        console.log(error);
        setAuth({});
      }

      setCargando(false);
    };

    autenticarUsuario();
  }, []);

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    setAuth({});
  };

  const actualizarPerfil = async (datos) => {
    const token = localStorage.getItem("token");

    if (!token) {
      setCargando(false);
      return;
    }

    try {
      const request = await clienteFetch(`/usuarios/editar/${datos.id}`, {
        method: "PUT",
        config,
        body: JSON.stringify(datos),
      });
      const response = await request.json();

      return {
        msg: "Almacenado correctamente",
      };
    } catch (error) {
      console.log(error);
    }
  };

  const guardarPassword = async (datos) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setCargando(false);
      return;
    }

    try {
      const request = await clienteFetch("/usuario/actualizar-password", {
        method: "PUT",
        body: JSON.stringify(datos),
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const response = await request.json();
      return {
        msg: response.msg,
      };
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        cargando,
        cerrarSesion,
        actualizarPerfil,
        guardarPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
export default AuthContext;
