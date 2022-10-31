import React from 'react';
import {
  MapContainer,
  TileLayer,
  Polygon, Popup
} from 'react-leaflet';
import Marker from 'react-leaflet-enhanced-marker'

import 'leaflet/dist/leaflet.css';
import { statesData } from './data';
import './App.css';
import MarkerStyle from "./MarkerStyle";
import { popupContent, popupHead, popupText, okText } from "./popoutStyles";
import markerImg from './10.jpg'

const center = [41.1129866497784, -74.04109586871861];
const position = [41.1129866497784, -74.04109586871861];

export default function App() {
  return (
    <MapContainer
      center={center}
      zoom={100}
      style={{ width: '100vw', height: '100vh' }}
    >
      <TileLayer
        url="https://api.maptiler.com/maps/hybrid/256/{z}/{x}/{y}.jpg?key=AMILAL2XZ4SSJt95Glig"
        attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'/>

      {
        statesData.features.map((state) => {
          const coordinates = state.geometry.coordinates[0].map((item) => [item[1], item[0]]);
          // debugger
          console.log("COORDINATE##### ", state.geometry.coordinates[0][0])
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
                    weight: 2,
                    opacity: 1,
                    dashArray: 3,
                    color: 'white'
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
                        color: "white",
                      })
                    },
                    mouseout: (e) => {
                      const layer = e.target;
                      layer.setStyle({
                        // fillOpacity: 0.7,
                        weight: 2,
                        dashArray: "3",
                        color: 'white',
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
  );
}
