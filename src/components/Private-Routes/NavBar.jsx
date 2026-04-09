import { useState, useRef, useEffect } from "react";
import useAuth from "../../hooks/useAuth";

const NavBar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { auth, cerrarSesion } = useAuth();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    // En móvil ocupa el 100%, en desktop resta el sidebar
    <header className="fixed top-0 right-0 w-full md:w-[calc(100%-16rem)] h-16 flex justify-between items-center px-4 md:px-8 z-40 bg-surface-container-low dark:bg-slate-900">
      {/* Search: oculto en móvil, visible desde md */}
      <div className="hidden md:flex items-center flex-1 max-w-xl">
        <div className="relative w-full">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">
            search
          </span>
          <input
            className="w-full bg-surface-container-lowest border-none rounded-full py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-surface-tint focus:outline-none transition-all duration-200"
            placeholder="Buscar transacciones..."
            type="text"
          />
        </div>
      </div>

      {/* En móvil: ícono de búsqueda solamente */}
      <button className="md:hidden p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-all duration-200">
        <span className="material-symbols-outlined text-on-surface-variant">
          search
        </span>
      </button>

      <div className="flex items-center gap-2 md:gap-6">
        <div className="flex items-center gap-1 md:gap-2">
          <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-all duration-200">
            <span className="material-symbols-outlined text-on-surface-variant">
              notifications
            </span>
          </button>
          {/* Ocultar ayuda en móvil para ahorrar espacio */}
          <button className="hidden sm:flex p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-all duration-200">
            <span className="material-symbols-outlined text-on-surface-variant">
              help_outline
            </span>
          </button>
        </div>

        {/* Profile section */}
        <div
          className="relative flex items-center gap-2 md:gap-3 pl-2 md:pl-4 border-l border-outline-variant/30"
          ref={dropdownRef}
        >
          {/* Nombre: oculto en móvil */}
          <div className="hidden sm:block text-right">
            <p className="text-xs font-bold text-primary">{auth.nombre}</p>
            <p className="text-[10px] text-on-surface-variant">
              Administrador Fintrack
            </p>
          </div>

          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="focus:outline-none rounded-full transition-all duration-200 hover:ring-2 hover:ring-primary/30"
          >
            <img
              alt="Avatar del usuario"
              className="w-9 h-9 md:w-10 md:h-10 rounded-full border-2 border-surface-container-highest cursor-pointer"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4LAuo6KnH-cnC4khPiFYHhMqc9NJqbafPsmx2M9eYYDq5zWP_9ACjXXR_R7WEVeFs0cSyQqh4k6tfqDMRqdzh5_5ztguI8A3V-kK-MqgJeMjLfggedX_s3C2QXlSZhPP0soMj6sONvglibc97wKNRD2t6Vox0ECaRHcUO6hl8z5XTWLBURtbkPqfH4ow_GGR5BvEpGp8l-77vd8atcvAOu1e4Ce8PMaa8OHlTWle-xh_-9GqDF0qofbIJ1ys4x6A9TXuwiL7_KVOq"
            />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 top-12 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 py-1 z-50">
              <button
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-150 cursor-pointer"
                onClick={() => setDropdownOpen(false)}
              >
                <span className="material-symbols-outlined text-[18px] text-on-surface-variant">
                  person
                </span>
                Perfil
              </button>
              <div className="my-1 border-t border-slate-100 dark:border-slate-700" />
              <button
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-150 cursor-pointer"
                onClick={() => {
                  setDropdownOpen(false);
                  cerrarSesion();
                }}
              >
                <span className="material-symbols-outlined text-[18px]">
                  logout
                </span>
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default NavBar;
