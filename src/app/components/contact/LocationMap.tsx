import { Feature, View } from "ol";
import { useEffect, useRef, useState } from "react";
import Map from "ol/Map";
import styles from "./locationMap.module.css";
import OSM from "ol/source/OSM";
import TileLayer from "ol/layer/Tile";
import { fromLonLat } from "ol/proj";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Point } from "ol/geom";
import { Icon, Style } from "ol/style";
import marker from "../../../assets/icons/marker.svg";
import "ol/ol.css"

const pos = fromLonLat([78.425541, 17.375008]);
const LocationMap = () => {
    const mapElement = useRef<HTMLDivElement>(null);
    const [map, setMap] = useState<Map | null>(null)

    useEffect(() => {
        const iconFeature = new Feature({
            geometry: new Point(pos),
        });
        const iconStyle = new Style({
            image: new Icon({
                src: marker.src,
            }),
        });
        iconFeature.setStyle(iconStyle);
        var layer = new VectorLayer({
            source: new VectorSource({
                features: [iconFeature],
            }),
        });

        const initialMap = new Map({
            layers: [
                new TileLayer({
                    source: new OSM(),
                }),
                layer,
            ],
            target: mapElement.current as HTMLElement,
            view: new View({
                center: pos,
                zoom: 11,
                maxZoom: 15
            }),
        });

        const mapSize = initialMap.getSize()!;
        if (!mapElement) return
        if (window.innerWidth > 768) {
            const width = mapElement.current?.offsetWidth!
            const height = mapElement.current?.offsetHeight!
            initialMap.getView().centerOn(pos, mapSize, [width / 4, height / 2])
        }

        setMap(initialMap)

        return () => {
            if (mapElement.current) {
                mapElement.current.innerHTML = "";
            }
        };
    }, []);

    useEffect(() => {
        if (!map) return
    }, [map])

    return (
        <>
            <div
                ref={mapElement}
                id="mapElement"
                className={styles.olmap}
            />
        </>
    );
};

export default LocationMap;
