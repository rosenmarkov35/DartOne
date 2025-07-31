import MySpline from "./MySpline";
import BentoElement from "./BentoElement";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { useAuth } from "../contexts/authContext";
import { DetailsContext } from "../contexts/detailsContext";
import GamePlayed from "./GamePlayed";
import useCheckDevice from "../hooks/useCheckDevice";
import DropDownButton from "./DropDownButton";
import appImg from "../images/app-image-notext.png";
import logoImg from "../images/logo.png";
import dartImg from "../images/dart-img.png";

export default function Bentobox() {
  const { isAuthenticated, logout, isLoading } = useAuth();
  const { userData } = useContext(DetailsContext);
  const isMobile = useCheckDevice();

  return (
    <>
      {/* MOBILE HOME UI */}
      {isMobile && (
        <>
          <div className="xl:hidden flex flex-col items-center gap-4 w-full px-8 text-center">
            <DropDownButton
              additionalClasses="w-3/4"
              text={"Quickplay"}
              linkTo={"/quickplay"}
              desc={
                "Quickplay lets you jump straight into a game with minimal setup."
              }
              linkText={"Play"}
            ></DropDownButton>
            <DropDownButton
              text={isAuthenticated ? "Account" : "Sign in"}
              linkTo={isAuthenticated ? `/myaccount` : `/account/signin`}
              desc={
                isAuthenticated
                  ? "Account details and games."
                  : "Sign in to view your account."
              }
              linkText={isAuthenticated ? "View Account" : "Sign in"}
            ></DropDownButton>
            <DropDownButton
              onLinkClick={isAuthenticated && logout}
              text={isAuthenticated ? "Log out" : "Sign up"}
              linkTo={isAuthenticated ? "" : "/account/signup"}
              desc={
                isAuthenticated
                  ? "Log out of your DartOne account."
                  : "Sign up and start improving your game."
              }
              linkText={isAuthenticated ? "Log out" : "Sign up"}
            ></DropDownButton>
            <DropDownButton
              additionalClasses="w-1/2"
              text={"Features"}
              linkTo={"/features"}
              desc={
                "Have a look at the countless features that DartOne offers."
              }
              linkText={"Explore"}
            ></DropDownButton>
            <DropDownButton
              additionalClasses="w-2/5"
              text={"Roadmap"}
              linkTo={"/roadmap"}
              desc={
                "See how far we've come and what you can expect from DartOne"
              }
              linkText={"View"}
            ></DropDownButton>
            <img className="absolute left-8 top-[300px] blur-sm -z-10 w-[150px] rotate-[-24deg]" src={appImg} alt="" />
            <img className="absolute right-2 top-[440px] blur-[2px] -z-10 w-[150px] rotate-[180deg]" src={logoImg} alt="" />
            <img className="absolute left-8 top-[540px] blur-[0.9px] -z-10 w-[150px] rotate-[-30deg]" src={dartImg} alt="" />
          </div>
        </>
      )}

      {/* MOBILE HOME UI */}

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
          <div className="flex flex-col w-full h-full gap-2 items-center p-3">
            {isAuthenticated && userData.allGames.slice(0, 4).map((current_game) => (
              <GamePlayed
                p="p-2"
                bg="dark:bg-offwhite bg-light-gray"
                textColor="text-dark-gray"
                date={current_game.played_on}
                avgLeg={current_game.avg_leg}
              ></GamePlayed>
            ))}
          </div>
        </BentoElement>
        <BentoElement
          linkTo={isAuthenticated ? "/myaccount" : "/account/signin"}
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
