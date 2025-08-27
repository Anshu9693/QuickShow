import React from "react";
import NavBar from "./Components/NavBar";
import Footer from "./Components/Footer";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./Pages/Home";
import Movies from "./Pages/Movies";
import MovieDetails from "./Pages/MovieDetails";
import SeatLayout from "./Pages/SeatLayout";
import MyBookings from "./Pages/MyBookings";
import Favorite from "./Pages/Favorite";
import { Toaster } from "react-hot-toast";
import HeroSection from "./Components/HeroSection";
import FeaturedSection from "./Components/FeaturedSection";
import Layout from "./Pages/admin/LayOut";
import DashBoard from "./Pages/admin/DashBoard";
import AddShows from "./Pages/admin/AddShows";
import ListShows from "./Pages/admin/ListShows";
import ListBooking from "./Pages/admin/ListBooking";
import { useAppContext } from "./context/AppContext.jsx";
import { SignIn } from "@clerk/clerk-react";
import Loading from "./Components/Loading.jsx";

const App = () => {
  const isAdminRoute = useLocation().pathname.startsWith("/admin");
  const {user} =useAppContext();
  return (
    <>
      <Toaster />
      {!isAdminRoute && <NavBar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Movies" element={<Movies />} />
        <Route path="/Movies/:id" element={<MovieDetails />} />
        <Route path="/Movies/:id/:date" element={<SeatLayout />} />
        <Route path="/My-Bookings" element={<MyBookings />} />
         <Route path="/loading/:nextUrl" element={<Loading />} />
        <Route path="/Favorite" element={<Favorite />} />

        <Route path="/admin/*" element={ user?<Layout />:(
          <div className="min-h-screen flex justify-center items-center"><SignIn fallbackRedirectUrl={"/admin"} /></div>
        )}>
          <Route index element={<DashBoard />} />
          {/* Add more admin routes here */}
          <Route path="add-shows" element={<AddShows />} />
          <Route path="list-shows" element={<ListShows />} />
          <Route path="list-booking" element={<ListBooking />} />
        </Route>
      </Routes>

      {!isAdminRoute && <Footer />}
    </>
  );
};

export default App;
