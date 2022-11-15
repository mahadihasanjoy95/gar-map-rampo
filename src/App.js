import React, {useEffect, useState} from 'react';
import {MapContainer, Polygon, Popup, TileLayer, useMap} from 'react-leaflet';
import Marker from 'react-leaflet-enhanced-marker'

import 'leaflet/dist/leaflet.css';
import {statesData} from './data';
import './App.css';
import MarkerStyle from "./MarkerStyle";
import {okText, popupContent, popupHead, popupText} from "./popoutStyles";
import markerImg from './10.jpg'
import SimpleList from "./SimpleList ";
import 'bootstrap/dist/css/bootstrap.min.css';


export default function App() {
    const [center, setCenter] = useState([41.06465903708306, -74.05194960082275])

    const [zoom, setZoom] = useState(10)
    function clickHandler() {
        setCenter([41.06465903708306,-74.05194960082275])
    }
    useEffect(()=>{
        console.log("CENTER EVHNAGE TO::::::::: ",center)
    },[center])
    function ChangeView({ center, zoom }) {
        const map = useMap();
        map.setView(center, zoom);
        return null;
    }

    return (
        <div>
            <div className='rowC'>
                <SimpleList setCenter={setCenter} setZoom ={setZoom}/>
                <MapContainer
                    center={center}
                    zoom={zoom}
                    style={{width: '100vw', height: '100vh'}}
                >
                    <ChangeView center={center} zoom={zoom} />
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {/*<ReactLeafletGoogleLayer apiKey='' type={'satellite'} />*/}
                    {
                        statesData.features.map((state) => {
                            const coordinates = state.geometry.coordinates[0].map((item) => [item[1], item[0]]);
                            console.log("COORDINATE##### ", state.geometry.coordinates[0][2])
                            return (
                                <Marker position={state.marker} icon={<MarkerStyle/>}>
                                    <Popup className='request-popup'>
                                        <div style={popupContent}>
                                            <img
                                                src={markerImg}
                                                width="150"
                                                height="150"
                                                alt="no img"
                                            />
                                            <div className="m-2" style={popupHead}>
                                                {state.properties.name}
                                            </div>
                                            <span style={popupText}>
                      {state.details}
            </span>
                                            <div className="m-2" style={okText}>
                                                Okay
                                            </div>
                                        </div>
                                    </Popup>
                                </Marker>)
                        })
                    }
                    {
                        statesData.features.map((state) => {
                            const coordinates = state.geometry.coordinates[0].map((item) => [item[1], item[0]]);

                            return (
                                <Polygon
                                    pathOptions={{
                                        // fillColor: '#FD8D3C',
                                        // fillOpacity: 0.7,
                                        fillColor: "none",
                                        weight: 2,
                                        opacity: 1,
                                        dashArray: 3,
                                        color: 'yellow'
                                    }}
                                    positions={coordinates}
                                    eventHandlers={{
                                        mouseover: (e) => {
                                            const layer = e.target;
                                            layer.setStyle({
                                                dashArray: "",
                                                // fillColor: "#BD0026",
                                                // fillOpacity: 0.7,
                                                weight: 2,
                                                opacity: 1,
                                                color: "yellow",
                                            })
                                        },
                                        mouseout: (e) => {
                                            const layer = e.target;
                                            layer.setStyle({
                                                // fillOpacity: 0.7,
                                                weight: 2,
                                                dashArray: "3",
                                                color: 'yellow',
                                                // fillColor: '#FD8D3C'
                                            });
                                        },
                                        click: (e) => {

                                        }
                                    }}
                                />)
                        })
                    }
                </MapContainer>
            </div>
        </div>
    );
}
