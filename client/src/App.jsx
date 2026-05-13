import { AnimatePresence } from "framer-motion";
import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { AdminPage } from "./pages/AdminPage";
import { BookingPage } from "./pages/BookingPage";
import { LandingPage } from "./pages/LandingPage";

function App() {
  const location = useLocation();
  const isBookingArea = location.pathname.startsWith("/book");

  return (
    <div className="min-h-screen bg-pitch text-black">
      {!isBookingArea && <Navbar />}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/book/*" element={<BookingPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;


