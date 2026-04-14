import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

function Navbar(){
    return(
        <nav class="navbar">
            <h1>CollegeSync</h1>
            <ul class="nav-links">
                <li><Link to="/login">Sign In</Link></li>
                <li><Link to="/signup">Get Started</Link></li>
            </ul>
        </nav>
    )
}

export default Navbar;