import React, {useEffect, useRef, useState} from 'react';
import {LayersControl, MapContainer, Marker, Polygon, Popup} from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import {statesData} from '../dataset/data';
import '../App.css';
import {popupContent, popupHead, popupText} from "../styles/popoutStyles";
import SimpleList from "./SimpleList ";
import 'bootstrap/dist/css/bootstrap.min.css';
import abcd from "../images/icon.png";
import shadow from "../images/shadow.png";
import Modal from 'react-bootstrap/Modal';
import ReactLeafletGoogleLayer from 'react-leaflet-google-layer';
import L from "leaflet";
import Description from "./Description";
import AxiosServices from "../networks/AxiosService";
import ApiUrlServices from "../networks/ApiUrlServices";

function MapComponents(props) {
    useEffect(()=>{
        // signIn()
    },[])
    const {BaseLayer} = LayersControl;
    const key = 'Your Key goes here';
    const [selectedItem, setSelectedItem] = useState({
        "datasetid": "",
        "recordid": "",
        "fields": {
            "tax_coord": "",
            "site_id": "",
            "geom": {
                "coordinates": [],
                "type": ""
            },
            "streetname": "",
            "civic_number": ""
        },
        "record_timestamp": "",
    },)

    function get_polygon_centroid(pts) {
        let ring = pts.coordinates[0];
        let first = ring[0], last = ring[ring.length - 1];
        if (first[0] !== last[0] || first[1] !== last[1]) ring.push(first);
        let twicearea = 0;
        let c = [0, 0];
        let nPts = ring.length;
        let p1, p2, f;
        for (let i = 0, j = nPts - 1; i < nPts; j = i++) {
            p1 = ring[i];
            p2 = ring[j];
            f = (p1[1] - first[1]) * (p2[0] - first[0]) - (p2[1] - first[1]) * (p1[0] - first[0]);
            twicearea += f;
            c[0] += (p1[0] + p2[0] - 2 * first[0]) * f;
            c[1] += (p1[1] + p2[1] - 2 * first[1]) * f;
        }
        f = twicearea * 3;
        let result = [0, 0];
        result[1] = c[0] / f + first[0]
        result[0] = c[1] / f + first[1]
        return result
    }

    const [type, setType] = React.useState("satellite");
    const [center, setCenter] = useState([49.253282185569894, -123.04585075637534,])
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
        map.flyTo(get_polygon_centroid(MARKER_POSITION.fields.geom), 21);

        const marker = markerRef[MARKER_POSITION.recordid];
        if (marker) {
            marker.openPopup();
        }
    };

    const signIn = async () => {
        const data = {
            medium: "email",
            emailOrPhone: "masudur.rahman@shadhinlab.com",
            password: "asd123456",
        };
        try {
            let response = await AxiosServices.post(ApiUrlServices.SIGN_IN, data, false);
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className={"h-100"}>
            <div className='rowC container-fluid vh-100'>
                <div class="overflow-auto">
                    <SimpleList setCenter={setCenter} setZoom={setZoom} onClickShowMarker={onClickShowMarker}
                                setSelectedItem={setSelectedItem} selectedItem={selectedItem}/>
                </div>

                <MapContainer
                    center={center}
                    zoom={zoom}
                    style={{width: '100vw', height: '100vh'}}
                    whenCreated={(map) => {
                        mapRef.current = map;
                    }}
                >
                    <ReactLeafletGoogleLayer key={type} type={type}/>

                    <Description
                        title={"Switch Map View"}
                        setType={setType}
                        type={type}
                    />
                    {
                        statesData.features.map((state) => {
                            return (
                                <Marker ref={ref => markerRef[state.recordid] = ref}
                                        position={get_polygon_centroid(state.fields.geom)}
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
                                                src={"https://ny-ramapo-citizen.comper.info/images/streetview.php?lat=41.119058259300424&lng=-74.02786857427738"}
                                                width="100"
                                                height="100"
                                                alt="no img"
                                            />
                                            <div className="m-2" style={popupHead}>
                                                {state.fields.civic_number}
                                            </div>
                                            <span style={popupText}>
                                              Street Name: {state.fields.streetname} <br/>
                                            Price : $42000 <br/> Building Style: Duplex
                                    </span>
                                            <br/>
                                            <button type="button" class="btn btn-warning btn-sm"
                                                    onClick={handleShow}>See Details
                                            </button>
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
                            src={"https://ny-ramapo-citizen.comper.info/images/streetview.php?lat=41.119058259300424&lng=-74.02786857427738"}
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

export default MapComponents;