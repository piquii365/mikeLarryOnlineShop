import { Box, Paper, TextField, Typography } from "@mui/material";
import {
  Menu,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Button,
  Collapse,
} from "@mui/material";
import { ShoppingCart, Remove, Add, Delete } from "@mui/icons-material";
import { BASE_URL, axiosPrivate } from "../api/axios.js";
import { useState } from "react";
const MyCart = ({ enchor, open, handleHide, cartItems, handleCart }) => {
  const totalPrice = cartItems.reduce(
    (price, item) =>
      price +
      item.quantity * (item.discount === 0 ? item.price : item.discount),
    0
  );
  const [values, setValues] = useState({ email: "", phoneNumber: "" });
  const handlePayment = (event) => {
    event.preventDefault();
    axiosPrivate
      .post(`/${values.email}/multiple/payment`, cartItems)
      .then((result) => {
        if (result.data.success) {
          location.assign(result.data.redirectUrl);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleEcocashPayment = (event) => {
    event.preventDefault();
    if (values.phoneNumber) {
      axiosPrivate
        .post(`/${values.email}/${values.phoneNumber}/payment`, cartItems)
        .then((result) => {
          if (result.data.success) {
            location.assign(result.data.redirectUrl);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };
  const [ecocash, setEcocash] = useState(false);
  const handleOpen = () => {
    setEcocash(!ecocash);
  };

  return (
    <>
      <Menu anchorEl={enchor} open={open} onClose={handleHide}>
        <Box
          sx={{
            width: "70dvw",
            minHeight: "80dvh",
            display: "flex",
            flexDirection: "column",
            padding: "0.5em",
          }}
        >
          <Box
            sx={{
              backgroundColor: "#002c3e",
              height: "8dvh",
              width: "69dvw",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0.5em",
            }}
          >
            <Typography
              variant={"h5"}
              sx={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: "bolder",
                color: "white",
              }}
            >
              MY CART
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: "0.5em" }}>
              <ShoppingCart sx={{ color: "white" }} />
              <Typography
                variant={"h5"}
                sx={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: "bolder",
                  color: "white",
                }}
              >
                {cartItems && cartItems.length}
              </Typography>
            </Box>
          </Box>
          <Box>
            {cartItems?.length === 0 ? (
              <Typography>No items added to cart yet</Typography>
            ) : (
              <Box>
                <Table size="small" stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell component={"th"}>No</TableCell>
                      <TableCell component={"th"}>Image</TableCell>
                      <TableCell component={"th"}>Name</TableCell>
                      <TableCell component={"th"}>Price</TableCell>
                      <TableCell component={"th"}>Discount Price</TableCell>
                      <TableCell component={"th"}>Quantity</TableCell>
                      <TableCell component={"th"}>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {cartItems?.map((item, index) => (
                      <TableRow key={index} sx={{ alignItems: "center" }}>
                        <TableCell component={"td"}>{index + 1}</TableCell>
                        <TableCell sx={{ width: "5dvw" }} component={"td"}>
                          <img
                            style={{ borderRadius: "50%" }}
                            width={"100%"}
                            height={"inherit"}
                            loading="lazy"
                            src={`${BASE_URL}/products/${item.images[0]}`}
                            alt={"Produce"}
                          />
                        </TableCell>
                        <TableCell component={"td"}>{item.name}</TableCell>
                        <TableCell component={"td"}>${item.price}</TableCell>
                        <TableCell component={"td"}>${item.discount}</TableCell>
                        <TableCell component={"td"}>{item.quantity}</TableCell>
                        <TableCell
                          component={"td"}
                          sx={{
                            display: "flex",
                            gap: "0.5em",
                            minHeight: "11dvh",
                            backgroundColor: "#f0f0f0",
                          }}
                        >
                          <IconButton
                            onClick={() => handleCart("REMOVE", item)}
                          >
                            <Remove />
                          </IconButton>
                          <IconButton onClick={() => handleCart("ADD", item)}>
                            <Add />
                          </IconButton>
                          <IconButton
                            onClick={() => handleCart("DELETE", item)}
                            sx={{ color: "red" }}
                          >
                            <Delete />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <Box
                  component={Paper}
                  sx={{
                    display: { sm: "block", md: "flex" },
                    my: "1em",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "inherit",
                    gap: "1em",
                    py: "2em",
                  }}
                >
                  <Typography>Total Price: ${totalPrice}</Typography>
                  <form onSubmit={handlePayment}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "1em",
                      }}
                    >
                      <TextField
                        onChange={(e) =>
                          setValues({ ...values, email: e.target.value })
                        }
                        type="email"
                        id="email"
                        label="Email"
                        size="small"
                        required
                      />
                      <Button onClick={handleOpen}>Use Ecocash</Button>
                      <Collapse in={ecocash} timeout="auto" unmountOnExit>
                        <Box>
                          <TextField
                            onChange={(e) =>
                              setValues({
                                ...values,
                                phoneNumber: e.target.value,
                              })
                            }
                            id="phoneNumber"
                            label="Phone Number"
                            size="small"
                          />
                        </Box>
                      </Collapse>
                      <Button
                        type="submit"
                        sx={{
                          backgroundColor: "#002c3e",
                          color: "white",
                          padding: "0.5em 2em",
                          "&:hover": {
                            color: "#002c3e",
                            border: "1px solid #002c3e",
                          },
                        }}
                      >
                        Pay Now
                      </Button>
                      <Button
                        disabled
                        onClick={handleEcocashPayment}
                        type="submit"
                        sx={{
                          color: "#002c3e",
                          border: "1px solid #002c3e",
                          padding: "0.5em 2em",
                          "&:hover": {
                            color: "#002c3e",
                          },
                        }}
                      >
                        pay With Ecocash
                      </Button>
                    </Box>
                  </form>
                  <Button
                    onClick={() => handleCart("CLEAR", "")}
                    sx={{ backgroundColor: "#f0f0f0", padding: "0.5em 2em" }}
                  >
                    Clear Cart
                  </Button>
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </Menu>
    </>
  );
};

export default MyCart;
