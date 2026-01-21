import { Route, Routes, Link } from "react-router-dom";
import { useState, useEffect } from "react";

import "./index.css";
import { ArticlePage } from "./pages/Article";
import { Home } from "./pages/Home";
import { Layout } from "./components/Layout";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/2" element={<Home />} />

        <Route path="/catagory/:name" element={<ArticlePage />}></Route>

        <Route path="/article/:slug" element={<ArticlePage />}></Route>
        <Route path="/article/:slug" element={<ArticlePage />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
