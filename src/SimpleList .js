import React from 'react';
import { statesData } from './data';
function SimpleList(props) {
    return (
        <ul class="list-group">
            {statesData.features.map(item => (
                <li key={item.id}  className={"list-group-item list-group-item-success btn btn-outline-secondary"} onClick={()=>{
                    props.setCenter(item.marker)
                    props.setZoom(100)
                    props.onClickShowMarker(item)
                }}>
                    <div>{item.properties.name}</div>
                    <div>{item.details}</div>
                </li>
            ))}
        </ul>
    );
}

export default SimpleList;