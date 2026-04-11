import formatearDinero from "../../config/formatearDinero";

const FilaTabla = ({
  descripcion,
  concepto,
  categoria,
  fecha,
  cuenta,
  tipo,
  valor,
}) => {
  return (
    <tr class="hover:bg-surface-container-low transition-colors group">
      <td class="py-4 pl-6">
        <input
          class="rounded text-primary focus:ring-primary/20"
          type="checkbox"
        />
      </td>
      <td class="py-4 px-4">
        <div class="font-bold text-primary">{descripcion}</div>
        <div class="text-[10px] text-on-surface-variant font-medium">
          {concepto}
        </div>
      </td>
      <td class="py-4 px-4">
        <span class="px-3 py-1 bg-secondary/10 text-secondary text-[11px] font-bold rounded-full">
          {categoria}
        </span>
      </td>
      <td class="py-4 px-4 text-center text-xs font-medium text-on-surface-variant">
        {new Date(fecha).toLocaleString()}
      </td>
      <td class="py-4 px-4 text-center text-xs font-medium text-on-surface-variant">
        {cuenta}
      </td>
      <td class="py-4 px-4 text-center">
        <span
          class={`${tipo === "Ingreso" ? "bg-secondary" : "bg-error"} px-3 py-1  text-white text-[10px] font-black rounded-md`}
        >
          {tipo}
        </span>
      </td>
      <td class="py-4 px-4 text-right">
        <div
          class={`${tipo === "Ingreso" ? "text-secondary" : "text-error"} font-bold text-base`}
        >
          {tipo === "Ingreso" ? "+" : "-"}{formatearDinero(valor)}
        </div>
      </td>
      <td class="py-4 pr-6 text-right">
        <div class="flex justify-end gap-2 text-on-surface-variant group-hover:text-primary transition-colors">
          <button class="hover:text-primary">
            <span class="material-symbols-outlined text-lg">edit</span>
          </button>
          <button class="hover:text-error">
            <span class="material-symbols-outlined text-lg">delete</span>
          </button>
        </div>
      </td>
    </tr>
  );
};

export default FilaTabla;
