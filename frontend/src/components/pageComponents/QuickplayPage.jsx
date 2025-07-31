import Navbar from "../Navbar";
import DartsScoreCounter from "../DartsScoreCounter";
import TransitionWrapper from "../transitionComponents/TransitionWrapper";

export default function QuickplayPage() {
  return (
    <>
      <Navbar></Navbar>
      <TransitionWrapper>
        <main className="flex flex-col justify-center gap-5 items-center">
          <DartsScoreCounter></DartsScoreCounter>
        </main>
      </TransitionWrapper>
    </>
  );
}
