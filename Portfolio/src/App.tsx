import { Route, Routes } from "react-router-dom";
import { ArticlePage } from "./pages/Article";
import { Page } from "./pages/Page";
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
        <Route path="/page/:slug" element={<Page />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
