import Navbar from "./Navbar";
import Header from "./Header";
import FeatureDrop from "./FeatureDrop";
import descriptions from '../data/descriptions.js';

export default function FeaturesPage() {
  return (
    <>
      <Navbar></Navbar>
      <main className="flex flex-col justify-center gap-5 items-center">
        <Header title={"Features"}>Experience darts at your best</Header>
        <div className="w-5/12">
          <FeatureDrop linkTo={'/quickplay'}
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
            alert={'Coming soon'}
           />
           <FeatureDrop
            title={"Sleek and Fast"}
            description={descriptions[3]}
            demoButton={null}
           />
        </div>
      </main>
    </>
  );
}
