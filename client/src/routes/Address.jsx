import { useState, useEffect } from "react";

export default function Home(){
  const [address, setAddress] = useState('');

  useEffect(() => {
    async function getAddress() {
      const url = "http://localhost:3000/api/users/getsession";
      const response = await fetch(url, {
        method: "GET",
        credentials: 'include'
      });

      if (response.ok){
        const data = await response.json();
        setAddress(data.user);
      }
      else{
        setAddress('Nobody logged in');
      }
    }
    getAddress();
  }, []);

  return (
    <>
      <h1>Address</h1>
      {address && address.street}
    </>
  )
}