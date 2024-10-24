import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import ConnectButton from "./ConnectButton";
import SelectNetworkComponent from "./SelectNetworkComponent";


export function Header() {
  return (
    <AppBar sx={{ backgroundColor: "#3B1E54" }} position="sticky">

      <Toolbar>
        <Typography
          component="div"
          sx={{
            fontFamily: "Josefin Slab",
            flexGrow: 1,
            fontWeight: 400,
            fontSize: {
              xs: "1rem",
              sm: "1.25rem",
              md: "1.5rem",
              lg: "1.75rem",
            },
            ":hover": {
              cursor: "pointer",
            },
            ml: { xs: 2, sm: 0 },
            visibility: { xs: "hidden", sm: "visible" },
          }}
        ></Typography>
        <SelectNetworkComponent />
        <ConnectButton />
      </Toolbar>
    </AppBar>
  );
}
