import { useCallback, useEffect, useState, Suspense } from "react";
import axios, { BASE_URL } from "../../api/axios";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";

const Products = () => {
  const [products, setProducts] = useState([]);
  const fetchProducts = useCallback(async () => {
    try {
      const response = await axios.get("/products/all-products");
      if (response) {
        setProducts(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  return (
    <Box>
      <Suspense fallback={<Typography>Loading...</Typography>}>
        {products?.length === 0 ? (
          <Box>
            <Typography>You have not added any products yet </Typography>
            <Button>Add Products</Button>
          </Box>
        ) : (
          <Box
            sx={{
              width: "100%",
              height: "inherit",
              display: "flex",
              flexDirection: { xs: "column", sm: "column", md: "row" },
              alignItems: "center",
              justifyContent: "center",
              gap: "4em",
              marginBottom: "2em",
            }}
          >
            {products?.map((product, index) => (
              <Card
                sx={{
                  width: {
                    xs: "90%",
                    sm: "90%",
                    md: "20dvw",
                    minHeight: "40dvh",
                  },
                  color: "black",
                }}
                key={index}
              >
                <Box>
                  <img
                    style={{ height: "38dvh", width: "100%" }}
                    src={`${BASE_URL}/products/${product?.images[0]}`}
                    alt={product?.name}
                  />
                </Box>
                <CardContent>
                  <Typography
                    sx={{ fontWeight: "bolder" }}
                    gutterBottom
                    variant="h5"
                    component="div"
                  >
                    {product?.name}
                  </Typography>
                  <Typography
                    sx={{ fontWeight: "bolder" }}
                    gutterBottom
                    variant="h5"
                    component="div"
                  >
                    $
                    {product?.discount === 0 ? product.price : product.discount}
                  </Typography>
                  <pre>
                    <Typography variant="body2" paragraph>
                      {product?.description}
                    </Typography>
                  </pre>
                </CardContent>
                <CardActions>
                  <Button>Edit</Button>
                  <Button>Delete</Button>
                </CardActions>
              </Card>
            ))}
          </Box>
        )}
      </Suspense>
    </Box>
  );
};

export default Products;
