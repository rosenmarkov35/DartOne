import HomePage from "./components/HomePage";
import FeaturesPage from "./components/FeaturesPage";
import QuickplayPage from "./components/QuickplayPage";
import RoadmapPage from "./components/RoadmapPage";
import AccountPage from "./components/authComponents/AccountPage";
import SignInPage from "./components/authComponents/SignInPage";
import SignUpPage from "./components/authComponents/SignUpPage";
import { DetailsProvider } from "./contexts/detailsContext";
import { AuthProvider } from "./contexts/authContext";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import GameHistoryPage from "./components/GameHistoryPage";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/features", element: <FeaturesPage /> },
  { path: "/quickplay", element: <QuickplayPage /> },
  { path: "/history", element: <GameHistoryPage /> },
  { path: "/roadmap", element: <RoadmapPage /> },
  { path: "/account", element: <AccountPage /> },
  { path: "/account/signin", element: <SignInPage /> },
  { path: "/account/signup", element: <SignUpPage /> },
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
