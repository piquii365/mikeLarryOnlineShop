import { Outlet, useLocation } from "react-router-dom";
import axios from "../api/axios";
import { Box, Button, Stack, Typography, Link } from "@mui/material";
const Admin = () => {
  const handleLogout = () => {
    axios
      .get("/auth/admin/logout")
      .then((result) => {
        if (result.status === 204) {
          location.assign("/admin");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const { state } = useLocation();
  return (
    <Box
      sx={{
        margin: 0,
        padding: 0,
        boxSizing: "border-box",
        minHeight: "90dvh",
      }}
    >
      <Box>
        <Stack
          direction={"row"}
          sx={{
            display: {
              xs: "none",
              sm: "none",
              md: "flex",
              lg: "flex",
            },
            flexDirection: "row",
            alignItems: "center",
            padding: "1em",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography>Mike </Typography>
          </Box>
          <Box>
            <Button href="/admin/dashboard/products" component={Link}>
              PRODUCTS
            </Button>
            <Button href="/admin/dashboard/orders" component={Link}>
              ORDERS
            </Button>
            <Button>PAYMENTS</Button>
          </Box>
          <Box>
            <Button onClick={handleLogout}>Logout</Button>
          </Box>
        </Stack>
        <Stack sx={{ display: { xs: "flex", sm: "flex", md: "none" } }}>
          <Box>
            <Typography>Mike </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Button href="/admin/dashboard/products" component={Link}>
                PRODUCTS
              </Button>
              <Button>ORDERS</Button>
              <Button>PAYMENTS</Button>
            </Box>
            <Button onClick={handleLogout}>Logout</Button>
          </Box>
        </Stack>
      </Box>
      <Outlet />
    </Box>
  );
};

export default Admin;
