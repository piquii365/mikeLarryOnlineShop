import { useState, useCallback, useEffect } from "react";
import axios from "../../../api/axios";
import {
  Box,
  Table,
  TableRow,
  TableBody,
  TableCell,
  Typography,
  TableHead,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Delete, Search } from "@mui/icons-material";
const DefaultCustomer = () => {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const fetchCustomers = useCallback(async () => {
    const { data } = await axios.get("/customer/all");
    setCustomers(data);
  }, []);
  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);
  const handleDelete = (customer) => {
    const id = customer._id;
    console.log(id);
    axios.delete(`/customer/delete/${id}`).then((result) => {
      if (result.data.status) {
        alert("Customer deleted successfully");
        location.reload();
      }
    });
  };
  return (
    <Box sx={{ width: "100%", margin: "0.5em 1em" }}>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <TextField
          sx={{ width: 300 }}
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
      </Box>
      <Box mt="1em">
        {customers.length === 0 ? (
          <Typography>You have not added customers yet</Typography>
        ) : (
          <Box>
            <Table>
              <TableHead sx={{ backgroundColor: "#002c3e" }}>
                <TableRow>
                  <TableCell sx={{ color: "white" }} component={"th"}>
                    Customer Name:
                  </TableCell>
                  <TableCell sx={{ color: "white" }} component={"th"}>
                    Age:
                  </TableCell>
                  <TableCell sx={{ color: "white" }} component={"th"}>
                    Phone Number:
                  </TableCell>
                  <TableCell sx={{ color: "white" }} component={"th"}>
                    Zone:
                  </TableCell>
                  <TableCell
                    sx={{ color: "white" }}
                    component={"th"}
                  ></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {customers
                  ?.filter((customer) => {
                    return search.toLowerCase() === ""
                      ? customer
                      : customer.fullName.includes(search);
                  })
                  .map((customer, index) => (
                    <TableRow key={index}>
                      <TableCell component={"td"}>
                        {customer.fullName}
                      </TableCell>
                      <TableCell component={"td"}>{customer.age}</TableCell>
                      <TableCell component={"td"}>
                        <a href={`tel:${customer.phoneNumber}`}>
                          {customer.phoneNumber}
                        </a>
                      </TableCell>
                      <TableCell component={"td"}>{customer.zone}</TableCell>
                      <TableCell component={"td"}>
                        <IconButton
                          onClick={() => handleDelete(customer)}
                          sx={{ color: "red" }}
                        >
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default DefaultCustomer;
