import {
  Box,
  FormControl,
  TextField,
  styled,
  Button,
  Autocomplete,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Formik, Form } from "formik";
import { axiosMediaPrivate } from "../../api/axios.js";
const FormContainer = styled(FormControl)({
  width: "100%",
  display: "flex",
  flexDirection: "row",
  gap: "0.5em",
  margin: "1em 0",
});
const AddProduct = () => {
  const [result, setResult] = useState("");
  const [error, setError] = useState(false);
  const categories = ["Boys", "Girls", "Unisex", "Toys", "Electric"];
  const color = ["Black", "Red", "Gold", "Blue", "Brown"];
  const initialValues = {
    name: "",
    category: [],
    color: [],
    price: 10.0,
    description: "",
    discount: 0,
    images: [],
  };
  const handleSubmit = async (values, { resetForm }) => {
    const data = new FormData();
    values.images.map((image) => {
      data.append("images", image);
    });
    values.category.map((cat) => {
      data.append("category", cat);
    });
    values.color.map((col) => {
      data.append("color", col);
    });
    data.append("name", values.name);
    data.append("description", values.description);
    data.append("price", values.price);
    data.append("discount", values.discount);
    await axiosMediaPrivate
      .post("/products/new-product", data)
      .then((result) => {
        if (result.data.status) {
          setError(false);
          setResult("New Product Successfully Added!");
          resetForm();
        } else {
          setError(true);
          setResult(
            "Sorry to notify you that we have encountered an Internal Server error"
          );
        }
      })
      .catch((error) => {
        setError(true);
        setResult("Error while processing your request");
      });
  };
  return (
    <Box
      component={"main"}
      sx={{
        minWidth: "98dvw",
        minHeight: "100dvh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        component="section"
        sx={{
          width: { xs: "100%", md: "75%" },
          display: "flex",
          flexDirection: "column",
          gap: "1em",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bolder" }}>
          Welcome
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: "bolder" }}>
          Add New Products
        </Typography>
        {result && (
          <Typography
            variant="body1"
            color={error ? "red" : "green"}
            sx={{ fontWeight: "bolder" }}
          >
            {result}
          </Typography>
        )}
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ handleChange, handleBlur, handleSubmit, setFieldValue }) => (
            <Form onSubmit={handleSubmit}>
              <FormContainer>
                <TextField
                  id="name"
                  label="Name"
                  fullWidth
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <Autocomplete
                  fullWidth
                  id="category"
                  required
                  multiple
                  autoHighlight
                  autoSelect
                  freeSolo
                  disableClearable
                  options={categories.map((option) => option)}
                  renderInput={(params) => (
                    <TextField {...params} label="Categories" />
                  )}
                  onChange={(event, newValue) => {
                    if (typeof newValue === "string") {
                      setFieldValue("category", newValue);
                    } else if (newValue && newValue.event) {
                      setFieldValue("category", newValue.event);
                    } else {
                      setFieldValue("category", newValue);
                    }
                  }}
                />
              </FormContainer>
              <FormContainer>
                <TextField
                  id="description"
                  label="Description"
                  required
                  multiline
                  rows={4}
                  fullWidth
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </FormContainer>
              <FormContainer>
                <TextField
                  id="price"
                  label="Price"
                  type="number"
                  required
                  inputProps={{
                    step: 0.01,
                    min: 0,
                  }}
                  fullWidth
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <TextField
                  id="discount"
                  label="Discounted Price"
                  type="number"
                  defaultValue={0}
                  inputProps={{
                    step: 0.01,
                    min: 0,
                  }}
                  fullWidth
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </FormContainer>
              <FormContainer>
                <TextField
                  id="images"
                  label="Images"
                  type="file"
                  inputProps={{ multiple: true, autoFocus: true, max: 5 }}
                  onChange={(e) =>
                    setFieldValue("images", Array.from(e.target.files))
                  }
                  fullWidth
                />
                <Autocomplete
                  fullWidth
                  id="color"
                  multiple
                  autoHighlight
                  autoSelect
                  required
                  freeSolo
                  disableClearable
                  options={color.map((option) => option)}
                  renderInput={(params) => (
                    <TextField {...params} label="Color" />
                  )}
                  onChange={(event, newValue) => {
                    if (typeof newValue === "string") {
                      setFieldValue("color", newValue);
                    } else if (newValue && newValue.event) {
                      setFieldValue("color", newValue.event);
                    } else {
                      setFieldValue("color", newValue);
                    }
                  }}
                />
              </FormContainer>
              <FormContainer>
                <Button
                  type="submit"
                  sx={{
                    bgcolor: "#002c3e",
                    color: "white",
                    fontWeight: "bolder",
                    "&:hover": { color: "#002c3e" },
                  }}
                  fullWidth
                >
                  Save Product
                </Button>
                <Button>Cancel</Button>
              </FormContainer>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default AddProduct;
