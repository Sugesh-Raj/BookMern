import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { AuthProvider } from "./context/Auth.context";
import { useState } from "react";


export default function App() {

  
  return (
    <>
      <AuthProvider>
          <Navbar/>
          <main className="min-h-screen max-w-screen-2x1 mx-auto px-4 py-6 font-primary">
          <Outlet/>
          </main>
          <Footer/>
      </AuthProvider>
    
    
    </>
      
  )
}
