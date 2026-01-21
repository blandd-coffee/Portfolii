import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Catagories = () => {
  const [catagories, setCatagories] = useState<any>([]);
  useEffect(() => {
    const fetchCatagories = async () => {
      const response = await axios.get("/api/catagories/");
      setCatagories(response.data);
    };
    fetchCatagories();
    console.log(catagories);
  }, []);

  return (
    <div className="bg-amber-50 flex flex-row gap-3 p-3 border rounded-2xl m-10 justify-center items-center">
      {catagories.map((catagory) => {
        return (
          <Link
            to={`/catagory/${catagory.name}`}
            className="h-30 flex flex-1 flex-col border-2 p-3 justify-center items-center"
            key={catagory.name}
          >
            <h1 className="flex flex-1 items-center justify-center">
              {catagory.name}
            </h1>
          </Link>
        );
      })}
    </div>
  );
};
