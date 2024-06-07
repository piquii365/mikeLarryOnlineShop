import { Facebook, Instagram, Star, WhatsApp } from "@mui/icons-material";
import { Box, IconButton, Link, Typography } from "@mui/material";
const Footer = () => {
  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "#002c3e",
        color: "white",
        height: "30dvh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "1em",
        flexDirection: "column",
      }}
    >
      <Typography>
        © 2024 All Rights Reserved By Mike Larry Incorporated
      </Typography>
      <Typography>Sponsored by JK</Typography>
      <Box>
        <IconButton
          size="large"
          sx={{ color: "white" }}
          href={"https://wa.me/c/263778275093"}
          component={Link}
        >
          <WhatsApp />
        </IconButton>
        <IconButton
          size="large"
          sx={{ color: "white" }}
          href={"https://www.facebook.com/profile.php?id=100089821803271"}
          component={Link}
        >
          <Facebook />
        </IconButton>
        <IconButton
          size="large"
          sx={{ color: "white" }}
          href={
            "https://www.instagram.com/mike_larry_lnc?igsh=eGtnbjd1cXp0MTFh"
          }
          component={Link}
        >
          <Instagram />
        </IconButton>
        <IconButton
          size="large"
          sx={{ color: "white" }}
          href={
            "https://www.tiktok.com/@mike_larry_lncorporated?_t=8jFA3QZJdx7&_r=1"
          }
          component={Link}
        >
          <Star />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Footer;
