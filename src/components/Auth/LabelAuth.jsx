const LabelAuth = ({ contenido }) => {
  return (
    <label
      class="block text-sm font-semibold text-primary mb-2 font-label"
      for="email"
    >
      {contenido}
    </label>
  );
};

export default LabelAuth;
