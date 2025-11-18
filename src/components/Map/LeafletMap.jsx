import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import useEventListener from "@use-it/event-listener";
import { useSnackbar } from "notistack";
import { totalBounds } from "../../data/bounds";
import MapContext from "./context";

// Have to override these url's so that it finds the bundled images
Icon.Default.imagePath =
  "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.3/images/";

const MapSnappingEventListener = () => {
  const { enqueueSnackbar } = useSnackbar();
  const map = useMap();

  useEventListener("map.snapTo", ({ detail: { lat, lng } }) => {
    // This hook sets up an event listener for the map.snapTo event which
    // is dispatched by CinemaListItem / CinemaMarkers
    console.log("executing `map.snapTo` event with leaflet");

    try {
      // [Docs](https://leafletjs.com/reference.html#map-flyto)
      map.flyTo([lat, lng], 14, { duration: 0.5, easeLinearity: 1 });
    } catch (e) {
      console.error(e);
      enqueueSnackbar("Unexpected error while attempting map navigation", {
        variant: "error",
      });
    }
  });

  return null;
};

const convertBounds = ([w, s, e, n]) => [
  // Leaflet expects bounding boxes as [ [south, west], [north, east] ]
  [s, w],
  [n, e],
];

// Allow click handling to be passed from CinemaMarkers
const LeafletMarker = ({ lat, lon, onClick }) => (
  <Marker
    position={[lat, lon]}
    eventHandlers={onClick ? { click: onClick } : undefined}
  />
);

const LeafletMap = ({ children }) => {
  console.log("render Leaflet map");

  const bounds = convertBounds(totalBounds);

  return (
    <MapContainer
      bounds={bounds}
      maxBounds={bounds}
      maxBoundsViscosity={1.0}
      style={{ height: "100%", backgroundColor: "#99b3cc" }}
      zoomSnap={0.5}
      zoomDelta={0.5}
    >
      <MapSnappingEventListener />
      <TileLayer
        // Switched from old Stamen tiles to OpenStreetMap standard tiles
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapContext.Provider value={{ Marker: LeafletMarker }}>
        {children}
      </MapContext.Provider>
    </MapContainer>
  );
};

export default LeafletMap;
