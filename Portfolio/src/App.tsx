import { Route, Routes, Link, BrowserRouter as Router } from "react-router-dom";
import { useState, useEffect } from "react";

import "./index.css";
import { ArticlePage } from "./pages/Article";
import { Home } from "./pages/Home";
import { NavBar } from "./components/NavBar";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<NavBar />}>
          <Route path="/" element={<Home />} />
          <Route path="/article/:slug" element={<ArticlePage />}></Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
