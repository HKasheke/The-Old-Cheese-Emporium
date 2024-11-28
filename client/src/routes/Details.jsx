import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../ui/Card";
import { Link } from "react-router-dom";
import { useCookies } from 'react-cookie';

export default function Details(){
  const { id } = useParams();

  const [cookies, setCookie, removeCookie] = useCookies(["cart"]);

  const [product, setProduct] = useState(null);

  const hostUrl = import.meta.env.VITE_APP_HOST;
  const productUrl = hostUrl + "/api/products/" + id;

  function create (){
    setCookie("cart", '');
  }

  function addToCart(cart){
    if(cookies.cart){
      setCookie("cart", cookies.cart + ',' + id, {maxAge: 3600});
    } else {
      setCookie("cart", id, {maxAge: 3600});
    }
  }

  function deleteCookie(){
    removeCookie('cart');
  }
  
  useEffect(() => {
    async function fetchProduct() {
      const response = await fetch(productUrl); 
      if(response.ok){
        const data = await response.json();
        if(!ignore){
          setProduct(data);
        } else {
          setProduct(null);
        }
      }
    }

    let ignore = false;
    fetchProduct();
    return () => {
      ignore = true;
    }

  }, []);

  return (
    <div>
      <h1>Details</h1>
        <div>
          { product && <Card product={product} apiHost={hostUrl} showLinks={false}/> }
        </div>
        <p className='d-grid gap-2 d-md-flex justify-content-center'>
          <button className="btn btn-danger btn me-md-2" onClick={addToCart}>Add To Cart</button> <Link to="/home" className="btn btn-outline-secondary ">Cancel</Link>
        </p>
    </div>
  );
}

