import {
  IconButton,
  ListSubheader,
  Typography,
  Stack,
  Chip,
} from "@mui/material";
import { MdOutlineArrowBack } from "react-icons/md";
import { Link as RouterLink } from "react-router-dom";

const NearbyHeader = ({ cinemas }) => {
  return (
    <ListSubheader
      sx={{
        pb: 2,
        borderBottom: 1,
        borderColor: "divider",
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <IconButton component={RouterLink} to="/">
          <MdOutlineArrowBack />
        </IconButton>

        <Typography sx={{ flex: 1, textAlign: "center" }}>
          Nearby Cinemas
        </Typography>

        {cinemas.length > 0 && <Chip label={cinemas.length} />}
      </Stack>
    </ListSubheader>
  );
};

export default NearbyHeader;
