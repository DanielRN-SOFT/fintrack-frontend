import { useState, useEffect } from "react";
import clienteFetch from "../../config/clienteFetch";
import config from "../../config/authorization";
import Alerta from "../Alerta";

const ModalTransaccion = ({
  cerrar,
  animar,
  recargarTransacciones,
  recargarEstadisticas,
  data = {},
}) => {
  // Cargar las opciones de los select HTML
  const [conceptosSelect, setConceptosSelect] = useState([]);
  const [cuentasSelect, setCuentasSelect] = useState([]);

  // Datos de los inputs
  const [descripcion, setDescripcion] = useState("");
  const [valor, setValor] = useState(0);
  const [cuenta, setCuenta] = useState(0);
  const [tipoTransaccion, setTipoTransaccion] = useState(null);
  const [concepto, setConcepto] = useState(0);
  const [fecha, setFecha] = useState("");

  // Componentes aparte
  const [alerta, setAlerta] = useState({});

  // Obtener todos los conceptos
  useEffect(() => {
    const token = localStorage.getItem("token");
    const obtenerConceptos = async () => {
      const request = await clienteFetch("/conceptos", config(token));
      const response = await request.json();
      setConceptosSelect(response.results);
    };

    obtenerConceptos();
  }, []);

  // Obtener todas las cuentas
  useEffect(() => {
    const token = localStorage.getItem("token");
    const obtenerCuentas = async () => {
      const request = await clienteFetch("/cuentas", config(token));
      const response = await request.json();
      setCuentasSelect(response.results);
    };
    obtenerCuentas();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([descripcion.trim(), concepto, cuenta, fecha.trim()].includes("")) {
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });

      return;
    }

    if (valor <= 0) {
      setAlerta({
        msg: "El valor debe ser mayor que 0",
        error: true,
      });

      return;
    }

    try {
      const token = localStorage.getItem("token");
      const request = await clienteFetch("/transacciones", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          fecha,
          valor,
          descripcion,
          estado: "Activo",
          conceptos_id: concepto,
          cuentas_id: cuenta,
        }),
      });

      const response = await request.json();
      setAlerta(
        response.success
          ? {
              msg: "Transaccion aprobada",
              error: false,
            }
          : {
              msg: response.msg,
              error: true,
            },
      );

      setTimeout(() => {
        recargarTransacciones();
        recargarEstadisticas();
        cerrar();
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (animar) {
      // o cuando abras la modal
      setCuenta("");
      setConcepto("");
    }
  }, [animar]);

  const { msg } = alerta;

  return (
    // <!-- Backdrop Overlay (50% Black) -->
    <div
      className={`fixed inset-0 ${animar ? "bg-black/50 backdrop-blur-[1px]" : "bg-black/0 backdrop-blur-[0]"}  z-60 flex items-center justify-center p-4`}
    >
      {/* <!-- TRANSACTION MODAL --> */}
      <div
        className={`w-full max-w-130 bg-white rounded-2xl shadow-[0_24px_48px_-12px_rgba(0,25,57,0.15)] flex flex-col overflow-hidden transition-all duration-300 ${animar ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4"}`}
      >
        <form onSubmit={handleSubmit}>
          {/* <!-- Modal Header --> */}
          <div className="flex items-center justify-between px-8 py-6">
            <h2 className="text-xl font-headline font-bold text-primary tracking-tight">
              Nueva Transacción
            </h2>
            <button
              onClick={() => cerrar()}
              className="w-10 h-10 flex justify-center items-center hover:bg-surface-container-low rounded-full transition-all duration-300 cursor-pointer text-on-surface-variant"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
          {/* <!-- Modal Content --> */}
          <div className="px-8 pb-8 space-y-6">
            {/* <!-- Transaction Type Toggle --> */}
            <div className="flex p-1 bg-surface-container-low rounded-lg w-full">
              <button
                disabled
                className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
                  tipoTransaccion === "Ingreso"
                    ? "bg-secondary text-white shadow-sm"
                    : "bg-transparent text-gray-400"
                }`}
              >
                Ingreso
              </button>

              <button
                disabled
                className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
                  tipoTransaccion === "Egreso"
                    ? "bg-error text-white shadow-sm"
                    : "bg-transparent text-gray-400"
                }`}
              >
                Egreso
              </button>
            </div>

            {/* <!-- Descripción --> */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-on-surface-variant font-label">
                Descripción
              </label>
              <input
                className="w-full h-12 px-4 bg-surface-container-lowest border-2 border-gray-50 ring-1 ring-outline-variant/30 rounded-lg focus:ring-2 focus:ring-on-tertiary-container/20 focus:border-on-tertiary-container outline-none transition-all placeholder:text-outline/50"
                placeholder="Ej: Pago de nómina"
                type="text"
                value={data.descripcion}
                onChange={(e) => {
                  setDescripcion(e.target.value);
                }}
              />
            </div>
            {/* <!-- valor --> */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-on-surface-variant font-label">
                valor
              </label>
              <div className="relative group">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-headline font-bold text-primary">
                  $
                </span>
                <input
                  className="w-full h-16 pl-10 pr-4 bg-surface-container-lowest border-2 border-gray-50 ring-1 ring-outline-variant/30 rounded-lg focus:ring-2 focus:ring-on-tertiary-container/20 focus:border-on-tertiary-container outline-none transition-all text-2xl font-headline font-bold text-primary placeholder:text-outline-variant"
                  placeholder="0"
                  type="number"
                  value={data.valor}
                  onChange={(e) => {
                    setValor(parseInt(e.target.value));
                  }}
                />
              </div>
            </div>
            {/* <!-- Row: Cuentas & Fecha --> */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-on-surface-variant font-label">
                  Cuenta
                </label>
                <div className="relative">
                  <select
                    className="w-full h-12 pl-4 pr-10 bg-surface-container-lowest border-2 border-gray-50 ring-1 ring-outline-variant/30 rounded-lg focus:ring-2 focus:ring-on-tertiary-container/20 focus:border-on-tertiary-container appearance-none outline-none cursor-pointer"
                    value={cuenta}
                    onChange={(e) => {
                      setCuenta(parseInt(e.target.value));
                    }}
                  >
                    <option value="" disabled>
                      Seleccione una cuenta
                    </option>

                    {cuentasSelect.map((cuenta) => {
                      return (
                        <option
                          {...(data?.cuenta.id === cuenta.id ? "selected" : "")}
                          key={cuenta.id}
                          value={cuenta.id}
                        >
                          {cuenta.nombre}
                        </option>
                      );
                    })}
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant">
                    keyboard_arrow_down
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-on-surface-variant font-label">
                  Fecha
                </label>
                <input
                  className="w-full h-12 pl-4 pr-10 bg-surface-container-lowest border-2 border-gray-50 ring-1 ring-outline-variant/30 rounded-lg focus:ring-2 focus:ring-on-tertiary-container/20 appearance-none outline-none cursor-pointer focus:border-on-tertiary-container"
                  type="date"
                  value={data.fecha}
                  onChange={(e) => {
                    setFecha(e.target.value);
                  }}
                />
              </div>
            </div>
            {/* <!-- Concepto --> */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-on-surface-variant font-label">
                Concepto
              </label>
              <div className="relative">
                <select
                  className="w-full h-12 pl-4 pr-10 bg-surface-container-lowest border-2 border-gray-50 ring-1 ring-outline-variant/30 rounded-lg focus:ring-2 focus:ring-on-tertiary-container/20 focus:border-on-tertiary-container appearance-none outline-none cursor-pointer"
                  value={concepto}
                  onChange={(e) => {
                    setConcepto(parseInt(e.target.value));
                    setTipoTransaccion(
                      e.target.selectedOptions[0].dataset.tipo,
                    );
                  }}
                >
                  <option value="" disabled>
                    Seleccione un concepto
                  </option>
                  {conceptosSelect.map((concepto) => {
                    return (
                      <option
                        {...(data.concepto.id === concepto.id
                          ? "selected"
                          : "")}
                        data-tipo={concepto.categorias.tipo}
                        key={concepto.id}
                        value={concepto.id}
                      >
                        {concepto.nombre}
                      </option>
                    );
                  })}
                </select>
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant">
                  keyboard_arrow_down
                </span>
              </div>
            </div>

            {msg && <Alerta alerta={alerta} />}
          </div>
          {/* <!-- Footer Buttons --> */}
          <div className="px-8 py-6 bg-surface-container-low flex justify-end items-center gap-3">
            <button
              onClick={() => cerrar()}
              className="px-6 h-12 text-sm font-semibold text-white border border-outline-variant/50 rounded-lg transition-all bg-red-600 hover:bg-red-700 active:scale-95 cursor-pointer"
            >
              Cancelar
            </button>
            <button className="px-8 h-12 text-sm font-bold text-white bg-secondary rounded-lg shadow-lg shadow-[#14B86A]/20 transition-all hover:bg-[#0f8a4f] active:scale-95 flex items-center gap-2 cursor-pointer">
              <span className="material-symbols-outlined text-[18px]">
                check_circle
              </span>
              Guardar Transacción
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalTransaccion;
