import React from "react";
import Allposts from './allposts';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Pstpg from "./pstpage";
import Login from "./login";
import Sgnup from "./signup";
import Addpst from "./addpst";
import './index.css';
import Profile from "./profile";

function App () {
    return (
        <Router>
            <div>
                <Routes>
                    <Route exact path="/" element={<Allposts />} />
                    <Route exact path="/profile" element={<Profile />} />
                    <Route exact path="/pst/:id" element ={<Pstpg />} />
                    <Route exact path="/login" element= {<Login />} />
                    <Route exact path="/signup" element = {<Sgnup />} />
                    <Route exact path="/addpst/" element ={<Addpst />} />
                </Routes>
            </div>
        </ Router>
    );
}

export default App;