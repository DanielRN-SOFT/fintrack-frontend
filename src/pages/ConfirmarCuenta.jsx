import { useParams, Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import clienteFetch from "../config/clienteFetch";

const ConfirmarCuenta = () => {
  // Extraer los parametros de la path
  const params = useParams();

  // Verificar si se confirmo o no la cuenta
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false);

  // Hook que cambia su resultado pero no rendiriza de nuevo los componentes
  const ejecutado = useRef(false);

  // Verificar que se haya ejecutado la peticion exitosament
  const [cargando, setCargando] = useState(true);

  // Extraer el token de los parametros
  const { token } = params;

  useEffect(() => {
    // Si la vista ya se renderizo 1 vez, se para la ejecucion del codigo
    if (ejecutado.current) return;

    // Si no se ha ejecutado, se cambia su estado
    ejecutado.current = true;

    // Funcion para hacer la peticion
    const confirmarCuenta = async () => {
      try {
        const request = await clienteFetch(`/auth/confirmar/${token}`);
        const response = await request.json();
        setCuentaConfirmada(response.success);
      } catch (error) {
        console.log(error);
      }
      // Verificar que se haya ejecutado la peticion
      setCargando(false);
    };

    // Llamar la funcion
    confirmarCuenta();
  }, [token]);
  return (
    <>
      {!cargando && (
        <div
          className={`bg-white rounded-2xl flex gap-4 items-start p-6`}
          style={{
            border: `0.5px solid ${cuentaConfirmada ? "#c7f0d8" : "#f7c1c1"}`,
            borderLeft: `4px solid ${cuentaConfirmada ? "#14B86A" : "#E24B4A"}`,
          }}
        >
          {/* Ícono */}
          <div
            className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
            style={{ background: cuentaConfirmada ? "#e6f9ef" : "#fcebeb" }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle
                cx="10"
                cy="10"
                r="10"
                fill={cuentaConfirmada ? "#14B86A" : "#E24B4A"}
              />
              {cuentaConfirmada ? (
                <path
                  d="M5.5 10.5L8.5 13.5L14.5 7"
                  stroke="white"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              ) : (
                <path
                  d="M7 7L13 13M13 7L7 13"
                  stroke="white"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </div>

          {/* Contenido */}
          <div className="flex-1 min-w-0">
            <p
              className="font-headline font-semibold text-[15px] mb-1"
              style={{ color: cuentaConfirmada ? "#0a7a45" : "#a32d2d" }}
            >
              {cuentaConfirmada
                ? "Cuenta confirmada"
                : "No se pudo confirmar la cuenta"}
            </p>
            <p
              className="text-[13px] leading-relaxed mb-3"
              style={{ color: cuentaConfirmada ? "#1a8f50" : "#993535" }}
            >
              {cuentaConfirmada
                ? "Tu cuenta ha sido verificada exitosamente. Ya puedes iniciar sesión y comenzar a usar FinTrack."
                : "El enlace de confirmación es inválido o ha expirado. Solicita un nuevo correo de verificación."}
            </p>

            <div className="flex gap-2 flex-wrap">
              <Link
                to={"/"}
                className="text-[13px] font-semibold text-white rounded-lg px-5 py-2 border-none cursor-pointer"
                style={{ background: cuentaConfirmada ? "#14B86A" : "#E24B4A" }}
              >
                {cuentaConfirmada ? "Iniciar sesión" : "Volver al login"}
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ConfirmarCuenta;
