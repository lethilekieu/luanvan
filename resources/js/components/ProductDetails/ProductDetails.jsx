import React from 'react';
import Header from '../Header/Header';
import Menu from '../Menu/Menu';
import Footer from '../Footer/Footer';
import Carousels from '../Carousels/Carousels';
import Details from '../ProductDetails/Details/Details';
class ProductDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            product_id: '',
            product_slug: '',
        }
    }

    componentWillMount() {
        //this.props.location.sendData.product_id || null
        // console.log(this.props.location.sendData.product_id);
        if(typeof this.props.location.sendData === 'undefined'){
            this.setState({
                product_slug: this.props.match.params.slug
            })
        } else {
            this.setState({
                product_id: this.props.location.sendData.product_id
            })
        }
    }
    
    render() {
        return (
            <div style={{overflow:"hidden", width:"100vw"}}>
                <Menu />
                <Carousels />
                <Header />
                <Details id={this.state.product_id} slug={this.state.product_slug} />
                <span> </span>
                <Footer />
            </div>
        );
        
    }
}

export default ProductDetails;