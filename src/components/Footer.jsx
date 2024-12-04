import React from 'react'
import "../styles/Footer.css"
import {NavLink} from "react-router-dom";

const Footer = () => {
    return (
        <>
            {/* Footer Starts */}
            <footer className="footer">
                <div className="footer-container">
                    <div className="footer-logo">
                        <h3>
                            <NavLink to={"/"}>
                                ClimaSense
                            </NavLink>
                        </h3>
                        <p>Your go-to weather companion.</p>
                    </div>

                    <div className={"links"}>
                        <div className="footer-links">
                            <h4>Quick Links</h4>
                            <ul>
                                <li>
                                    <NavLink to={"/about"}>About Us</NavLink>
                                </li>
                                <li>
                                    <NavLink to={"/contact"}>Contact</NavLink>
                                </li>
                                <li>
                                    <NavLink to={"/privacy"}>Privacy Policy</NavLink>
                                </li>
                                <li>
                                    <NavLink to={"/terms"}>Terms of Service</NavLink>
                                </li>
                            </ul>
                        </div>

                        <div className="footer-socials">
                            <h4>Follow Us</h4>
                            <ul>
                                <li>
                                    <a href="https://facebook.com/aryan.kumar.2505" target="_blank" rel="noreferrer">
                                        <i className="fab fa-facebook"></i> Facebook
                                    </a>
                                </li>
                                <li>
                                    <a href="https://x.com/_aryankofficial" target="_blank" rel="noreferrer">
                                        <i className="fab fa-twitter"></i> Twitter
                                    </a>
                                </li>
                                <li>
                                    <a href="https://instagram.com/_aryankumarofficial" target="_blank"
                                       rel="noreferrer">
                                        <i className="fab fa-instagram"></i> Instagram
                                    </a>
                                </li>
                                <li>
                                    <a href="https://github.com/aryankumarofficial" target="_blank" rel="noreferrer">
                                        <i className="fab fa-github"></i> GitHub
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>

                <div className="footer-bottom">
                    <p>
                        &copy; {new Date().getFullYear()} ClimaSense. All rights
                        reserved.
                    </p>
                </div>
            </footer>

            {/* Footer Ends */}</>
    )
}
export default Footer
