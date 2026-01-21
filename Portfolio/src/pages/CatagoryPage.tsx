import type { ICatagory } from "@shared/catagories.model";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const CatagoryPage = () => {
  const { name } = useParams();
  const [catagory, setCatagory] = useState<ICatagory>();
  useEffect(() => {
    const fetchArticle = async () => {
      const response = await axios.get("/api/catagories/" + name);
      setCatagory(response.data);
    };
    fetchArticle();
  }, []);

  return (
    <div className="min-w-min m-10 border bg-white">
      <h1 className=" font-bold text-3xl p-3 pb-1">{catagory?.name}</h1>
    </div>
  );
};
