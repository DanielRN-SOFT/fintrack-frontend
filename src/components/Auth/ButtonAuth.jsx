import { Link } from "react-router-dom";
const ButtonAuth = ({ mensaje, className }) => {
  return (
    <Link
      className={`flex-1 py-2 px-4 rounded-lg text-sm font-semibold text-center cursor-pointer ${className}`}
    >
      {mensaje}
    </Link>
  );
};

export default ButtonAuth;
