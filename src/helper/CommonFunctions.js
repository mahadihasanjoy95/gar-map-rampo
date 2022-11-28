import {useSelector} from "react-redux";

export function getDataFromApi(n) {
    const mapData = useSelector(state => state.mapReducers.stateData);
    console.log("MAP DATA: : : : ", mapData)
}