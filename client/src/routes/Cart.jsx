import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Card from "../ui/Card";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import { AuthContext } from "../App";

export default function Cart() {
  const url  = useParams();
  const [cookies] = useCookies(["cart"]);
  const [cartSubtotal, setSubotal] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  const [productsInCart, setProductsInCart] = useState([]);
  const [countObj, setCountObj] = useState([]);
  const { loggedIn } = useContext(AuthContext);
  let count = {};
  let costs = {};
  //let total = 0;
  const taxRate = 1.15;

  const hostUrl = import.meta.env.VITE_APP_HOST;
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
      setCountObj(count);
      console.log(countObj);
    }
  } 

   useEffect(() => {
      //map through list of numbers getting by id from object.getkeys to display in cards
    async function getCosts (){
      const keys = Object.keys(countObj);
      let products = [];
        //console.log(keys);
        for(let key of keys){
          let productUrl = hostUrl + "/api/products/" + key;
          let response = await fetch(productUrl);
          if(response.ok){
            let data = await response.json();
            //console.log(data);
            products.push(data);
          }
        }
      const subtotal = products.reduce(
        (acc, product) => acc + countObj[product.product_id] * product.cost,0);
      
      const total = subtotal * taxRate;
      const totalPrecision = total.toString().split(".")[0].length + 2; //gets the legth of the whole number part of the float and ads 2 so that we always get 2 decinal places
      const subtotalPrecision = subtotal.toString().split(".")[0].length + 2; //gets the legth of the whole number part of the float and ads 2 so that we always get 2 decinal places
      
      setSubotal(parseFloat(subtotal).toPrecision(subtotalPrecision));
      setCartTotal(total.toPrecision(totalPrecision));

      setProductsInCart(products);
    }

    if(cookies.cart){
      parseCookies();
      getCosts();

        console.log("Subtotal = " + cartSubtotal);
        console.log("Total = " + cartTotal);
        console.log(url);
    }else {
      console.log("No cookies");
    }

    return () => {
    }

  }, [cartSubtotal, cartTotal]); //Runs whenever these change

  return (
    <div>
      <h1>Cart</h1>
      <div>
        {        
          productsInCart.length > 0 ?
          productsInCart.map((product) =>(
            <Card 
              product={product} 
              apiHost={hostUrl} 
              showDetails={false} 
              page = {window.location.href.split('/').pop()} //this gets the url and splits it on the / and gets the last index which is the name of the current page
              quantity = {countObj[product.product_id]
              }/>
          )):
          <p className="d-grid gap-2 d-md-flex justify-content-center">Cart Empty</p>
        }
        <h2>
            {"Subtotal: " + "$" + cartSubtotal}
        </h2>        

        <p className='d-grid gap-2 d-md-flex justify-content-center'>
          {(loggedIn)?
          <button className="btn btn-danger btn me-md-2" to="/checkout" >
            Purchase
          </button> :
          <button className="btn btn-danger btn me-md-2" to="/login" >
            Purchase
          </button> 
        }
          
          <Link to="/home" className="btn btn-outline-secondary ">
            Continue Shopping
          </Link>
        </p>
      </div>
    </div>
  );
}