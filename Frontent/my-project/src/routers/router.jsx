import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import Register from "../components/Register";
import Login from "../components/Login";
import Cart from "../components/Cart";
import Checkout from "../pages/home/Checkout";
import SingleBook from "../pages/card/SingleBook";
import PrivateRoute from "./PrivateRoute";
import OrderPage from "../pages/home/OrderPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "about",
        element: <div>about</div>
      },
      {
        path: "orders",
        element: <PrivateRoute>
            <OrderPage/>
          </PrivateRoute>
      },
      {
        path: "cart",
        element: <Cart />
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "register",
        element: <Register />
      },
      {
        path: "checkout",
        element: <PrivateRoute>
            <Checkout />
          </PrivateRoute>
      },
      {
        path: "books/:id",
        element: <SingleBook />
      }
    ]
  }
]);

export default router;
