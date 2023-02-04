import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Vehicles}  from './Vehicles';
import React from 'react';
import { Customers } from './Customers';
import Home from './home';




function App() {
  return (
    <BrowserRouter>
    <Routes>
        <Route path={""} element={<Home/>}/>
        <Route path={"vehicles"} element={<Vehicles/>}/>
        <Route path={'customers'} element={<Customers/>}/>
        {/* <Route path={"customers"} element={<Customers/>}/>
        <Route path={"rentalevents"} element={<RentalEvents/>}/> */}
    </Routes>
    </BrowserRouter>
    )
}

export default App;
    