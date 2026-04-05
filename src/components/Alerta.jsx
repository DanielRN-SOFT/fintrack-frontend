import { useState, useEffect } from "react";

const Alerta = ({ alerta, onClose }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!alerta?.msg) return;
    setVisible(true);

    const timer = setTimeout(() => {
      setVisible(false);
      onClose?.();
    }, 5000);

    return () => clearTimeout(timer);
  }, [alerta]);

  if (!visible || !alerta?.msg) return null;

  const isError = alerta.error;

  return (
    <div
      role="alert"
      className={`flex items-start gap-3 rounded-[10px] border-l-4 px-4 py-3 text-sm transition-all duration-300
        ${
          isError ? "bg-red-50 border-red-500" : "bg-green-50 border-[#14B86A]"
        }`}
    >
      {/* Ícono */}
      <span
        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-white text-xs font-bold
          ${isError ? "bg-red-500" : "bg-[#14B86A]"}`}
      >
        {isError ? "!" : "✓"}
      </span>

      {/* Mensaje */}
      <p
        className={`flex-1 font-medium
          ${isError ? "text-red-800" : "text-[#0a6e40]"}`}
      >
        {alerta.msg}
      </p>

      {/* Botón cerrar */}
      <button
        onClick={() => {
          setVisible(false);
          onClose?.();
        }}
        className={`ml-auto shrink-0 cursor-pointer text-base leading-none transition-opacity hover:opacity-70
          ${isError ? "text-red-500" : "text-[#14B86A]"}`}
        aria-label="Cerrar alerta"
      >
        ✕
      </button>
    </div>
  );
};

export default Alerta;
