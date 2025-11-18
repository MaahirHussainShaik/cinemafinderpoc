import { Chip, IconButton, ListItem, ListItemText } from "@mui/material";
import { MdCall, MdOutlineLocationOn } from "react-icons/md";
import { format } from "d3-format";

const dispatchMapSnapTo = (lat, lng) => {
  console.log("triggering `map.snapTo` event:", lat, lng);
  dispatchEvent(new CustomEvent("map.snapTo", { detail: { lat, lng } }));
};

const dispatchCinemaSelect = (cinema) => {
  console.log("dispatching `cinema.select` event for:", cinema?.name);
  dispatchEvent(new CustomEvent("cinema.select", { detail: cinema }));
};

const CinemaListItem = ({
  name,
  lat,
  lng: lngProp,
  lon,
  phoneNumber,
  distance,
  ...otherProps
}) => {
  // Support both lng and lon
  const lng = lngProp ?? lon;

  const handleSnapTo = () => {
    if (lat == null || lng == null) {
      console.warn("Cinema is missing lat or lng/lon", {
        name,
        lat,
        lngProp,
        lon,
        otherProps,
      });
      return;
    }

    const cinema = {
      name,
      lat,
      lng,
      lon,
      phoneNumber,
      distance,
      ...otherProps,
    };

    // Move the map
    dispatchMapSnapTo(lat, lng);

    // Show the info card on the map (via CinemaMarkers listener)
    dispatchCinemaSelect(cinema);
  };

  return (
    <ListItem>
      <ListItemText>
        {name}
        {distance && (
          <Chip
            size="small"
            sx={{ ml: 1 }}
            label={`${format(",.1f")(distance)} km`}
          />
        )}
      </ListItemText>

      {phoneNumber && (
        <IconButton component="a" href={`tel:${phoneNumber}`}>
          <MdCall />
        </IconButton>
      )}

      <IconButton onClick={handleSnapTo}>
        <MdOutlineLocationOn />
      </IconButton>
    </ListItem>
  );
};

export default CinemaListItem;
