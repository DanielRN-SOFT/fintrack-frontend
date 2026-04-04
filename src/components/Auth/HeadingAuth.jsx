const HeadingAuth = ({ titulo, mensaje }) => {
  return (
    <div className="mb-10 text-center md:text-left">
      <h2 className="text-3xl font-extrabold text-primary font-headline mb-2 tracking-tight">
        {titulo}
      </h2>
      <p className="text-on-surface-variant font-body">{mensaje}</p>
    </div>
  );
};

export default HeadingAuth;
