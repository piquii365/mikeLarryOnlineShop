import { Outlet, useNavigate } from "react-router-dom";
import axios, { axiosPrivate } from "../api/axios";
import { Box, Button, Stack, Typography, Link } from "@mui/material";
import { useEffect, useState } from "react";

const Admin = () => {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState("");
  useEffect(() => {
    (async () => {
      try {
        const user = sessionStorage.getItem("User");
        setAdmin(user);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);
  if (!admin) {
    navigate("/admin");
  }

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
            <Typography
              variant="h5"
              sx={{ fontWeight: "bolder", fontSize: 20 }}
            >
              Welcome: {admin}
            </Typography>
          </Box>
          <Box>
            <Button href="/admin/dashboard" component={Link}>
              PRODUCTS
            </Button>
            <Button href="/admin/dashboard/orders" component={Link}>
              ORDERS
            </Button>
            <Button href="/admin/dashboard/add-product" component={Link}>
              Add Product
            </Button>
            <Button href="/admin/dashboard/customers" component={Link}>
              Customers
            </Button>
          </Box>
          <Box>
            <Button onClick={handleLogout}>Logout</Button>
          </Box>
        </Stack>
        <Stack sx={{ display: { xs: "flex", sm: "flex", md: "none" } }}>
          <Box>
            <Typography sx={{ fontWeight: "bolder" }}>
              Welcome:{admin}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Button href="/admin/dashboard" component={Link}>
                PRODUCTS
              </Button>
              <Button href="/admin/dashboard/orders" component={Link}>
                ORDERS
              </Button>
              <Button href="/admin/dashboard/add-product" component={Link}>
                Add Product
              </Button>
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
