import { createBrowserRouter, RouteObject } from "react-router";
import App from "../App";
import Login from "../pages/user/login";
import Signup from "../pages/user/signup";
import Home from "../pages/user/home";
import Book from "../pages/user/book";
import UserDashboard from "../pages/user/dashboard";
import OrderPage from "../pages/user/orders";
import Cart from "../pages/user/cart";
import Checkout from "../pages/user/checkout";
import PrivateRoute from "./protectedRoute";
import NotFound from "../pages/user/not-found";
import DashboardLayout from "../components/admin/sharedLayout";
import AdminDashboard from "../pages/admin/dashboard";
import AddBook from "../pages/admin/addBook";
import ManageBooks from "../pages/admin/manageBooks";
import { AppErrorBoundary } from "../errorBoundary";
import UpdateBook from "../pages/admin/updateBook";
import AuthRoute from "./authRoute";
import OrdersAdmin from "../pages/admin/ordersAdmin";

const routes: RouteObject[] = [
  {
    path: "/",
    element: (
      <AppErrorBoundary>
        <App />
      </AppErrorBoundary>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: <AuthRoute><Login /></AuthRoute>,
      },
      {
        path: "/signup",
        element: <AuthRoute><Signup role="user" /></AuthRoute>,
      },
      {
        path: "/about",
        element: <div>About</div>,
      },
      {
        path: "/books/:id",
        element: <Book />,
      },
      {
        path: "/user-dashboard",
        element: (
          <PrivateRoute roles={["user"]}>
            <UserDashboard />
          </PrivateRoute>
        ),
      },
      {
        path: "/orders",
        element: (
          <PrivateRoute roles={["user"]}>
            <OrderPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/checkout",
        element: (
          <PrivateRoute roles={["user"]}>
            <Checkout />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <AppErrorBoundary>
        <PrivateRoute roles={['admin']}>
          <DashboardLayout />
        </PrivateRoute>
      </AppErrorBoundary>
    ),
    children: [
      {
        index: true,
        element: <AdminDashboard />,
      },
      {
        path: "add-book",
        element: <AddBook />,
      },
      {
        path: "manage-books",
        element: <ManageBooks />,
      },
      {
        path: "edit-book/:id",
        element: <UpdateBook />,
      },
      {
        path: "orders",
        element: <OrdersAdmin />,
      },
      {
        path: "add-admin",
        element: <Signup role="admin" />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

const router = createBrowserRouter(routes);

export default router;
