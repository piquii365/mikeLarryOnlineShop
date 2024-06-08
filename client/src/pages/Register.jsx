import * as React from "react";
import axios from "../api/axios.js";
import { Box, Card, Typography, TextField, Link, Button } from "@mui/material";
import { Formik, Form } from "formik";
import { registerSchema } from "../middleware/registerValidationSchema.js";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = React.useState();
  const initialValues = {
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    location: "",
    phoneNumber: "",
  };
  const handleFormSubmit = (values) => {
    axios
      .post("/auth/user/signup", values)
      .then((res) => {
        if (res.data.status) {
          navigate("/login");
        } else {
          setError(res.data.Result);
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        minHeight: "100vh",
        alignItems: "center",
      }}
    >
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          maxWidth: { xs: "98%", sm: "98%", md: "65%", lg: "30%" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            padding: "0.5em 1em",
            color: "white",
            backgroundColor: "#002c3e",
          }}
        >
          <Typography sx={{ fontWeight: "bolder" }} variant={"h6"}>
            Create Account to get massive discounts and Updates from Mike Larry
            Inc
          </Typography>
          <Typography variant={"small"}>Create your profile</Typography>
          <br />
          {error && (
            <Typography variant="small" color="red">
              {error}
            </Typography>
          )}
        </Box>
        <Box
          sx={{
            padding: "0.5em 1em",
          }}
        >
          <Formik
            initialValues={initialValues}
            onSubmit={handleFormSubmit}
            validationSchema={registerSchema}
          >
            {({ touched, handleChange, handleSubmit, handleBlur, errors }) => (
              <Form onSubmit={handleSubmit}>
                <Box component={"article"} sx={{ my: "0.5em" }}>
                  <TextField
                    fullWidth
                    id="fullName"
                    label="Full Name"
                    variant="standard"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.fullName && Boolean(errors.fullName)}
                    helperText={touched.fullName && errors.fullName}
                  />
                </Box>
                <Box component={"article"} sx={{ my: "0.5em" }}>
                  <TextField
                    fullWidth
                    id="username"
                    label="Username"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.username && Boolean(errors.username)}
                    helperText={touched.username && errors.username}
                    variant="standard"
                  />
                </Box>
                <Box component={"article"} sx={{ my: "0.5em" }}>
                  <TextField
                    fullWidth
                    type="email"
                    id="email"
                    label="Email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                    variant="standard"
                  />
                </Box>
                <Box component={"article"} sx={{ my: "0.5em" }}>
                  <TextField
                    fullWidth
                    type="password"
                    id="password"
                    label="Create Password"
                    variant="standard"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                  />
                  <TextField
                    fullWidth
                    type="password"
                    id="confirmPassword"
                    label="Confirm Password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={
                      touched.confirmPassword && Boolean(errors.confirmPassword)
                    }
                    helperText={
                      touched.confirmPassword && errors.confirmPassword
                    }
                    variant="standard"
                  />
                </Box>
                <Box component={"article"} sx={{ my: "0.5em" }}>
                  <TextField
                    fullWidth
                    type="text"
                    id="location"
                    label="Physical Address"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.location && Boolean(errors.location)}
                    helperText={touched.location && errors.location}
                    variant="standard"
                  />
                </Box>
                <Box component={"article"} sx={{ my: "0.5em" }}>
                  <TextField
                    fullWidth
                    type="text"
                    id="phoneNumber"
                    label="Phone Number"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.phoneNumber && Boolean(errors.phoneNumber)}
                    helperText={touched.phoneNumber && errors.phoneNumber}
                    variant="standard"
                  />
                </Box>
                <Box component={"article"} sx={{ my: "0.5em" }}>
                  <Typography>
                    By Creating An Account We Imply That You Have Read And
                    Understand The{" "}
                    <Link href="/terms">Terms And Conditions</Link> Of Mike
                    Larry Incorporation{" "}
                  </Typography>
                </Box>
                <Box component={"article"} sx={{ my: "0.5em" }}>
                  <Button
                    fullWidth
                    type="submit"
                    sx={{
                      backgroundColor: "#002c3e",
                      color: "white",
                      my: "2em",
                      "&:hover": {
                        color: "#002c3e",
                        border: "1px solid #002c3e",
                      },
                    }}
                  >
                    Create Account
                  </Button>
                  <Button
                    component={Link}
                    href="/login"
                    underline="none"
                    fullWidth
                    sx={{ backgroundColor: "#f0f0f0" }}
                  >
                    Log In
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

export default Register;
