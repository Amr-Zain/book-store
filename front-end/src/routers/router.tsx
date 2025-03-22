import { createBrowserRouter, RouteObject } from "react-router";
import App from "../App"; 
import Login from "../pages/user/login";
import Signup from "../pages/user/signup";
import Home from "../pages/user/home";
import Book from "../pages/user/book";
import UserDashboard from "../pages/user/userDashboard";
import OrderPage from "../pages/user/orders";
import Cart from "../pages/user/cart";
import Checkout from "../pages/user/checkout";

const routes: RouteObject[] = [
  {
    path: "/",
    element:<App/>, 
    children:[
      {
        index:true,
        element: <Home />
      },
      {
        path: "/login",
        element: <Login/>
      },
      {
        path: "/signup",
        element: <Signup />
      },
      {
          path: "/about",
          element: <div>About</div>
      },
      {
        path: "/books/:id",
        element: <Book />
      },
      {
        path: "/user-dashboard",
        element: <UserDashboard/>//private
      },
      {
        path: "/orders",
        element: <OrderPage/>//private
    },{
      path: "/cart",
      element: <Cart/>
    },{
      path: "/checkout",
      element: <Checkout/>//private
    },
    ]
  },
];

const router = createBrowserRouter(routes);

export default router;