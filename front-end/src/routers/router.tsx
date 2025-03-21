import { createBrowserRouter, RouteObject } from "react-router";
import App from "../App"; 
import Login from "../pages/login";
import Signup from "../pages/signup";
import Home from "../pages/home";

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
    ]
  },
];

const router = createBrowserRouter(routes);

export default router;