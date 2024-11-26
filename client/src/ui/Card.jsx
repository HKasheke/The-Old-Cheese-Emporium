import { Link } from 'react-router-dom';

export default function Card(props) {
  return (
    <div className="card mt-2 mb-2 d-grid col-6 mx-auto">
      <div className="card-body">
        <div className="d-flex align-items-center position-relative">
          <img src={`${props.apiHost}/images/${props.product.image_filename}`} className="thumbnail" />

          <div className="product-info">
            <h5 className="card-title">{ props.product.name}</h5>
            <p className="card-text">
              {props.product.cost}<br />
            </p>                  
          </div>
          
          {props.showLinks && 
            <div className="position-absolute top-0 end-0">
              <Link to={`/update/${props.product.id}`} className="btn btn-light btn-sm"><i className="bi bi-pencil"></i></Link>&nbsp;
              <Link to={`/delete/${props.product.id}`} className="btn btn-light btn-sm"><i className="bi bi-trash"></i></Link>
            </div>  
          }
        </div>                         
      </div>
    </div>
  )
}