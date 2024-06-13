import {
  Box,
  ButtonGroup,
  Divider,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import {
  Menu,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Button,
} from "@mui/material";
import { ShoppingCart, Remove, Add, Delete } from "@mui/icons-material";
import axios, { BASE_URL } from "../api/axios.js";
import { useState } from "react";
const MyCart = ({ enchor, open, handleHide, cartItems, handleCart }) => {
  const totalPrice = cartItems.reduce(
    (price, item) =>
      price +
      item.quantity * (item.discount === 0 ? item.price : item.discount),
    0
  );
  const [values, setValues] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    address: "",
  });
  const handlePayment = (event) => {
    event.preventDefault();
    const finalValues = {
      cartItems: cartItems,
      customerInfo: values,
    };
    axios
      .post(`/multiple/payment/multi-order`, finalValues)
      .then((result) => {
        if (result.data.success) {
          location.assign(result.data.redirectUrl);
        } else {
          console.log(result.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <Menu anchorEl={enchor} open={open} onClose={handleHide}>
        <Box
          sx={{
            boxSizing: "border-box",
            width: "50vmax",
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
              width: "100%",
              marginRight: "1em",
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
                  marginRight: "5em",
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
                <Table
                  sx={{
                    display: {
                      xs: "none",
                      sm: "none",
                      md: "block",
                      lg: "block",
                    },
                    width: "inherit",
                  }}
                  size="small"
                  stickyHeader
                >
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
                  sx={{
                    display: {
                      xs: "block",
                      sm: "block",
                      md: "none",
                      lg: "none",
                    },
                    width: "inherit",
                    boxSizing: "border-box",
                  }}
                >
                  {cartItems?.map((item, index) => (
                    <Box key={index}>
                      <Typography
                        variant="h5"
                        sx={{ fontWeight: "bolder" }}
                        paragraph
                      >
                        {item?.name}
                      </Typography>
                      <img
                        style={{ width: "80%" }}
                        src={`${BASE_URL}/products/${item.images[0]}`}
                      />
                      <Box>
                        <Typography
                          variant="h5"
                          sx={{ fontWeight: "bolder" }}
                          paragraph
                        >
                          Price: ${item.price}
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            width: "80%",
                          }}
                        >
                          <Typography
                            variant="h6"
                            sx={{ fontWeight: "bolder" }}
                          >
                            Quantity: {item.quantity}
                          </Typography>
                          <ButtonGroup sx={{ fontWeight: "bolder" }}>
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
                          </ButtonGroup>
                        </Box>
                      </Box>
                      <Divider />
                    </Box>
                  ))}
                </Box>
                <Box
                  component={Paper}
                  sx={{
                    display: { sm: "block", md: "flex" },
                    my: "1em",
                    justifyContent: "center",
                    alignItems: "center",
                    width: {
                      xs: "80%",
                      sm: "80%",
                      md: "inherit",
                      lg: "inherit",
                    },
                    gap: "1em",
                    py: "2em",
                    boxShadow: { xs: "none", sm: "none" },
                    flexDirection: "column",
                  }}
                >
                  <Box sx={{ width: "inherit" }}>
                    <Typography
                      variant="h5"
                      sx={{ fontWeight: "bolder", marginBottom: "1em" }}
                      paragraph
                    >
                      Total Price: ${Math.round(totalPrice)}
                    </Typography>
                    <Button
                      fullWidth
                      onClick={() => handleCart("CLEAR", "")}
                      sx={{
                        backgroundColor: "#f0f0f0",
                        padding: "0.5em 2em",
                        marginTop: { xs: "2em", sm: "2em" },
                        marginBottom: "1em",
                      }}
                    >
                      Clear Cart
                    </Button>
                  </Box>

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
                        placeholder="Enter email to pay"
                        type="email"
                        id="email"
                        size="small"
                        helperText="Note that you do not need to be a paynow customer to pay"
                        required
                      />
                      <TextField
                        onChange={(e) =>
                          setValues({ ...values, email: e.target.value })
                        }
                        placeholder="Enter Full Name"
                        type="text"
                        id="fullName"
                        size="small"
                        helperText="Note that your full name is required for delivery"
                        required
                      />
                      <TextField
                        onChange={(e) =>
                          setValues({ ...values, phoneNumber: e.target.value })
                        }
                        placeholder="Enter phone number"
                        id="phoneNumber"
                        size="small"
                        helperText="please provide your phone number as 0779898809 or +263780380209"
                        required
                      />
                      <TextField
                        onChange={(e) =>
                          setValues({ ...values, address: e.target.value })
                        }
                        placeholder="Provide Physical Address"
                        id="address"
                        size="small"
                        helperText="Please provide physical address, note that this is important for deliveries"
                        required
                      />
                      <img src="/images/paynow.PNG" />
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
                        Buy Now
                      </Button>
                    </Box>
                  </form>
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
