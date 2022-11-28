import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import store from "./redux"
import {Provider} from "react-redux"
import {PersistGate} from "redux-persist/integration/react";
import {persistStore} from "redux-persist";
let persistor = persistStore(store);

ReactDOM.render(<Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <BrowserRouter>
        <React.StrictMode>

            <App/>

        </React.StrictMode>
    </BrowserRouter>
    </PersistGate>
</Provider>, document.getElementById('root'));
