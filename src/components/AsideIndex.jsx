import { useEffect, useState } from "react";
import {
  List,
  Typography,
  Grid,
  Chip,
  Card,
  CardActions,
  CardMedia,
  ListItem,
  ListItemText,
  Stack,
  Button,
  ListItemIcon,
  Icon,
} from "@mui/material";
import { GiAustralia, GiFern } from "react-icons/gi";
import {
  MdLocationSearching,
  MdOutlineLocationOn,
  MdSettings,
} from "react-icons/md";
import { Link as RouterLink } from "react-router-dom";
import { breakdown } from "../data/cinemas";
import franchises from "../data/franchises";

const FranchiseCard = ({
  id,
  identifier,
  name,
  logoUrl,
  breakdown,
  ...props
}) => (
  <Grid item sx={{ width: "22.5ex" }}>
    <Card
      sx={{ height: "100%", display: "flex", flexDirection: "column" }}
      variant="outlined"
    >
      {logoUrl !== undefined ? (
        <CardMedia
          sx={{ flex: 1, p: 1, objectFit: "contain" }}
          component="img"
          image={logoUrl}
        />
      ) : (
        <CardMedia sx={{ flex: 1, p: 1 }}>{name || identifier || id}</CardMedia>
      )}
      <CardActions>
        <Stack
          direction="row"
          justifyContent="space-around"
          spacing={1}
          sx={{ width: "100%" }}
        >
          {Object.entries(breakdown).map(([countryCode, count]) => (
            <Button
              size="small"
              sx={{
                borderRadius: 16,
                opacity: 0.8,
                "&:hover": {
                  opacity: 1,
                  outline: "1px solid",
                },
              }}
              startIcon={countryCode === "au" ? <GiAustralia /> : <GiFern />}
              variant="contained"
              disableElevation
              color="grey"
              component={RouterLink}
              to={`/${id}/${countryCode}`}
              key={countryCode}
            >
              {count}
            </Button>
          ))}
        </Stack>
      </CardActions>
    </Card>
  </Grid>
);

const AsideIndex = () => {
  const [selectedCinema, setSelectedCinema] = useState(null);

  // Listen for cinema selection events from markers (and potentially list items)
  useEffect(() => {
    const handler = (event) => {
      setSelectedCinema(event.detail);
    };

    window.addEventListener("cinema.select", handler);

    return () => {
      window.removeEventListener("cinema.select", handler);
    };
  }, []);

  return (
    <>
      <Typography variant="h5">Cinemas</Typography>
      <Typography sx={{ p: 1 }}>
        Welcome to <strong>Cinema Finder</strong>, an application to allow you
        to browse for Cinemas throughout Australia and New Zealand.
      </Typography>

      <Typography
        variant="h5"
        sx={{ mt: 1, pt: 1, borderTop: 1, borderColor: "divider" }}
      >
        Countries
      </Typography>
      <List>
        <ListItem button component={RouterLink} to="/all-cinemas/au">
          <ListItemIcon>
            <Icon>
              <GiAustralia />
            </Icon>
          </ListItemIcon>
          <ListItemText>Australia</ListItemText>
          <Chip label={breakdown.au} />
        </ListItem>
        <ListItem button component={RouterLink} to="/all-cinemas/nz">
          <ListItemIcon>
            <Icon>
              <GiFern />
            </Icon>
          </ListItemIcon>
          <ListItemText>New Zealand</ListItemText>
          <Chip label={breakdown.nz} />
        </ListItem>
      </List>

      <Typography
        variant="h6"
        sx={{ mb: 1, pt: 1, borderTop: 1, borderColor: "divider" }}
      >
        Franchises
      </Typography>
      <Grid container spacing={2} justifyContent="space-around">
        {Object.values(franchises).map(
          (franchise) =>
            franchise.id !== "unknown" && (
              <FranchiseCard key={franchise.id} {...franchise} />
            )
        )}
      </Grid>

      <List sx={{ mt: 2, pt: 1, borderTop: 1, borderColor: "divider" }}>
        <ListItem button component={RouterLink} to="/nearby">
          <ListItemIcon>
            <Icon>
              <MdLocationSearching />
            </Icon>
          </ListItemIcon>
          <ListItemText>Nearby Cinemas</ListItemText>
        </ListItem>
      </List>

      <Typography
        variant="h5"
        sx={{ pt: 1, borderTop: 1, borderColor: "divider" }}
      >
        Help
      </Typography>
      <Typography sx={{ p: 1 }}>
        Use the <MdSettings style={{ verticalAlign: "text-top" }} /> menu in the
        top navigation bar to switch between mapping libraries.
        <br />
        <br />
        When viewing a list of cinemas, you can click{" "}
        <MdOutlineLocationOn style={{ verticalAlign: "text-top" }} /> to fly to
        that cinema on the map.
      </Typography>

      {selectedCinema && (
        <>
          <Typography
            variant="h6"
            sx={{ mt: 2, pt: 1, borderTop: 1, borderColor: "divider" }}
          >
            Selected cinema
          </Typography>
          <List dense>
            <ListItem>
              <ListItemText
                primary={selectedCinema.name}
                secondary={
                  <>
                    {selectedCinema.address && (
                      <span>{selectedCinema.address}</span>
                    )}
                    {selectedCinema.phoneNumber && (
                      <>
                        <br />
                        <a href={`tel:${selectedCinema.phoneNumber}`}>
                          {selectedCinema.phoneNumber}
                        </a>
                      </>
                    )}
                  </>
                }
              />
            </ListItem>
          </List>
        </>
      )}
    </>
  );
};

export default AsideIndex;
