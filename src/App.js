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
import Modal from 'react-bootstrap/Modal';

import L from "leaflet";

export default function App() {
    const [selectedItem, setSelectedItem] = useState(      {
        "datasetid": "",
        "recordid": "",
        "fields": {
            "tax_coord": "",
            "site_id": "",
            "geom": {
                "coordinates": [
                ],
                "type": ""
            },
            "streetname": "",
            "civic_number": ""
        },
        "record_timestamp": "",
    },)
    const [center, setCenter] = useState([49.253282185569894,  -123.04585075637534,])
    const [zoom, setZoom] = useState(16)
    const mapRef = useRef(null);
    const markerRef = [];
    const [fullscreen, setFullscreen] = useState(true);
    const [show, setShow] = useState(false);

    function handleShow() {
        setFullscreen("xxl-down");
        setShow(true);
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
        map.flyTo(calculateMarker(MARKER_POSITION.fields.geom.coordinates[0]), 18);

        const marker = markerRef[MARKER_POSITION.recordid];
        if (marker) {
            marker.openPopup();
        }
    };
    const calculateMarker = (coordinates) => {
        let newCoordinates = coordinates.slice(0,1).map((item) => [item[1], item[0]])
        return newCoordinates[0]
    }

    return (
        <div>
            <div className='rowC container-fluid vh-100'>
                <div class="overflow-auto">
                    <SimpleList setCenter={setCenter} setZoom={setZoom} onClickShowMarker={onClickShowMarker} setSelectedItem={setSelectedItem} selectedItem={selectedItem}/>
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
                                <Marker ref={ref => markerRef[state.recordid] = ref} position={calculateMarker(state.fields.geom.coordinates[0])}
                                        icon={Icon}
                                        eventHandlers={{
                                    click: (e) => {
                                        onClickShowMarker(state);
                                        setSelectedItem(state)
                                    },
                                }}
                                >
                                    <Popup className='request-popup'>
                                    <div style={popupContent}>
                                        <img
                                            src={markerImg}
                                            width="100"
                                            height="100"
                                            alt="no img"
                                        />
                                        <div className="m-2" style={popupHead}>
                                            {state.fields.civic_number}
                                        </div>
                                        <span style={popupText}>
                                              {state.fields.streetname}
                                    </span>
                                        <br/>
                                        <button type="button" class="btn btn-warning btn-sm" onClick={handleShow}>See Details</button>
                                    </div>
                                </Popup>

                                </Marker>

                            )
                        })
                    }
                    {
                        statesData.features.map((state) => {
                            const coordinates = state.fields.geom.coordinates[0].map((item) => [item[1], item[0]]);

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
                <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>{selectedItem.fields.civic_number}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <img
                            src={markerImg}
                            width="300"
                            height="300"
                            alt="no img"
                        />
                        <p><strong>Street Name: </strong>{selectedItem.fields.streetname}</p>
                        <p><strong>Tax Number: </strong>{selectedItem.fields.tax_coord}</p>
                        <p><strong>Site ID: </strong>{selectedItem.fields.site_id}</p>
                        <p><strong>Record ID: </strong>{selectedItem.recordid}</p>
                        <p><strong>Record TimeStamp: </strong>{selectedItem.record_timestamp}</p>
                    </Modal.Body>
                </Modal>
            </div>
        </div>
    );
}
