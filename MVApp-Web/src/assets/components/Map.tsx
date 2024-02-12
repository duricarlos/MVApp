import { useRef, useEffect, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import "../../map.css";

export default function Map({ locations }: { locations?: any[] }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-80.8749439);
  const [lat, setLat] = useState(35.2214744);
  const [zoom] = useState(14);
  const [API_KEY] = useState("2oGDT5BjbYZQmRFvHaL1");

  useEffect(() => {
    if (map.current) return; // stops map from intializing more than once
    // @ts-ignore
    map.current = new maplibregl.Map({
      // @ts-ignore
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${API_KEY}`,
      center: [lng, lat],
      zoom: zoom,
    });
  }, [API_KEY, lng, lat, zoom]);

  useEffect(() => {
    if (!locations) return;
    locations.forEach((loc, index) => {
      // @ts-ignore
      index === 0 ? map.current.flyTo({ center: [loc.Lng, loc.Lat] }) : null;
      new maplibregl.Marker({ color: "#FF0000" })
        .setLngLat([loc.Lng, loc.Lat])
        .setPopup(
          new maplibregl.Popup().setHTML(
            // Name, Notes, ID, link to open Google Maps
            `<h3>${loc.Name}</h3><p>${loc.Notes}</p><a href="https://www.google.com/maps/search/?api=1&query=${loc.Lat},${loc.Lng}" target="_blank">Abrir en Google Maps</a>`
          )
        )
        // @ts-ignore
        .addTo(map.current);
    });
  }, [locations]);

  return (
    <div className="map-wrap">
      <div ref={mapContainer} className="map" />
    </div>
  );
}
