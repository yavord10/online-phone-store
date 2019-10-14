import React, { Component } from 'react';
import {storeProducts, detailProduct} from "./data";

//MANAGING STATE WITH A CONTEXT API

//creating a CONTEXT OBJECT which comes with 2 components - provider + consumer 
const ProductContext = React.createContext();
//Provider - provides all the information for the whole application
//set up on top of application

//Consumer - use whenever we want to use information of the Provider 


//without export default, as we will be exporting a few things and 
//not just the ProductProvider
class ProductProvider extends Component {
    state = {
        products: [],
        detailProduct: detailProduct,
        cart: [],
        modalOpen: false,
        modalProduct: detailProduct,
        cartSubTotal: 0,
        cartTax: 0,
        cartTotal: 0

    };
    //lifecycle method 
    componentDidMount() {
        this.setProducts();
    };
    //Method to copy the values of the original array of objets in data.js
    //In order to keep the original data when we manipulate state
    setProducts =() => {
        let tempProducts = [];
        storeProducts.forEach(item => {
        {/* for each object of the array storeProducts -
        we copy the items in the object to a variable singleItem (new obj)*/}
            const singleItem = {...item};
            {/* add singleItem object to new array tempProducts 
            and all the other objects that are already in there,
            so each singleItem previously added */}
            tempProducts = [...tempProducts,singleItem];
        })
        this.setState(()=>{
            return {products: tempProducts};
        })
    };
    getItem = (id) => {
        const product = this.state.products.find((item => item.id === id));
        return product;
    };
    handleDetail = (id) => {
        const product = this.getItem(id);
        this.setState(()=>{
            return {detailProduct:product}
        })
    };
    //using index instead of product id, so that when we change info
    //the position of the product remains the same
    addToCart = (id) => {
        let tempProducts = [...this.state.products];
        const index = tempProducts.indexOf(this.getItem(id));
        const product = tempProducts[index];
        product.inCart = true;
        product.count = 1;
        const price = product.price;
        product.total = price;
        this.setState(() => {
            return {
                products: tempProducts, 
                cart: [...this.state.cart, product]
        }},
        () => {
            this.addTotals();
        }
        );
    };
    openModal = (id) => {
        const product = this.getItem(id);
        this.setState(()=>{
            return{modalProduct: product, modalOpen: true}
        });
    };
    closeModal = () => {
        this.setState(() => {
            return {modalOpen: false}
        });
    };
    increment = (id) => {
        let tempCart = [...this.state.cart];
        const selectedProduct = tempCart.find(item =>
            item.id === id);
        const index = tempCart.indexOf(selectedProduct);
        const product = tempCart[index];
        product.count = product.count + 1;
        product.total = product.count * product.price;
        this.setState(()=>{
            return {
                cart: [...tempCart]
            }
        }, () => {
            //important to run as callback function, so 
            //that totals are added exactly when they are changed
            this.addTotals()
        });
    };
    decrement = (id) => {
        let tempCart = [...this.state.cart];
        const selectedProduct = tempCart.find(item =>
            item.id === id);
        const index = tempCart.indexOf(selectedProduct);
        const product = tempCart[index];
        product.count = product.count - 1;
        if (product.count === 0) {
            this.removeItem(id);
        } else {
            product.total = product.count * product.price;
            this.setState(() => {
                return {
                    cart: [...tempCart]
                }
            }, () => {
                this.addTotals();
            }
            )
        };
    };
    removeItem = (id) => {
        let tempProducts = [...this.state.products];
        let tempCart = [...this.state.cart];
        tempCart = tempCart.filter(item => item.id !== id);
        const index = tempProducts.indexOf(this.getItem(id));
        let removedProduct = tempProducts[index];
        removedProduct.inCart = false;
        removedProduct.count = 0;
        removedProduct.total = 0;
        this.setState(()=>{
            return {
                cart: [...tempCart],
                products: [...tempProducts]
            }
        }, () => {
            this.addTotals();
        })
    };
    clearCart = () => {
        this.setState(()=>{
            return {
                cart : [],
            }
        }, () => {
            this.setProducts();
            this.addTotals();
        });

    };
    addTotals = () => {
        let subTotal = 0;
        this.state.cart.map(item => {subTotal += item.total});
        const tempTax = subTotal * 0.1;
        //we use parseFloat as toFixed returns a string,
        //so we need to turn it back into a number
        const tax = parseFloat(tempTax.toFixed(2));
        const total = subTotal + tax;
        this.setState(()=>{
            return{
                cartSubTotal: subTotal,
                cartTax: tax,
                cartTotal: total
            }
        })
    };
    render() {
        return (
            //Context Object Provider Component
            //ProductContext sits on top of the component tree, so to sit at the top
            //we put it in index.js where the whole app gets rendered
            //so we want to return all the children components inside it
            <ProductContext.Provider value={{
                //the value is an object with 2 methods and 2 objects from state
                ...this.state,
                handleDetail: this.handleDetail,
                addToCart: this.addToCart,
                openModal: this.openModal,
                closeModal: this.closeModal,
                increment: this.increment,
                decrement: this.decrement,
                removeItem: this.removeItem,
                clearCart: this.clearCart
            }}>
                {this.props.children}
            </ProductContext.Provider>
        )
    };
}

//Consumer component
const ProductConsumer = ProductContext.Consumer;

//exporting Provider and Consumer
export {ProductProvider, ProductConsumer};