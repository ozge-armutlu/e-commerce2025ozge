import { Switch, Route } from "react-router-dom";
import ProtectedRoute from "../routes/ProtectedRoute";


import HomePage from "../pages/HomePage";
import ShopPage from "../pages/ShopPage";
import ProductDetailPage from "../pages/ProductDetailPage";
import ContactPage from "../pages/ContactPage";
import TeamPage from "../pages/TeamPage";
import AboutPage from "../pages/AboutPage";
import SignupPage from "../pages/SignupPage";
import ProductListPage from "../pages/ProductListPage";
import CartPage from "../pages/CartPage";
import Login from "../pages/Login";

import CreateOrderPage from "../pages/CreateOrderPage";

import PreviousOrdersPage from "../pages/PreviousOrdersPage";


export default function PageContent() {
  return (
    <main className="flex flex-col">
      <Switch>
        <Route exact path="/" component={HomePage} />

        <Route exact path="/shop/:gender/:categoryName/:categoryId/:productNameSlug/:productId" component={ProductDetailPage}/>

         <Route exact path="/shop/:gender/:categoryName/:categoryId" component={ShopPage}/>
          <Route exact path="/shop/:gender" component={ShopPage} />
            <Route exact path="/shop" component={ShopPage} />

            <Route exact path="/products" component={ProductListPage} />
        
        <Route exact path="/product/:id" component={ProductDetailPage} />

        <Route exact path="/contact" component={ContactPage} />


        <Route exact path="/team" component={TeamPage} />

        <Route exact path="/about" component={AboutPage} />

        <Route exact path="/signup" component={SignupPage} />
       
        <Route exact path="/login" component={Login} />

      <Route exact path ="/cart" component={CartPage} />

      <ProtectedRoute exact path="/create-order" component={CreateOrderPage} />

      <ProtectedRoute exact path="/previous-orders" component={PreviousOrdersPage} />


      </Switch>
    </main>
  );
}

