import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../App"; 

export default function Logout() {
  const [status, setStatus] = useState("Logging out...");
  const { setLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    async function logout() {
      const hostUrl = import.meta.env.VITE_APP_HOST;
      const logoutUrl = `${hostUrl}/api/users/logout`;
      
      try {
        const response = await fetch(logoutUrl, {
          method: "POST",
          credentials: "include",
        });

        if (response.ok) {
          setStatus("You are successfully logged out");
          setLoggedIn(false);
          //setTimeout(() => navigate("/login"), 2000); // Redirect to login after 2 seconds
        } else {
          setStatus("Error encountered. Please try again.");
        }
      } catch (error) {
        console.error("Logout error:", error);
        setStatus("Network error. Please try again.");
      }
    }
    logout();
  }, [navigate]);

  return (
    <>
      <h2>Logout</h2>
      <p>{status}</p>
    </>
  );
}
