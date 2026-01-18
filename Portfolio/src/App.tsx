import { useState, useEffect } from "react";
import { type IArticle } from "@shared/article.model";
import axios from "axios";
import "./index.css";

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
      <div className="flex flex-1 h-40 justify-center">
        {articles.map((article) => {
          return <ArticlePreview {...article}></ArticlePreview>;
        })}
      </div>
    </>
  );
}

const ArticlePreview: React.FC<IArticle> = ({
  title,
  slug,
  imageURI,
  date,
  elements,
}) => {
  return (
    <>
      <div className="flex flex-1 flex-col border border-2 padding-50 items-top justify-left p-3">
        <span>
          <h1 className="text-m font-bold width-full">{title}</h1>
        </span>
      </div>
    </>
  );
};

export default App;
