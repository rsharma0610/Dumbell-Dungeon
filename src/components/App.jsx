import React, {useState} from "react";
import {Link, Routes, Route} from "react-router-dom";
import WorkoutDetails from "./logger/WorkoutDetails";
import Home from "./display/Home";


function App(){

    return(
        <>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/create">Create</Link></li>
                </ul>
            </nav>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/create" element={<WorkoutDetails key="create" />} />
                <Route path="/edit/:id" element={<WorkoutDetails key="edit" clicked={true} />} />
            </Routes>
        </>
        
        
    )
}

export default App;