const CardGrid = ({ icono, titulo, valor, textoBadge, colorBadge, colorIcono }) => {
  return (
    <div className="bg-surface-container-lowest p-6 rounded-xl shadow-[0_24px_48px_-12px_rgba(0,25,57,0.04)] flex flex-col gap-4 border border-outline-variant/10">
      <div className="flex items-center justify-between">
        <div
          className={`${colorIcono} w-10 h-10 rounded-l flex items-center justify-center`}
        >
          <span className={`material-symbols-outlined ${colorBadge}`}>
            {icono}
          </span>
        </div>
        <span
          className={`${colorBadge} material-symbols-outlined ${colorIcono} px-2 py-1 rounded-full`}
        >
         {textoBadge}
        </span>
      </div>
      <div>
        <p className="text-on-surface-variant text-xs font-medium uppercase tracking-wider">
          {titulo}
        </p>
        <h3 className="text-2xl font-extrabold text-primary mt-1">{valor}</h3>
      </div>
    </div>
  );
};

export default CardGrid;
