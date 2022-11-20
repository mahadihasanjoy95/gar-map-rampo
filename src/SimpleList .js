import React, {useState} from 'react';
import { statesData } from './data';
import 'bootstrap/dist/css/bootstrap.min.css';
function SimpleList(props) {
    return (
        <ul className="list-group">
            {statesData.features.map(item => (
                <li key={item.id}  className={"list-group-item list-group-item-success btn btn-outline-secondary " + (props.selectedItem.recordid===item.recordid ? 'active' : '')} onClick={()=>{
                    props.setCenter(item.marker)
                    props.setZoom(100)
                    props.onClickShowMarker(item)
                    props.setSelectedItem(item)
                }}>
                    <div>{item.fields.civic_number}</div>
                    <div>{item.fields.streetname}</div>
                </li>
            ))}
        </ul>
    );
}

export default SimpleList;