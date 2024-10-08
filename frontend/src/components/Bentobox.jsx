import MySpline from "./MySpline";
import BentoElement from "./BentoElement";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { useAuth } from "../contexts/authContext";
import { DetailsContext } from "../contexts/detailsContext";
import GamePlayed from "./GamePlayed";

export default function Bentobox() {
  const { isAuthenticated, logout, isLoading } = useAuth();
  const { userData } = useContext(DetailsContext);

// DA OPRAVQ SIGN IN I SIGN UP PAGE ZA MOBILE
// DA OPRAVQ SIGN IN I SIGN UP PAGE ZA MOBILE
// DA OPRAVQ SIGN IN I SIGN UP PAGE ZA MOBILE
// DA OPRAVQ SIGN IN I SIGN UP PAGE ZA MOBILE
// DA OPRAVQ SIGN IN I SIGN UP PAGE ZA MOBILE
// DA OPRAVQ SIGN IN I SIGN UP PAGE ZA MOBILE
// DA OPRAVQ SIGN IN I SIGN UP PAGE ZA MOBILE
// DA OPRAVQ SIGN IN I SIGN UP PAGE ZA MOBILE
// DA OPRAVQ SIGN IN I SIGN UP PAGE ZA MOBILE
// DA OPRAVQ SIGN IN I SIGN UP PAGE ZA MOBILE
// DA OPRAVQ SIGN IN I SIGN UP PAGE ZA MOBILE
// DA OPRAVQ SIGN IN I SIGN UP PAGE ZA MOBILE
// DA OPRAVQ SIGN IN I SIGN UP PAGE ZA MOBILE
// DA OPRAVQ SIGN IN I SIGN UP PAGE ZA MOBILE
// DA OPRAVQ SIGN IN I SIGN UP PAGE ZA MOBILE
// DA OPRAVQ SIGN IN I SIGN UP PAGE ZA MOBILE
// DA OPRAVQ SIGN IN I SIGN UP PAGE ZA MOBILE
// DA OPRAVQ SIGN IN I SIGN UP PAGE ZA MOBILE
// DA OPRAVQ SIGN IN I SIGN UP PAGE ZA MOBILE
// DA OPRAVQ SIGN IN I SIGN UP PAGE ZA MOBILE
// DA OPRAVQ SIGN IN I SIGN UP PAGE ZA MOBILE
// DA OPRAVQ SIGN IN I SIGN UP PAGE ZA MOBILE
// DA OPRAVQ SIGN IN I SIGN UP PAGE ZA MOBILE
// DA OPRAVQ SIGN IN I SIGN UP PAGE ZA MOBILE
// DA OPRAVQ SIGN IN I SIGN UP PAGE ZA MOBILE
// DA OPRAVQ SIGN IN I SIGN UP PAGE ZA MOBILE
// DA OPRAVQ SIGN IN I SIGN UP PAGE ZA MOBILE
// DA OPRAVQ SIGN IN I SIGN UP PAGE ZA MOBILE
// DA OPRAVQ SIGN IN I SIGN UP PAGE ZA MOBILE
// DA OPRAVQ SIGN IN I SIGN UP PAGE ZA MOBILE
// DA OPRAVQ SIGN IN I SIGN UP PAGE ZA MOBILE
// DA OPRAVQ SIGN IN I SIGN UP PAGE ZA MOBILE
// DA OPRAVQ SIGN IN I SIGN UP PAGE ZA MOBILE
// DA OPRAVQ SIGN IN I SIGN UP PAGE ZA MOBILE
// DA OPRAVQ SIGN IN I SIGN UP PAGE ZA MOBILE
// DA OPRAVQ SIGN IN I SIGN UP PAGE ZA MOBILE
// DA OPRAVQ SIGN IN I SIGN UP PAGE ZA MOBILE
// DA OPRAVQ SIGN IN I SIGN UP PAGE ZA MOBILE
// DA OPRAVQ SIGN IN I SIGN UP PAGE ZA MOBILE
// DA OPRAVQ SIGN IN I SIGN UP PAGE ZA MOBILE
// DA OPRAVQ SIGN IN I SIGN UP PAGE ZA MOBILE
// DA OPRAVQ SIGN IN I SIGN UP PAGE ZA MOBILE
// DA OPRAVQ SIGN IN I SIGN UP PAGE ZA MOBILE
// DA OPRAVQ SIGN IN I SIGN UP PAGE ZA MOBILE
// DA OPRAVQ SIGN IN I SIGN UP PAGE ZA MOBILE
// DA OPRAVQ SIGN IN I SIGN UP PAGE ZA MOBILE

  return (
    <>
      <div className="xl:hidden grid grid-cols-2 grid-rows-4 gap-4 w-full px-8 text-center">
        <Link
          to={"/quickplay"}
          className="bento-element-mobile text-3xl col-span-2"
        >
          Quickplay
        </Link>
        <Link to={isAuthenticated ? `/account` : `/account/signin`} className="bento-element-mobile text-3xl">
          {isAuthenticated ? 'Account' : 'Sign in'}
        </Link>
        {isAuthenticated ? (
          <Link onClick={logout} className="bento-element-mobile text-3xl">
            {isAuthenticated ? `Log out` : `Sign up`}
          </Link>
        ) : (
          <Link
            to={"/account/signup"}
            className="bento-element-mobile text-3xl"
          >
            {isAuthenticated ? `Log out` : `Sign up`}
          </Link>
        )}
        <Link
          to={"/features"}
          className="bento-element-mobile text-3xl col-span-2"
        >
          Features
        </Link>
        <Link
          to={"/roadmap"}
          className="bento-element-mobile text-3xl col-span-2"
        >
          Roadmap
        </Link>
      </div>
      <div className="bentobox w-10/12 rounded-md" style={{ height: "65vh" }}>
        <BentoElement
          linkTo={"/features"}
          className="bento-element hover:bg-gradient-to-t from-purple-200 to-white rectangle-h flex items-center justify-center text-5xl hover:text-6xl font-semibold hover:text-purple-800"
        >
          Features
        </BentoElement>
        <Link
          to={"/quickplay"}
          className="bento-element hover:bg-gradient-to-bl from-yellow-100 to-white box-big flex items-center justify-center flex-col"
        >
          <MySpline></MySpline>
        </Link>

        {/* GAMES */}
        <BentoElement className="bento-element hover:text-yellow-400 hover:text-4xl text-center flex flex-col items-center text-3xl font-bold hover:bg-gradient-to-br from-yellow-100 to-white rectangle-v">
          <h1 className="mt-4">Games</h1>
          <div className="flex flex-col w-full justify-evenly items-center p-3">
            {userData.allGames.slice(0, 4).map((current_game) => (
              <GamePlayed
                p="p-2"
                bg="bg-offwhite"
                textColor="text-dark-gray"
                date={current_game.played_on}
                avgLeg={current_game.avg_leg}
              ></GamePlayed>
            ))}
          </div>
        </BentoElement>
        <BentoElement
          linkTo={isAuthenticated ? "/account" : "/account/signin"}
          className="bento-element hover:text-purple-800 hover:bg-gradient-to-b from-purple-200 to-white text-3xl hover:text-4xl font-semibold box-small1 flex items-center justify-center"
        >
          {isLoading ? (
            <div className="bg-gray-400 animate-pulse h-8 w-24 rounded-xl bg-opacity-25"></div>
          ) : isAuthenticated ? (
            "Account"
          ) : (
            "Sign in"
          )}
          {}
        </BentoElement>
        {isAuthenticated ? (
          <BentoElement
            onClick={logout}
            className="bento-element hover:text-purple-800 hover:bg-gradient-to-b from-purple-200 to-white text-3xl hover:text-4xl font-semibold box-small2 flex items-center justify-center"
          >
            {isLoading ? (
              <div className="bg-gray-400 animate-pulse h-8 w-24 rounded-xl bg-opacity-25"></div>
            ) : isAuthenticated ? (
              "Log out"
            ) : (
              "Sign up"
            )}
          </BentoElement>
        ) : (
          <BentoElement
            linkTo={"account/signup"}
            className="bento-element hover:text-purple-800 hover:bg-gradient-to-b from-purple-200 to-white text-3xl hover:text-4xl font-semibold box-small2 flex items-center justify-center"
          >
            {isLoading ? (
              <div className="bg-gray-400 animate-pulse h-8 w-24 rounded-xl bg-opacity-25"></div>
            ) : isAuthenticated ? (
              "Log out"
            ) : (
              "Sign up"
            )}
          </BentoElement>
        )}
      </div>
    </>
  );
}
