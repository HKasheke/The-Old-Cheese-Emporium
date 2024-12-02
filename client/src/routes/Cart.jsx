import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../ui/Card";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";

export default function Cart() {
  const url  = useParams();
  const [cookies] = useCookies(["cart"]);
  const [cartSubtotal, setSubotal] = useState(null);
  const [cartTotal, setCartTotal] = useState(null);
  const [productsInCart, setProductsInCart] = useState([]);
  const [countObj, setCountObj] = useState([]);
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


  //get cookies string "clean" it(make an object) so we dont have any duplicates  
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
            //total += data.cost * count[key]; //TODO: Fix pricing
          }
        }
      const subtotal = products.reduce(
        (acc, product) => acc + countObj[product.product_id] * product.cost,0);
      //const tax = subtotal * taxRate;
      let total = subtotal * taxRate;
      const precision = total.toString().split(".")[0].length + 2; //gets the legth of the whole number and ads 2 so that we always get 2 decinal places
        setSubotal(subtotal);
        setCartTotal(total.toPrecision(precision));

        setProductsInCart(products);
    }

    //let ignore = false;
    //map and get values of items x amount of items
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
            <Card 
              product={product} 
              apiHost={hostUrl} 
              showDetails={false} 
              page = {window.location.href.split('/').pop()} 
              quantity = {countObj[product.product_id]
              }/>
          )):
          <p>Cart Empty</p>
        }
        <h2>
            {"Total: " + cartTotal}
        </h2>        

        <p className='d-grid gap-2 d-md-flex justify-content-center'>
          <button className="btn btn-danger btn me-md-2" to="/checkout" disabled>Purchase</button> <Link to="/home" className="btn btn-outline-secondary ">Continue Shopping</Link>
        </p>
      </div>
    </div>
  );
}