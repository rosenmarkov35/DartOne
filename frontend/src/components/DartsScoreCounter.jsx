import { useState } from "react";
import Button from "./ui/Button";
import FunctionButton from "./ui/FunctionButton";
import undo from "../images/rotate-left-solid.svg";
import reset from "../images/rotate-solid.svg";

export default function DartsScoreCounter() {
  const INITIAL_GAME_DATA = {
    turn: 1,
    score: 501,
    multiplier: 1,
    history: [],
    totalTurns: 0,
    totalLegs: 0,
  }

  const [gameData, setGameData] = useState(INITIAL_GAME_DATA);
  const [glowingStates, setGlowingStates] = useState([false, false]);
  const [hoveredSections, setHoveredSections] = useState(null);

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
    setGameData(INITIAL_GAME_DATA)
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
    if (
      (point === 25 && gameData.multiplier !== 1) ||
      (point === 50 && gameData.multiplier !== 1)
    ) {
    } else {
      hitSector = {
        point: point,
        multiplier: point === 25 || point === 50 ? 1 : gameData.multiplier,
      };
    }

    console.log(hitSector);
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
    } else if (point === 25 || point === 50) {
      point === 25 ? handleGlow(0) : handleGlow(1);
    } else if (
      gameData.multiplier === 2 &&
      gameData.score - point * gameData.multiplier === 0
    ) {
      // CHANGE THIS TO INFLUENCE WIN UI
      setGameData((prev) => ({
        ...prev,
        score: 888,
      }));
    }

    // RESETING THE MULTIPLIER BACK TO ZERO AFTER A TURN
    updateMultiplier(1);

    // IF A VALID SECTOR IS HIT A.K.A. NOT 2/3X 25/50 THEN UPDATE THE GAME HISTORY AND KEEP TRACK OF THE PAST 6 THROWS
    if (hitSector) {
      handleTurnChange();
      setGameData((prev) =>
        prev.history.length <= 5
          ? {
              ...prev,
              history: [hitSector, ...prev.history],
            }
          : {
              ...prev,
              history: [hitSector, ...prev.history.slice(0, -1)],
            }
      );
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
        className="flex flex-col justify-normal items-center bg-offwhite dark:bg-dark-gray w-5/12 rounded-2xl mt-10 p-5"
        style={{ height: "80vh" }}
      >
        <h1 className="text-dark-gray dark:text-offwhite text-center m-2 text-3xl font-bold">
          Quickplay
        </h1>
        <div className="flex justify-evenly items-center text-center">
          <h3 className="text-dark-gray dark:text-offwhite min-w-36 text-3xl font-bold mr-6">
            Dart {gameData.turn} Leg {gameData.totalLegs + 1}
          </h3>
          <h2 className="text-dark-gray dark:text-offwhite text-center m-2 text-5xl font-extrabold">
            {gameData.score}
          </h2>
          <h3 className="text-dark-gray dark:text-offwhite min-w-36 text-3xl font-bold ml-12">
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
              {gameData.history.map(
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
      </div>
    </>
  );
}
