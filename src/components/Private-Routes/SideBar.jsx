import { useState, useEffect } from "react";
import Fintrack_Logo from "../../assets/images/Fintrack-Logo.png";
import { Link, useLocation } from "react-router-dom";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        isOpen &&
        !e.target.closest("aside") &&
        !e.target.closest("#menu-toggle")
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <>
      {/* Botón hamburguesa — solo visible cuando el sidebar está CERRADO */}
      {!isOpen && (
        <button
          id="menu-toggle"
          onClick={() => setIsOpen(true)}
          className="lg:hidden fixed top-4 left-4 z-60 w-10 h-10 bg-[#14B86A] rounded-lg flex items-center justify-center text-white shadow-lg"
          aria-label="Abrir menú"
        >
          <span className="material-symbols-outlined text-xl">menu</span>
        </button>
      )}

      {/* Overlay oscuro */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full w-65 bg-[#f3f4f5] dark:bg-[#001939] flex flex-col py-6 px-4 z-50 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header con logo y botón cerrar */}
        <div className="mb-10 px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 flex-col">
              <div className="w-30 h-15 flex items-center justify-center">
                <img src={Fintrack_Logo} alt="" />
              </div>
              <div className="text-center">
                <h1 className="text-2xl font-bold text-primary tracking-tight font-headline">
                  FinTrack
                </h1>
                <p className="text-[10px] text-slate-400 uppercase tracking-widest font-medium">
                  Economias y Finanzas Personal
                </p>
              </div>
            </div>

            {/* Botón cerrar — solo visible en móvil/tablet dentro del sidebar */}
            <button
              onClick={() => setIsOpen(false)}
              className="lg:hidden w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-primary transition-colors cursor-pointer"
              aria-label="Cerrar menú"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
          </div>
        </div>

        <nav className="flex-1 space-y-2">
          <Link
            className={`${location.pathname == "/admin" ? "bg-white dark:bg-[#002d5e] text-[#002D5E] dark:text-[#14B86A] rounded-lg shadow-sm font-bold" : "text-slate-600 dark:text-slate-400 hover:bg-white/50"} flex items-center gap-3 px-4 py-3 font-medium text-sm tracking-tight rounded-lg transition-all`}
            to="/admin"
          >
            <span className="material-symbols-outlined">dashboard</span>
            Dashboard
          </Link>

          <Link
            className={`${location.pathname == "/admin/transacciones" ? "bg-white dark:bg-[#002d5e] text-[#002D5E] dark:text-[#14B86A] rounded-lg shadow-sm font-bold" : "text-slate-600 dark:text-slate-400 hover:bg-white/50"} flex items-center gap-3 px-4 py-3 font-medium text-sm tracking-tight rounded-lg transition-all`}
            to="/admin/transacciones"
          >
            <span className="material-symbols-outlined">receipt_long</span>
            Transacciones
          </Link>

          <a
            className={`${location.pathname == "/admin/reportes" ? "bg-white dark:bg-[#002d5e] text-[#002D5E] dark:text-[#14B86A] rounded-lg shadow-sm font-bold" : "text-slate-600 dark:text-slate-400 hover:bg-white/50"} flex items-center gap-3 px-4 py-3 font-medium text-sm tracking-tight rounded-lg transition-all`}
            href="#"
          >
            <span className="material-symbols-outlined">bar_chart</span>
            Reportes
          </a>

          <a
            className={`${location.pathname == "/admin/configuracion" ? "bg-white dark:bg-[#002d5e] text-[#002D5E] dark:text-[#14B86A] rounded-lg shadow-sm font-bold" : "text-slate-600 dark:text-slate-400 hover:bg-white/50"} flex items-center gap-3 px-4 py-3 font-medium text-sm tracking-tight rounded-lg transition-all`}
            href="#"
          >
            <span className="material-symbols-outlined">settings</span>
            Configuración
          </a>
        </nav>
      </aside>
    </>
  );
};

export default SideBar;
