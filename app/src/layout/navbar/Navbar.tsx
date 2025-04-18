import React from 'react'
 import "./Navbar.css"
const Navbar = () => {
    return (
        <header>
            <nav>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/movies">Movies</a></li>
                    <li><a href="/contact">Contact</a></li>
                </ul>
            </nav>
        </header>

    )
}

export default Navbar