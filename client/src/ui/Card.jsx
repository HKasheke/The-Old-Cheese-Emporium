import { Link } from 'react-router-dom';
import { Cookies, useCookies, } from "react-cookie";

export default function Card(props) {
  const [cookies, setCookies, removeCookie] = useCookies(["cart"]);
  
  function removeFromCart(productId) {
  if (!cookies.cart) return; // No cart data, nothing to remove

  // Split the cart cookie into an array
  let cartItems = cookies.cart.split(',');

  // Find the index of the first occurrence of the productId
  const index = cartItems.indexOf(String(productId));

  if (index >= 0) {
    // Remove the product ID from the array
    cartItems.splice(index, 1);

    if (cartItems.length === 0) {
      // Delete the cookie if the cart is empty
      //setCookies('cart', '', { path: '/', expires: new Date(0) });
      removeCookie("cart");
      console.log("Cart is now empty. Cookie deleted.");
    } else {
      // Update the cart cookie with the new array
      const updatedCart = cartItems.join(',');
      setCookies('cart', updatedCart, { path: '/' });
    }
  }
}

  if(props.showDetails){
    //Card for details page
    return(
      <div className="card mt-2 mb-2 d-grid col-6 mx-auto">
        <div className="card-body">
            <div className="d-flex align-items-center position-relative">
              <img src={`${props.apiHost}/images/${props.product.image_filename}`} className="detailsThumbnail" />

              <div className="product-info">
                <h5 className="card-title"><Link to={`/details/${props.product.product_id}`}>{props.product.name}</Link></h5>
                <p className="card-text">
                  {props.product.description}<br />
                </p>                  
              </div>
              
            </div>
        </div>
      </div>
    )
  }else if(props.page == "cart"){
    //card for cart Page
    return(
      <div className="card mt-2 mb-2 d-grid col-9 mx-auto">
        <div className="card-body position-relative">
            <div className="d-flex align-items-center justify-content-around position-relative">
              <div className="d-flex align-items-center position-relative ">
                <img src={`${props.apiHost}/images/${props.product.image_filename}`} className="thumbnail" />
                <div className="product-info">
                  <h5 className="card-title"><Link to={`/details/${props.product.product_id}`}>{props.product.name}</Link></h5>
                  <p className="card-text">
                    {"$" + props.product.cost}<br />
                  </p>                  
                </div>
                 
              </div>

              <div className='d-flex col-4 justify-content-around'>
                <div>
                <h5>Quantitiy</h5>
                {"x " + props.quantity}

                </div>
                <div>
                  <h5>Total</h5>
                  {"$" + props.product.cost * props.quantity}
                </div>  
              </div>

              <div className="position-absolute top-0 end-0">
                <Link onClick={() => removeFromCart(props.product.product_id)} className="btn btn-light btn-sm"><i className="bi bi-trash"></i></Link>
              </div> 
              
            </div>
        </div>
      </div>
    )
  }else{
    //Regular card
    return (
      <div className="card mt-2 mb-2 d-grid col-6 mx-auto">
        <div className="card-body">
            <div className="d-flex align-items-center position-relative">
              <img src={`${props.apiHost}/images/${props.product.image_filename}`} className="thumbnail" />

              <div className="product-info">
                <h5 className="card-title"><Link to={`/details/${props.product.product_id}`}>{props.product.name}</Link></h5>
                <p className="card-text">
                  {"$" + props.product.cost}<br />
                </p>                  
              </div>
              
            </div> 
        </div>
      </div>
    )
  }
}