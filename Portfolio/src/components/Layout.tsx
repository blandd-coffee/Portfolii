import { Link, NavLink, Outlet } from "react-router-dom";

export const Layout = () => {
  const active = ({ isActive }: { isActive: boolean }) => `
    ${isActive ? `bg-black-10 font-bold` : `bg-black-10`}
  `;
  const nav = `flex flex-1 h-15 justify-center items-center opacity-75 border-hidden bg-white rounded-2xl`;

  return (
    <div className="min-h-screen m-0 p-5 min-w-screen bg-linear-to-br from-amber-700 to-amber-400">
      <nav className="flex flex-1 border-2 rounded-2xl align-middle justify-items-center p-0">
        <div className={nav}>
          <NavLink to="/" className={active}>
            <h1>Home</h1>
          </NavLink>
        </div>

        <div className={nav}>
          <NavLink to="/2" className={active}>
            <h1>Homee</h1>
          </NavLink>
        </div>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
};
