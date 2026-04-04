const InputAuth = ({id, name, placeholder, type}) => {
    return (
      <input
        className="block w-full pl-10 pr-4 py-3 bg-surface-container-lowest border border-outline-variant/30 rounded-lg focus:ring-2 focus:ring-on-tertiary-container/20 focus:border-on-tertiary-container outline-none transition-all placeholder:text-outline/50"
        id={id}
        name={name}
        placeholder={placeholder}
        type={type}
      />
    );
}
 
export default InputAuth;