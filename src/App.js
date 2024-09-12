import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom"; // Switch replaced with Routes
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import Details from "./components/Details";
import Default from "./components/Default";
import Cart from "./components/Cart";
import Modal from "./components/Modal";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <Routes> {/* Switch replaced with Routes */}
          <Route path="/" element={<ProductList />} /> {/* component replaced with element */}
          <Route path="/details" element={<Details />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<Default />} /> {/* "*" to handle all unmatched routes */}
        </Routes>
        <Modal />
      </React.Fragment>
    );
  }
}

export default App;
