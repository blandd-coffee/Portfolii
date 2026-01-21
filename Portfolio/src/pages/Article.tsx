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
    <div className="min-w-min m-10 border bg-white">
      <h1 className=" font-bold text-3xl p-3 pb-1">{article?.title}</h1>
      {article?.elements.map((element) => {
        if (element.type == "subtitle")
          return (
            <h1 className="text-2xl pl-3 pb-5 border-b">{element.data}</h1>
          );
        if (element.type == "header") return <h1>{element.data}</h1>;
        if (element.type == "paragraph") return <p>{element.data}</p>;
        if (element.type == "code")
          return (
            <div className="border-b border-t my-5 p-4 bg-slate-950 overflow-x-auto">
              <pre className="font-mono text-green-400 text-sm leading-relaxed">
                {element.data}
              </pre>
            </div>
          );
        if (element.type == "list") return <ul>{element.data}</ul>;
      })}
    </div>
  );
};
