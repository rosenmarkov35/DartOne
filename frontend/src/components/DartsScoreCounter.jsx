import { useEffect, useState } from "react";
import Button from "./ui/Button";
import FunctionButton from "./ui/FunctionButton";
import undo from "../images/rotate-left-solid.svg";
import reset from "../images/rotate-solid.svg";
import axios from "axios";
import { useAuth } from "../contexts/authContext";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import useCheckDevice from "../hooks/useCheckDevice";
import AnimatedScore from "./counterComponents/AnimatedScore";

export default function DartsScoreCounter() {
  const INITIAL_GAME_DATA = {
    turn: 1,
    score: 501,
    multiplier: 1,
    history: [],
    totalTurns: 0,
    totalLegs: 0,
  };

  axios.defaults.headers.common["X-CSRFToken"] = Cookies.get("csrftoken");

  const [gameData, setGameData] = useState(INITIAL_GAME_DATA);
  const [glowingStates, setGlowingStates] = useState([false, false]);
  const [hoveredSections, setHoveredSections] = useState(null);
  const [saveVisible, setSaveVisible] = useState(false);
  const { isAuthenticated } = useAuth();

  const isMobile = useCheckDevice();

  let gameDataToSave = INITIAL_GAME_DATA;
  useEffect(() => {
    gameDataToSave = {
      totalTurns: gameData.totalTurns,
    };
  }, [gameData]);

  const SECTIONS = [
    { name: "1-5", points: [1, 2, 3, 4, 5] },
    { name: "6-10", points: [6, 7, 8, 9, 10] },
    { name: "11-15", points: [11, 12, 13, 14, 15] },
    { name: "16-20", points: [16, 17, 18, 19, 20] },
  ];

  function handleUndo() {
    // check if there is a history before undoing
    if (gameData.history.length > 0) {
      // when i click undo i should:

      // Always \/ \/ \/
      // remove 1 from totalTurns
      // remove the first element[0] from history
      // add back the score
      // set multiplier to 1
      setGameData((prev) => ({
        ...prev,
        totalTurns: prev.totalTurns - 1,
        score: prev.score + prev.history[0].point * prev.history[0].multiplier,
        history: prev.history.slice(1),
        multiplier: 1,
      }));

      // if on dart: 1 > change to dart: 3 and totalLegs = totalLegs - 1
      setGameData((prev) => ({
        ...prev,
        turn: prev.turn === 1 ? 3 : prev.turn - 1,
        totalLegs: prev.turn === 1 && prev.totalLegs > 0 && prev.totalLegs - 1,
      }));
    }
  }

  function handleReset() {
    setGameData(INITIAL_GAME_DATA);
    setSaveVisible(false);
  }

  const updateMultiplier = (newMultiplier) => {
    setGameData((prevGameData) => ({
      ...prevGameData,
      multiplier: newMultiplier,
    }));
  };

  function handleTurnChange() {
    setGameData((prev) => ({
      ...prev,
      turn: prev.turn === 3 ? 1 : prev.turn + 1,
    }));
    if (gameData.turn === 3) {
      setGameData((prev) => ({
        ...prev,
        totalLegs: prev.totalLegs + 1,
      }));
    }
    setGameData((prev) => ({ ...prev, totalTurns: prev.totalTurns + 1 }));
  }

  function handleScoreChange(point) {
    let hitSector = null;
    let bustTurn = false;

    if (point > 20 && gameData.multiplier === 1 && gameData.score - point > 1) {
      setGameData((prev) => ({
        ...prev,
        score: prev.score - point * 1,
      }));
    } else if (
      point <= 20 &&
      gameData.score - point * gameData.multiplier > 1
    ) {
      setGameData((prev) => ({
        ...prev,
        score: prev.score - point * gameData.multiplier,
      }));
    } else if (point === 25 || (point === 50 && gameData.score - 50 !== 0)) {
      point === 25 ? handleGlow(0) : handleGlow(1);
    } else if (
      (gameData.multiplier === 2 &&
        gameData.score - point * gameData.multiplier === 0) ||
      (point === 50 && gameData.score - 50 === 0)
    ) {
      // CHANGE THIS TO INFLUENCE WIN UI
      setSaveVisible(true);
      setGameData((prev) => ({
        ...prev,
        score: 0,
      }));
    } else {
      bustTurn = true;
    }

    if (
      (point === 25 && gameData.multiplier !== 1) ||
      (point === 50 && gameData.multiplier !== 1)
    ) {
    } else {
      hitSector = {
        point: point,
        multiplier: point === 25 || point === 50 ? 1 : gameData.multiplier,
        bustTurn: bustTurn,
      };
      bustTurn = false;
    }

    if (hitSector) {
      handleTurnChange();
      setGameData((prev) => ({
        ...prev,
        history: [hitSector, ...prev.history],
      }));
    }

    // RESETING THE MULTIPLIER BACK TO ZERO AFTER A TURN
    updateMultiplier(1);

    // IF A VALID SECTOR IS HIT A.K.A. NOT 2/3X 25/50 THEN UPDATE THE GAME HISTORY AND KEEP TRACK OF THE PAST 6 THROWS
  }

  async function handleSaveGame() {
    try {
      const totalTurns = gameData.totalTurns;
      const history = gameData.history;
      const avgLeg = 501 / (gameData.totalTurns / 3);
      let totalPoints = 0;

      for (const turn of history) {
        totalPoints += turn.point * turn.multiplier;
      }

      const avgGameThrow = totalPoints / totalTurns;
      const response = await axios.post("/api/save-game/", {
        totalTurns: totalTurns,
        history: history,
        avgGameThrow: avgGameThrow.toFixed(2),
        avgLeg: avgLeg,
      });
      console.log("Successfully saved game", response.status);
      handleReset();
    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
    }
  }

  function handleGlow(index) {
    setGlowingStates((prev) => {
      const newStates = [...prev];
      newStates[index] = true;
      return newStates;
    });

    setTimeout(() => {
      setGlowingStates((prev) => {
        const newStates = [...prev];
        newStates[index] = false;
        return newStates;
      });
    }, 500);
  }

  return (
    <>
      <div
        className="w-11/12 md:w-7/12 lg:w-5/12 mt-3 rounded-2xl p-5 flex flex-col justify-normal gap-4 items-center dark:bg-dark-gray bg-offwhite"
        style={{ height: "85vh" }}
      >
        {saveVisible ? (
          <>
            <h1 className="text-3xl dark:text-offwhite text-dark-gray font-semibold">
              Quickplay
            </h1>

            <AnimatedScore score={gameData.score}></AnimatedScore>

            <div className="flex justify-evenly items-center w-full gap-x-4">
              <p className="dark:text-offwhite text-dark-gray text-xl font-semibold">
                Dart {gameData.turn} Leg {gameData.totalLegs}
              </p>
              <p className="dark:text-offwhite text-dark-gray text-xl font-semibold">
                Throws {gameData.totalTurns}
              </p>
            </div>
            {isAuthenticated ? (
              <button
                onClick={handleSaveGame}
                className="bg-violet-500 hover:bg-violet-600 hover:scale-110 transition-all p-2 mt-12 px-4 rounded-lg text-2xl text-offwhite font-bold"
              >
                Save Game
              </button>
            ) : (
              <>
                <h1 className="text-2xl text-offwhite text-center">
                  Sign in to save games.
                </h1>
                <Link
                  to={"/account/signin/"}
                  className="text-xl text-violet-400 text-center block"
                >
                  Sign in
                </Link>
                <button
                  onClick={handleReset}
                  className="bg-violet-500 hover:bg-violet-600 hover:scale-110 transition-all p-2 mt-12 px-4 rounded-lg text-2xl text-offwhite font-bold"
                >
                  New Game
                </button>
              </>
            )}
          </>
        ) : (
          <>
            <h1 className="text-[28px] dark:text-[#787878] text-dark-gray font-semibold">
              Quickplay
            </h1>
            <hr className="w-4/5 border-zinc-600" />

            <AnimatedScore score={gameData.score}></AnimatedScore>

            <div className="flex justify-evenly items-center w-full gap-x-4">
              <p className="dark:text-offwhite text-dark-gray text-xl font-semibold">
                Dart {gameData.turn} Leg {gameData.totalLegs}
              </p>
              <p className="dark:text-offwhite text-dark-gray text-xl font-semibold">
                Throws {gameData.totalTurns}
              </p>
            </div>
            <hr className="w-4/5 border-zinc-600" />

            <div className="flex justify-evenly items-center w-11/12 h-16 mt-2">
              <Button
                onClick={() => updateMultiplier(1)}
                variant={gameData.multiplier === 1 ? "active" : ""}
              >
                1x
              </Button>
              <Button
                onClick={() => updateMultiplier(2)}
                variant={gameData.multiplier === 2 ? "active" : ""}
              >
                2x
              </Button>
              <Button
                onClick={() => updateMultiplier(3)}
                variant={gameData.multiplier === 3 ? "active" : ""}
              >
                3x
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-5 mt-5 w-full">
              {SECTIONS.map((section) => (
                <div
                  key={section.name}
                  onClick={() =>
                    setHoveredSections(
                      hoveredSections === section.name ? null : section.name
                    )
                  }
                  className={`z-10 mb-5 dark:bg-offwhite bg-dark-gray text-offwhite dark:text-dark-gray relative text-center text-xl rounded-md flex justify-center shadow-lg
     `}
                >
                  <div
                    className={`flex h-10 justify-center items-center cursor-default`}
                  >
                    {section.name}
                  </div>

                  <div
                    className={`transition-all absolute top-full -z-10 rounded-b-md  ${
                      hoveredSections === section.name
                        ? "h-auto opacity-100"
                        : "h-0 opacity-0 pointer-events-none"
                    }`}
                  >
                    {section.points.map((point) => (
                      <button
                        className="w-7 h-7 dark:text-dark-gray text-offwhite bg-dark-gray dark:bg-zinc-300 hover:text-violet-500"
                        key={point}
                        onClick={() => handleScoreChange(point)}
                      >
                        {point}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-evenly items-center mt-3 gap-x-4">
              <FunctionButton
                img={undo}
                imgAlt={"undo"}
                onPress={handleUndo}
              ></FunctionButton>

              <button
                onClick={() => handleScoreChange(25)}
                className={`w-20 h-9 dark:bg-offwhite bg-dark-gray dark:text-dark-gray text-offwhite rounded-md outline outline-2 outline-zinc-300 shadow-md ${
                  glowingStates[0] ? "animate-glowRed" : ""
                }`}
              >
                25
              </button>
              <button
                onClick={() => handleScoreChange(50)}
                className={`w-20 h-9 dark:bg-offwhite bg-dark-gray dark:text-dark-gray text-offwhite rounded-md outline outline-2 outline-zinc-300 shadow-md ${
                  glowingStates[1] ? "animate-glowRed" : ""
                }`}
              >
                50
              </button>

              <FunctionButton
                img={reset}
                imgAlt={"reset"}
                onPress={handleReset}
              ></FunctionButton>
            </div>
            <div className="w-11/12">
              <h5 className="flex justify-start items-center text-dark-gray dark:text-offwhite">
                Turns:
              </h5>
              <div className="dark:bg-offwhite bg-dark-gray  p-3 rounded-xl h-14 xl:h-12 mt-1">
                <p className="w-full h-full text-sm text-offwhite dark:text-dark-gray">
                  {gameData.history
                    .slice(0, 6)
                    .map(
                      (turn) =>
                        ` [ ${turn.point * turn.multiplier} ${
                          turn.multiplier === 1
                            ? ``
                            : `| ${turn.point}x${turn.multiplier} `
                        }]`
                    )}
                </p>
              </div>
            </div>
          </>
        )}
      </div>
      {/* <div
        className="flex flex-col justify-normal items-center bg-offwhite dark:bg-dark-gray w-11/12 lg:w-5/12 rounded-2xl mt-10 p-5"
        style={{ height: "80vh" }}
      >
        {saveVisible ? (
          <>
            <h1 className="text-dark-gray dark:text-offwhite text-center m-2 text-3xl font-bold">
              Quickplay
            </h1>
            <div className="flex justify-evenly items-center text-center">
              <h3 className="text-dark-gray dark:text-offwhite min-w-36 text-3xl font-bold">
                Dart {gameData.turn} Leg {gameData.totalLegs + 1}
              </h3>
              <h2 className="text-dark-gray dark:text-offwhite text-center m-2 text-5xl font-extrabold">
                {gameData.score}
              </h2>
              <h3 className="text-dark-gray dark:text-offwhite min-w-36 text-3xl font-bold">
                Throws {gameData.totalTurns}
              </h3>
            </div>
            {isAuthenticated ? (
              <button
                onClick={handleSaveGame}
                className="bg-violet-500 hover:bg-violet-600 hover:scale-110 transition-all p-2 mt-12 px-4 rounded-lg text-2xl text-offwhite font-bold"
              >
                Save Game
              </button>
            ) : (
              <>
                <h1 className="text-2xl text-offwhite text-center">
                  Sign in to save games.
                </h1>
                <Link
                  to={"/account/signin/"}
                  className="text-xl text-violet-400 text-center block"
                >
                  Sign in
                </Link>
                <button
                  onClick={handleReset}
                  className="bg-violet-500 hover:bg-violet-600 hover:scale-110 transition-all p-2 mt-12 px-4 rounded-lg text-2xl text-offwhite font-bold"
                >
                  New Game
                </button>
              </>
            )}
          </>
        ) : (
          <>
            <h1 className="text-dark-gray dark:text-offwhite text-center m-2 lg:text-3xl text-xl font-bold">
              Quickplay
            </h1>
            <div className="flex justify-evenly items-center text-center gap-3">
              <h3 className="text-dark-gray dark:text-offwhite xl:min-w-36 lg:text-3xl text-2xl font-bold">
                Dart {gameData.turn} Leg {gameData.totalLegs + 1}
              </h3>
              <h2 className="text-dark-gray dark:text-offwhite text-center lg:text-5xl text-2xl font-extrabold">
                {gameData.score}
              </h2>
              <h3 className="text-dark-gray dark:text-offwhite xl:min-w-36 lg:text-3xl text-2xl font-bold">
                Throws {gameData.totalTurns}
              </h3>
            </div>

            <div className="flex justify-evenly items-center w-11/12 h-16 mt-2">
              <Button
                onClick={() => updateMultiplier(1)}
                variant={gameData.multiplier === 1 ? "active" : ""}
              >
                1x
              </Button>
              <Button
                onClick={() => updateMultiplier(2)}
                variant={gameData.multiplier === 2 ? "active" : ""}
              >
                2x
              </Button>
              <Button
                onClick={() => updateMultiplier(3)}
                variant={gameData.multiplier === 3 ? "active" : ""}
              >
                3x
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-10 mt-4">
              {SECTIONS.map((section) => (
                <div
                  key={section.name}
                  onMouseEnter={() => setHoveredSections(section.name)}
                  onMouseLeave={() => setHoveredSections(null)}
                  className={`w-48 z-10 dark:bg-offwhite bg-dark-gray text-offwhite dark:text-dark-gray relative text-center text-xl  rounded-md flex justify-center shadow-lg
               `}
                >
                  <div
                    className={`flex h-10 justify-center items-center cursor-default`}
                  >
                    {section.name}
                  </div>

                  <div
                    className={`transition-all absolute top-full -z-10 left-3.5 rounded-b-md  ${
                      hoveredSections === section.name
                        ? "h-auto opacity-100"
                        : "h-0 opacity-0"
                    }`}
                  >
                    {section.points.map((point) => (
                      <button
                        className="w-8 h-8 dark:text-dark-gray text-offwhite bg-dark-gray dark:bg-zinc-300 hover:text-violet-500"
                        key={point}
                        onClick={() => handleScoreChange(point)}
                      >
                        {point}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-evenly items-center mt-10">
              <FunctionButton
                img={undo}
                imgAlt={"undo"}
                onPress={handleUndo}
              ></FunctionButton>

              <button
                onClick={() => handleScoreChange(25)}
                className={`w-20 h-9 dark:bg-offwhite bg-dark-gray dark:text-dark-gray text-offwhite mr-8 rounded-md outline outline-2 outline-zinc-300 shadow-md ${
                  glowingStates[0] ? "animate-glowRed" : ""
                }`}
              >
                25
              </button>
              <button
                onClick={() => handleScoreChange(50)}
                className={`w-20 h-9 dark:bg-offwhite bg-dark-gray dark:text-dark-gray text-offwhite rounded-md outline outline-2 outline-zinc-300 shadow-md ${
                  glowingStates[1] ? "animate-glowRed" : ""
                }`}
              >
                50
              </button>

              <FunctionButton
                img={reset}
                imgAlt={"reset"}
                onPress={handleReset}
              ></FunctionButton>
            </div>
            <div className="w-11/12">
              <h5 className="flex justify-start items-center text-dark-gray dark:text-offwhite">
                Turns:
              </h5>
              <div className="dark:bg-offwhite bg-dark-gray  p-3 rounded-xl h-12 mt-1">
                <p className="w-full h-full text-sm text-offwhite dark:text-dark-gray">
                  {gameData.history
                    .slice(0, 6)
                    .map(
                      (turn) =>
                        ` [ ${turn.point * turn.multiplier} ${
                          turn.multiplier === 1
                            ? ``
                            : `| ${turn.point}x${turn.multiplier} `
                        }]`
                    )}
                </p>
              </div>
            </div>
          </>
        )}
      </div> */}
    </>
  );
}
