import React from 'react';
import {Nav, Navbar} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import image from "./../images/355980.png"
function DefaultHeader(props) {
    return (
        <Navbar bg="dark" variant="dark" style={{height: "60px", padding: "5px 20px"}}>
            <Nav className="me-auto">
                <NavLink to="/"> <img
                    src={image}
                    width="25"
                    height="25"
                    alt="no img"
                /></NavLink>
                <NavLink to="/home" className="text-decoration-none text-light mx-3">Property List</NavLink>
            </Nav>

        </Navbar>);
}

export default DefaultHeader;