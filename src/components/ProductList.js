import React, { Component } from 'react';
import Product from './Product';
import Title from './Title';
import {ProductConsumer} from "../context";

export default class ProductList extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="py-5">
                    <div className="container">
                        <Title name="our" title="products" />
                        <div className="row"> 
                            <ProductConsumer
                            //always have to use a function to get the data
                            //passing variable inside function, can name what you want
                            //the variable returns the value of the ProductProvider
                            >
                                {(value)=>{
                                    //for each product in value.products create a Component with a key and product attribute
                                    return value.products.map(
                                        product => {
                                            return <Product key={product.id}
                                            product={product}/>
                                        }
                                    )
                                }}
                            </ProductConsumer>
                        </div> 
                    </div>    
                </div>
            </React.Fragment>

            //<Product />
        )
    }
}
