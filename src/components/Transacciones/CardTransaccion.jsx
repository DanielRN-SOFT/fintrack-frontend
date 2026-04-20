const CardTransaccion = ({
  descripcion,
  concepto,
  categoria,
  tipo,
  valor,
  fecha,
  cuenta,
  fnEliminar,
}) => {
  return (
    <div className="bg-surface-container-lowest rounded-xl p-4 shadow-sm border border-outline-variant/10 space-y-3">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <p className="font-bold text-primary">{descripcion}</p>
          <p className="text-xs text-on-surface-variant">
            {concepto} • {categoria}
          </p>
        </div>

        <span
          className={`text-xs font-bold px-2 py-1 rounded-full ${
            tipo === "Ingreso"
              ? "bg-secondary/10 text-secondary"
              : "bg-error/10 text-error"
          }`}
        >
          {tipo}
        </span>
      </div>

      {/* Info */}
      <div className="flex justify-between text-sm">
        <div>
          <p className="text-[11px] text-on-surface-variant">Cuenta</p>
          <p className="font-medium">{cuenta}</p>
        </div>

        <div className="text-right">
          <p className="text-[11px] text-on-surface-variant">Fecha</p>
          <p className="font-medium">{fecha}</p>
        </div>
      </div>

      {/* Monto */}
      <div className="flex justify-between items-center pt-2 border-t border-outline-variant/10">
        <p className="text-xs text-on-surface-variant">Monto</p>
        <p
          className={`font-extrabold text-lg ${
            tipo === "Ingreso" ? "text-secondary" : "text-error"
          }`}
        >
          ${valor}
        </p>
      </div>

      {/* Acciones */}
      <div className="flex justify-end gap-2 pt-2">
        <button className="p-2 rounded-lg hover:bg-surface">
          <span className="material-symbols-outlined text-[18px]">edit</span>
        </button>
        <button
          onClick={() => {
            fnEliminar();
          }}
          className="p-2 rounded-lg hover:bg-surface text-error cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">delete</span>
        </button>
      </div>
    </div>
  );
};

export default CardTransaccion;
