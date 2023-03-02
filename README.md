# GIS(Geographic Information System)
##### _A simple project to represent map view of personal properties of an area with React JS_

![Screenshot from 2023-03-01 21-41-49](https://user-images.githubusercontent.com/38191975/222308796-85d364aa-5939-4dfe-b6c7-1cb30e45b22d.png)
> GIS application is showing the area of personal properties with a blue marker. [live demo](https://gar-map-rampo.vercel.app/)
               
----
This is a POC or initial project for GIS. This application represent properties area and details with map. Backend will provide the location details with json data of every properties. This application convert the json to map data and represent the shapes of area with marker in the middle. With clicking on marker user can see the details, and by clicking on popup user will navigate to property details. Also user can scroll the list of places, by clicking which user will also can find the places he is searching for.

**Installation**

GIS requires [Node.js](https://nodejs.org/) v19+ to run.

Install the dependencies and devDependencies and start the server.

```sh
npm config set legacy-peernpm config set legacy-peer-deps true
npm i
```

To Start the project...

```sh
npm start
```
**Plugins**

_Some required library you need to know before start_

| Plugin | README |
| ------ | ------ |
| Leaflet | [https://www.npmjs.com/package/leaflet][PlDb] |
| React Leaflet | [https://www.npmjs.com/package/react-leaflet][PlGh] |
| Google Layer | [https://www.npmjs.com/package/react-leaflet-google-layer][PlGd] |

**Project Structure**
> This is exactly looks like normal react  project. Network configuration, routing and redux or other configuration you can skip here. Components and dataset these two repo I’ll explain to get the main business.

**Important components**

### MapComponent
- This component has all the logic behind to generate the polygone and genrate the central point of the polygone.
- It has the **MapContainer** conponent. This component from react-leaflet libraary hepl to represent map properties like Marker or Polygon. Both marker and polygone will discuss later.
  - **Marker** this component will show the marker on particular position of the mapr, actually with the latitude and longitude. You can change the Icon of the marker and also can customize action with eventhandler. The custom method named **get_polygon_centroid()** will find the middle point of the property.
  - **Polygon** component is able to create polygon, which is actually the shape of your property with all the coordinates. You can customize all color, opacity, weight or other properties like mouseover or others.
- By **ReactLeafletGoogleLayer** component from google-leaflet you can represent the map view with satellite or hybrid or other views.
### SimpleList:
- This component is for to show the list of your all property. This property has a short desc and click action will be navigate to the marker of your destination location with simple animation. This action is refer the same action when you click directly to the marker of a property.


[PlDb]: <https://www.npmjs.com/package/leaflet>
[PlGh]: <https://www.npmjs.com/package/react-leaflet>
[PlGd]: <https://www.npmjs.com/package/react-leaflet-google-layer>

![Screenshot from 2023-03-01 21-42-03](https://user-images.githubusercontent.com/38191975/222315530-b03abbd0-5468-43cf-8ff3-2e3d74668d08.png)
