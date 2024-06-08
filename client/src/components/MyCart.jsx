import { Box, Typography } from "@mui/material";
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
import { BASE_URL } from "../api/axios.js";
const MyCart = ({ enchor, open, handleHide, cartItems, handleAddToCart }) => {
  const totalPrice = cartItems.reduce(
    (price, item) =>
      price +
      item.quantity * (item.discount === 0 ? item.price : item.discount),
    0
  );
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
                            onClick={() => handleAddToCart("REMOVE", item)}
                          >
                            <Remove />
                          </IconButton>
                          <IconButton
                            onClick={() => handleAddToCart("ADD", item)}
                          >
                            <Add />
                          </IconButton>
                          <IconButton
                            onClick={() => handleAddToCart("DELETE", item)}
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
                    display: "flex",
                    my: "1em",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    width: "inherit",
                    gap: "1em",
                  }}
                >
                  <Typography>Total Price: ${totalPrice}</Typography>
                  <Button
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
                    onClick={() => handleAddToCart("CLEAR", "")}
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
