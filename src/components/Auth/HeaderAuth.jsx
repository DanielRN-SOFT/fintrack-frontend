import Fintrack_Logo from "../../assets/images/Fintrack-Logo.png";
import { Link } from "react-router-dom";

const HeaderAuth = () => {
  return (
    <header className="absolute top-0 right-0 w-full flex justify-between items-center px-6 sm:px-10 md:px-12 py-6 md:py-8 z-20">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-1">
        <img
          src={Fintrack_Logo}
          alt="FinTrack Logo"
          className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto"
        />
        <span className="text-primary font-bold text-lg sm:text-xl md:text-2xl">
          FinTrack
        </span>
      </Link>

      {/* Navegación */}
      <nav className="flex items-center gap-4 sm:gap-6 md:gap-8 font-manrope text-sm sm:text-base font-medium">
        <Link
          className="text-slate-500 hover:text-secondary transition-all opacity-80 hover:opacity-100"
          to="/ayuda"
        >
          Ayuda
        </Link>
        <Link
          className="text-slate-500 hover:text-secondary transition-all opacity-80 hover:opacity-100"
          to="/privacidad"
        >
          Privacidad
        </Link>
        <Link
          className="text-primary font-bold hover:text-secondary transition-all"
          to="/soporte"
        >
          Soporte
        </Link>
      </nav>
    </header>
  );
};

export default HeaderAuth;
