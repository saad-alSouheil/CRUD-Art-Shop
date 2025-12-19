import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./Client/Home";
import Login from "./components/Login";
import About from "./Client/About";
import Paintings from "./Client/Paintings";

import AdminLayout from "./Admin/AdminSide";
import ClientSide from "./Client/ClientSide";
import AdminDashboard from "./Admin/AdminDashboard";
import MyPaintings from "./Admin/MyPaintings";
import AddPainting from "./Admin/Add";

function App() {
  return (
  
    <Router>
      <Routes>
        <Route element={<ClientSide />}>
        <Route path="/" element={<Home />} />
        <Route path="/paintings" element={<Paintings/>}/>
        <Route path="/about" element={<About/>}/>
        </Route>
        


        <Route path="/admin/login" element={<Login />} />
        <Route path="adminDashboard" element={<AdminDashboard />} />
          <Route path="/adminDashboard/myPaintings" element={<MyPaintings />} />
          <Route path="/adminDashboard/add" element={<AddPainting />} />
        <Route path="/admin" element={<AdminLayout />}>
          
        </Route>
        

      </Routes>
    </Router>
  );
}

export default App;
