import { useState } from "react";
import formatearDinero from "../../config/formatearDinero";

const FilaTabla = ({
  descripcion,
  concepto,
  categoria,
  fecha,
  cuenta,
  tipo,
  valor,
  onEliminar,
}) => {
  return (
    <tr className="hover:bg-surface-container-low transition-colors group">
      <td className="py-4 px-4">
        <div className="font-bold text-primary">{descripcion}</div>
        <div className="text-[10px] text-on-surface-variant font-medium">
          {concepto}
        </div>
      </td>
      <td className="py-4 px-4">
        <span className="px-3 py-1 bg-secondary/10 text-secondary text-[11px] font-bold rounded-full">
          {categoria}
        </span>
      </td>
      <td className="py-4 px-4 text-center text-xs font-medium text-on-surface-variant">
        {new Date(fecha).toLocaleString()}
      </td>
      <td className="py-4 px-4 text-center text-xs font-medium text-on-surface-variant">
        {cuenta}
      </td>
      <td className="py-4 px-4 text-center">
        <span
          className={`${tipo === "Ingreso" ? "bg-secondary" : "bg-error"} px-3 py-1  text-white text-[10px] font-black rounded-md`}
        >
          {tipo}
        </span>
      </td>
      <td className="py-4 px-4 text-right">
        <div
          className={`${tipo === "Ingreso" ? "text-secondary" : "text-error"} font-bold text-base`}
        >
          {tipo === "Ingreso" ? "+" : "-"}
          {formatearDinero(valor)}
        </div>
      </td>
      <td className="py-4 pr-6 text-right">
        <div className="flex justify-end gap-2 text-on-surface-variant group-hover:text-primary transition-colors">
          <button className="hover:text-primary">
            <span className="material-symbols-outlined text-lg">edit</span>
          </button>
          <button
            onClick={() => {
              onEliminar();
            }}
            className="hover:text-error cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg">delete</span>
          </button>
        </div>
      </td>
    </tr>
  );
};

export default FilaTabla;
