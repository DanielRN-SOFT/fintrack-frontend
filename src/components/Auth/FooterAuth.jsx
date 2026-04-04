import { Link } from "react-router-dom";
const FooterAuth = ({ mensaje, link, url }) => {
  return (
    <>
      <div className="mt-8 text-center">
        <p className="text-on-surface-variant text-sm">
          {mensaje}
          <Link
            className="text-on-tertiary-container font-bold hover:underline transition-all ml-1"
            to={url}
          >
            {link}
          </Link>
        </p>
      </div>
    </>
  );
};

export default FooterAuth;
