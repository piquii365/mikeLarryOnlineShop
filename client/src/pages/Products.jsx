import {
  Clear,
  Search,
  AddShoppingCart,
  ShoppingCart,
} from "@mui/icons-material";
import {
  Box,
  Button,
  TextField,
  Stack,
  styled,
  InputAdornment,
  Typography,
  Card,
  CardMedia,
  Rating,
  CardContent,
  IconButton,
  Tooltip,
  Badge,
} from "@mui/material";

import axios, { BASE_URL } from "../api/axios.js";
import ProductModal from "../components/ProductModal";
import { useState, useEffect, useCallback, Suspense } from "react";
import MyCart from "../components/MyCart";
const NavButton = styled(Button)({
  color: "white",
  fontWeight: "bolder",
  margin: "0.2em",
});
const Product = styled(Card)({
  flex: 1,
  position: "relative",
  height: "40dvh",
  display: "flex",
  flexDirection: "column",
  border: "1px solid #002c3e",
  borderRadius: "10px",
  padding: "0.5em",
  maxWidth: "18dvw",
  cursor: "pointer",
  margin: "10px",
});
const Products = () => {
  //initializing products
  const [products, setProducts] = useState();
  //fetching products
  const fetchProducts = useCallback(() => {
    axios
      .get("/products/all-products")
      .then((result) => {
        setProducts(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  //view single product details
  const [selectedProduct, setSelectedProduct] = useState({});
  const [open, setOpen] = useState(false);
  const handleOpen = (product) => {
    setSelectedProduct(product);
    setOpen(true);
  };
  const handleClose = () => {
    setSelectedProduct(null);
    setOpen(false);
  };
  //searching products
  const [search, setSearch] = useState("");
  //cart
  const [anchorE2, setAnchorE2] = useState(null);
  const showCart = Boolean(anchorE2);
  const handleClickCart = (event) => {
    setAnchorE2(event.currentTarget);
  };
  const handleHideCart = () => {
    setAnchorE2(null);
  };
  //cart manipulation
  //adding to cart
  const [cartItems, setCartItems] = useState([]);
  const handleAddToCart = (action, product) => {
    const productExists = cartItems.find((item) => item._id === product._id);
    if (action === "ADD") {
      if (productExists) {
        setCartItems(
          cartItems.map((item) =>
            item._id === product._id
              ? { ...productExists, quantity: productExists.quantity + 1 }
              : item
          )
        );
      } else {
        setCartItems([...cartItems, { ...product, quantity: 1 }]);
      }
    } else if (action === "REMOVE") {
      if (productExists.quantity === 1) {
        setCartItems(
          cartItems.filter((item) => {
            return item._id !== product._id;
          })
        );
      } else {
        setCartItems(
          cartItems.map((item) =>
            item._id === product._id
              ? { ...productExists, quantity: productExists.quantity - 1 }
              : item
          )
        );
      }
    } else if (action === "DELETE") {
      setCartItems(
        cartItems.filter((item) => {
          return item._id !== product._id;
        })
      );
    } else if (action === "CLEAR") {
      setCartItems([]);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100dvh",
        width: "98dvw",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Stack
        sx={{
          flexDirection: { xs: "column", sm: "column", md: "row", lg: "row" },
          backgroundColor: "#002c3e",
          color: "white",
          display: "flex",
          padding: "0.5em",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography sx={{ fontWeight: "bolder", fontSize: "large" }}>
          PRODUCTS
        </Typography>
        <Box sx={{ width: "inherit" }}>
          <NavButton onClick={() => setSearch("boys")}>For Boys</NavButton>
          <NavButton onClick={() => setSearch("girls")}>For Girls</NavButton>
          <NavButton onClick={() => setSearch("uni sex")}>Uni-Sex</NavButton>
        </Box>
        <Box sx={{ width: "inherit", display: "flex" }}>
          <form>
            <Box sx={{ display: "flex" }}>
              <TextField
                id="search"
                onChange={(e) => setSearch(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <IconButton
                      sx={{ visibility: search ? "visible" : "hidden" }}
                      onClick={() => setSearch("")}
                    >
                      <Clear />
                    </IconButton>
                  ),
                }}
                size="small"
                sx={{
                  backgroundColor: "white",
                  width: { xs: "100%", sm: "100%", md: "30em", lg: "30em" },
                  border: "none",
                  borderRadius: "10px",
                }}
                placeholder="Search products here"
              />
            </Box>
          </form>
          <Tooltip title="cart">
            <Badge badgeContent={cartItems && cartItems.length} color="red">
              <IconButton onClick={handleClickCart} sx={{ color: "white" }}>
                <ShoppingCart />
              </IconButton>
            </Badge>
          </Tooltip>
          <MyCart
            handleAddToCart={handleAddToCart}
            cartItems={cartItems}
            enchor={anchorE2}
            open={showCart}
            handleHide={handleHideCart}
          />
        </Box>
      </Stack>
      <Suspense fallback={<Typography>Loading....</Typography>}>
        <Box
          sx={{
            padding: "1em 0",
            display: { xs: "block", sm: "block", md: "flex" },
            gap: "1em",
          }}
        >
          {products
            ?.filter((item) => {
              return item.name.toLowerCase() === ""
                ? item
                : item.name.toLowerCase().includes(search);
            })
            .map((product, index) => (
              <Product
                key={index}
                onClick={() => {
                  handleOpen(product);
                }}
              >
                <Tooltip title="Add to cart">
                  <IconButton
                    onClick={() => handleAddToCart("ADD", product)}
                    sx={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      color: "red",
                    }}
                  >
                    <AddShoppingCart />
                  </IconButton>
                </Tooltip>
                <CardMedia
                  image={`${BASE_URL}/products/${product.images[0]}`}
                  alt="HoverBoard"
                  sx={{ width: "inherit", height: "100%" }}
                />
                <CardContent>
                  <Rating defaultValue={product?.rating} readOnly />
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      width: "inherit",
                      height: "1em",
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: "bolder",
                        color: "black",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: "1",
                        WebkitBoxOrient: "vertical",
                      }}
                      variant="h6"
                    >
                      {product?.name}
                    </Typography>
                    <Typography
                      sx={{ fontWeight: "bolder", color: "black" }}
                      variant="h6"
                    >
                      $
                      {product?.discount !== 0
                        ? product?.discount
                        : product?.price}
                    </Typography>
                  </Box>
                </CardContent>
              </Product>
            ))}
        </Box>
        <ProductModal
          handleAddToCart={handleAddToCart}
          product={selectedProduct}
          open={open}
          handleClose={handleClose}
        />
      </Suspense>
    </Box>
  );
};

export default Products;
