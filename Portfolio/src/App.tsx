import { useState, useEffect } from "react";
import { type IArticle } from "@shared/article.model";
import "./App.css";
import axios from "axios";

function App() {
  const [articles, setArticles] = useState<IArticle[]>([]);
  useEffect(() => {
    const getArticles = async () => {
      const response = await axios.get("/api/article");
      setArticles(response.data);
    };

    getArticles();
  }, []);

  useEffect(() => {
    console.log(articles);
    articles.forEach((article) => {
      console.log(article);
    });
  }, [articles]);

  return (
    <>
      <h1>test</h1>
      {articles.map((article) => {
        return <h1>{article.title}</h1>;
      })}
    </>
  );
}

export default App;
