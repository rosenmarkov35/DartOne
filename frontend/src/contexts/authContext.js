import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import axios from "axios";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    isLoading: true,
  });

  const checkAuth = async () => {
    try {
      const response = await axios.get("/api/check-auth/");
      setAuthState({
        isAuthenticated: response.data.isAuthenticated,
        isLoading: false,
      });
      return response.data.isAuthenticated;
    } catch (err) {
      setAuthState({ isAuthenticated: false, isLoading: false });
      return false;
    }
  };

  useEffect(() => {
    checkAuth();
    axios.defaults.headers.common["X-CSRFToken"] = Cookies.get("csrftoken");
  }, []);

  const login = async (username, password) => {
    try {
      await axios.post("/api/signin/", { username, password });
      const isAuthenticated = await checkAuth();
      return isAuthenticated;
    } catch (err) {
      console.error("Login failed");
      return false;
    }
  };

  const logout = async () => {
    try {
      await axios.post("/api/signout/");
      await checkAuth();
      console.log(authState.isAuthenticated);
    } catch (err) {
      console.error("Signout failed");
    }
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
