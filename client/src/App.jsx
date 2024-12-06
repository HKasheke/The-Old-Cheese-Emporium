import { createContext, useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./ui/Sidebar";

// Create a context for authentication
export const AuthContext = createContext();

function App() {
  const [loggedIn, setLoggedIn] = useState(() => {
    // Initialize state from localStorage
    return localStorage.getItem("loggedIn") === "true";
  });

  useEffect(() => {
    // Save state to localStorage whenever it changes
    localStorage.setItem("loggedIn", loggedIn);
  }, [loggedIn]);
  
  return (
    <AuthContext.Provider value={{ loggedIn, setLoggedIn }}>
      <h1>The Old Cheese Emporium</h1>
      <div>
        <Sidebar />
      </div>
      <div>
        <Outlet />
      </div>
    </AuthContext.Provider>
  );
  
}

export default App;
