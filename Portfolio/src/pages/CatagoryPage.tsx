import type { IArticle } from "@shared/article.model";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardTitle } from "../components/ui/card";

export const CatagoryPage = () => {
  const { name } = useParams();
  const [articles, setArticles] = useState<IArticle[]>([]);

  useEffect(() => {
    if (!name) return;
    const fetchArticles = async () => {
      const response = await axios.get(`/api/catagories/${name}/articles`);
      setArticles(response.data);
    };
    fetchArticles();
  }, [name]);

  return (
    <div className="min-w-min m-10 border bg-white p-6">
      <h1 className="font-bold text-3xl pb-4">Articles in "{name}"</h1>
      <div className="flex flex-wrap gap-6 justify-center">
        {articles.length === 0 ? (
          <p className="text-gray-500">No articles found for this category.</p>
        ) : (
          articles.map((article) => (
            <Link key={article.slug} to={`/article/${article.slug}`}>
              <ArticlePreview {...article} />
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

const ArticlePreview: React.FC<IArticle> = ({ title, elements }) => {
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
