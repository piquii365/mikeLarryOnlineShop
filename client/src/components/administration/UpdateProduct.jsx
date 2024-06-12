import {
  Box,
  Menu,
  Typography,
  Autocomplete,
  FormControl,
  TextField,
  Button,
} from "@mui/material";
import axios from "../../api/axios";
import { Formik, Form } from "formik";
const UpdateProduct = ({ order, anchorEl, open, handleClose }) => {
  const initialValues = {
    paymentStatus: order.paymentStatus,
    orderStatus: order.orderStatus,
  };
  const handleUpdateOrder = (values) => {
    const id = order._id;
    axios
      .put(`/orders/update/${id}`, values, { withCredentials: true })
      .then((response) => {
        if (response.status === 200) {
          location.reload();
        } else {
          console.log("An Occurred while trying to update order");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Box sx={{ boxSizing: "border-box", margin: 0, padding: 0 }}>
      <Menu open={open} anchorEl={anchorEl} onClose={handleClose}>
        <Box sx={{ top: 0, left: 10, padding: "2em" }}>
          <Typography>Edit This Order</Typography>
          <Box>
            <Formik initialValues={initialValues} onSubmit={handleUpdateOrder}>
              {({ handleSubmit, handleBlur, setFieldValue }) => (
                <Form onSubmit={handleSubmit}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "2em",
                    }}
                  >
                    <Box component={FormControl}>
                      <Autocomplete
                        disablePortal
                        size="small"
                        id="paymentStatus"
                        defaultValue={order.paymentStatus}
                        options={["Paid", "Pending", "Cancelled"]}
                        sx={{ width: 300 }}
                        onBlur={handleBlur}
                        onChange={(e, value) =>
                          setFieldValue("paymentStatus", value)
                        }
                        renderInput={(params) => (
                          <TextField {...params} label="Payment Status" />
                        )}
                      />
                    </Box>
                    <Box component={FormControl}>
                      <Autocomplete
                        size="small"
                        disablePortal
                        id="orderStatus"
                        defaultValue={order.orderStatus}
                        options={["Pending", "Delivered", "Cancelled"]}
                        sx={{ width: 300 }}
                        onBlur={handleBlur}
                        onChange={(e, value) =>
                          setFieldValue("orderStatus", value)
                        }
                        renderInput={(params) => (
                          <TextField {...params} label="Order Status" />
                        )}
                      />
                    </Box>
                    <Box component={FormControl}>
                      <Button
                        sx={{
                          backgroundColor: "#002c3e",
                          color: "white",
                          "&:hover": {
                            color: "#002c3e",
                            border: "1px solid #002c3e",
                          },
                        }}
                        type="submit"
                      >
                        Update Order
                      </Button>
                    </Box>
                  </Box>
                </Form>
              )}
            </Formik>
          </Box>
        </Box>
      </Menu>
    </Box>
  );
};

export default UpdateProduct;
