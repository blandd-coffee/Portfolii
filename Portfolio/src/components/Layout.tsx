import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchPages } from "../api";
import { Button } from "./ui/button";
import { Categories } from "./Categories";
import { useAsync } from "../hooks/useAsync";

interface IPage {
  _id: string;
  title: string;
  slug: string;
  order?: number;
}

export const Layout = () => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const { data } = useAsync<IPage[]>(
    () => fetchPages(),
    [],
    { initialData: [] },
  );
  const pages = data ?? [];

  // Show loading bar on route change
  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timeout);
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-cyan-50 via-white to-slate-100 relative overflow-x-hidden">
      {/* Top loading bar */}
      <div className="fixed top-0 left-0 w-full h-1 z-50 pointer-events-none">
        <div
          className={`h-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-600 ease-out ${loading ? "w-full opacity-100" : "w-0 opacity-0"}`}
          style={{ transitionProperty: "width, opacity" }}
        />
      </div>
      {/* Decorative background elements */}
      <div
        className="pointer-events-none absolute -top-32 -left-32 w-[500px] h-[500px] bg-cyan-100 rounded-full opacity-30 blur-3xl animate-fade-in"
        style={{ zIndex: 0 }}
      />
      <div
        className="pointer-events-none absolute top-1/2 right-0 w-[400px] h-[400px] bg-cyan-200 rounded-full opacity-20 blur-2xl animate-fade-in"
        style={{ zIndex: 0 }}
      />
      <nav className="flex gap-3 rounded-2xl bg-white border border-cyan-200 p-3 shadow-md m-5 mb-0 relative z-10">
        <NavLink to="/">
          {({ isActive }) => (
            <Button variant={isActive ? "default" : "ghost"}>Home</Button>
          )}
        </NavLink>
        {pages.map((page) => (
          <NavLink key={page._id} to={`/page/${page.slug}`}>
            {({ isActive }) => (
              <Button variant={isActive ? "default" : "ghost"}>
                {page.title}
              </Button>
            )}
          </NavLink>
        ))}
      </nav>
      <div className="flex flex-1 gap-5 p-5 pt-3 relative z-10">
        <main className="flex-1 min-h-0 flex flex-col">
          <div
            className="flex-1 overflow-y-auto custom-scrollbar transition-all duration-500"
            style={{ opacity: loading ? 0.7 : 1 }}
          >
            <Outlet />
          </div>
        </main>
        <aside
          className="w-64 rounded-2xl bg-white/40 backdrop-blur-md border border-white/60 p-6 shadow-lg h-fit sticky top-5 transition-all duration-500"
          style={{ opacity: loading ? 0.7 : 1 }}
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Navigation
          </h3>
          <nav className="space-y-3 mb-6">
            <NavLink to="/">
              {({ isActive }) => (
                <div
                  className={`px-4 py-2 rounded-lg transition-colors ${isActive ? "bg-cyan-600/20 text-cyan-700 font-medium" : "text-gray-700 hover:bg-white/50"}`}
                >
                  Home
                </div>
              )}
            </NavLink>
            <NavLink to="/2">
              {({ isActive }) => (
                <div
                  className={`px-4 py-2 rounded-lg transition-colors ${isActive ? "bg-cyan-600/20 text-cyan-700 font-medium" : "text-gray-700 hover:bg-white/50"}`}
                >
                  Browse
                </div>
              )}
            </NavLink>
          </nav>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 mt-8">
            Categories
          </h3>
          <Categories sidebar />
        </aside>
      </div>
      <footer className="bg-slate-800 text-gray-200 py-8 px-5 mt-auto">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="font-semibold text-white mb-3">About</h4>
              <p className="text-sm text-gray-400">
                A curated collection of articles and insights.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">Links</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-cyan-400 transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-cyan-400 transition-colors">
                    Articles
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">Contact</h4>
              <p className="text-sm text-gray-400">
                Get in touch for collaborations
              </p>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-6">
            <p className="text-center text-sm text-gray-500">
              &copy; 2026 TonyCorp. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
