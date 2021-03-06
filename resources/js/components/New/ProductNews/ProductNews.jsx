import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import CurrencyFormat from 'react-number-format';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
class ProductNews extends Component {
    constructor(props){
        // console.log(props);
        super(props);
        this.onAddToCart=this.onAddToCart.bind(this);
        
    }
    
    onAddToCart(){
        alert(this.props.product_name + '-' + this.props.unit_price);
    }
    
    render() {
        return (
            <div className="product">
                <Link to={"/product_details/"+this.props.id +"/"+this.props.product_slug}>
                    <img className="card-img-top" src={"/images/imageCrs/"+this.props.image} alt={this.props.name} style={{width:"280"}} style={{height:"300"}} />
                </Link>
                <div className="card-body">
                <h4 className="card-title"><a href="#!">{this.props.name}</a></h4>
                <div className="form-group">
                    <div className="form-check-inline">
                        <h5>
                            <CurrencyFormat value={this.props.price} displayType={'text'} thousandSeparator={true} prefix={'VND'} />
                        </h5>
                    </div>
                    <div className="form-check-inline">
                        <h5>
                        <CurrencyFormat value={this.props.promotion_price} displayType={'text'} thousandSeparator={true} prefix={'VND'} />
                        </h5>
                    </div>
                </div>
                <p className="card-text">Gợi ý: {this.props.content}</p>
                </div>
                <div className="col-md-12">
                    <div className="rating">
                        <label htmlFor="stars-rating-5"><FontAwesomeIcon icon={faStar} size="1x" className="iconstar"/></label>
                        <label htmlFor="stars-rating-4"><FontAwesomeIcon icon={faStar} size="1x" className="iconstar"/></label>
                        <label htmlFor="stars-rating-3"><FontAwesomeIcon icon={faStar} size="1x" className="iconstar"/></label>
                        <label htmlFor="stars-rating-2"><FontAwesomeIcon icon={faStar} size="1x" className="iconstar"/></label>
                        <label htmlFor="stars-rating-1"><FontAwesomeIcon icon={faStar} size="1x" className="iconstar"/></label>
                    </div>
                </div>
                <div className="col-md-12">
                    <Link to={"/product_details/"+this.props.id +"/"+this.props.product_slug} className="btn btn-primary">Xem chi tiết</Link><span> </span>
                    <a className="btn btn-danger" onClick={this.onAddToCart}>Mua hàng</a>
                </div>
                  
            </div>
        );
    }
}

export default ProductNews;
