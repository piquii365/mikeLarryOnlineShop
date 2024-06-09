import { useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import {
  Box,
  Typography,
  Rating,
  ButtonGroup,
  Button,
  IconButton,
  Divider,
  TextField,
  Paper,
} from "@mui/material";
import { axiosPrivate, BASE_URL } from "../api/axios.js";
import { Add, Remove } from "@mui/icons-material";
const PayNow = () => {
  const run = useRef(false);
  const [cart, setCart] = useState([]);
  const { state } = useLocation();
  const [product, setProduct] = useState({
    name: "",
    price: 0,
    image: "",
    description: "",
    category: "",
    images: [],
    quantity: 1,
    discount: 0,
  });
  const [currentPrice, setCurrentPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState();
  const [quantity, setQuantity] = useState(0);
  const [email, setEmail] = useState("");
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
    setCurrentPrice(
      state.product.discount !== 0
        ? state.product.discount
        : state.product.price
    );
    setTotalPrice(currentPrice);
  }, []);

  const handleQuantity = (action) => {
    if (action === "ADD") {
      setQuantity((prev) => prev + 1);
    } else if (action === "SUB") {
      setQuantity((prev) => prev - 1);
    }
    setTotalPrice(currentPrice * quantity);
  };
  const handlePurchase = (event) => {
    event.preventDefault();
    console.log(product);
    const values = {
      item: product.name,
      quantity: quantity,
      price: product.discount === 0 ? product.price : product.discount,
    };
    axiosPrivate
      .post(`/${email}/payment`, values)
      .then((result) => {
        if (result.data.success) {
          console.log(result.data);
        }
      })
      .catch((error) => console.log(error));
  };
  return (
    <Box sx={{ width: "inherit", minHeight: "90dvh", padding: "0.5em" }}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography
          variant={"h4"}
          sx={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: "bolder",
            color: "#002c3e",
          }}
        >
          Purchase Single Product
        </Typography>
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
              <Rating defaultValue={5} readOnly />
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
                  <Typography
                    variant={"h6"}
                    sx={{
                      fontWeight: "bolder",
                    }}
                  >
                    Total Price:{totalPrice}
                  </Typography>
                </Box>
                <Divider />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "0.5em",
                    gap: "1em",
                  }}
                >
                  <form>
                    <TextField id="variant" label="Color" size="small" />
                  </form>
                  <ButtonGroup>
                    <IconButton onClick={() => handleQuantity("ADD")}>
                      <Add />
                    </IconButton>
                    <IconButton onClick={() => handleQuantity("SUB")}>
                      <Remove />
                    </IconButton>
                  </ButtonGroup>
                </Box>
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
                <form>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "1em",
                    }}
                  >
                    <TextField
                      id="email"
                      type="email"
                      label="Email"
                      size="small"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <Button
                      onClick={handlePurchase}
                      variant="contained"
                      type="submit"
                      size="small"
                    >
                      Pay
                    </Button>
                  </Box>
                </form>
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default PayNow;
