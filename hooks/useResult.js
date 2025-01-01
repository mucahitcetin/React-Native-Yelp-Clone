import { useEffect, useState } from "react";
import yelp from "../api/yelp";

export default () => {
  const [result, setResult] = useState([]);
  const [errorMessage, setErrorMessage] = useState("")
  const searchApi = async (searchTerm) => {
   
   try {
    const response = await yelp.get("/search", {
      params: {
        limit: 50,
        term: searchTerm,
        location: "İstanbul",
      },
    });
    setResult(response.data.businesses);
    setErrorMessage("")
   } catch (error) {
    setErrorMessage("Bağlantı hatası")
   }
    
  };

  useEffect(() => {
    searchApi("Toast");
  }, []);

  return [searchApi, result,errorMessage];
};
