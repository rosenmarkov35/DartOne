import axios from "axios";
import AccountSection from "../AccountSection";
import Header from "../Header";
import Navbar from "../Navbar";
import Cookies from "js-cookie";
import { useEffect, useState, useMemo } from "react";
import GamePlayed from "../GamePlayed";
import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  Area,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { Link, useParams } from "react-router-dom";
import TransitionWrapper from "../transitionComponents/TransitionWrapper";

export default function AccountDetailsPage() {
  const { username } = useParams();
  const [userData, setUserData] = useState({
    allGames: [],
    allStats: {},
    username: "",
  });
  const [displayedPages, setDisplayedPages] = useState({
    startGame: 0,
    endGame: 5,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  axios.defaults.headers.common["X-CSRFToken"] = Cookies.get("csrftoken");

  const fetchDetails = async () => {
    if (!username) return;

    try {
      setIsLoading(true);
      setError(null);
      const response = await axios.get(`/api/account/${username}`);
      setUserData({
        allGames: response.data.all_games || [],
        allStats: response.data.all_stats || {},
        username: response.data.username || "",
      });
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Failed to fetch user data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [username]); // Add username as dependency

  const chartData = useMemo(() => {
    return userData.allGames.map((current_game, index) => ({
      name: current_game.played_on,
      chartAvgLeg: current_game.avg_leg,
      gameNumber: index + 1,
    }));
  }, [userData.allGames]);

  const handlePrevPage = () => {
    if (displayedPages.startGame > 0) {
      setDisplayedPages((prev) => ({
        startGame: prev.startGame - 5,
        endGame: prev.endGame - 5,
      }));
    }
  };

  const handleNextPage = () => {
    if (chartData.length > displayedPages.endGame) {
      setDisplayedPages((prev) => ({
        startGame: prev.startGame + 5,
        endGame: prev.endGame + 5,
      }));
    }
  };

  if (error) {
    return (
      <>
        <Navbar />
        <main className="flex flex-col justify-center items-center h-screen">
          <div className="text-red-500 text-xl">{error}</div>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar></Navbar>
      <TransitionWrapper>
        <main className="flex flex-col justify-center gap-3 items-center">
          <Header title={"Account"}></Header>
          <div
            className="grid xl:hidden grid-cols-1 gap-y-5 grid-rows-8 w-full sm:w-2/3 lg:w-1/2 px-5"
            style={{ height: "80vh" }}
          >
            {/* MOBILE GRAPH */}
            {/* MOBILE GRAPH */}
            {/* MOBILE GRAPH */}
            <div className="row-span-4 flex items-center justify-center">
              <AccountSection
                height="h-full"
                title={"Graph"}
                justify="justify-center"
              >
                <ResponsiveContainer width={"100%"} height={"100%"}>
                  <AreaChart
                    data={chartData.slice(
                      displayedPages.startGame,
                      displayedPages.endGame
                    )}
                    className="dark:bg-dark-gray bg-offwhite p-2 rounded-lg"
                  >
                    <XAxis dataKey="name" />
                    <YAxis dataKey="chartAvgLeg" />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip
                      formatter={(value, name, props) => {
                        const displayName =
                          name === "chartAvgLeg" ? "3-Dart Avg" : name;
                        return [`${displayName}: ${value}`];
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="chartAvgLeg"
                      stroke="#8884d8"
                      fillOpacity={0.15}
                      fill="#eb78ff"
                    />
                  </AreaChart>
                </ResponsiveContainer>
                <div className="flex justify-evenly items-center gap-10">
                  <button
                    onClick={handlePrevPage}
                    className="dark:bg-offwhite bg-dark-gray dark:hover:bg-slate-300
                     hover:bg-zinc-700 px-4 py-1 transition-all dark:text-dark-gray text-offwhite rounded-lg"
                  >
                    Prev
                  </button>
                  <button
                    onClick={handleNextPage}
                    className="dark:bg-offwhite bg-dark-gray dark:hover:bg-slate-300
                     hover:bg-zinc-700 px-4 py-1 transition-all dark:text-dark-gray text-offwhite rounded-lg"
                  >
                    Next
                  </button>
                </div>
              </AccountSection>
            </div>
            <Link className="flex justify-center items-center text-center rounded-lg text-2xl row-span-1 bg dark:bg-dark-gray bg-offwhite dark:text-offwhite text-dark-gray">
              See all games
            </Link>
            <div className="px-4 rounded-lg row-span-3 dark:bg-dark-gray bg-offwhite dark:text-offwhite text-dark-gray flex flex-col justify-evenly items-start">
              <h1 className="text-2xl">
                Username: {isLoading ? "N/A" : userData.username}
              </h1>
              <h1 className="text-2xl">Stats</h1>
              <p className="text-xl">
                Games played:{" "}
                {isLoading ? " N/A" : ` ${userData.allStats.games_played}`}
              </p>
              <p className="text-xl">
                Avg Throw:{" "}
                {isLoading
                  ? " N/A"
                  : ` ${userData.allStats.avg_throw.toFixed(
                      2
                    )} | 3-Dart Avg: ${userData.allStats.avg_leg.toFixed(2)}`}
              </p>
              <p className="text-xl">
                Avg. Turns per Game:{" "}
                {isLoading
                  ? " N/A"
                  : ` ${userData.allStats.avg_turns_per_game.toFixed(2)}`}
              </p>
            </div>

            {/* MOBILE GRAPH */}
            {/* MOBILE GRAPH */}
            {/* MOBILE GRAPH */}
          </div>
          <div
            className="grid-cols-5 grid-rows-1 w-1/2 h-3/4 gap-5 hidden xl:grid"
            style={{ height: "70vh" }}
          >
            <div className="flex flex-col gap-4 items-center bg-offwhite col-span-3 dark:bg-dark-gray text-dark-gray dark:text-offwhite p-5 rounded-lg">
              <AccountSection
                height="h-1/6"
                title={"Username:"}
                items="center"
                flexCol={false}
              >
                <h1 className="text-2xl ml-4">
                  {isLoading ? "N/A" : userData.username}
                </h1>
              </AccountSection>
              <AccountSection height="h-2/6" title={"Stats"}>
                <div className="flex flex-col justify-evenly items-starts h-full text-lg">
                  <h1>
                    Games Played:
                    {isLoading ? " N/A" : ` ${userData.allStats.games_played}`}
                  </h1>
                  <h1>
                    Avg. Throw:
                    {isLoading
                      ? " N/A"
                      : ` ${userData.allStats.avg_throw.toFixed(
                          2
                        )} | 3-Dart Avg: ${userData.allStats.avg_leg.toFixed(
                          2
                        )}`}
                  </h1>
                  <h1>
                    Avg. Turns per Game:
                    {isLoading
                      ? " N/A"
                      : ` ${userData.allStats.avg_turns_per_game.toFixed(2)}`}
                  </h1>
                </div>
              </AccountSection>
              <AccountSection height="h-3/6" title={"Graph"}>
                <ResponsiveContainer>
                  <AreaChart
                    data={chartData.slice(
                      displayedPages.startGame,
                      displayedPages.endGame
                    )}
                    className="dark:bg-dark-gray bg-offwhite p-2 rounded-lg"
                  >
                    <XAxis dataKey="name" />
                    <YAxis dataKey="chartAvgLeg" />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip
                      formatter={(value, name, props) => {
                        const displayName =
                          name === "chartAvgLeg" ? "3-Dart Avg" : name;
                        return [`${displayName}: ${value}`];
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="chartAvgLeg"
                      stroke="#8884d8"
                      fillOpacity={0.15}
                      fill="#eb78ff"
                    />
                  </AreaChart>
                </ResponsiveContainer>
                <div className="flex justify-evenly items-center gap-10">
                  <button
                    onClick={handlePrevPage}
                    className="dark:bg-offwhite bg-dark-gray dark:hover:bg-slate-300
                     hover:bg-zinc-700 px-4 py-1 transition-all dark:text-dark-gray text-offwhite rounded-lg"
                  >
                    Prev
                  </button>
                  <button
                    onClick={handleNextPage}
                    className="dark:bg-offwhite bg-dark-gray dark:hover:bg-slate-300
                     hover:bg-zinc-700 px-4 py-1 transition-all dark:text-dark-gray text-offwhite rounded-lg"
                  >
                    Next
                  </button>
                </div>
              </AccountSection>
            </div>
            <div className="bg-offwhite col-span-2 dark:bg-dark-gray text-dark-gray dark:text-offwhite p-5 rounded-lg">
              <AccountSection
                height="h-full"
                title={"Game history"}
                items="center"
              >
                <div className="h-full bg-zinc-400 bg-opacity-40 mt-2 p-3 pt-5 pb-0 w-full rounded-xl">
                  {userData.allGames
                    .slice(-5)
                    .reverse()
                    .map((current_game) => (
                      <GamePlayed
                        date={current_game.played_on}
                        avgLeg={current_game.avg_leg}
                        totalTurns={current_game.total_turns}
                      ></GamePlayed>
                    ))}
                </div>
              </AccountSection>
            </div>
          </div>
        </main>
      </TransitionWrapper>
    </>
  );
}
