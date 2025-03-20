import './assets/App.css';
import Navbar from './components/navbar';
import Footer from './components/footer';
import React from 'react';

const App: React.FC =()=>{
  return (
    <>
      <Navbar />
      <main className="min-h-screen max-w-screen-2xl mx-auto px-4 py-6 font-primary">
      </main>
      <Footer />
    </>
  );
}

export default App;