import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"
import { useHistory } from 'react-router'
import Image from "./star.png"

export const NavBar = () => {
    const history = useHistory()
    return (
        <div className = "nav">
            <img src={Image} alt="logo" />
            <ul className="navbar">
                <li className="navbar__item">
                    <Link className="nav-link" to="/games">Games</Link>
                </li>

                <li className="navbar__item">
                    <Link className="nav-link" to="/events">Events</Link>
                </li>

                <li className="navbar__item">
                    <Link className="nav-link" to="/profiles">Profiles</Link>
                </li>
                {
                    (localStorage.getItem("lu_token") !== null) ?
                        <li className="navbar__item">
                            <button className="nav-link fakeLink"
                                onClick={() => {
                                    localStorage.removeItem("lu_token")
                                    history.push({ pathname: "/" })
                                }}
                            >Logout</button>
                        </li> :
                        <>
                            <li className="navbar__item">
                                <Link className="nav-link" to="/login">Login</Link>
                            </li>
                            <li className="navbar__item">
                                <Link className="nav-link" to="/register">Register</Link>
                            </li>
                        </>
                }        </ul>
        </div>
    )
}
