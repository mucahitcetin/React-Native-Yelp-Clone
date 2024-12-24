import { useEffect, useState } from "react";
import yelp from "../api/yelp";

export default () => {
  const [result, setResult] = useState([]);

  const searchApi = async (searchTerm) => {
    const response = await yelp.get("/search", {
      params: {
        limit: 50,
        term: searchTerm,
        location: "İstanbul",
      },
    });

    setResult(response.data.businesses);
  };

  useEffect(() => {
    searchApi("Toast");
  }, []);

  return [searchApi, result];
};
