import MySpline from "./MySpline";
import BentoElement from "./BentoElement";
import { Link } from "react-router-dom";

export default function Bentobox() {
  return (
    <div className="bentobox w-10/12 rounded-md" style={{ height: "65vh" }}>
      <BentoElement linkTo={'/features'} className="bento-element hover:bg-gradient-to-t from-purple-200 to-white rectangle-h flex items-center justify-center text-5xl hover:text-6xl font-semibold hover:text-purple-800">
        Features
      </BentoElement>
      <Link to={'/quickplay'} className="bento-element hover:bg-gradient-to-bl from-yellow-100 to-white box-big flex items-center justify-center flex-col">
        <MySpline></MySpline>
      </Link>
      <BentoElement linkTo={'/games'} className="bento-element hover:text-yellow-400 hover:text-4xl flex justify-center text-3xl font-bold hover:bg-gradient-to-br from-yellow-100 to-white rectangle-v">
        <h1 className="mt-6">Games</h1>
      </BentoElement>
      <BentoElement linkTo={'/account/sign-in'} className="bento-element hover:text-purple-800 hover:bg-gradient-to-b from-purple-200 to-white text-3xl hover:text-4xl font-semibold box-small1 flex items-center justify-center">
        Sign in
      </BentoElement>
      <BentoElement linkTo={'/account/sign-up'} className="bento-element hover:text-purple-800 hover:bg-gradient-to-b from-purple-200 to-white text-3xl hover:text-4xl font-semibold box-small2 flex items-center justify-center">
        Sign up
      </BentoElement>
    </div>
  );
}
