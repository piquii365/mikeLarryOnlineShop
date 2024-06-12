import {
  Stack,
  Box,
  TextField,
  Button,
  InputAdornment,
  ButtonGroup,
  Link,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { useState } from "react";
import { Outlet } from "react-router-dom";

const Orders = () => {
  const [search, setSearch] = useState("");
  return (
    <Box sx={{ margin: 0, padding: 0, boxSizing: "border-box" }}>
      <Stack
        direction={"row"}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: { xs: "center", sm: "center", md: "space-between" },
        }}
        component={"form"}
      >
        <ButtonGroup>
          <Button href="/admin/dashboard/orders" component={Link}>
            Single Order
          </Button>
          <Button href="/admin/dashboard/orders/multiple" component={Link}>
            Multiple Orders
          </Button>
        </ButtonGroup>
        <TextField
          id="search"
          size="small"
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search By Email"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
      </Stack>
      <Outlet context={search} />
    </Box>
  );
};

export default Orders;
