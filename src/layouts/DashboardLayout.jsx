import React from 'react';
import DefaultHeader from "../components/DefaultHeader";

function DashboardLayout(props) {

    return (<div>
        <DefaultHeader/>
        {props.children}
    </div>);
}

export default DashboardLayout;