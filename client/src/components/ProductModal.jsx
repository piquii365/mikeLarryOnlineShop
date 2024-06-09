import { AddShoppingCart, Close, ShoppingCart } from "@mui/icons-material";
import {
  Box,
  IconButton,
  Modal,
  Typography,
  Paper,
  Rating,
  Button,
  Divider,
} from "@mui/material";
import { useState, Suspense, useEffect } from "react";
import { BASE_URL } from "../api/axios.js";
import { useNavigate } from "react-router-dom";
import { replace } from "formik";
const ProductModal = ({
  product,
  cartItems,
  open,
  handleClose,
  handleCart,
  handleClickCart,
}) => {
  const navigate = useNavigate();
  const [image, setImage] = useState();
  const [currentProduct, setCurrentProduct] = useState({
    name: "",
    price: 0,
    description: "",
    category: "",
    images: [],
    rating: 5,
    discount: 0,
    color: [],
  });
  useEffect(() => {
    setCurrentProduct({
      ...currentProduct,
      name: product?.name,
      price: product?.price,
      description: product?.description,
      category: product?.category,
      images: product?.images,
      discount: product?.discount,
      color: product?.color,
    });
    product?.images?.length > 0 ? setImage(product.images[0]) : null;
  }, [product]);
  const handleClick = (pic) => {
    setImage(pic);
  };
  return (
    <Box id="products">
      <Suspense fallback={<Typography>Loading...</Typography>}>
        <Modal open={open} onClose={handleClose}>
          <Box
            sx={{
              position: "absolute",
              width: { xs: "100%", sm: "100%", md: "60%", lg: "60%" },
              minHeight: "70dvh",
              display: { sm: "block", md: "flex" },
              top: { sm: 0, md: "5%" },
              left: { sm: 0, md: "8%" },
              border: "none",
              outline: "none",
              padding: { sm: "0.5em", md: "3em" },
              gap: "2em",
              overflowY: { sm: "scroll", md: "hidden" },
            }}
            component={Paper}
          >
            <IconButton
              sx={{ position: "absolute", top: 0, right: 0 }}
              onClick={handleClose}
            >
              <Close />
            </IconButton>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "2em",
                width: { sm: "100%", md: "55%" },
                height: "inherit",
              }}
            >
              <Box sx={{ width: "100%", height: "50dvh" }}>
                <img
                  width={"100%"}
                  height={"100%"}
                  src={`${BASE_URL}/products/${image}`}
                  alt="Picture"
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  gap: "1em",
                  overflowX: "auto",
                  maxWidth: "inherit",
                }}
              >
                {currentProduct?.images?.map((image, index) => (
                  <Button
                    onClick={() => handleClick(image)}
                    sx={{ width: "22%", backgroundColor: "#f0f0f0" }}
                    key={index}
                  >
                    <img
                      loading="lazy"
                      width={"100%"}
                      src={`${BASE_URL}/products/${image}`}
                    />
                  </Button>
                ))}
              </Box>
            </Box>
            <Box
              sx={{
                maxWidth: "55",
                maxHeight: "inherit",
                overflowY: "auto",
              }}
            >
              <Typography
                sx={{
                  fontWeight: "bolder",
                }}
                variant="h4"
              >
                {currentProduct.name}
              </Typography>
              <Typography sx={{ alignItems: "center", display: "flex" }}>
                <Rating defaultValue={currentProduct?.rating} readOnly />
                (58 reviews)
              </Typography>

              {currentProduct.discount === 0 ? (
                <Typography
                  sx={{
                    fontWeight: "bolder",
                  }}
                  variant="h4"
                >
                  {currentProduct.price}
                </Typography>
              ) : (
                <Box sx={{ display: "flex", gap: "1em" }}>
                  <Typography
                    sx={{
                      fontWeight: "bolder",
                    }}
                    variant="h4"
                  >
                    ${currentProduct.discount}
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: "bolder",
                    }}
                    variant="h4"
                  >
                    <del>${currentProduct.price}</del>
                  </Typography>
                </Box>
              )}
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: "0.5em" }}
              >
                <Typography
                  sx={{ fontSize: 20, fontWeight: "bolder" }}
                  variant="h6"
                  paragraph
                >
                  Description
                </Typography>
                <Typography sx={{ width: "60%" }} variant="body1" paragraph>
                  {currentProduct.description}
                </Typography>
              </Box>
              <Box>
                <Typography
                  sx={{ fontSize: 20, fontWeight: "bolder" }}
                  variant="body1"
                  paragraph
                >
                  Variant
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    gap: "0.5em",
                    maxWidth: "inherit",
                    overflowX: "auto",
                  }}
                >
                  {currentProduct.color?.map((color, index) => (
                    <Typography
                      sx={{
                        fontSize: 20,
                        fontWeight: "bolder",
                        backgroundColor: "#f0f0f0",
                        padding: "0.5em 2em",
                        borderRadius: "5px",
                      }}
                      key={index}
                      variant="body2"
                      paragraph
                    >
                      {color}
                    </Typography>
                  ))}
                </Box>
                <Divider />
                <Box sx={{ display: "flex", marginTop: "1em", gap: "1em" }}>
                  <Button
                    onClick={() =>
                      navigate(
                        "/payment",
                        { state: { product: product, cart: cartItems } },
                        replace
                      )
                    }
                    sx={{
                      backgroundColor: "#002c3e",
                      color: "white",
                      padding: "0.8em 1em",
                      "&:hover": {
                        color: "#002c3e",
                        border: "1px solid #002c3e",
                      },
                    }}
                  >
                    Buy Now
                  </Button>
                  <Button
                    onClick={() => handleCart("ADD", product)}
                    sx={{
                      backgroundColor: "#f0f0f0",
                      color: "gray",
                      padding: "0.8em 1em",
                    }}
                    startIcon={<AddShoppingCart />}
                  >
                    Add To Cart
                  </Button>
                  <Button
                    onClick={handleClickCart}
                    sx={{
                      backgroundColor: "#f0f0f0",
                      color: "gray",
                      padding: "0.8em 1em",
                    }}
                    startIcon={<ShoppingCart />}
                  >
                    View Cart
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Modal>
      </Suspense>
    </Box>
  );
};

export default ProductModal;
