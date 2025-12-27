import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ClientSide from "./Client/ClientSide";
import Home from "./Client/Home";
import About from "./Client/About";
import Paintings from "./Client/Paintings";

import AdminLayout from "./Admin/AdminSide";
import AdminDashboard from "./Admin/AdminDashboard";
import MyPaintings from "./Admin/MyPaintings";
import AddPainting from "./Admin/Add";
import Update from "./Admin/Update";
import Requests from "./Admin/Requests";

import Login from "./components/Login";
import Footer from "./components/Footer";

function App() {
  return (
  
    <Router>
      <Routes>

        <Route element={<ClientSide />}>
          <Route path="/" element={<Home />} />
          <Route path="/paintings" element={<Paintings/>}/>
          <Route path="/about" element={<About/>}/>
        </Route>
        
        <Route path="/admin" element={<Login />} />

        <Route element={<AdminLayout />}>
          <Route path="/adminDashboard" element={<AdminDashboard />} />
          <Route path="/myPaintings" element={<MyPaintings />} />
          <Route path="/add" element={<AddPainting />} />
          <Route path="/update/:id" element={<Update/>} />
          <Route path="/requests" element={<Requests/>}/>
        </Route>
        
      </Routes>

      <Footer/>
    </Router>
  );
}

export default App;
