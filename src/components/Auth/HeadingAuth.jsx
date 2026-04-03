const HeadingAuth = ({ titulo, mensaje }) => {
  return (
    <div class="mb-10 text-center md:text-left">
      <h2 class="text-3xl font-extrabold text-primary font-headline mb-2 tracking-tight">
        {titulo}
      </h2>
      <p class="text-on-surface-variant font-body">{mensaje}</p>
    </div>
  );
};

export default HeadingAuth;
