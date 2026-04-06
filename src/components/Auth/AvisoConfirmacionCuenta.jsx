import { Link } from "react-router-dom";

const Aviso = ({ type }) => {
  const isSuccess = type === true;

  return (
    <div
      className={`bg-white rounded-2xl flex gap-4 items-start p-6`}
      style={{
        border: `0.5px solid ${isSuccess ? "#c7f0d8" : "#f7c1c1"}`,
        borderLeft: `4px solid ${isSuccess ? "#14B86A" : "#E24B4A"}`,
      }}
    >
      {/* Ícono */}
      <div
        className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
        style={{ background: isSuccess ? "#e6f9ef" : "#fcebeb" }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <circle
            cx="10"
            cy="10"
            r="10"
            fill={isSuccess ? "#14B86A" : "#E24B4A"}
          />
          {isSuccess ? (
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
          style={{ color: isSuccess ? "#0a7a45" : "#a32d2d" }}
        >
          {isSuccess ? "Cuenta confirmada" : "No se pudo confirmar la cuenta"}
        </p>
        <p
          className="text-[13px] leading-relaxed mb-3"
          style={{ color: isSuccess ? "#1a8f50" : "#993535" }}
        >
          {isSuccess
            ? "Tu cuenta ha sido verificada exitosamente. Ya puedes iniciar sesión y comenzar a usar FinTrack."
            : "El enlace de confirmación es inválido o ha expirado. Solicita un nuevo correo de verificación."}
        </p>

        <div className="flex gap-2 flex-wrap">
          <Link
            to={"/"}
            className="text-[13px] font-semibold text-white rounded-lg px-5 py-2 border-none cursor-pointer"
            style={{ background: isSuccess ? "#14B86A" : "#E24B4A" }}
          >
            {isSuccess ? "Iniciar sesión" : "Volver al login"}
          </Link>
          {!isSuccess && (
            <Link
              to={"/"}
              className="text-[13px] font-semibold rounded-lg px-4 py-2 cursor-pointer bg-transparent"
              style={{ color: "#a32d2d", border: "0.5px solid #f09595" }}
            >
              Soporte
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Aviso;
