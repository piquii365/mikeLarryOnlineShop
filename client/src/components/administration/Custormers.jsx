import {
  Box,
  Stack,
  ButtonGroup,
  Button,
  Typography,
  Paper,
  Link,
} from "@mui/material";
import { Outlet } from "react-router-dom";
const Customers = () => {
  return (
    <Box
      sx={{
        boxSizing: "border-box",
        display: "flex",
        gap: "2em",
      }}
    >
      <Stack
        sx={{ width: "17em", height: "90dvh", padding: "0.5em" }}
        component={Paper}
      >
        <Typography>Customers</Typography>
        <ButtonGroup orientation="vertical">
          <Button href="/admin/dashboard/customers" component={Link}>
            Customers
          </Button>
          <Button href="/admin/dashboard/customers/add" component={Link}>
            New Customer
          </Button>
          <Button href="/admin/dashboard/customers/update" component={Link}>
            Update Customer
          </Button>
        </ButtonGroup>
      </Stack>
      <Outlet />
    </Box>
  );
};
export default Customers;
