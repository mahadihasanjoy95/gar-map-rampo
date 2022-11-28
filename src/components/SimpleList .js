import React, {useEffect, useState} from 'react';
import {statesData} from '../dataset/data';
import 'bootstrap/dist/css/bootstrap.min.css';
import AxiosServices from "../networks/AxiosService";
import ApiUrlServices from "../networks/ApiUrlServices";
import {useDispatch, useSelector} from "react-redux";
import {mapAction} from "../redux/MapSlice";

function SimpleList(props) {
    const SortList = ['Distance', 'Price', 'Date', 'Size'];
    const [sortParam, setSortParam] = useState("Distance");
    const [rawData, setRawData] = useState(statesData.features)
    const dispatch = useDispatch()

    useEffect(() => {
        sortAndFetchAPi(sortParam).then(r => console.log(r))
    }, [sortParam])
    const sortAndFetchAPi = async (sortParam) => {
        await AxiosServices.get(ApiUrlServices.GET_ALL_CURRENCY)
            .then(async (res) => {
                console.log(res)
                setRawData(statesData.features)
                dispatch(mapAction.setStateData(statesData.features))

            }).catch((err) => {
                console.log(err)
            })
            .finally(() => {
                console.log("Yes!!")
            })

    }
    return (<div>
        <div class="rowC">
            <ul className="list-group p-3 border bg-light">
                <li><select
                    id="sortList"
                    value={sortParam}
                    onChange={(e) => {
                        setSortParam(e.target.value)
                    }}
                >
                    {SortList.map((animal) => (<option key={animal}>{animal}</option>))}
                </select></li>
            </ul>
        </div>
        <div>
            <ul className="list-group">
                {rawData.map(item => (<li key={item.id}
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
            </ul>
        </div>
    </div>);
}

export default SimpleList;