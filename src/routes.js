import React from 'react';

const MapComponents = React.lazy(() => import('./components/MapComponents'));
const routes = [
    { path: '/', name: 'Dashboard', component: MapComponents },
];

export default routes;