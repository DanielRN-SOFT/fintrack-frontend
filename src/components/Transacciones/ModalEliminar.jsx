import clienteFetch from "../../config/clienteFetch";
import formatearDinero from "../../config/formatearDinero";
import config from "../../config/authorization";
import Alerta from "../Alerta";
import { useState } from "react";

const ModalEliminar = ({
  data,
  animar,
  cerrar,
  recargarTransacciones,
  recargarEstadisticas,
}) => {
  const [alerta, setAlerta] = useState({});

  const handleClick = async () => {
    try {
      const token = localStorage.getItem("token");
      const request = await clienteFetch(`/transacciones/eliminar/${data.id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const response = await request.json();
      setAlerta({ msg: "Transacción eliminada con exito", error: false });

      setTimeout(() => {
        recargarTransacciones();
        recargarEstadisticas();
        cerrar();
      }, 1000);
    } catch (error) {
      console.log(error);
      setAlerta({
        msg: "Hubo un error al eliminar la transacción",
        error: true,
      });
    }
  };

  const { msg } = alerta;

  return (
    <div
      className={`${animar ? "bg-black/50 backdrop-blur-[1px]" : "bg-black/0 backdrop-blur-[0]"} fixed inset-0 bg-black/45 z-50  backdrop-blur-[1px] flex items-center justify-center p-4`}
    >
      {/* <!-- Confirmation Modal --> */}
      <div
        className={`bg-surface-container-lowest w-full max-w-120 rounded-2xl shadow-[0_24px_48px_-12px_rgba(0,25,57,0.25)] overflow-hidden flex flex-col items-center p-8 animate-in fade-in zoom-in duration-300
            ${animar ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4"}`}
      >
        {/* <!-- Warning Icon --> */}
        <div className="w-16 h-16 bg-[#FEF3C7] rounded-full flex items-center justify-center mb-6">
          <div className="w-12 h-12 bg-[#F59E0B] rounded-full flex items-center justify-center">
            <span className="material-symbols-outlined text-white text-2xl">
              delete
            </span>
          </div>
        </div>
        {/* <!-- Header Text --> */}
        <h2 className="text-2xl font-headline font-bold text-[#1A202C] mb-2 text-center">
          ¿Eliminar esta transacción?
        </h2>
        <p className="text-on-surface-variant text-center mb-8 px-4 leading-relaxed">
          Esta acción es permanente y no podrá deshacerse. Asegúrate de que
          deseas eliminar este movimiento.
        </p>
        {/* <!-- Transaction Detail Card --> */}
        <div className="w-full bg-[#F0F4F8] rounded-xl p-5 mb-8 border border-outline-variant/20">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant/60 mb-1">
                Descripción
              </p>
              <p className="font-headline font-bold text-primary">
                {data.descripcion}
              </p>
            </div>
            <span
              className={`${data.conceptos.categorias.tipo === "Ingreso" ? "text-secondary bg-secondary/20" : "text-error bg-error/20"} px-3 py-1 rounded-full text-xs font-bold uppercase tracking-tight`}
            >
              {data.conceptos.categorias.tipo}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant/60 mb-1">
                Monto
              </p>
              <p
                className={`font-headline font-extrabold ${data.conceptos.categorias.tipo == "Ingreso" ? "text-secondary" : "text-error"}  text-lg`}
              >
                {data.conceptos.categorias.tipo === "Ingreso" ? "+" : "-"}
                {formatearDinero(data.valor)}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant/60 mb-1">
                Fecha
              </p>
              <p className="text-primary font-medium">
                {new Date(data.fecha).toLocaleString()}
              </p>
            </div>
            <div className="col-span-2 pt-2 border-t border-outline-variant/10">
              <div className="flex items-center justify-between ">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant/60 mb-1">
                    Concepto
                  </p>
                  <span className="text-sm">{data.conceptos.nombre}</span>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant/60 mb-1">
                    Categoria
                  </p>
                  <span className="text-sm">
                    {data.conceptos.categorias.nombre}
                  </span>
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant/60 mb-1">
                    Cuenta
                  </p>
                  <span className="text-sm">{data.cuentas.nombre}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- Action Buttons --> */}
        <div className="w-full flex flex-col gap-3">
          <button
            onClick={handleClick}
            className="w-full py-4 bg-[#E53E3E] hover:bg-[#C53030] text-white rounded-lg font-headline font-bold flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
          >
            <span className="material-symbols-outlined text-xl">delete</span>
            Sí, eliminar
          </button>
          <button
            onClick={() => {
              !msg ? cerrar() : "";
            }}
            className="w-full py-4 bg-transparent border-2 border-outline-variant/30 hover:bg-surface-container-low text-on-surface font-headline font-bold rounded-lg transition-all active:scale-95 cursor-pointer"
          >
            Cancelar
          </button>

          {/* ALERTA */}
          {msg && <Alerta alerta={alerta} />}
        </div>
        {/* <!-- Micro-copy --> */}
        <p className="mt-6 text-[11px] italic text-on-surface-variant text-center leading-tight">
          Esta transacción se eliminará de todos tus reportes y estadísticas.
        </p>
      </div>
    </div>
  );
};

export default ModalEliminar;
