const GroupFormAuth = ({ logo }) => {
  return (
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <span
        className="material-symbols-outlined text-outline text-xl group-focus-within:text-on-tertiary-container transition-colors"
        data-icon={logo}
      >
        {logo}
      </span>
    </div>
  );
};

export default GroupFormAuth;
