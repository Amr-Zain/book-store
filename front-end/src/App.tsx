import "./App.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import React from "react";
import { Outlet } from "react-router";
import { CartProvider } from "./context/cartContext";

const App: React.FC = () => {
  return (
    <CartProvider>
      <Navbar />
      <main className="@container min-h-screen max-w-screen-2xl mx-auto px-6 md:px-10 lg:px-14 xl:px-18 2xl:px-24 py-6 font-primary">
        <Outlet />
      </main>
      <Footer />
    </CartProvider>
  );
};

export default App;
