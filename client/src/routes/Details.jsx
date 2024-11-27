import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../ui/Card";
import { Link } from "react-router-dom";

export default function Details() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  const hostUrl = import.meta.env.VITE_APP_HOST;
  const productUrl = hostUrl + "/api/products/" + id;
  
  useEffect(() => {
    async function fetchProduct() {
      const response = await fetch(productUrl, {
        method: 'GET',
        credentials: 'include'
      }); 
      if(response.ok){
        const data = await response.json();
        if(!ignore){
          setProduct(data);
          console.log(product);
        } else {
          console.log("HERE")
          setProduct(null);
        }
      }
    }

    let ignore = false;
    fetchProduct();
    console.log(product);
    return () => {
      ignore = true;
    }

  }, []);

  return (
    <div>
      <h1>Details</h1>
    </div>
  );
}

