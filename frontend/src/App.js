import "./App.css";
import HomePage from "./components/HomePage";
import FeaturesPage from "./components/FeaturesPage";
import QuickplayPage from "./components/QuickplayPage";
import AccountPage from "./components/authComponents/AccountPage";
import SignInPage from "./components/authComponents/SignInPage";
import SignUpPage from "./components/authComponents/SignUpPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/features", element: <FeaturesPage /> },
  { path: "/quickplay", element: <QuickplayPage /> },
  {
    path: "/account",
    element: <AccountPage />,
    children: [
      { path: "sign-in", element: <SignInPage /> },
      { path: "sign-up", element: <SignUpPage /> },
    ]
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
