import React, { useMemo, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import allCinemas from "../data/cinemas";
import { useMapContext } from "./Map/context";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  IconButton,
} from "@mui/material";
import { MdCall, MdClose } from "react-icons/md";

const dispatchMapSnapTo = (lat, lng) => {
  console.log("triggering `map.snapTo` event:", lat, lng);
  dispatchEvent(new CustomEvent("map.snapTo", { detail: { lat, lng } }));
};

const dispatchCinemaSelect = (cinema) => {
  console.log("dispatching `cinema.select` event for:", cinema?.name);
  dispatchEvent(new CustomEvent("cinema.select", { detail: cinema }));
};

const CinemaMarkers = () => {
  const { Marker } = useMapContext();
  const params = useParams();
  const [selectedCinema, setSelectedCinema] = useState(null);

  // Listen for global cinema selection (from list icon or other places)
  useEffect(() => {
    const handler = (event) => {
      setSelectedCinema(event.detail);
    };

    window.addEventListener("cinema.select", handler);
    return () => window.removeEventListener("cinema.select", handler);
  }, []);

  const cinemas = useMemo(() => {
    if (params.franchiseId || params.countryCode) {
      const { franchiseId, countryCode } = params;
      return allCinemas.filter((cinema) => {
        return (
          (franchiseId === "all-cinemas" || cinema.franchise === franchiseId) &&
          cinema.countryCode === countryCode
        );
      });
    }
    return allCinemas;
  }, [params]);

  const handleMarkerClick = (cinema) => {
    setSelectedCinema(cinema);

    if (cinema.lat != null && cinema.lng != null) {
      dispatchMapSnapTo(cinema.lat, cinema.lng);
    }

    // Also notify the rest of the app (e.g. AsideIndex)
    dispatchCinemaSelect(cinema);
  };

  return (
    <>
      {cinemas.map((cinema, idx) => (
        <Marker
          lat={cinema.lat}
          lon={cinema.lng}
          key={idx}
          onClick={() => handleMarkerClick(cinema)}
        />
      ))}

      {selectedCinema && (
        <div
          style={{
            position: "absolute",
            bottom: "16px",
            left: "16px",
            zIndex: 1000,
            pointerEvents: "auto",
          }}
        >
          <Card elevation={4}>
            <CardContent>
              <Typography variant="subtitle1" fontWeight="bold">
                {selectedCinema.name}
              </Typography>
              {selectedCinema.address && (
                <Typography
                  variant="body2"
                  style={{ whiteSpace: "pre-line", marginTop: 4 }}
                >
                  {selectedCinema.address}
                </Typography>
              )}
              {selectedCinema.phoneNumber && (
                <Typography variant="body2" style={{ marginTop: 4 }}>
                  {selectedCinema.phoneNumber}
                </Typography>
              )}
            </CardContent>
            <CardActions
              style={{
                justifyContent: "space-between",
                paddingTop: 0,
              }}
            >
              {selectedCinema.phoneNumber && (
                <IconButton
                  size="small"
                  component="a"
                  href={`tel:${selectedCinema.phoneNumber}`}
                >
                  <MdCall />
                </IconButton>
              )}
              <IconButton
                size="small"
                onClick={() => setSelectedCinema(null)}
                aria-label="Close"
              >
                <MdClose />
              </IconButton>
            </CardActions>
          </Card>
        </div>
      )}
    </>
  );
};

export default CinemaMarkers;
