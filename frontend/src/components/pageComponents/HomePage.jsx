import Navbar from "../Navbar";
import Header from "../Header";
import Bentobox from "../Bentobox";
import { AnimatePresence, motion } from "framer-motion";
import TransitionWrapper from "../transitionComponents/TransitionWrapper";
import Popup from "../ui/Popup";

export default function HomePage() {
  return (
    <>
      <Navbar></Navbar>
      <TransitionWrapper>
        <main className="flex-1 flex flex-col justify-center gap-5 items-center">
          <Popup></Popup>
          <Header title={"DartOne"}>Play darts like never before</Header>
          <Bentobox />
        </main>
      </TransitionWrapper>
    </>
  );
}
