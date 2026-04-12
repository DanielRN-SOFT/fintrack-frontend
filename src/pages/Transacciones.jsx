import { useEffect, useState } from "react";
import clienteFetch from "../config/clienteFetch";
import config from "../config/authorization";
import FilaTabla from "../components/Transacciones/FilaTabla";
import ModalTransaccion from "../components/Transacciones/ModalTransaccion";

const Transacciones = () => {
  const [cargando, setCargando] = useState(true);
  const [transacciones, setTransacciones] = useState([]);
  const [animar, setAnimar] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);

  const abrirModal = () => {
    setMostrarModal(true);
    setTimeout(() => {
      setAnimar(true);
    }, 10);
  };

  const cerrarModal = () => {
    setAnimar(false);
    setTimeout(() => {
      setMostrarModal(false);
    }, 300);
  };

  useEffect(() => {
    const obtenerTransacciones = async () => {
      const token = localStorage.getItem("token");
      const request = await clienteFetch("/transacciones", config(token));
      const response = await request.json();
      setTransacciones(response);
      setCargando(false);
    };

    obtenerTransacciones();
  }, []);

  useEffect(() => {
    document.body.style.overflow = mostrarModal ? "hidden" : "auto";
  }, [mostrarModal]);
  return (
    <>
      <main className="mt-16 p-4 md:p-6 lg:p-8 min-h-screen bg-surface lg:ml-64">
        {/* Modal de transaccion */}
        {mostrarModal && (
          <ModalTransaccion cerrar={cerrarModal} animar={animar} />
        )}
        {/* <!-- Header Section --> */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-headline font-extrabold text-primary tracking-tight">
              Transacciones
            </h1>
            <p className="text-on-surface-variant mt-1 font-medium">
              Historial completo de movimientos
            </p>
          </div>
          <div className="flex gap-4">
            <button className="px-5 py-2.5 bg-white text-tertiary border-2 border-tertiary/20 font-semibold rounded-lg flex items-center gap-2 hover:bg-tertiary/5 transition-all">
              <span className="material-symbols-outlined text-xl">
                download
              </span>
              Exportar CSV
            </button>
            <button
              onClick={(e) => abrirModal()}
              className="px-5 py-2.5 bg-secondary text-white font-bold rounded-lg flex items-center gap-2 shadow-lg shadow-secondary/20 hover:scale-[0.98] transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-xl">add</span>
              Nueva Transacción
            </button>
          </div>
        </div>
        {/* <!-- Filter Bar --> */}
        <section className="bg-surface-container-lowest rounded-xl p-4 mb-6 shadow-sm border border-outline-variant/10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
            {/* Buscador */}
            <div className="sm:col-span-2 lg:col-span-2 relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg">
                search
              </span>
              <input
                className="w-full bg-surface rounded-lg py-2 pl-10 pr-4 text-sm border-none focus:ring-1 focus:ring-primary/20"
                placeholder="Buscar por descripción..."
                type="text"
              />
            </div>

            {/* Tipo */}

            <div className="flex items-center bg-surface p-1 rounded-lg w-full gap-1 lg:col-span-2">
              <button className="flex-1 px-3 py-1.5 text-xs font-bold rounded-md bg-primary text-white">
                Todos
              </button>
              <button className="flex-1 px-3 py-1.5 text-xs font-bold rounded-md text-on-surface-variant hover:bg-surface-container-highest">
                Ingreso
              </button>
              <button className="flex-1 px-3 py-1.5 text-xs font-bold rounded-md text-on-surface-variant hover:bg-surface-container-highest">
                Egreso
              </button>
            </div>

            {/* Categoría */}
            <div className="relative">
              <select className="w-full appearance-none bg-surface border-none rounded-lg py-2 pl-4 pr-10 text-sm font-medium focus:ring-1 focus:ring-primary/20">
                <option>Categoría</option>
                <option>Salario</option>
                <option>Freelance</option>
                <option>Alimentación</option>
                <option>Servicios</option>
              </select>
              <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant text-lg">
                expand_more
              </span>
            </div>

            {/* Orden */}
            <div className="relative">
              <select className="w-full appearance-none bg-surface border-none rounded-lg py-2 pl-4 pr-10 text-sm font-medium focus:ring-1 focus:ring-primary/20">
                <option>Ordenar por</option>
                <option>Fecha (Desc)</option>
                <option>Monto (Max)</option>
              </select>
              <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant text-lg">
                sort
              </span>
            </div>

            {/* FECHAS (AHORA ABAJO EN DESKTOP) */}
            <div className="lg:col-span-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 bg-surface px-3 py-2 rounded-lg">
                <div className="flex items-center gap-2 w-full">
                  <span className="material-symbols-outlined text-on-surface-variant text-lg">
                    calendar_today
                  </span>
                  <input
                    className="w-full bg-transparent border-none text-xs font-medium p-0 focus:ring-0"
                    type="date"
                  />
                </div>

                <span className="text-on-surface-variant text-xs hidden sm:block">
                  a
                </span>

                <input
                  className="w-full bg-transparent border-none text-xs font-medium p-0 focus:ring-0"
                  type="date"
                />
              </div>
            </div>
          </div>
          {/* Limpiar */}
          <div className="flex items-center justify-end sm:col-span-2 lg:col-span-1 mt-5">
            <button className="w-full sm:w-auto text-xs font-bold text-primary hover:underline px-2 transition-all">
              Limpiar filtros
            </button>
          </div>
        </section>
        {/* <!-- Summary Bar --> */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-secondary/10 rounded-xl p-4 flex items-center justify-between border-l-4 border-secondary">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-secondary mb-1">
                Total Ingresos
              </p>
              <p className="text-2xl font-headline font-extrabold text-primary">
                $12,400,000
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-secondary">
                arrow_upward
              </span>
            </div>
          </div>
          <div className="bg-error/10 rounded-xl p-4 flex items-center justify-between border-l-4 border-error">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-error mb-1">
                Total Egresos
              </p>
              <p className="text-2xl font-headline font-extrabold text-primary">
                $7,890,000
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-error/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-error">
                arrow_downward
              </span>
            </div>
          </div>
          <div className="bg-tertiary/10 rounded-xl p-4 flex items-center justify-between border-l-4 border-tertiary">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-tertiary mb-1">
                Balance
              </p>
              <p className="text-2xl font-headline font-extrabold text-primary">
                $4,510,000
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-tertiary/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-tertiary">
                account_balance
              </span>
            </div>
          </div>
        </div>
        {/* <!-- Transactions Table --> */}
        <div className="overflow-x-auto">
          <table className="min-w-200 w-full text-left border-collapse">
            <thead className="bg-surface-container-low border-b border-outline-variant/20">
              <tr>
                <th className="py-4 pl-6 w-12">
                  <input
                    className="rounded text-primary focus:ring-primary/20"
                    type="checkbox"
                  />
                </th>
                <th className="py-4 px-4 text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                  Descripción
                </th>
                <th className="py-4 px-4 text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                  Categoría
                </th>
                <th className="py-4 px-4 text-xs font-bold uppercase tracking-wider text-on-surface-variant text-center">
                  Fecha
                </th>
                <th className="py-4 px-4 text-xs font-bold uppercase tracking-wider text-on-surface-variant text-center">
                  Cuenta
                </th>
                <th className="py-4 px-4 text-xs font-bold uppercase tracking-wider text-on-surface-variant text-center">
                  Tipo
                </th>
                <th className="py-4 px-4 text-xs font-bold uppercase tracking-wider text-on-surface-variant text-right">
                  Monto
                </th>
                <th className="py-4 pr-6 text-xs font-bold uppercase tracking-wider text-on-surface-variant text-right">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {!cargando &&
                transacciones.map((transaccion) => {
                  return (
                    <FilaTabla
                      key={transaccion.id}
                      descripcion={transaccion.descripcion}
                      concepto={transaccion.conceptos.nombre}
                      categoria={transaccion.conceptos.categorias.nombre}
                      tipo={transaccion.conceptos.categorias.tipo}
                      valor={transaccion.valor}
                      fecha={transaccion.fecha}
                      cuenta={transaccion.cuentas.nombre}
                    />
                  );
                })}
            </tbody>
          </table>
          {/* <!-- Pagination Footer --> */}
          <div className="bg-surface-container-low px-6 py-4 flex items-center justify-between">
            <p className="text-xs font-medium text-on-surface-variant">
              Mostrando 1-10 de 48 transacciones
            </p>
            <div className="flex items-center gap-1">
              <button
                className="p-2 text-on-surface-variant hover:bg-white hover:text-primary rounded-lg transition-all disabled:opacity-30"
                disabled=""
              >
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button className="w-8 h-8 flex items-center justify-center text-xs font-black rounded-lg bg-primary text-white">
                1
              </button>
              <button className="w-8 h-8 flex items-center justify-center text-xs font-bold rounded-lg text-on-surface-variant hover:bg-white transition-all">
                2
              </button>
              <button className="w-8 h-8 flex items-center justify-center text-xs font-bold rounded-lg text-on-surface-variant hover:bg-white transition-all">
                3
              </button>
              <span className="px-1 text-on-surface-variant">...</span>
              <button className="w-8 h-8 flex items-center justify-center text-xs font-bold rounded-lg text-on-surface-variant hover:bg-white transition-all">
                5
              </button>
              <button className="p-2 text-on-surface-variant hover:bg-white hover:text-primary rounded-lg transition-all">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Transacciones;
