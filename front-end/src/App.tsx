import './assets/App.css';
import Navbar from './components/navbar';
import Footer from './components/footer';
import React from 'react';
import { Outlet } from 'react-router';

const App: React.FC =()=>{
  return (
    <>
      <Navbar />
      <main className="min-h-screen max-w-screen-2xl mx-auto px-6 md:px-10 lg:px-14 xl:px-18 2xl:px-24 py-6 font-primary">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;