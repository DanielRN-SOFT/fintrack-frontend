import formatearDinero from "../../config/formatearDinero";

const FilaTabla = ({ icono, descripcion, categoria, fecha, valor, tipo }) => {
  return (
    <tr className="hover:bg-surface-container-low transition-all duration-200">
      <td className="py-4 pr-4">
        <div className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center">
          <span className="material-symbols-outlined text-primary-container text-lg">
            {icono}
          </span>
        </div>
      </td>
      <td className="py-4">
        <div className="flex flex-col">
          <span className="font-semibold text-primary text-sm">
            {descripcion}
          </span>
          <span className="text-xs text-on-surface-variant">{categoria}</span>
        </div>
      </td>
      <td className="py-4 text-xs text-on-surface-variant font-medium">
        {new Date(fecha).toLocaleDateString()}
      </td>
      <td className="py-4 text-right">
        <span className={`font-bold ${tipo} text-sm`}>
          {formatearDinero(valor)}
        </span>
      </td>
    </tr>
  );
};

export default FilaTabla;
