const SideBar = () => {
  return (
    <aside className="flex flex-col h-screen fixed left-0 top-0 border-r border-white/10 bg-[#002D5E] dark:bg-slate-950 w-64 z-50">
      <div className="text-2xl font-black text-white px-6 py-8 font-headline tracking-tight">
        FinTrack
        <span className="block text-xs font-medium text-on-primary-container tracking-widest opacity-80 uppercase mt-1">
          Premium Ledger
        </span>
      </div>
      <nav className="flex-1 px-3 space-y-1 overflow-y-auto no-scrollbar">
        <a
          className="flex items-center bg-slate-800/50 text-white border-l-4 border-[#14B86A] rounded-r-lg ml-0 py-3 px-6 group"
          href="#"
        >
          <span className="material-symbols-outlined mr-4">dashboard</span>
          <span className="font-headline font-semibold tracking-tight">
            Dashboard
          </span>
        </a>

        <a
          className="flex items-center text-slate-300 hover:text-white py-3 px-6 transition-colors hover:bg-white/10 rounded-lg group"
          href="#"
        >
          <span className="material-symbols-outlined mr-4">dashboard</span>
          <span className="font-headline font-semibold tracking-tight">
            Transacciones
          </span>
        </a>
        <a
          className="flex items-center text-slate-300 hover:text-white py-3 px-6 transition-colors hover:bg-white/10 rounded-lg group"
          href="#"
        >
          <span className="material-symbols-outlined mr-4">trending_up</span>
          <span className="font-headline font-semibold tracking-tight">
            Inversiones
          </span>
        </a>
        <a
          className="flex items-center text-slate-300 hover:text-white py-3 px-6 transition-colors hover:bg-white/10 rounded-lg group"
          href="#"
        >
          <span className="material-symbols-outlined mr-4">
            account_balance_wallet
          </span>
          <span className="font-headline font-semibold tracking-tight">
            Presupuesto
          </span>
        </a>
        <a
          className="flex items-center text-slate-300 hover:text-white py-3 px-6 transition-colors hover:bg-white/10 rounded-lg group"
          href="#"
        >
          <span className="material-symbols-outlined mr-4">settings</span>
          <span className="font-headline font-semibold tracking-tight">
            Configuración
          </span>
        </a>
      </nav>
    </aside>
  );
};

export default SideBar;
