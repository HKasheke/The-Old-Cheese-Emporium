import { useState, useEffect } from "react";

export default function Home(){
  const [user, setUser] = useState('');

  useEffect(() => {
    async function getUserSession() {
      const hostUrl = import.meta.env.VITE_APP_HOST;
      const apiUrl = hostUrl + "/api/users/getsession";
      const response = await fetch(apiUrl, {
        method: "GET",
        credentials: 'include'
      });

      if (response.ok){
        const data = await response.json();
        setUser(data.user);
      }else{
        setUser('Nobody logged in');
      }
    }
    getUserSession();
  }, []);

  return (
    <>
      <h1>Home</h1>
      <p>User: {user}</p>
    </>
  )
}