import {
  Menu,
  Box,
  FormControl,
  TextField,
  Autocomplete,
  Typography,
  Button,
} from "@mui/material";
import { Formik, Form } from "formik";
import { useState } from "react";
import axios from "../../api/axios";
const UpdateSingleOrder = ({ order, anchorEl, open, handleClose }) => {
  const initialValues = {
    paymentStatus: order.paymentStatus,
    orderStatus: order.orderStatus,
  };
  const [err, setErr] = useState("");
  const handleUpdateOrder = (values) => {
    const id = order._id;
    console.log(id);
    axios
      .put(`/orders/single/update/${id}`, values)
      .then((result) => {
        if (result.data.status) {
          setErr("Order Successfully Updated");
        } else {
          setErr("Internal Server Error");
        }
      })
      .catch((error) => {
        setErr(
          "Error While processing your request check the console for more info"
        );
        console.error(error);
      });
  };
  return (
    <>
      <Box sx={{ boxSizing: "border-box", margin: 0, padding: 0 }}>
        <Menu open={open} anchorEl={anchorEl} onClose={handleClose}>
          <Box sx={{ top: 0, left: 10, padding: "2em" }}>
            {err && <Typography color="red">{err}</Typography>}
            <Typography>Edit This Order</Typography>
            <Box>
              <Formik
                initialValues={initialValues}
                onSubmit={handleUpdateOrder}
              >
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
    </>
  );
};

export default UpdateSingleOrder;
