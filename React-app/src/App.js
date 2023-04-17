import logo from './logo.svg';
import './App.css';
import Group from './grouppost/grouppage.js'
import React, { Component }  from 'react';
import Home from './pages/Home';
import Lostdetail from './lostpet/lostdetail';
import Lostpage from './lostpet/lostpage'
import Listgroup from './grouppost/listgroup'
import { BrowserRouter as Router, Routes, Route, NavLink, Navigate } from "react-router-dom";
import catpro from './photo-1611915387288-fd8d2f5f928b.jpg'

function App() {
  return (
    <Router>
      <div id="nav-bord">
            <div className='Header-name'>
              <h1>Find My Pet</h1>
            </div>

            <div style={{display:'flex', alignItems:'center'}}>
                <NavLink end to="/" style={{textDecoration:'none'}}><h3 className='nav-button'>Home</h3></NavLink>
                <NavLink to="/post" style={{textDecoration:'none'}}><h3 className='nav-button'>น้องหาย</h3></NavLink>
                <NavLink to="/group" style={{textDecoration:'none'}}><h3 className='nav-button'>Group</h3></NavLink>
        

            </div>

            <div className='user-profile-contrainer'>
              <div className='user-profile'>
                  <img src={catpro} alt='img-pro' className='img-pro'/>
                  <h3 className='name-profile'>KongATC</h3>
              </div>
              <h3 style={{margin:'0px', color:'#F45050', textDecoration:'underline 2px', fontSize:'16px', marginLeft:'3%'}}>LOGOUT</h3>
            </div>
        </div>
      <Routes>
        <Route path="/" element={<Lostpage />}/>
        <Route path="/post" element={<Group />}/>
        <Route path="/group" element={<Listgroup />}/>
        <Route path="/detail" element={<Lostdetail />}/>
      </Routes>
    </Router>
  );
}

export default App;
