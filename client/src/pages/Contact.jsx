import { Box, Typography, TextField, Button, Link } from "@mui/material";
import { useState } from "react";
const Contact = () => {
  const [values, setValues] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });
  return (
    <Box
      sx={{
        boxSizing: "border-box",
        width: "100%",
        height: { xs: "70dvh", sm: "70dvh", md: "130dvh" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#002c3e",
          color: "white",
          height: "10vmax",
          gap: "2em",
        }}
      >
        <Typography
          variant="h4"
          sx={{ fontSize: { xs: 30, sm: 30, md: 53 }, fontWeight: "bolder" }}
        >
          Contact Us
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: "2em",
          alignItems: "center",
          flexDirection: "column",
          height: "100%",
          padding: "1em 0",
        }}
      >
        <Box
          component={"form"}
          method="post"
          action={`mailto:mikelarrylnc4@gmail.com?subject=${
            values.fullName + "-->" + values.subject
          }&body=${values.message}`}
          sx={{
            width: { sm: "80%", md: "60%" },
            display: { sm: "block", md: "flex" },
            gap: { sm: "0.8em", md: "3em" },
            marginBottom: "8em",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TextField
            required
            fullWidth
            id="fullName"
            sx={{ marginBottom: "0.5em" }}
            onChange={(e) => {
              setValues({ ...values, fullName: e.target.value });
            }}
            placeholder="Enter your Full Name"
          />
          <TextField
            sx={{ marginBottom: "0.5em" }}
            onChange={(e) => {
              setValues({ ...values, email: e.target.value });
            }}
            required
            fullWidth
            type="email"
            id="email"
            placeholder="Enter Your Email Address "
          />
          <TextField
            sx={{ marginBottom: "0.5em" }}
            onChange={(e) => {
              setValues({ ...values, subject: e.target.value });
            }}
            fullWidth
            id="subject"
            placeholder="Enter Subject"
          />
          <TextField
            sx={{ marginBottom: "0.5em" }}
            onChange={(e) => {
              setValues({ ...values, message: e.target.value });
            }}
            required
            multiline
            fullWidth
            id="message"
            placeholder="Enter Message"
            minRows={5}
          />
          <Button
            size="large"
            type="submit"
            sx={{
              backgroundColor: "#002c3e",
              color: "white",
              width: { xs: "100%", sm: "100%", md: "20%" },
              "&:hover": { color: "#002c3e", border: "1px solid #002c3e" },
            }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Contact;
