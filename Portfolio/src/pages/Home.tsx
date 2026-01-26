import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import type { IArticle } from "@shared/article.model";
import axios from "axios";
import { Catagories } from "../components/Catagories";
import { Card, CardContent, CardTitle } from "../components/ui/card";

export const Home = () => {
  const [articles, setArticles] = useState<IArticle[]>([]);
  useEffect(() => {
    const getArticles = async () => {
      const response = await axios.get("/api/article");
      setArticles(response.data);
    };
    getArticles();
  }, []);

  return (
    <div className="flex flex-wrap gap-6 justify-center p-6">
      {articles.map((article) => (
        <Link key={article.slug} to={`/article/${article.slug}`}>
          <ArticlePreview {...article} />
        </Link>
      ))}
    </div>
  );
};

const ArticlePreview: React.FC<IArticle> = ({ title, elements }) => {
  // Limit preview to 120 chars, add ellipsis if longer
  const preview = elements[0]?.data || "";
  const cutoff = 120;
  const previewText =
    preview.length > cutoff ? preview.slice(0, cutoff) + "..." : preview;
  return (
    <Card className="w-64 h-50 flex flex-col hover:shadow-lg transition-shadow">
      <CardTitle className="p-4 border-b">{title}</CardTitle>
      <CardContent className="flex-1 flex items-end">
        <p className="text-sm text-gray-600">{previewText}</p>
      </CardContent>
    </Card>
  );
};
