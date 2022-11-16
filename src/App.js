import React, {useRef, useState} from 'react';
import {MapContainer, Marker, Polygon, Popup, TileLayer, useMap} from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import {statesData} from './data';
import './App.css';
import {popupContent, popupHead, popupText} from "./popoutStyles";
import markerImg from './10.jpg'
import SimpleList from "./SimpleList ";
import 'bootstrap/dist/css/bootstrap.min.css';
import abcd from "./icon.png";
import shadow from "./shadow.png";

import L from "leaflet";

export default function App() {
    const [center, setCenter] = useState([41.06465903708306, -74.05194960082275])

    const [zoom, setZoom] = useState(10)
    const mapRef = useRef(null);
    const markerRef = [];


    function ChangeView({center, zoom}) {
        const map = useMap();
        map.setView(center, zoom);
        return null;
    }

    let Icon = L.icon({
        iconUrl: abcd,
        shadowUrl: shadow,
        iconSize: [38, 50],
        shadowSize: [50, 64],
        iconAnchor: [22, 34], // point of the icon which will correspond to marker's location
        shadowAnchor: [4, 62],
        popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
    });


    const onClickShowMarker = (MARKER_POSITION) => {

        const map = mapRef.current;
        if (!map) {
            return;
        }
        map.flyTo(MARKER_POSITION.marker, 19);

        const marker = markerRef[MARKER_POSITION.id];
        if (marker) {
            marker.openPopup();
        }
    };

    return (
        <div>
            <div className='rowC container-fluid vh-100'>
                <div class="overflow-auto">
                    <SimpleList setCenter={setCenter} setZoom={setZoom} onClickShowMarker={onClickShowMarker}/>
                </div>

                <MapContainer
                    center={center}
                    zoom={zoom}
                    style={{width: '100vw', height: '100vh'}}
                    whenCreated={(map) => {
                        mapRef.current = map;
                    }}
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {/*<ReactLeafletGoogleLayer apiKey='' type={'satellite'} />*/}
                    {
                        statesData.features.map((state) => {
                            return (
                                <Marker ref={ref => markerRef[state.id] = ref} position={state.marker}
                                        icon={Icon}>
                                    <Popup className='request-popup'>
                                    <div style={popupContent}>
                                        <img
                                            src={markerImg}
                                            width="100"
                                            height="100"
                                            alt="no img"
                                        />
                                        <div className="m-2" style={popupHead}>
                                            {state.properties.name}
                                        </div>
                                        <span style={popupText}>
                                              {state.details}
                                    </span>
                                        <br/>
                                        <button type="button" class="btn btn-warning btn-sm" onClick={()=>{alert("Hi")}}>See Details</button>
                                    </div>
                                </Popup>

                                </Marker>

                            )
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
                                        dashArray: "",
                                        color: 'orange'
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
                                                color: "orange",
                                            })
                                        },
                                        mouseout: (e) => {
                                            const layer = e.target;
                                            layer.setStyle({
                                                // fillOpacity: 0.7,
                                                weight: 2,
                                                dashArray: "",
                                                color: 'orange',
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
