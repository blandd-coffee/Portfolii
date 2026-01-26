import { NavLink, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "./ui/button";
import { Catagories } from "./Catagories";

interface IPage {
  _id: string;
  title: string;
  slug: string;
  order?: number;
}

export const Layout = () => {
  const [pages, setPages] = useState<IPage[]>([]);

  useEffect(() => {
    const fetchPages = async () => {
      try {
        const response = await axios.get("/api/pages");
        setPages(response.data);
      } catch (err) {
        console.error("Failed to fetch pages:", err);
      }
    };
    fetchPages();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <nav className="flex gap-3 rounded-2xl bg-white border border-cyan-200 p-3 shadow-md m-5 mb-0">
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
      <div className="flex flex-1 gap-5 p-5 pt-3">
        <main className="flex-1">
          <Outlet />
        </main>
        <aside className="w-64 rounded-2xl bg-white/40 backdrop-blur-md border border-white/60 p-6 shadow-lg h-fit sticky top-5">
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
          <Catagories />
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
