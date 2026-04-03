import { Outlet } from "react-router-dom";
import HeaderAuth from "../components/Auth/HeaderAuth";
import SideBarAuth from "../components/Auth/SidebarAuth";

const AuthLayout = () => {
  return (
    <>
      <main className="flex min-h-screen w-full">
        <SideBarAuth />
        <section className="w-full md:ml-[40%] md:w-[60%] min-h-screen bg-surface flex flex-col relative">
          <HeaderAuth />
          <div className="grow flex items-center justify-center p-8">
            <Outlet />
          </div>
        </section>
      </main>
    </>
  );
};

export default AuthLayout;
