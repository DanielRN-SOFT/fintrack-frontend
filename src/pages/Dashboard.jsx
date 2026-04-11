import CardGrid from "../components/Dashboard/CardGrid";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import clienteFetch from "../config/clienteFetch";
import config from "../config/authorization";
import formatearDinero from "../config/formatearDinero";
import PieChart from "../components/Charts/PieChart";
import FinancialChart from "../components/Charts/FinacialChart";
import BarComparativa from "../components/Charts/BarComparativa";
import FilaTabla from "../components/Dashboard/FilaTabla";

const Dashboard = () => {
  const [cargando, setCargando] = useState(true);
  const [resumenAnual, setResumenAnual] = useState({});
  const [resumenMensual, setResumenMensual] = useState({});
  const [balanceMensual, setBalanceMensual] = useState({});
  const [gastosPorCategoria, setGastosPorCategoria] = useState({});
  const [ultimasTransacciones, setUltimasTransacciones] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const obtenerEstadisticas = async () => {
      const request = await clienteFetch("/dashboard", config(token));
      const response = await request.json();
      setResumenAnual(response.resumenAnual);
      setGastosPorCategoria(response.gastosPorCategoria);
      setResumenMensual(response.resumenMensual);
      setBalanceMensual(response.balanceMensual);
      setUltimasTransacciones(response.ultimasTransacciones);

      setCargando(false);
    };
    obtenerEstadisticas();
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
            <div className="flex items-center justify-between mb-6">
              <h4 className="font-headline font-bold text-lg text-primary">
                Evolución de Flujo de Efectivo
              </h4>
            </div>

            {/* IMPORTANTE: altura fija */}
            <div className="h-80">
              {!cargando && (
                <FinancialChart
                  labels={resumenMensual.labels}
                  ingresos={resumenMensual.datasets[0].data}
                  egresos={resumenMensual.datasets[1].data}
                  balance={balanceMensual.datasets[0].data}
                />
              )}
            </div>
          </div>
          {/* <!-- Donut Chart Placeholder (40%) --> */}
          {!cargando && (
            <div className="lg:col-span-4 bg-surface-container-lowest p-8 rounded-xl shadow-[0_24px_48px_-12px_rgba(0,25,57,0.04)] border border-outline-variant/10">
              <h4 className="font-headline font-bold text-lg text-primary mb-8 text-center">
                Gastos por categoría
              </h4>

              <div className="w-full h-64 md:h-80 lg:h-72">
                <PieChart
                  labels={gastosPorCategoria.labels}
                  datasets={gastosPorCategoria.datasets}
                />
              </div>
            </div>
          )}
        </section>
        {/* <!-- Bottom Section --> */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* <!-- Grouped Bar Chart --> */}
          <div className="bg-surface-container-lowest p-8 rounded-xl shadow-[0_24px_48px_-12px_rgba(0,25,57,0.04)] border border-outline-variant/10">
            <h4 className="font-headline font-bold text-lg text-primary mb-6">
              Comparativa Mensual
            </h4>

            <div className="h-72">
              {!cargando && (
                <BarComparativa
                  labels={resumenMensual.labels}
                  ingresos={resumenMensual.datasets[0].data}
                  egresos={resumenMensual.datasets[1].data}
                />
              )}
            </div>
          </div>
          {/* <!-- Recent Transactions Table --> */}
          <div className="bg-surface-container-lowest p-8 rounded-xl shadow-[0_24px_48px_-12px_rgba(0,25,57,0.04)] border border-outline-variant/10">
            <div className="flex items-center justify-between mb-8">
              <h4 className="font-headline font-bold text-lg text-primary">
                Últimas Transacciones
              </h4>
              <Link
                to={"/admin/transacciones"}
                className="text-primary-container text-xs font-bold hover:underline cursor-pointer"
              >
                Ver todo
              </Link>
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
                  {!cargando &&
                    ultimasTransacciones.map((transacciones) => {
                      return (
                        <FilaTabla
                          key={transacciones.id}
                          icono={"shopping_cart"}
                          descripcion={transacciones.descripcion}
                          categoria={transacciones.conceptos.categorias.nombre}
                          fecha={transacciones.fecha}
                          valor={transacciones.valor}
                          tipo={
                            transacciones.conceptos.categorias.tipo === "Egreso"
                              ? "text-error"
                              : "text-secondary"
                          }
                        />
                      );
                    })}
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
