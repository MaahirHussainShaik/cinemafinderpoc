import "maplibre-gl/dist/maplibre-gl.css";
import Map, { Marker, useMap } from "react-map-gl";
// eslint-disable-next-line import/no-webpack-loader-syntax
import maplibregl from "maplibre-gl";
import useEventListener from "@use-it/event-listener";
import { useSnackbar } from "notistack";
import { MapContextProvider } from "./context";
import { totalBounds } from "../../data/bounds";
import maplibreglWorker from "maplibre-gl/dist/maplibre-gl-csp-worker";

maplibregl.workerClass = maplibreglWorker;

// Allow passing click handlers down to the underlying marker
const MaplibreMarker = ({ lat, lon, onClick }) => (
  <Marker longitude={lon} latitude={lat} anchor="bottom" onClick={onClick} />
);

// totalBounds is [w, s, e, n]; MapLibre wants [[w, s], [e, n]]
const convertBounds = ([w, s, e, n]) => [
  [w, s],
  [e, n],
];

const MapSnappingEventListener = () => {
  const { enqueueSnackbar } = useSnackbar();
  const map = useMap().current;

  useEventListener("map.snapTo", ({ detail: { lat, lng } }) => {
    // This hook sets up an event listener for the map.snapTo event which
    // is dispatched by CinemaListItem / CinemaMarkers
    console.log("executing `map.snapTo` event with maplibre");

    try {
      // MapLibre expects [lng, lat] for center
      map.flyTo({
        center: [lng, lat],
        zoom: 14,
      });
    } catch (e) {
      console.error(e);
      enqueueSnackbar("Unexpected error while attempting map navigation", {
        variant: "error",
      });
    }
  });

  return null;
};

const MaplibreMap = ({ children }) => {
  console.log("render Maplibre map");

  const bounds = convertBounds(totalBounds);

  return (
    <Map
      style={{ width: "100%", height: "100%" }}
      mapLib={maplibregl}
      mapStyle="https://api.maptiler.com/maps/streets-v2/style.json?key=46DCXvzkGNIvqAgCljGV"
      initialViewState={{
        bounds,
      }}
      maxBounds={bounds}
      padding={24}
    >
      <MapSnappingEventListener />
      <MapContextProvider value={{ Marker: MaplibreMarker }}>
        {children}
      </MapContextProvider>
    </Map>
  );
};

export default MaplibreMap;
