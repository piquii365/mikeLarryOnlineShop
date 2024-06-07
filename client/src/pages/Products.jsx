import { Clear, Search } from "@mui/icons-material";
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
} from "@mui/material";
import axios, { BASE_URL } from "../api/axios.js";
import ProductModal from "../components/ProductModal";
import { useState, useEffect, useCallback, Suspense } from "react";
const NavButton = styled(Button)({
  color: "white",
  fontWeight: "bolder",
  margin: "0.2em",
});
const Product = styled(Card)({
  flex: 1,
  height: "40dvh",
  display: "flex",
  flexDirection: "column",
  border: "1px solid #002c3e",
  borderRadius: "10px",
  padding: "0.5em",
  maxWidth: "18dvw",
  cursor: "pointer",
});
const Products = () => {
  const [products, setProducts] = useState();
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
  const [search, setSearch] = useState("");
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
        direction="row"
        sx={{
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
        <Box>
          <NavButton onClick={() => setSearch("boys")}>For Boys</NavButton>
          <NavButton onClick={() => setSearch("girls")}>For Girls</NavButton>
          <NavButton onClick={() => setSearch("uni sex")}>Uni-Sex</NavButton>
        </Box>
        <Box>
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
                  width: "30em",
                  border: "none",
                  borderRadius: "10px",
                }}
                placeholder="Search products here"
              />
            </Box>
          </form>
        </Box>
      </Stack>
      <Suspense fallback={<Typography>Loading....</Typography>}>
        <Box sx={{ padding: "1em 0", display: "flex", gap: "1em" }}>
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
          product={selectedProduct}
          open={open}
          handleClose={handleClose}
        />
      </Suspense>
    </Box>
  );
};

export default Products;
