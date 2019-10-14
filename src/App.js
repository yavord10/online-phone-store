import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/Navbar';
import ProductList from './components/ProductList';
import Details from './components/Details';
//works because of package.json, which makes Cart.js like index.js
//so it doesnt have to be accessed with Cart.js but just the folder
import Cart from './components/Cart';
import Default from './components/Default';
import Modal from './components/Modal'





class App extends Component {
  render() {
    return (
      //the NavBar is above the Switch as it needs to appear on every page
      //The Switch and Route sets up a separate page for each component
        <React.Fragment> 
          <NavBar/>
          <Switch 
          //In Route: 
          //use / for path if you want to use it for the homepage
          //component points to where we want the Route to go to 
          //we add exact infront of homepage path, because otherwise
          //the browser looks at / on each path and thinks it shouldn't look further 
          >
            <Route exact path="/" component={ProductList} />
            <Route path="/details" component={Details} />
            <Route path="/cart" component={Cart} />
            <Route component={Default} />
            
          </Switch>
          <Modal />
        </React.Fragment>
      );
  }
}

export default App;
