import "./App.css";
import Page from "./pages/Page";
import Header from "./common/header/Header";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Data from "./components/flashDeals/Data";
import SData from "./components/shop/Sdata";
import { useState } from "react";
import Cart from "./common/cart/Cart";
import Sdata from "./components/mainpage/Sdata";
import Footer from "./common/footer/Footer";

function App() {
  // stpe 1: fetch data from database
  //gán Data = object {productItems}
  const { productItems } = Data;
  const { shopItems } = SData;
  const [cartItem, setCardItem] = useState([]);

  //thêm sản phẩm vào giỏ
  const addToCart = (product) => {
    const productExit = cartItem.find((item) => item.id === product.id);
    if (productExit) {
      setCardItem(
        cartItem.map((item) =>
          item.id === product.id
            ? { ...productExit, qty: productExit.qty + 1 }
            : item
        )
      );
    } else {
      setCardItem([...cartItem, { ...product, qty: 1 }]);
    }
  };

  // giảm số lượng sp
  const decreaseQty = (product) => {
    const productExit = cartItem.find((item) => item.id === product.id);

    if (productExit.qty === 1) {
      setCardItem(cartItem.filter((item) => item.id !== product.id));
    } else {
      setCardItem(
        cartItem.map((item) =>
          item.id === product.id
            ? { ...productExit, qty: productExit.qty - 1 }
            : item
        )
      );
    }
  };

  return (
    <>
      <Router>
        <Header cartItem={cartItem} />
        <Switch>
          <Route path="/" exact>
            <Page
              productItems={productItems}
              addToCart={addToCart}
              shopItems={shopItems}
            />
          </Route>

          <Route path="/cart" exact>
            <Cart
              cartItem={cartItem}
              addToCart={addToCart}
              decreaseQty={decreaseQty}
            />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </>
  );
}

export default App;
