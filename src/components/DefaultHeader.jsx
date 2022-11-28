import React from 'react';
import {Nav, Navbar} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import image from "./../images/355980.png"
import Form from 'react-bootstrap/Form';
function DefaultHeader(props) {
    const [checked, setChecked] = React.useState(true);

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
                <label>Distance</label>
                <Form.Select aria-label="Distance">
                    <option value="any">first</option>
                    <option value="second">second</option>
                </Form.Select>
                <label>Distance</label>
                <Form.Select aria-label="Default select example">
                    <option>Price Range</option>
                    <option value="any">first</option>
                    <option value="second">second</option>
                </Form.Select>
                <label>Distance</label>
                <Form.Select aria-label="Default select example">
                    <option>Bathrooms</option>
                    <option value="any">first</option>
                    <option value="second">second</option>
                </Form.Select>
            </Nav>
        </Navbar>);
}

export default DefaultHeader;