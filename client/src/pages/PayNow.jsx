import { useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { Formik, Form } from "formik";
import {
  Box,
  Typography,
  Rating,
  ButtonGroup,
  Button,
  IconButton,
  TextField,
  Paper,
  Autocomplete,
} from "@mui/material";

import { axiosPrivate, BASE_URL } from "../api/axios.js";
import { Add, Remove } from "@mui/icons-material";
import MyCart from "../components/MyCart.jsx";
const PayNow = () => {
  const run = useRef(false);
  const [cart, setCart] = useState([]);
  const { state } = useLocation();
  const [product, setProduct] = useState({
    name: "",
    price: 0,
    color: [],
    image: "",
    description: "",
    category: "",
    images: [],
    quantity: 1,
    discount: 0,
  });

  const [quantity, setQuantity] = useState(0);
  const initialValues = {
    email: "",
    color: [],
    address: "",
    phoneNumber: "",
  };
  //store product
  useEffect(() => {
    try {
      if (!run.current) {
        const storedProduct = localStorage.getItem("product");
        if (storedProduct) {
          setProduct(JSON.parse(storedProduct));
        }
      }
      run.current = true;
    } catch (error) {
      console.error(error);
    }
  }, []);
  useEffect(() => {
    try {
      if (!run.current) {
        localStorage.setItem("product", JSON.stringify(product));
      }
      run.current = true;
    } catch (error) {
      console.error(error);
    }
  }, []);
  useEffect(() => {
    state.product
      ? setProduct({
          ...product,
          name: state.product.name,
          color: state.product.color,
          price: state.product.price,
          image: state.product.images[0],
          description: state.product.description,
          category: state.product.category,
          images: state.product.images,
          discount: state.product.discount,
        })
      : null;
    state.cart ? setCart(state.cart) : null;
    setQuantity(1);
  }, []);

  const handleQuantity = (action) => {
    if (action === "ADD") {
      setQuantity((prev) => prev + 1);
    } else if (action === "SUB") {
      setQuantity((prev) => prev - 1);
    }
  };
  const handlePurchase = (values) => {
    const finalValues = {
      color: values.color,
      address: values.address,
      phoneNumber: values.phoneNumber,
      item: product.name,
      quantity: quantity,
      price: product.discount === 0 ? product.price : product.discount,
    };
    axiosPrivate
      .post(`/${values.email}/payment`, finalValues)
      .then((result) => {
        if (result.data.success) {
          location.assign(result.data.redirectUrl);
        }
      })
      .catch((error) => console.log(error));
  };
  //cart
  const [anchorE2, setAnchorE2] = useState(null);
  const showCart = Boolean(anchorE2);
  const handleClickCart = (event) => {
    setAnchorE2(event.currentTarget);
  };
  const handleHideCart = () => {
    setAnchorE2(null);
  };
  return (
    <Box sx={{ width: "inherit", minHeight: "90dvh", padding: "0.5em" }}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        {product == null ? (
          <Typography>Loading</Typography>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "column", md: "row" },
              gap: "1em",
            }}
          >
            <Box sx={{ width: { xs: "90%", sm: "90%", md: "30%", lg: "30%" } }}>
              <img
                loading="lazy"
                width="100%"
                src={`${BASE_URL}/products/${product?.image}`}
                alt={product.name}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5em",
                width: { xs: "80%", sm: "80%", md: "40%", lg: "40%" },
              }}
            >
              <Typography
                variant={"h4"}
                sx={{
                  fontWeight: "bolder",
                }}
              >
                {product.name}
              </Typography>
              <Box sx={{ display: "flex" }}>
                <Rating defaultValue={5} readOnly />
                <Typography>(58 Reviews)</Typography>
              </Box>

              <Typography
                variant={"h4"}
                sx={{
                  fontWeight: "bolder",
                }}
              >
                ${product.discount !== 0 ? product.discount : product.price}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "inherit",
                }}
              >
                <Typography
                  variant={"h6"}
                  sx={{
                    fontWeight: "bolder",
                  }}
                >
                  Description
                </Typography>
                <pre>
                  <Typography
                    sx={{
                      width: {
                        xs: "inherit",
                        sm: "inherit",
                        md: "80%",
                        lg: "80%",
                      },
                    }}
                    variant={"body2"}
                    paragraph
                  >
                    {product.description}
                  </Typography>
                </pre>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: { xs: "90%" },
                  flex: 1,
                }}
              >
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography
                    variant={"h6"}
                    sx={{
                      fontWeight: "bolder",
                    }}
                  >
                    Quantity:{quantity}
                  </Typography>
                  <ButtonGroup>
                    <IconButton
                      sx={{ color: "#002c3e" }}
                      onClick={() => handleQuantity("ADD")}
                    >
                      <Add />
                    </IconButton>
                    <IconButton
                      sx={{ color: "#002c3e" }}
                      disabled={quantity === 1 ? true : false}
                      onClick={() => handleQuantity("SUB")}
                    >
                      <Remove />
                    </IconButton>
                  </ButtonGroup>
                </Box>
                {cart ? (
                  <Box>
                    <Typography>
                      You have {cart.length} item in your cart
                    </Typography>
                    <Button fullWidth onClick={handleClickCart}>
                      View Cart
                    </Button>
                    <MyCart
                      cartItems={cart}
                      enchor={anchorE2}
                      open={showCart}
                      handleHide={handleHideCart}
                    />
                  </Box>
                ) : null}
              </Box>
            </Box>
            <Box
              component={Paper}
              sx={{
                width: { xs: "90%", sm: "90%", md: "30%", lg: "30%" },
                padding: "1em",
                height: "min-content",
              }}
            >
              <Typography>Payment Details</Typography>
              <Box>
                <Formik onSubmit={handlePurchase} initialValues={initialValues}>
                  {({
                    handleSubmit,
                    handleChange,
                    handleBlur,
                    setFieldValue,
                  }) => (
                    <Form onSubmit={handleSubmit}>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "1em",
                        }}
                      >
                        <Autocomplete
                          fullWidth
                          disablePortal
                          size="small"
                          id="color"
                          onBlur={handleBlur}
                          required
                          autoHighlight
                          autoSelect
                          freeSolo
                          disableClearable
                          onChange={(e, value) => setFieldValue("color", value)}
                          options={product.color}
                          renderInput={(params) => (
                            <TextField {...params} label="Color" />
                          )}
                        />
                        <TextField
                          id="email"
                          type="email"
                          label="Email"
                          size="small"
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                        <TextField
                          id="address"
                          label="Address"
                          size="small"
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                        <TextField
                          id="phoneNumber"
                          label="Phone Number"
                          size="small"
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                        <img src="/images/paynow.PNG" alt="Payment methods" />
                        <Button
                          sx={{
                            backgroundColor: "#002c3e",
                            color: "white",
                            fontWeight: "bolder",
                            "&:hover": { color: "#002c3e" },
                          }}
                          variant="contained"
                          type="submit"
                          size="small"
                        >
                          Buy Now
                        </Button>
                      </Box>
                    </Form>
                  )}
                </Formik>
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default PayNow;
