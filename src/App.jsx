import React, {useEffect, useRef, useState} from 'react'
import {Outlet, useLocation} from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import {Toaster} from "react-hot-toast";
import LoadingBar from "react-top-loading-bar";
import Footer from "./components/Footer.jsx";

const App = () => {
    const location = useLocation();
    useEffect(() => {
        setTimeout(() => {
        ref.current.complete();
        }, 2000)
        ref.current.continuousStart(0,100);

    }, [location])

    const ref = useRef(null);
    return (
        <>
            <Navbar/>
            <LoadingBar
                color={"red"}
                ref={ref}
            />
            <Toaster
                position={"top-right"}
                reverseOrder={true}
            />
            <Outlet/>
            <Footer/>
        </>
    )
}
export default App
