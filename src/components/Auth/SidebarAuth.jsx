import { matchPath, useLocation } from "react-router-dom";

const SideBarAuth = () => {
  const textos = {
    "/": [
      "Controla tu dinero. Toma el control de tu futuro.",
      "La plataforma editorial para la gestión de tus activos más importantes. Simple, potente y privada.",
    ],
    "/sign-up": [
      "Crea tu cuenta en segundos.",
      "Menos complicaciones, más control sobre tu dinero.",
    ],
    "/forgot-password": [
      "Recupera el acceso a tu cuenta de forma segura.",
      "Te ayudamos a volver en segundos.",
    ],
    "/change-password": [
      "Estás a un paso de volver.",
      "Crea una nueva contraseña y recupera el control.",
    ],
    "/confirmar": [
      "Estamos verificando el estado de tu cuenta.",
      "Este proceso confirma tu acceso y asegura que todo esté listo para que puedas continuar.",
    ],
  };

  let { pathname } = useLocation();
  const isForgot = matchPath("/change-password/:token", pathname);
  isForgot ? (pathname = "/change-password") : (pathname = pathname);
  const isConfirmed = matchPath("/confirmar/:token", pathname);
  isConfirmed ? (pathname = "/confirmar") : (pathname = pathname)

  return (
    <aside className="hidden md:flex md:w-[40%] bg-on-tertiary-fixed-variant flex-col justify-center p-12 fixed left-0 top-0 bottom-0 z-50 overflow-hidden min-h-dvh items-center">
      <div className="absolute inset-0 geometric-pattern pointer-events-none opacity-50"></div>
      <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-5">
          <div className="bg-gray-100 rounded-lg p-2 flex items-center justify-center">
            <span
              className="material-symbols-outlined text-primary text-2xl"
              data-icon="trending_up"
            >
              trending_up
            </span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white font-headline">
            FinTrack
          </h1>
        </div>
        <div className="space-y-6 max-w-sm">
          <h2 className="text-4xl font-extrabold text-white leading-tight font-headline">
            {textos[pathname][0] || "sin titulo"}
          </h2>
          <p className="text-slate-300 text-lg leading-relaxed">
            {textos[pathname][1] || "sin parrafo"}
          </p>
        </div>
      </div>
    </aside>
  );
};

export default SideBarAuth;
