import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const DetailsContext = createContext();

export const DetailsProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    allGames: [],
    allStats: {},
    username: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  const fetchDetails = async () => {
    try {
      const response = await axios.get("/api/getdetails/");
      setUserData({
        allGames: response.data.all_games,
        allStats: response.data.all_stats,
        username: response.data.username,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  return (
    <DetailsContext.Provider value={{ userData, isLoading, fetchDetails }}>
      {children}
    </DetailsContext.Provider>
  );
};
