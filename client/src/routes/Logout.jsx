import { useEffect, useState } from "react"

export default function Logout() {
  const [status, setStatus] = useState("Logging out...");
  
  useEffect(() => {
    async function logout() {
      const url = "http://localhost:3000/api/users/logout";
      const response = await fetch(url, {
        method: "POST",
        credentials: 'include'
      });

      if (response.ok){
        setUser('You are successfully logged out');
      }else{
        setUser('Error encountered. Try  again');
      }
    }
    logout();
  }, []);
  return (
    <>
      <h1>Logout</h1>
      <p>{ status }</p>
    </>
  )
}