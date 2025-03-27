import "./assets/App.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import React from "react";
import { Outlet } from "react-router";
import { CartProvider } from "./context/cartContext";
import { AuthProvieder } from "./context/authContext";
import { AppErrorBoundary } from "./errorBoundary";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
const queryClient = new QueryClient()
const App: React.FC = () => {

  return (
    <AppErrorBoundary>
      <AuthProvieder>
        <CartProvider>
        <QueryClientProvider client={queryClient}>
          <Navbar />
          <main className="min-h-screen max-w-screen-2xl mx-auto px-6 md:px-10 lg:px-14 xl:px-18 2xl:px-24 py-6 font-primary">
            <Outlet />
          </main>
          <Footer />
          </QueryClientProvider>
        </CartProvider>
      </AuthProvieder>
    </AppErrorBoundary>
  );
};

export default App;
