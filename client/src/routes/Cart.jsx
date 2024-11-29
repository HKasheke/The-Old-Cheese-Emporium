import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../ui/Card";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";

export default function Cart() {
  const [cookies, setCookie, removeCookie] = useCookies(["cart"]);
  const [currentTotal, setTotal] = useState(null);
  const [productsInCart, setProductsInCart] = useState([]);
  let count = {};
  let costs = {};
  let total = 0;
  const lastLength = 0;

  const hostUrl = import.meta.env.VITE_APP_HOST;
  //get cookies string "clean" it(make an object) so we dont have any duplicates  
  function parseCookies(){
    if(cookies.cart){
      //console.log(cookies.cart);
      if(cookies.cart.length > 1){  //so the cart page doesn't crash because of the split function
        cookies.cart.split(',').map((item)=>{
          if(count[item]){ // checks if the object already contains the item as a key
            count[item]++;  //if it does it increments the value
          }else{
            count[item] = 1; //if not it initializes it to 1
          }
        });
      } else {
            count[cookies.cart] = 1; //in case there is only one cookie
      }
      console.log(count);
    }
  } 

  useEffect(() => {
    //map through list of numbers getting by id from object.getkeys to display in cards
    async function getCosts (){
      const keys = Object.keys(count);
      let products = [];
        //console.log(keys);
        lastLength == cookies.cart.length;
        for(let key of keys){
          let productUrl = hostUrl + "/api/products/" + key;
          let response = await fetch(productUrl);
          if(response.ok){
            let data = await response.json();
            //console.log(data);
            products.push(data);
            total += data.cost * count[key];
          }
        }
        console.log(total);
        setTotal(total);
        setProductsInCart(products);
    }

    let ignore = false;
    //map and get values of items x amount of items
    if(cookies.cart){
      parseCookies();
      getCosts();
    }else {
      console.log("No cookies");
    }

    return () => {
      ignore = true;
    }

  }, []);

    //get total and display it
 
  //continue shopping button
  //complete purchase button(link to Checkout page)

  return (
    <div>
      <h1>Cart</h1>
      <div>
        {        
          productsInCart.length > 0 ?
          productsInCart.map((product) =>(
            <Card product={product} apiHost={hostUrl} showLinks={false}/>
          )):
          <p>Cart Empty</p>
        }
        <p>
          {currentTotal}
        </p>
        <p className='d-grid gap-2 d-md-flex justify-content-right'>
          <button className="btn btn-danger btn me-md-2" to="/checkout" disabled>Purchase</button> <Link to="/home" className="btn btn-outline-secondary ">Continue Shopping</Link>
        </p>
      </div>
    </div>
  );
}