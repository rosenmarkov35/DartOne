import Header from "./Header";
import Navbar from "./Navbar";
import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function GameHistoryPage() {
  const [userData, setUserData] = useState({
    allGames: [],
    allStats: {},
    username: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  axios.defaults.headers.common["X-CSRFToken"] = Cookies.get("csrftoken");

  async function fetchDetails() {
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
  }

  useEffect(() => {
    fetchDetails();
  }, []);
  return (
    <>
      <Navbar></Navbar>
      <Header title={"Games"}>{userData.username}'s games</Header>
      <div
        className="dark:bg-dark-gray bg-offwhite mx-auto mt-5 rounded-xl shadow-[0_0_10px_8px_rgb(255,255,255,0.2)]"
        style={{ height: "70vh", width: "85vw" }}
      >
        
      </div>
    </>
  );
}
