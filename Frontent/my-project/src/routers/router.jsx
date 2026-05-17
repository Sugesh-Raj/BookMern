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
import AdminRoute from "./AdminRoute";
import AdminLogin from "../pages/admin/AdminLogin";
import DashboardLayout from "../pages/admin/DashboardLayout";
import DashboardOverview from "../pages/admin/DashboardOverview";
import AddBook from "../pages/admin/AddBook";
import ManageBooks from "../pages/admin/ManageBooks";
import UpdateBook from "../pages/admin/UpdateBook";
import ManageOrders from "../pages/admin/ManageOrders";

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
  },
  {
    path: "/admin",
    element: <AdminLogin />
  },
  {
    path: "/dashboard",
    element: <AdminRoute><DashboardLayout/></AdminRoute>,
    children: [
      {
        path: "",
        element: <AdminRoute><DashboardOverview/></AdminRoute>
      },
      {
        path: "add-new-book",
        element: <AdminRoute><AddBook/></AdminRoute>
      },
      {
        path: "manage-books",
        element: <AdminRoute><ManageBooks/></AdminRoute>
      },
      {
        path: "update-book/:id",
        element: <AdminRoute><UpdateBook/></AdminRoute>
      },
      {
        path: "manage-orders",
        element: <AdminRoute><ManageOrders/></AdminRoute>
      }
    ]
  }
]);

export default router;
