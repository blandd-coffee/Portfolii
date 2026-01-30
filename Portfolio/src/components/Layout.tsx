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
  const { data } = useAsync<IPage[]>(() => fetchPages(), [], {
    initialData: [],
  });
  const pages = data ?? [];

  // Show loading bar on route change
  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timeout);
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 relative overflow-x-hidden">
      {/* Top loading bar */}
      <div className="fixed top-0 left-0 w-full h-1 z-50 pointer-events-none">
        <div
          className={`h-full bg-gradient-to-r from-emerald-300 to-teal-300 transition-all duration-600 ease-out ${loading ? "w-full opacity-100" : "w-0 opacity-0"}`}
          style={{ transitionProperty: "width, opacity" }}
        />
      </div>
      {/* Decorative background elements */}
      <div
        className="pointer-events-none absolute -top-32 -left-32 w-[520px] h-[520px] bg-emerald-500/20 rounded-full opacity-70 blur-3xl animate-fade-in"
        style={{ zIndex: 0 }}
      />
      <div
        className="pointer-events-none absolute top-1/2 right-0 w-[420px] h-[420px] bg-teal-400/20 rounded-full opacity-60 blur-2xl animate-fade-in"
        style={{ zIndex: 0 }}
      />
      <header className="relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-5 pt-6">
          <div className="rounded-3xl border border-emerald-900/50 bg-slate-950/70 backdrop-blur-md shadow-lg px-5 sm:px-6 py-5">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl sm:text-3xl font-semibold text-emerald-50">
                  Expresso Developments
                </h1>
              </div>
              <div className="h-px w-full bg-emerald-900/40" />
              <nav className="flex flex-wrap gap-2 w-full">
                <NavLink to="/">
                  {({ isActive }) => (
                    <Button variant={isActive ? "default" : "ghost"}>
                      Home
                    </Button>
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
            </div>
          </div>
        </div>
      </header>
      <div className="flex flex-1 gap-6 px-4 sm:px-5 pb-12 pt-6 relative z-10 max-w-6xl mx-auto w-full flex-col lg:flex-row">
        <main className="flex-1 min-h-0 flex flex-col">
          <div
            className="flex-1 transition-all duration-500"
            style={{ opacity: loading ? 0.7 : 1 }}
          >
            <Outlet />
          </div>
        </main>
        <aside
          className="w-full lg:w-72 rounded-2xl bg-slate-950/70 backdrop-blur-md border border-emerald-900/50 p-5 sm:p-6 shadow-lg h-fit sticky top-5 transition-all duration-500 order-last lg:order-none"
          style={{ opacity: loading ? 0.7 : 1 }}
        >
          <h3 className="text-xs uppercase tracking-[0.3em] text-emerald-300 mb-4">
            Categories
          </h3>
          <Categories sidebar />
        </aside>
      </div>
      <footer className="bg-slate-950 text-slate-200 py-4 px-5 mt-auto">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-emerald-900/40 pt-4">
          <p className="text-xs text-slate-500">
            &copy; 2026 Expresso Developments
          </p>
          <p className="text-xs text-slate-500">Too sleepy for this.</p>
        </div>
      </footer>
    </div>
  );
};
