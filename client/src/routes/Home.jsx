import { useState, useEffect } from "react";
import Card from "../ui/Card";
import { Link } from "react-router-dom";

export default function Home(){
  const [products, setProducts] = useState([]);
  const hostUrl = import.meta.env.VITE_APP_HOST;
  const apiUrl = hostUrl + "/api/products/all";

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(apiUrl, {
        method: "GET",
        credentials: 'include'
      });

      if (response.ok){
        const data = await response.json();
        if(!ignore){
          setProducts(data);
          console.log(data);
        }
      }else{
        setProducts(null);
      }
    }
    let ignore = false
    fetchData();
    return () =>{
      ignore = true;
    }
  }, []);

  return (
    <>
      <h1>Store main page</h1>
      {
        products.length > 0 ?
        products.map(product =>(
          <Card product={product} apiHost={hostUrl} showLinks={false}/>
        )):
        <p>No Products</p>
      }
    </>
  )
}