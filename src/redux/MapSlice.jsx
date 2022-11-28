import {createSlice} from "@reduxjs/toolkit";

const mapSlice = createSlice({
    name: "MapReducers",
    initialState: {
        stateData : [],
    },
    reducers: {
        setStateData(state, action) {
            state.stateData = {...state.stateData, ...action.payload};
        },
    }
});

export const mapAction = mapSlice.actions;

export default mapSlice;