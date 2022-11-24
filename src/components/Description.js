import React, {Component} from "react";
import {useMap} from "react-leaflet";
import L from "leaflet";

class Description extends React.Component {
    helpDiv;

    createButtonControl() {
        const MapHelp = L.Control.extend({
            onAdd: (map) => {
                const helpDiv = L.DomUtil.create("button", "");
                this.helpDiv = helpDiv;
                helpDiv.innerHTML = this.props.title;
                helpDiv.addEventListener("click", () => {
                    this.props.type === "roadmap" ? this.props.setType("satellite") : this.props.setType("roadmap")

                });
                return helpDiv;
            }
        });
        return new MapHelp({position: "topright"});
    }

    componentDidMount() {
        const {map} = this.props;
        const control = this.createButtonControl();
        control.addTo(map);
    }

    componentWillUnmount() {
        this.helpDiv.remove();
    }

    render() {
        return null;
    }
}

function withMap(Component) {
    return function WrappedComponent(props) {
        const map = useMap();
        return <Component {...props} map={map}/>;
    };
}

export default withMap(Description);
