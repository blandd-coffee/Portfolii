import { Route, Routes, Link, BrowserRouter as Router } from "react-router-dom";
import { useState, useEffect } from "react";

import { type IArticle } from "@shared/article.model";
import axios from "axios";

export const Home = () => {
  const [articles, setArticles] = useState<IArticle[]>([]);
  useEffect(() => {
    const getArticles = async () => {
      const response = await axios.get("/api/article");
      setArticles(response.data);
      console.log(JSON.stringify(articles, null, 2));
    };

    getArticles();
  }, []);

  return (
    <div className="flex flex-wrap gap-3 justify-center p-3">
      {articles.map((article) => {
        return (
          <Link key={article.slug} to={`/article/${article.slug}`}>
            <ArticlePreview key={article.slug} {...article}></ArticlePreview>
          </Link>
        );
      })}
    </div>
  );
};

const ArticlePreview: React.FC<IArticle> = ({
  title,
  slug,
  imageURI,
  date,
  elements,
}) => {
  return (
    <div className="h-50 flex flex-col border-2 p-3 w-64">
      <h1 className="text-m font-bold border-b">{title}</h1>
      <p className="text-xs font-semibold mt-auto">{elements[0].data}</p>
    </div>
  );
};
