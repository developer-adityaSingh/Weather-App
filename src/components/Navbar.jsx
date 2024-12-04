"use client";
import React, {useRef, useState} from 'react'
import useStore from "../state/store.js";
import "../styles/Navbar.css"
import toast from "react-hot-toast";
import {NavLink} from "react-router-dom";
import {BiMenu} from "react-icons/bi";
import {CgClose} from "react-icons/cg";
import useClickOutside from '../hooks/useClickOutside';

const Navbar = () => {
    const {fetchWeather, fetchForecast, error} = useStore();
    const inputRef = useRef();
    const navRef = useRef();
    const [isNavOpen, setIsNavOpen] = useState(false);

    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    };

    useClickOutside(navRef, () => {
        if (isNavOpen) {
            setIsNavOpen(false);
        }
    });

    const fetchData = async (city) => {
        if (!city) {
            toast.error("Please enter a city name.");
            return;
        }
        try {
            await fetchWeather(city);
            await fetchForecast(city);
            if (error.status !== 200) {
                toast.error(error.message);
            }
        } catch (e) {
            console.log("Error fetching Data from API", e.message);
            toast.error("Error Fetching data from API");
        }
    }

    const handleNavLinkClick = () => {
        setIsNavOpen(false);
    };

    return (
        <>
            <nav>
                <BiMenu
                    className="menuIcon"
                    onClick={toggleNav}
                />
                <NavLink to={"/"} className="logo">ClimaSense</NavLink>
                <ul className="navSearchBox">
                    <li>
                        <input
                            ref={inputRef}
                            className="NavcityName"
                            type="text"
                            placeholder="Enter City Name"
                            onKeyUp={async (e) => {
                                if (e.key === "Enter") {
                                    await fetchData(e.target.value)
                                }
                            }}
                        />
                    </li>
                    <li>
                        <button onClick={() => fetchData(inputRef.current.value)}>
                            Search
                        </button>
                    </li>
                </ul>

                <ul ref={navRef} className={`leftNav ${isNavOpen ? 'showNav' : ''}`}>
                    <CgClose
                        className="closeIcon"
                        onClick={toggleNav}
                    />
                    <li><NavLink onClick={handleNavLinkClick} to="/">Home</NavLink></li>
                    <li><NavLink onClick={handleNavLinkClick} to="/about">About Us</NavLink></li>
                    <li><NavLink onClick={handleNavLinkClick} to="/contact">Contact Us</NavLink></li>
                    <li><NavLink onClick={handleNavLinkClick} to="/privacy">Privacy Policy</NavLink></li>
                    <li><NavLink onClick={handleNavLinkClick} to="/terms">Terms and Conditions</NavLink></li>
                </ul>
            </nav>
        </>
    )
}

export default Navbar;