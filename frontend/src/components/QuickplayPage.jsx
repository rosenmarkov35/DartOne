import Navbar from "./Navbar";
import DartsScoreCounter from "./DartsScoreCounter";

export default function QuickplayPage() {
  return (
    <>
      <Navbar></Navbar>
      <main className="flex flex-col justify-center gap-5 items-center">
        <DartsScoreCounter></DartsScoreCounter>
      </main>
    </>
  );
}
