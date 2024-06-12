import {
  styled,
  Card,
  CardMedia,
  Typography,
  Box,
  Divider,
  CardContent,
  Rating,
  Button,
  Alert,
} from "@mui/material";
import ProductModal from "./ProductModal.jsx";
const Product = styled(Card)({
  minHeight: "45vmin",
  width: "76vmin",
  display: "flex",
  flexDirection: "column",
  boxShadow: "none",
  border: "1px solid #002c3e",
  borderRadius: "10px",
  padding: "0.5em",
  marginBottom: 15,
});
const Products = styled(Box)({
  minHeight: "70vmin",
  minWidth: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "1.5em",
});
import axios, { BASE_URL } from "../api/axios.js";
import { useState, useCallback, useEffect, Suspense, useRef } from "react";
import { ShoppingCart } from "@mui/icons-material";
import MyCart from "./MyCart.jsx";
const HomeProducts = () => {
  const firstRun = useRef(true);
  //fetching products
  const [products, setProducts] = useState([]);
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
  //single product view
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
  // cart manipulation
  //show and hide cart
  const [anchorE2, setAnchorE2] = useState(null);
  const showCart = Boolean(anchorE2);
  const handleClickCart = (event) => {
    setAnchorE2(event.currentTarget);
  };
  const handleHideCart = () => {
    setAnchorE2(null);
  };
  const [cartItems, setCartItems] = useState([]);
  //saving to local storage
  useEffect(() => {
    try {
      const storedItems = localStorage.getItem("CartItems");
      storedItems && setCartItems(JSON.parse(storedItems));
    } catch (error) {
      console.error(error);
    }
  }, []);
  useEffect(() => {
    try {
      if (!firstRun.current) {
        localStorage.setItem("CartItems", JSON.stringify(cartItems));
      }
      firstRun.current = false;
    } catch (error) {
      console.error(error);
    }
  }, [cartItems]);
  const handleCart = (action, product) => {
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
      return <Alert severity="success">Item successfully added to cart</Alert>;
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
    <>
      {products ? (
        <Products id="products">
          <Typography
            variant="h4"
            sx={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: "bolder",
              fontSize: { sm: 10, md: 55 },
            }}
          >
            Products
          </Typography>
          <Divider color="black" />
          <Suspense fallback={<Typography>Loading....</Typography>}>
            <Box
              sx={{
                width: { sm: "100%", md: "80%" },
                display: "flex",
                flexDirection: { xs: "column", sm: "column", md: "row" },
                gap: { sm: "0.5em", md: "7em" },
              }}
            >
              {products?.map((product, index) => (
                <Product
                  key={index}
                  onClick={() => {
                    handleOpen(product);
                  }}
                  sx={{ cursor: "pointer" }}
                >
                  <CardMedia
                    image={`${BASE_URL}/products/${product?.images[0]}`}
                    alt={product?.name}
                    sx={{
                      minWidth: { sm: "90%", md: "inherit" },
                      height: { xs: "30dvh", sm: "10dvh", md: "100%" },
                    }}
                  />
                  <CardContent>
                    <Rating defaultValue={5} readOnly />
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: "inherit",
                      }}
                    >
                      <Typography
                        sx={{ fontWeight: "bolder", color: "black" }}
                        variant="h6"
                      >
                        {product.name}
                      </Typography>
                      <Typography
                        sx={{ fontWeight: "bolder", color: "black" }}
                        variant="h6"
                      >
                        ${product.price}
                      </Typography>
                    </Box>
                  </CardContent>
                </Product>
              ))}
            </Box>
          </Suspense>
          <Button
            onClick={handleClickCart}
            sx={{
              backgroundColor: "#002c3e",
              margin: "1em 0",
              padding: "0.6em 2em",
              color: "white",
              "&:hover": { color: "#002c3e", border: "#002c3e" },
            }}
            startIcon={<ShoppingCart />}
          >
            View Cart
          </Button>
          <MyCart
            handleCart={handleCart}
            cartItems={cartItems}
            enchor={anchorE2}
            open={showCart}
            handleHide={handleHideCart}
          />
        </Products>
      ) : (
        <Typography>No products to display</Typography>
      )}
      <ProductModal
        cartItems={cartItems}
        handleClickCart={handleClickCart}
        handleCart={handleCart}
        product={selectedProduct}
        open={open}
        handleClose={handleClose}
      />
    </>
  );
};
export default HomeProducts;
