import { List } from "@mui/material";
import CinemaListItem from "./CinemaListItem";

const CinemaListAside = ({ cinemas, Header = null }) => {
  return (
    <List
      subheader={Header ? <Header cinemas={cinemas} /> : null}
      sx={{
        maxHeight: "calc(100vh - 112px)",
        overflowY: "auto",
        // Make any ListSubheader inside this list sticky
        "& .MuiListSubheader-root": {
          position: "sticky",
          top: 0,
          zIndex: 1,
          bgcolor: "background.paper",
        },
      }}
    >
      {/* NOTE: potential future feature of adding frontend sorting */}
      {/* NOTE: this currently doesn't handle the case of cinemas array being empty
                (potentially caused by manually manipulated url arguments) */}
      {cinemas.map((cinema, idx) => (
        <CinemaListItem {...cinema} key={idx} />
      ))}
    </List>
  );
};

export default CinemaListAside;
