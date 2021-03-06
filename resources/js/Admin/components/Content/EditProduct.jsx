import axios from 'axios';
import moment from 'moment';
import React, { Component } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import { storage } from '../../../FirebaseConfig'

class EditProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product_id: "",
            product_name: "",
            product_quantity: "",
            product_slug: "",
            product_type_id: "",
            brand_id: "",
            unit: "",
            unit_price: "",
            promotion_price: "",
            product_desc: "",
            product_content: "",
            product_image: "",
            product_status: "",
            updated_at: moment(new Date()).format("yyyy-MM-DD"),

            brand: [],
            product_type: [],

            haveAChangeFile: false,
            product_save_image: null,
        };
        this.onHandleChange = this.onHandleChange.bind(this);
        this.onHandleChangeFile = this.onHandleChangeFile.bind(this);
        this.showChangeImg = this.showChangeImg.bind(this);
    }

    onHandleChange(e){
        console.log(e.target.value);
        this.setState({
            [e.target.name] : e.target.value
        });
    }

    onHandleChangeFile(e){
        console.log(e.target.files[0])
        this.setState({
            product_save_image: e.target.files[0],
        })
    }

    showChangeImg(){
        if(this.state.haveAChangeFile == true){
            return <Input type="file" onChange={ this.onHandleChangeFile } name="product_image" id="product_image" required />
        }
        else{
            return <Input type="text" defaultValue={ this.state.product_image} name="product_image" id="product_image" readOnly />
        }
    }

    onSubmit(){
        if(this.state.haveAChangeFile == false){
            const listProduct = this.state;
            axios.put('http://127.0.0.1:8000/api/product/' + this.props.match.params.id, listProduct)
            .then(res => {
                if(res != null){
                    return this.props.history.push("/admin/home/product");
                }
            }) 
            .catch(err =>{
                err.response.data.map((error) =>{
                    console.log(error);
                    toast.error('L???i: '+ error);
                })
            })
        }else{
            if(this.state.product_save_image != null){
                try { 
                    storage.refFromURL(this.state.product_image).delete()
                    .then(() => {
                        alert("Picture is deleted successfully!");
                    })
                    .catch((err) => {
                        console.log(err);
                    });
                } catch (error) {
                    alert("Can't delete Picture!");
                    console.log(error);
                }
                try {
                    var newNameFile = Date.now() + "_" + this.state.product_save_image.name;
                    var child = newNameFile;
            
                    const uploadTask = storage.ref('product').child(child).put(this.state.product_save_image);
                        uploadTask.on("state_changed", snapshot => {}, error => { console.log(error) }, () => {
                            storage.ref('product').child(child).getDownloadURL()
                            .then(urlImage => { 
                                this.setState({product_image: urlImage});

                                const listProduct = this.state;
                                axios.put('http://127.0.0.1:8000/api/product/' + this.props.match.params.id, listProduct)
                                .then(res => {
                                    if(res != null){
                                        return this.props.history.push("/admin/home/product");
                                    }
                                }) 
                                .catch(err =>{
                                    err.response.data.map((error) =>{
                                        console.log(error);
                                        toast.error('L???i: '+ error);
                                    })
                                })
                            })
                        });
                } catch (error) {
                    console.error(error);
                }                
            } else {
                alert('Ph???i ch???n h??nh tr?????c khi c???p nh???t')
            }
        }
        
    }

    loadBrand(){
        axios.get('http://127.0.0.1:8000/api/brand/')
        .then(res=>{
            console.log('brand:', res);
            this.setState({
                brand: res.data,
                brand_id: res.data[0].brand_id
            });
        }).catch(err =>console.log(err));
    }

    loadProduct_type(){
        axios.get('http://127.0.0.1:8000/api/product_type/')
        .then(res=>{
            console.log('pro_type:', res);
            this.setState({
                product_type: res.data,
                product_type_id: res.data[0].product_type_id
            });
        }).catch(err =>console.log(err));
    }

    editProduct(){
        const brand_id_C2 = this.props.location.sendData.product_id
        axios.get('http://127.0.0.1:8000/api/product/' + brand_id_C2)
        .then(res =>{
            this.setState({
                product_id: res.data.product_id,
                product_name: res.data.product_name,
                product_quantity: res.data.product_quantity,
                product_slug: res.data.product_slug,
                product_type_id: res.data.product_type_id,
                brand_id: res.data.brand_id,
                unit: res.data.unit,
                unit_price: res.data.unit_price,
                promotion_price: res.data.promotion_price,
                product_desc: res.data.product_desc,
                product_content: res.data.product_content,
                product_image: res.data.product_image,
                product_status: res.data.product_status,
            });
        })
    }

    componentWillMount(){
        this.editProduct();
        this.loadBrand();
        this.loadProduct_type();
    }
    
    render() {
        return (
            <div id="page-top">
                <ToastContainer position="top-right" />
                <div id="wrapper">
                    <Sidebar/>
                    <div id="content-wrapper" className="d-flex flex-column">
                        <div id="content">
                            <Header propsParent = {this.props}/>
                            <div className="container-fluid">
                                <Form>
                                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                        <Label for="Name" className="mr-sm-2">M?? s???n ph???m</Label>
                                        <Input type="text" onChange={ this.onHandleChange } value={ this.state.product_id } name="product_id" id="product_id"/>
                                    </FormGroup>
                                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                        <Label for="Name" className="mr-sm-2">T??n s???n ph???m</Label>
                                        <Input type="text" onChange={ this.onHandleChange } value={ this.state.product_name } name="product_name" id="product_name"/>
                                    </FormGroup>
                                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                        <Label for="Name" className="mr-sm-2">S??? l?????ng s???n ph???m</Label>
                                        <Input type="text" onChange={ this.onHandleChange } value={ this.state.product_quantity } name="product_quantity" id="product_quantity"/>
                                    </FormGroup>
                                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                        <Label for="brandSlug" className="mr-sm-2">T??n slug s???n ph???m</Label>
                                        <Input type="text" onChange={ this.onHandleChange } value={ this.state.product_slug } name="product_slug" id="product_slug" />
                                    </FormGroup>
                                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                        <Label for="Name" className="mr-sm-2">M?? lo???i s???n ph???m</Label>
                                        <Input type="select" onChange={ this.onHandleChange } value={this.state.product_type_id} name="product_type_id" id="product_type_id" >
                                            {this.state.product_type.map((productType, index) =>
                                                    <option key={ index } value={productType.product_type_id}>{productType.product_type_name}</option>
                                                )
                                            }
                                        </Input>
                                    </FormGroup>
                                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                        <Label for="Name" className="mr-sm-2">M?? th????ng hi???u</Label>
                                        <Input type="select" onChange={ this.onHandleChange } value={this.state.brand.brand_id} name="brand_id" id="brand_id" >
                                            {this.state.brand.map((productBrand, index) =>
                                                    <option key={ index } value={productBrand.brand_id}>{productBrand.brand_name}</option>
                                                )
                                            }
                                        </Input>
                                    </FormGroup>
                                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                        <Label for="Name" className="mr-sm-2">????n v??? t??nh</Label>
                                        <Input type="text" onChange={ this.onHandleChange } value={ this.state.unit } name="unit" id="unit"/>
                                    </FormGroup>
                                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                        <Label for="Name" className="mr-sm-2">Gi?? s???n ph???m</Label>
                                        <Input type="text" onChange={ this.onHandleChange } value={ this.state.unit_price } name="unit_price" id="unit_price"/>
                                    </FormGroup>
                                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                        <Label for="Name" className="mr-sm-2">Gi?? khuy???n m??i</Label>
                                        <Input type="text" onChange={ this.onHandleChange } value={ this.state.promotion_price } name="promotion_price" id="promotion_price"/>
                                    </FormGroup>
                                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                        <Label for="productDesc" className="mr-sm-2">M?? t??? s???n ph???m</Label>
                                        <Input type="text" onChange={ this.onHandleChange } value={ this.state.product_desc } name="product_desc" id="product_desc" />
                                    </FormGroup>
                                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                        <Label for="Name" className="mr-sm-2">N???i dung s???n ph???m</Label>
                                        <Input type="text" onChange={ this.onHandleChange } value={ this.state.product_content } name="product_content" id="product_content"/>
                                    </FormGroup>
                                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                    <Label check><Input onChange={ (e)=>{ this.setState({haveAChangeFile: e.target.checked}) } } type="checkbox"/>Ch???n ????? thay ?????i h??nh</Label>
                                        {
                                            this.showChangeImg()
                                        }
                                    </FormGroup>
                                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                        <Label for="productStatus" className="mr-sm-2">Tr???ng th??i s???n ph???m</Label>
                                        <Input type="select" value={this.state.product_status} onChange={ this.onHandleChange } name="product_status" id="product_status" >
                                            <option value={1}>??ang kinh doanh</option>
                                            <option value={0}>???? ng???ng kinh doanh</option>
                                        </Input>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="brandCreate">Ng??y c???p nh???t</Label>
                                        <Input type="date" name="created_at" id="exampleDate" onChange={ this.onHandleChange } defaultValue={moment(this.state.updated_at).format("yyyy-MM-DD")}/>
                                    </FormGroup>
                                    <Button onClick={ ()=>this.onSubmit() }>Submit</Button>
                                </Form> 
                            </div>
                        </div>
                        <Footer/>
                    </div>
                </div>
            </div>
        );
    }
}

export default EditProduct;