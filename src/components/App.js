import React from "react";
import Allposts from './allposts.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Pstpg from "./pstpage.jsx";
import Login from "./login.jsx";
import Sgnup from "./signup.jsx";
import Addpst from "./addpst.jsx";
import Profile from "./profile.jsx";
import Update_profile from "./update_profile.jsx";
import { AuthProvider } from "./authContext.js";

function App () {
    return (
        <AuthProvider>
            <Router>
                <div>
                    <Routes>
                    <Route exact path="/" element={<Allposts />} />
                    <Route exact path="/profile" element={<Profile />} />
                    <Route exact path="/pst/:id" element ={<Pstpg />} />
                    <Route exact path="/login" element= {<Login />} />
                    <Route exact path="/signup" element = {<Sgnup />} />
                    <Route exact path="/addpst/" element ={<Addpst />} />
                    <Route exact path="/update_profile" element ={<Update_profile />} />
                </Routes>
                </div>
            </ Router>
        </AuthProvider>
    );
}

export default App;