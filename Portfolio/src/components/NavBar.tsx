import { Link, Outlet } from "react-router-dom";

export const NavBar = () => {
  return (
    <div className="min-h-screen">
      <nav className="flex flex-1 border-b-2 rounded-2xl justify-items-center">
        <div className="flex flex-1 justify-center">
          <Link to="/">
            <h1>Home</h1>
          </Link>
        </div>

        <div className="flex flex-1 justify-center">
          <Link to="/">
            <h1>Homee</h1>
          </Link>
        </div>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
};
