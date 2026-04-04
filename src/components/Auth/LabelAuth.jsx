const LabelAuth = ({ contenido, id }) => {
  return (
    <label
      className="block text-sm font-semibold text-primary mb-2 font-label"
      htmlFor={id}
    >
      {contenido}
    </label>
  );
};

export default LabelAuth;
