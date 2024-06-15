import {
  Box,
  FormControl,
  Typography,
  TextField,
  Button,
  Autocomplete,
} from "@mui/material";
import axios from "../../../api/axios";
import { Formik, Form } from "formik";
import { useState } from "react";
const AddCustomer = () => {
  const [error, setError] = useState("");
  const initialValues = {
    fullName: "",
    age: "",
    phoneNumber: "",
    zone: "",
  };
  const handleSubmit = (values) => {
    console.log(values);
    axios
      .post("/customer/add-customer", values)
      .then((result) => {
        if (result.data.status) {
          alert("Customer added successfully");
        } else {
          setError(result.data.Result);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <Box
      sx={{
        width: "100%",
        height: "inherit",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box>
        <Typography sx={{ fontWeight: "bolder" }} variant="h4" paragraph>
          Add Customer
        </Typography>
        {error && (
          <Typography color="red" variant="small" paragraph>
            {error}
          </Typography>
        )}
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ handleChange, handleSubmit, handleBlur, setFieldValue }) => (
            <Form onSubmit={handleSubmit}>
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: "1em" }}
              >
                <Box component={FormControl}>
                  <TextField
                    id="fullName"
                    label="Full Name"
                    size="small"
                    required
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Box>
                <Box component={FormControl}>
                  <TextField
                    id="age"
                    size="small"
                    type="Number"
                    label="Age"
                    required
                    inputProps={{
                      min: 1,
                    }}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Box>
                <Box component={FormControl}>
                  <TextField
                    required
                    id="phoneNumber"
                    label="Phone Number"
                    size="small"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Box>
                <Box component={FormControl}>
                  <Autocomplete
                    fullWidth
                    id="color"
                    required
                    options={["Cool", "Adventure", "Joyous", "Power"]}
                    renderInput={(params) => (
                      <TextField {...params} label="Zone" />
                    )}
                    onChange={(e, value) => setFieldValue("zone", value)}
                  />
                </Box>
                <Box component={FormControl}>
                  <Button
                    sx={{
                      color: "white",
                      backgroundColor: "#002c3e",
                      "&:hover": {
                        color: "#002c3e",
                        border: "1px solid #002c3e",
                      },
                    }}
                    size="small"
                    type="submit"
                  >
                    Submit
                  </Button>
                </Box>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default AddCustomer;
