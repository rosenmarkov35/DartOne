import FeatureDrop from "./FeatureDrop";
import Navbar from "./Navbar";
import roadmapdesc from "../data/roadmapdesc";
import Header from "./Header";

export default function RoadmapPage() {
  return (
    <>
      <Navbar></Navbar>
      <Header title={"Roadmap"}>What you should expect from DartOne</Header>
      <main
        style={{ height: "40vh" }}
        className="flex flex-col justify-start items-center"
      >
        <div className="flex flex-col w-3/4 justify-start items-center">
          <FeatureDrop
            title={'Version 1.0 - "First Throw"'}
            description={roadmapdesc[0]}
            extHeight="21rem"
          ></FeatureDrop>
          <FeatureDrop
            title={'Version 1.1 - "QOL"'}
            description={roadmapdesc[1]}
            alert={"Coming soon"}
            extHeight="23rem"
          ></FeatureDrop>
          <FeatureDrop
            title={'Version 2.0 - "Social"'}
            description={roadmapdesc[2]}
            alert={"Coming soon"}
            extHeight="22rem"
          ></FeatureDrop>
        </div>
      </main>
    </>
  );
}
