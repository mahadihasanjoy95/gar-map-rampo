import React from 'react';
import img from './Map-Marker-Free-Download-PNG (1).png'

function MarkerStyle() {
    const markerStyle = {
        backgroundColor: "#ffcc00",
        color: "brown",
        display: "flex",
        justifyContent: "center",
        width: "50px",
        height: "50px",
        borderRadius: "50px",
        alignItems: "center"
    };
    return (
        <div ><img src={img}/></div>
    );
}

export default MarkerStyle;