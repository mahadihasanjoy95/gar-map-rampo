import React from 'react';
import MapComponents from "./components/MapComponents";
import {Route, Routes,} from 'react-router-dom'
import PropertyList from "./components/PropertyList";
import DashboardLayout from "./layouts/DashboardLayout";

export default function App() {

    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<DashboardLayout><MapComponents/></DashboardLayout>}></Route>
                <Route path="/home" element={<DashboardLayout><PropertyList/></DashboardLayout>}></Route>
            </Routes>
        </div>
    );
}
