import Navbar from "../Navbar.jsx";
import Header from "../Header.jsx";
import FeatureDrop from "../FeatureDrop.jsx";
import descriptions from "../../data/descriptions.js";
import TransitionWrapper from "../transitionComponents/TransitionWrapper.jsx";

export default function FeaturesPage() {
  return (
    <>
      <Navbar></Navbar>
      <TransitionWrapper>
        <main className="flex flex-col justify-center gap-5 items-center">
          <Header title={"Features"}>Experience darts at your best</Header>
          <div className="w-10/12 xl:w-5/12">
            <FeatureDrop
              linkTo={"/quickplay"}
              title={"Real-Time Game Tracking"}
              description={descriptions[0]}
              demoButton="Try it out"
            />
            <FeatureDrop
              title={"Save and Revisit Your Games"}
              description={descriptions[1]}
              demoButton={null}
            />
            <FeatureDrop
              title={"Detailed Game Statistics"}
              description={descriptions[2]}
              demoButton={null}
            />
            <FeatureDrop
              title={"Play with Friends"}
              description={descriptions[4]}
              demoButton={null}
              alert={"Coming soon"}
              extHeight="12rem"
            />
            <FeatureDrop
              title={"Sleek and Fast"}
              description={descriptions[3]}
              demoButton={null}
            />
          </div>
        </main>
      </TransitionWrapper>
    </>
  );
}
