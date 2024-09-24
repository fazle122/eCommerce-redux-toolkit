import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Dashboard from "./views/dashboard/Dashboard.jsx";
import Cart from "./views/cart/Cart.jsx";
import ProductDetail from "./views/product/ProductDetail.jsx";
import { Provider } from "react-redux";
import store from "./store.js";
import Login from "./views/login/Login.jsx";
import { Toaster } from "react-hot-toast";
import Register from "./views/register/Register.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import Profile from "./views/user/profile/Profile.jsx";
import Shipping from "./views/shipping/Shipping.jsx";
import AdminRoute from "./components/AdminRoute.jsx";
import AdminDashboard from "./views/dashboard/AdminDashboard.jsx";
import CreateProduct from "./views/product/CreateProduct.jsx";
import ProductEdit from "./views/product/ProductEdit.jsx";
import UpdateUser from "./views/admin/user/UpdateUser.jsx";
import NotFound from "./components/NotFound.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { HelmetProvider } from "react-helmet-async";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import AdminUserList from "./views/admin/user/AdminUserList.jsx";
import AdminProducts from "./views/admin/product/AdminProductList.jsx";
import AdminOrderList from "./views/admin/order/AdminOrderList.jsx";
import UserRoute from "./components/UserRoute.jsx";
import UserOrderList from "./views/user/orders/UserOrders.jsx";
import FavouriteProducts from "./views/user/favourites/FavoutieProducts.jsx";
import OrderDetail from "./views/orderDetail/OrderDetail.jsx";
import PlaceOrder from "./views/placeOrder/PlaceOrder.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<Dashboard />} />
      <Route path="/search/:keyword" element={<Dashboard />} />
      <Route path="/search/:keyword/:pageNumber" element={<Dashboard />} />
      <Route path="/:pageNumber" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {/* <Route  path='/product/:productId' element={<ProductDetail />} /> */}
      <Route path="/product/:slug" element={<ProductDetail />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="" element={<PrivateRoute />}>
        <Route path="/Shipping" element={<Shipping />} />
        {/* <Route path="/payment" element={<Payment />} /> */}
        <Route path="/checkout" element={<PlaceOrder />} />
        <Route path="/orders/:id" element={<OrderDetail />} />
      </Route>
      <Route path="" element={<UserRoute />}>
        <Route path="/user/profile" element={<Profile />} />
        <Route path="/user/orders" element={<UserOrderList />} />
        <Route path="/user/favourites" element={<FavouriteProducts />} />
      </Route>
      <Route path="" element={<AdminRoute />}>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/orders" element={<AdminOrderList />} />
        <Route path="/admin/products" element={<AdminProducts />} />
        <Route path="/admin/createNew" element={<CreateProduct />} />
        <Route path="/admin/products/search/:keyword" element={<Dashboard />} />
        <Route path="/admin/products/search/:keyword/:pageNumber" element={<Dashboard />} />
        <Route path="/admin/products/:pageNumber" element={<AdminProducts />} />
        <Route path="/admin/product/:id/edit" element={<ProductEdit />} />
        <Route path="/admin/users" element={<AdminUserList />} />
        <Route path="/admin/users" element={<AdminUserList />} />
        <Route path="/admin/user/:id/edit" element={<UpdateUser />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="260774312841-af2uda2tolkmkg07s4r4dtv82cdonn3c.apps.googleusercontent.com">
      <HelmetProvider>
        <Provider store={store}>
          <PayPalScriptProvider deferLoading={true}>
            <RouterProvider router={router} />
          </PayPalScriptProvider>
          <Toaster
            position="top-center"
            gutter={12}
            containerStyle={{ margin: "10px" }}
            toastOptions={{
              success: { duration: 3000 },
              error: { duration: 5000 },
              style: {
                fontSize: "14px",
                maxWidth: "550px",
                padding: "14px 22px",
              },
            }}
          />
        </Provider>
      </HelmetProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
