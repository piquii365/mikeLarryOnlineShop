import { Box, Stack, Typography } from "@mui/material";
import { Link, animateScroll as scroll } from "react-scroll";
import { useLocation } from "react-router-dom";
const Profile = () => {
  const { state } = useLocation();

  return (
    <Box sx={{ minHeight: "90dvh", boxSizing: "border-box" }}>
      <Stack
        direction={"row"}
        sx={{
          backgroundColor: "#002c3e",
          color: "white",
          padding: "1em",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "inherit",
        }}
      >
        <Link to="/" style={{ fontSize: 40, fontWeight: "bolder" }}>
          {state.username}
        </Link>
        <Box sx={{ display: "flex", gap: "1em" }}>
          <Link to="/" style={{ fontSize: 20, fontWeight: "bolder" }}>
            Purchase History
          </Link>
          <Link to="/" style={{ fontSize: 20, fontWeight: "bolder" }}>
            Account
          </Link>
        </Box>
      </Stack>
      <Box>
        <Typography>Profile coming soon!!!</Typography>
      </Box>
    </Box>
  );
};

export default Profile;
