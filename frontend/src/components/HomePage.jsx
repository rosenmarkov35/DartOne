import Navbar from "./Navbar";
import Header from "./Header";
import Bentobox from "./Bentobox";

export default function HomePage() {
  return (
    <>
      <Navbar></Navbar>
      <main className="flex flex-col justify-center gap-5 items-center">
        <Header title={"DartOne"}>Play darts like never before</Header>
        <Bentobox></Bentobox>
      </main>
    </>
  );
}
