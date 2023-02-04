
import {Vehicles}  from './Vehicles';
import React from 'react';
import { Customers } from './Customers';
import { Link } from 'react-router-dom';



function Home() {
  return (
    <>
  <Link to="/vehicles">Vehicles</Link>
  <Link to="/customers">Customers</Link>
    </>
    )
}

export default Home;
    