import { Button, TextField, Typography, Box, Card, Link } from "@mui/material";
import { Formik, Form } from "formik";
import { LoginValidationSchema } from "../middleware/LoginValidationSchema.js";
import axios from "../api/axios.js";
import { useState } from "react";
//import { useNavigate } from "react-router-dom";

const Login = () => {
  const [error, setError] = useState("");
  //const navigate = useNavigate();
  const handleSubmit = (values) => {
    axios
      .post("/auth/user/login", values)
      .then((result) => {
        if (result.data.status) {
          setError("User Found");
        } else {
          setError("User Not Found");
        }
      })
      .catch((error) => console.log(error));
  };
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "90vh",
      }}
    >
      <Card
        sx={{
          transition: "0.5s ease",
          minWidth: { xs: "100%", sm: "100%", md: "25%", lg: "25%" },
          "&:hover": {
            boxShadow:
              "20.6px 8.6px 37.8px -31px rgba(0, 0, 0, 0.006),38px 15.8px 65.4px -31px rgba(0, 0, 0, 0.014),54.4px 22.6px 89.5px -31px rgba(0, 0, 0, 0.023),70.7px 29.4px 112.2px -31px rgba(0, 0, 0, 0.033),87.3px 36.3px 134.6px -31px rgba(0, 0, 0, 0.045),104.9px 43.7px 157.1px -31px rgba(0, 0, 0, 0.058),125px 52px 180px -31px rgba(0, 0, 0, 0.07)",
            minWidth: "26%",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            padding: "1em",
            flexDirection: "column",
            color: "white",
            gap: "0.2em",
            backgroundColor: "#002c3e",
          }}
        >
          <Typography
            sx={{ fontWeight: "bolder", fontSize: "larger" }}
            variant="h6"
          >
            Welcome
          </Typography>
          <Typography variant="p">Log in to continue.</Typography>
          <br />
          {error && (
            <Typography variant={"small"} color={"red"}>
              {error}
            </Typography>
          )}
        </Box>
        <Box sx={{ padding: "1em" }}>
          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={handleSubmit}
            validationSchema={LoginValidationSchema}
          >
            {({ touched, errors, handleSubmit, handleChange, handleBlur }) => (
              <Form onSubmit={handleSubmit}>
                <Box component={"article"} sx={{ my: "0.5em" }}>
                  <TextField
                    fullWidth
                    size="small"
                    id="email"
                    label="Email or Username"
                    variant="standard"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                  />
                </Box>
                <Box component={"article"} sx={{ my: "0.5em" }}>
                  <TextField
                    fullWidth
                    size="small"
                    type="password"
                    id="password"
                    label="Password"
                    variant="standard"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                  />
                </Box>
                <Box component={"article"} sx={{ my: "0.5em" }}>
                  <Button
                    fullWidth
                    type="submit"
                    sx={{
                      backgroundColor: "#002c3e",
                      color: "white",
                      fontWeight: "bolder",
                      my: "2em",
                      "&:hover": { color: "black", backgroundColor: "gray" },
                    }}
                  >
                    Log In
                  </Button>
                  <Button
                    href="/register"
                    underline="none"
                    component={Link}
                    fullWidth
                    sx={{
                      textAlign: "center",
                      backgroundColor: "#f0f0f0",
                    }}
                  >
                    SignUp
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </Card>
    </Box>
  );
};

export default Login;
