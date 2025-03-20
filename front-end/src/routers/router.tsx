import { createBrowserRouter, RouteObject } from "react-router";
import App from "../App"; 
import Login from "../pages/login";
import Signup from "../pages/signup";

const routes: RouteObject[] = [
  {
    path: "/",
    element:<App/>, 
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/signup",
    element: <Signup />
  },
];

const router = createBrowserRouter(routes);

export default router;