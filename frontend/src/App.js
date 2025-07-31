import HomePage from "./components/pageComponents/HomePage";
import FeaturesPage from "./components/pageComponents/FeaturesPage";
import QuickplayPage from "./components/pageComponents/QuickplayPage";
import RoadmapPage from "./components/pageComponents/RoadmapPage";
import MyAccountPage from "./components/authComponents/MyAccountPage.jsx";
import PlayerAccountPage from "./components/authComponents/PlayerAccountPage.jsx";
import SignInPage from "./components/authComponents/SignInPage";
import SignUpPage from "./components/authComponents/SignUpPage";
import { DetailsProvider } from "./contexts/detailsContext";
import { AuthProvider } from "./contexts/authContext";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import GameHistoryPage from "./components/pageComponents/GameHistoryPage";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/features", element: <FeaturesPage /> },
  { path: "/quickplay", element: <QuickplayPage /> },
  { path: "/history", element: <GameHistoryPage /> },
  { path: "/roadmap", element: <RoadmapPage /> },
  { path: "/myaccount", element: <MyAccountPage /> },
  { path: "/account/signin", element: <SignInPage /> },
  { path: "/account/signup", element: <SignUpPage /> },
  { path: "/account/:username", element: <PlayerAccountPage /> },
]);

function App() {
  return (
    <DetailsProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </DetailsProvider>
  );
}

export default App;
