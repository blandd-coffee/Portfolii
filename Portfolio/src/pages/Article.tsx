import type { IArticle } from "@shared/article.model";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const ArticlePage = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState<IArticle>();
  useEffect(() => {
    const fetchArticle = async () => {
      const response = await axios.get("/api/article/" + slug);
      setArticle(response.data);
    };
    fetchArticle();
  }, []);

  return (
    <div>
      <h1>{article?.title}</h1>
      <h1>{article?.elements[0].data}</h1>
    </div>
  );
};
