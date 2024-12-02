import { Link } from 'react-router-dom';

export default function Card(props) {
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
        <div className="card-body">
            <div className="d-flex align-items-center justify-content-between">
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