import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ClientSide from "./Client/pages/ClientSide";
import Home from "./Client/pages/Home";
import About from "./Client/pages/About";
import Paintings from "./Client/pages/Paintings";
import Commission from "./Client/pages/Commission";
import PostReview from "./Client/pages/PostReview";

import AdminLayout from "./Admin/pages/AdminLayout";
import AdminDashboard from "./Admin/pages/Dashboard";
import MyPaintings from "./Admin/pages/MyPaintings";
import AddPainting from "./Admin/components/Add";
import Update from "./Admin/components/Update";
import BuyRequests from "./Admin/pages/BRequests";
import ComRequests from "./Admin/pages/ComRequests";

import Login from "./Admin/pages/Login";
import Footer from "./Client/components/Footer";

function App() {
  return (
  
    <Router>
      <Routes>

        <Route element={<ClientSide />}>
          <Route path="/" element={<Home />} />
          <Route path="/paintings" element={<Paintings/>}/>
          <Route path="/commission" element={<Commission/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/postReview" element={<PostReview/>}/>
        </Route>
        
        <Route path="/admin" element={<Login />} />

        <Route element={<AdminLayout />}>
          <Route path="/adminDashboard" element={<AdminDashboard />} />
          <Route path="/myPaintings" element={<MyPaintings />} />
          <Route path="/add" element={<AddPainting />} />
          <Route path="/update/:id" element={<Update/>} />
          <Route path="/buyRequests" element={<BuyRequests/>}/>
          <Route path="/comRequests" element={<ComRequests/>}/>
        </Route>
        
      </Routes>

      <Footer/>
    </Router>
  );
}

export default App;
