import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useCollection } from "@nandorojo/swr-firestore";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "@nextui-org/react";

export default function MapboxMap() {
  const token =
    "pk.eyJ1IjoibGVvc20wNyIsImEiOiJjbGVicjdueHgxMmoxM25xZ2JqZWVkbTFjIn0.nv1GEej-EtMR1ouVUYVM_w";
  const ref = useRef(null);
  //const [map, setMap] = useState(null);
  const [map, setMap] = useState(null);
  const [lng, setLng] = useState(-118.4912);
  const [lat, setLat] = useState(34.0195);
  const [zoom, setZoom] = useState(12.5);
  const { type, isDark } = useTheme();

  const { data: locationList } = useCollection("feed", {
    where: ["address", "!=", false],
    listen: true,
  });
  //console.log(locationList);
  useEffect(() => {
    mapboxgl.accessToken = token;

    if (ref.current && !map) {
      const map = new mapboxgl.Map({
        container: ref.current,
        style: 
         !isDark
            ? "mapbox://styles/mapbox/light-v11"
             : "mapbox://styles/mapbox/dark-v11",
        center: [lng, lat], // center map on Chad
        zoom: zoom,
      });
      setMap(map);
    }

    if (locationList) {
      console.log(locationList);
      console.log("Initialize map...");
      // console.log(markers);
      const geojson = {
        type: "Feature",
        features: locationList.map((marker) => ({
          properties: {
            city: marker.address.city,
            country: marker.address.country,
            title: marker.title,
            street: marker.address.streetAddress,
            iconSize: [30, 42],
          },
          geometry: {
            type: "Point",
            coordinates: {
              lat: marker.address.latitude,
              lng: marker.address.longitude,
            },
          },
        })),
      };
      console.log(`GEOJSON:`);
      console.log(geojson);
      if (map) {
        geojson.features.forEach((marker) => {
          
          // create a DOM element for the marker
          if (typeof window !== "undefined") {
            const markerIcon = document.createElement("div");
            markerIcon.className = "location-marker";
            markerIcon.style.backgroundImage =
              "url(https://cdn.discordapp.com/attachments/1076352423490232450/1077121602858262548/map-marker-512_copy.png)";
            markerIcon.style.width = marker.properties.iconSize[0] + "px";
            markerIcon.style.height = marker.properties.iconSize[1] + "px";

            console.log(marker.geometry.coordinates);
            new mapboxgl.Marker(markerIcon)
              .setLngLat(marker.geometry.coordinates) // add marker to map
              .setPopup(
                // add pop out to map
                new mapboxgl.Popup({ offset: 25 }).setHTML(
                  `<div>
                  <p style='color: black; font-weight: bold;'>${marker.properties.title}</p>
                  <p style='color: black;'>${marker.properties.street}</p>
                  <p style='color: black;'>${marker.properties.city}, ${marker.properties.country}</p>
                  </div>`
                )
              )
              .addTo(map);
          }
        });
      }
    }
  }, [ref, map, locationList, lng, lat, zoom, isDark]);
  return (
    <div>
      <div
        ref={ref}
        className="map-container"
        style={{ height: "91.5vh" }}
      ></div>
    </div>
  );
}
