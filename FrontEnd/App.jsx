import React from 'react';
import './index.css'
import { Routes, Route } from 'react-router-dom'; // Fixed import
import { Login } from './Components/Pages/Login';
import { Admin} from './Components/Pages/Admin';

export const Home = () => {
  return (
    <div>
      <Routes>
        <Route path="/Admin" element={<Admin />}/>
        <Route path="" element={<Login/>} />
      </Routes>
    </div>
  );
};

export default Home;
