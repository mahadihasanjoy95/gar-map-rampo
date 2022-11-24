import React from 'react';
import {statesData} from '../dataset/data';
import 'bootstrap/dist/css/bootstrap.min.css';

function SimpleList(props) {
    return (<ul className="list-group">
            {statesData.features.map(item => (<li key={item.id}
                                                  className={"list-group-item list-group-item-success btn btn-outline-secondary " + (props.selectedItem.recordid === item.recordid ? 'active' : '')}
                                                  onClick={() => {
                                                      props.setCenter(item.marker)
                                                      props.setZoom(100)
                                                      props.onClickShowMarker(item)
                                                      props.setSelectedItem(item)
                                                  }}>
                    <div className='rowC'>
                        <img
                            src={"https://ny-ramapo-citizen.comper.info/images/streetview.php?lat=41.12388691952025&lng=-74.03106185637327"}
                            width="50"
                            height="50"
                            alt="no img"
                        />
                        <div>
                            <div>{item.fields.civic_number}</div>
                            <div>{item.fields.streetname}</div>
                        </div>
                        <div>
                            <div>Price: $420000</div>
                            <div>Building Style: Duplex</div>
                        </div>
                    </div>
                </li>))}
        </ul>);
}

export default SimpleList;