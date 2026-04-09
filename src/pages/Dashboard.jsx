import CardGrid from "../components/Dashboard/CardGrid";
import { useState, useEffect } from "react";
import clienteFetch from "../../config/clienteFetch";
import config from "../../config/authorization";
import formatearDinero from "../../config/formatearDinero";


const Dashboard = () => {
  const [resumenAnual, setResumenAnual] = useState({});
  const token = localStorage.getItem("token");

  useEffect(() => {
    const obtenerResumenAnual = async () => {
      const request = await clienteFetch("/dashboard", config(token));
      const response = await request.json();
      setResumenAnual(response.resumenAnual);
    };
    obtenerResumenAnual();
  }, []);

  return (
    <main className="ml-0 lg:ml-64 flex-1 flex flex-col bg-surface min-h-screen">
      {/* <!-- Dashboard Content --> */}
      <div className="px-12 pb-12 flex flex-col gap-8 mt-25">
        {/* <!-- KPI Grid --> */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {/* <!-- Ingresos --> */}
          <CardGrid
            icono="trending_up"
            titulo="Ingresos del mes"
            valor={formatearDinero(resumenAnual.ingresos)}
            colorBadge="text-secondary"
            colorIcono="bg-secondary-container/20"
            textoBadge="paid"
          />
          {/* <!-- Egresos --> */}
          <CardGrid
            icono="trending_down"
            titulo="Egresos del mes"
            valor={formatearDinero(resumenAnual.egresos)}
            colorBadge="text-error"
            colorIcono="bg-error-container/20"
            textoBadge="wallet"
          />
          {/* <!-- Balance --> */}
          <CardGrid
            icono="account_balance_wallet"
            titulo="Balance"
            valor={formatearDinero(resumenAnual.balance)}
            colorBadge="text-tertiary-container"
            colorIcono="bg-tertiary-fixed/20"
            textoBadge="balance"
          />
          {/* <!-- Ahorro --> */}
          <CardGrid
            icono="savings"
            titulo="Tasa de Ahorro"
            valor="51.8%"
            colorBadge="text-primary-container"
            colorIcono="bg-primary-fixed/30"
            textoBadge="payments"
          />
        </section>
        {/* <!-- Middle Section: Charts --> */}
        <section className="grid grid-cols-1 lg:grid-cols-10 gap-6 md:gap-8">
          {/* <!-- Area Chart Placeholder (60%) --> */}
          <div className="lg:col-span-6 bg-surface-container-lowest p-8 rounded-xl shadow-[0_24px_48px_-12px_rgba(0,25,57,0.04)] border border-outline-variant/10">
            <div className="flex items-center justify-between mb-8">
              <h4 className="font-headline font-bold text-lg text-primary">
                Evolución de Flujo de Efectivo
              </h4>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-secondary"></span>
                  <span className="text-xs text-on-surface-variant font-medium">
                    Ingresos
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-error"></span>
                  <span className="text-xs text-on-surface-variant font-medium">
                    Egresos
                  </span>
                </div>
              </div>
            </div>
            {/* <!-- Chart Graphic Emulation --> */}
            <div className="h-64 flex items-end gap-1 relative">
              {/* <!-- Horizontal Grid Lines --> */}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-5">
                <div className="border-b border-on-surface"></div>
                <div className="border-b border-on-surface"></div>
                <div className="border-b border-on-surface"></div>
                <div className="border-b border-on-surface"></div>
              </div>
              {/* <!-- Mock Wave Shape --> */}
              <div className="w-full h-full bg-linear-to-t from-secondary/5 to-transparent absolute bottom-0"></div>
              <svg
                className="absolute bottom-0 left-0 w-full h-full overflow-visible"
                preserveAspectRatio="none"
                viewBox="0 0 100 100"
              >
                <path
                  d="M0,80 Q10,75 20,60 T40,40 T60,55 T80,30 T100,20"
                  fill="none"
                  stroke="#14B86A"
                  strokeWidth="2"
                  vectorEffect="non-scaling-stroke"
                ></path>
                <path
                  d="M0,90 Q10,85 20,80 T40,75 T60,82 T80,70 T100,65"
                  fill="none"
                  stroke="#ba1a1a"
                  strokeWidth="2"
                  vectorEffect="non-scaling-stroke"
                ></path>
              </svg>
              <div className="w-full flex justify-between pt-4 absolute -bottom-8">
                <span className="text-[10px] text-on-surface-variant font-bold">
                  NOV
                </span>
                <span className="text-[10px] text-on-surface-variant font-bold">
                  DIC
                </span>
                <span className="text-[10px] text-on-surface-variant font-bold">
                  ENE
                </span>
                <span className="text-[10px] text-on-surface-variant font-bold">
                  FEB
                </span>
                <span className="text-[10px] text-on-surface-variant font-bold">
                  MAR
                </span>
                <span className="text-[10px] text-on-surface-variant font-bold">
                  ABR
                </span>
              </div>
            </div>
          </div>
          {/* <!-- Donut Chart Placeholder (40%) --> */}
          <div className="lg:col-span-4 bg-surface-container-lowest p-8 rounded-xl shadow-[0_24px_48px_-12px_rgba(0,25,57,0.04)] border border-outline-variant/10 flex flex-col">
            <h4 className="font-headline font-bold text-lg text-primary mb-8">
              Distribución de Egresos
            </h4>
            <div className="flex-1 flex flex-col items-center justify-center gap-8">
              <div className="relative w-48 h-48">
                <svg className="w-full h-full" viewBox="0 0 36 36">
                  <circle
                    cx="18"
                    cy="18"
                    fill="transparent"
                    r="15.915"
                    stroke="#dde2f3"
                    strokeWidth="4"
                  ></circle>
                  <circle
                    cx="18"
                    cy="18"
                    fill="transparent"
                    r="15.915"
                    stroke="#002d5e"
                    strokeDasharray="40 60"
                    strokeDashoffset="25"
                    strokeWidth="4"
                  ></circle>
                  <circle
                    cx="18"
                    cy="18"
                    fill="transparent"
                    r="15.915"
                    stroke="#14B86A"
                    strokeDasharray="25 75"
                    strokeDashoffset="85"
                    strokeWidth="4"
                  ></circle>
                  <circle
                    cx="18"
                    cy="18"
                    fill="transparent"
                    r="15.915"
                    stroke="#008080"
                    strokeDasharray="20 80"
                    strokeDashoffset="110"
                    strokeWidth="4"
                  ></circle>
                  <circle
                    cx="18"
                    cy="18"
                    fill="transparent"
                    r="15.915"
                    stroke="#ba1a1a"
                    strokeDasharray="15 85"
                    strokeDashoffset="125"
                    strokeWidth="4"
                  ></circle>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-xs text-on-surface-variant font-bold uppercase">
                    Total
                  </span>
                  <span className="text-xl font-extrabold text-primary">
                    $2.3M
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-x-8 gap-y-3 w-full px-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary-container"></span>
                  <span className="text-xs font-medium text-on-surface">
                    Alimentación
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-secondary"></span>
                  <span className="text-xs font-medium text-on-surface">
                    Transporte
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-tertiary-container"></span>
                  <span className="text-xs font-medium text-on-surface">
                    Servicios
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-error"></span>
                  <span className="text-xs font-medium text-on-surface">
                    Otros
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- Bottom Section --> */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* <!-- Grouped Bar Chart --> */}
          <div className="bg-surface-container-lowest p-8 rounded-xl shadow-[0_24px_48px_-12px_rgba(0,25,57,0.04)] border border-outline-variant/10">
            <h4 className="font-headline font-bold text-lg text-primary mb-8">
              Comparativa Mensual
            </h4>
            <div className="h-64 flex items-end justify-between gap-4 px-4">
              {/* <!-- Bar Groups --> */}
              <div className="flex flex-col items-center gap-2 w-full">
                <div className="flex items-end gap-1 h-48 w-full justify-center">
                  <div className="bg-primary-container/20 w-4 h-[60%] rounded-t-sm"></div>
                  <div className="bg-secondary/40 w-4 h-[40%] rounded-t-sm"></div>
                </div>
                <span className="text-[10px] font-bold text-on-surface-variant">
                  NOV
                </span>
              </div>
              <div className="flex flex-col items-center gap-2 w-full">
                <div className="flex items-end gap-1 h-48 w-full justify-center">
                  <div className="bg-primary-container/20 w-4 h-[80%] rounded-t-sm"></div>
                  <div className="bg-secondary/40 w-4 h-[50%] rounded-t-sm"></div>
                </div>
                <span className="text-[10px] font-bold text-on-surface-variant">
                  DIC
                </span>
              </div>
              <div className="flex flex-col items-center gap-2 w-full">
                <div className="flex items-end gap-1 h-48 w-full justify-center">
                  <div className="bg-primary-container/20 w-4 h-[70%] rounded-t-sm"></div>
                  <div className="bg-secondary/40 w-4 h-[45%] rounded-t-sm"></div>
                </div>
                <span className="text-[10px] font-bold text-on-surface-variant">
                  ENE
                </span>
              </div>
              <div className="flex flex-col items-center gap-2 w-full">
                <div className="flex items-end gap-1 h-48 w-full justify-center">
                  <div className="bg-primary-container/20 w-4 h-[90%] rounded-t-sm"></div>
                  <div className="bg-secondary/40 w-4 h-[55%] rounded-t-sm"></div>
                </div>
                <span className="text-[10px] font-bold text-on-surface-variant">
                  FEB
                </span>
              </div>
              <div className="flex flex-col items-center gap-2 w-full">
                <div className="flex items-end gap-1 h-48 w-full justify-center">
                  <div className="bg-primary-container/20 w-4 h-[75%] rounded-t-sm"></div>
                  <div className="bg-secondary/40 w-4 h-[60%] rounded-t-sm"></div>
                </div>
                <span className="text-[10px] font-bold text-on-surface-variant">
                  MAR
                </span>
              </div>
              <div className="flex flex-col items-center gap-2 w-full">
                <div className="flex items-end gap-1 h-48 w-full justify-center">
                  <div className="bg-primary-container w-4 h-[95%] rounded-t-sm"></div>
                  <div className="bg-secondary w-4 h-[48%] rounded-t-sm"></div>
                </div>
                <span className="text-[10px] font-bold text-primary">ABR</span>
              </div>
            </div>
          </div>
          {/* <!-- Recent Transactions Table --> */}
          <div className="bg-surface-container-lowest p-8 rounded-xl shadow-[0_24px_48px_-12px_rgba(0,25,57,0.04)] border border-outline-variant/10">
            <div className="flex items-center justify-between mb-8">
              <h4 className="font-headline font-bold text-lg text-primary">
                Últimas Transacciones
              </h4>
              <button className="text-primary-container text-xs font-bold hover:underline">
                Ver todo
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="sr-only">
                  <tr>
                    <th>Icon</th>
                    <th>Description</th>
                    <th>Date</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-container-low">
                  {/* <!-- Row 1 --> */}
                  <tr className="hover:bg-surface-container-low transition-all duration-200">
                    <td className="py-4 pr-4">
                      <div className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center">
                        <span className="material-symbols-outlined text-primary-container text-lg">
                          shopping_cart
                        </span>
                      </div>
                    </td>
                    <td className="py-4">
                      <div className="flex flex-col">
                        <span className="font-semibold text-primary text-sm">
                          Éxito Express
                        </span>
                        <span className="text-xs text-on-surface-variant">
                          Alimentación
                        </span>
                      </div>
                    </td>
                    <td className="py-4 text-xs text-on-surface-variant font-medium">
                      Hoy, 10:24 AM
                    </td>
                    <td className="py-4 text-right">
                      <span className="font-bold text-error text-sm">
                        -$125.400
                      </span>
                    </td>
                  </tr>
                  {/* <!-- Row 2 --> */}
                  <tr className="hover:bg-surface-container-low transition-all duration-200">
                    <td className="py-4 pr-4">
                      <div className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center">
                        <span className="material-symbols-outlined text-primary-container text-lg">
                          electric_bolt
                        </span>
                      </div>
                    </td>
                    <td className="py-4">
                      <div className="flex flex-col">
                        <span className="font-semibold text-primary text-sm">
                          EPM - Energía
                        </span>
                        <span className="text-xs text-on-surface-variant">
                          Servicios
                        </span>
                      </div>
                    </td>
                    <td className="py-4 text-xs text-on-surface-variant font-medium">
                      Ayer, 03:15 PM
                    </td>
                    <td className="py-4 text-right">
                      <span className="font-bold text-error text-sm">
                        -$342.000
                      </span>
                    </td>
                  </tr>
                  {/* <!-- Row 3 --> */}
                  <tr className="hover:bg-surface-container-low transition-all duration-200">
                    <td className="py-4 pr-4">
                      <div className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center">
                        <span className="material-symbols-outlined text-secondary text-lg">
                          payments
                        </span>
                      </div>
                    </td>
                    <td className="py-4">
                      <div className="flex flex-col">
                        <span className="font-semibold text-primary text-sm">
                          Nómina Abril
                        </span>
                        <span className="text-xs text-on-surface-variant">
                          Ingresos
                        </span>
                      </div>
                    </td>
                    <td className="py-4 text-xs text-on-surface-variant font-medium">
                      15 Abr 2026
                    </td>
                    <td className="py-4 text-right">
                      <span className="font-bold text-secondary text-sm">
                        +$4.200.000
                      </span>
                    </td>
                  </tr>
                  {/* <!-- Row 4 --> */}
                  <tr className="hover:bg-surface-container-low transition-all duration-200">
                    <td className="py-4 pr-4">
                      <div className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center">
                        <span className="material-symbols-outlined text-primary-container text-lg">
                          directions_car
                        </span>
                      </div>
                    </td>
                    <td className="py-4">
                      <div className="flex flex-col">
                        <span className="font-semibold text-primary text-sm">
                          Shell Gasolinera
                        </span>
                        <span className="text-xs text-on-surface-variant">
                          Transporte
                        </span>
                      </div>
                    </td>
                    <td className="py-4 text-xs text-on-surface-variant font-medium">
                      14 Abr 2026
                    </td>
                    <td className="py-4 text-right">
                      <span className="font-bold text-error text-sm">
                        -$185.000
                      </span>
                    </td>
                  </tr>
                  {/* <!-- Row 5 --> */}
                  <tr className="hover:bg-surface-container-low transition-all duration-200">
                    <td className="py-4 pr-4">
                      <div className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center">
                        <span className="material-symbols-outlined text-primary-container text-lg">
                          movie
                        </span>
                      </div>
                    </td>
                    <td className="py-4">
                      <div className="flex flex-col">
                        <span className="font-semibold text-primary text-sm">
                          Netflix Suscripción
                        </span>
                        <span className="text-xs text-on-surface-variant">
                          Entretenimiento
                        </span>
                      </div>
                    </td>
                    <td className="py-4 text-xs text-on-surface-variant font-medium">
                      12 Abr 2026
                    </td>
                    <td className="py-4 text-right">
                      <span className="font-bold text-error text-sm">
                        -$48.900
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Dashboard;
