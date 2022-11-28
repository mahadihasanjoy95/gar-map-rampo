import axios from 'axios';
import config from '../config';

function getIRequestProp(severType, isMultipart, isSocial) {
    const serverUrl = severType ? config.API_URL.social_api_base_url : config.API_URL.api_base_url;
    let userData = JSON.parse(localStorage.getItem('userData'));
    let idToken;
    idToken = userData !== null ? userData['idToken'] : '';
    let content_type;
    if (isSocial) {
        content_type = 'application/x-www-form-urlencoded'
    } else {
        content_type = isMultipart ? 'multipart/form-data' : 'application/json'
    }

    return {
        serverUrl: serverUrl,
        requestHeader: {
            'Content-Type': content_type,
            'Accept-Language': config.DEFAULT_LANGUAGE,
            Authorization: `Bearer ${idToken}`
        }
    };
}

async function get(url, parameter, isSocialServer) {
    const {serverUrl, requestHeader} = getIRequestProp(isSocialServer);
    return axios.get(serverUrl + url, {
        params: parameter,
        headers: requestHeader
    });
}

async function postGoogleAPI(url, body, isSocialServer) {
    const {serverUrl, requestHeader} = getIRequestProp(isSocialServer, false, true);
    return fetch(serverUrl + url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: body
        })
}

async function post(url, body, isSocialServer, isMultipart) {
    const {serverUrl, requestHeader} = getIRequestProp(isSocialServer, isMultipart);
    return axios.post(serverUrl + url, body, {
        headers: requestHeader
    });
}

async function put(url, body, isSocialServer) {
    const {serverUrl, requestHeader} = getIRequestProp(isSocialServer);
    return axios.put(serverUrl + url, body, {
        headers: requestHeader
    });
}

async function patch(url, body, isSocialServer) {
    const {serverUrl, requestHeader} = getIRequestProp(isSocialServer);
    return axios.patch(serverUrl + url, body, {
        headers: requestHeader
    });
}

async function remove(url, body, isSocialServer) {
    const {serverUrl, requestHeader} = getIRequestProp(isSocialServer);
    return axios.delete(serverUrl + url, {
        data: body,
        headers: requestHeader
    });
}

const AxiosServices = {
    get,
    post,
    put,
    patch,
    remove,
    postGoogleAPI
};
export default AxiosServices;
