import {
  Facebook,
  Instagram,
  Star,
  WhatsApp,
  Phone,
  LocationOn,
  Mail,
} from "@mui/icons-material";
import {
  Box,
  IconButton,
  Link,
  Typography,
  Button,
  Divider,
} from "@mui/material";
const Footer = () => {
  return (
    <Box
      sx={{
        width: { xs: "100dvw", sm: "90vhw", md: "100%" },
        backgroundColor: "#002c3e",
        color: "white",
        minHeight: "50dvh",
        display: { xs: "block", sm: "block", md: "flex" },
        flexDirection: "column",
        alignItems: "center",
        gap: "1em",
        paddingLeft: { sm: "0.2em", md: "5em" },
        boxSizing: "border-box",
        overflowX: "hidden",
      }}
    >
      <Box
        sx={{
          display: { sm: "block", md: "flex" },
          flexDirection: "row",
          alignItems: "center",
          gap: "1em",
          paddingLeft: "2em",
          width: { xs: "80%", md: "100%" },
        }}
      >
        <Box
          sx={{
            width: { xs: "100%", sm: "100%", md: "20%", lg: "20%" },
            display: "flex",
            flexDirection: "column",
            gap: "1em",
            color: "white",
          }}
        >
          <Typography variant="h3">...</Typography>
          <Button
            sx={{ color: "white", width: "fit-content" }}
            startIcon={<LocationOn />}
            component={Link}
          >
            Location
          </Button>
          <Button
            sx={{ color: "white", width: "fit-content" }}
            startIcon={<Phone />}
            component={Link}
            href={"tel:+2637778275093"}
          >
            Call +2637 778275093
          </Button>
          <Button
            sx={{
              color: "white",
              width: "fit-content",
              textTransform: "lowercase",
            }}
            startIcon={<Mail />}
            component={Link}
            href={"mailto:mikelarrylnc4@gmail.com"}
          >
            mikelarrylnc4@gmail.com
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1em",
            alignItems: "center",
            width: { xs: "100%", sm: "100%", md: "50%", lg: "50%" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "1em",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Typography
              sx={{
                all: "unset",
                fontWeight: "bolder",
                fontSize: 40,
                cursor: "pointer",
              }}
              href="/blog"
              variant="h5"
              component={Link}
            >
              Mike Larry
            </Typography>
            <Typography
              sx={{ width: { xs: "100%", sm: "100%", md: "40%", lg: "40%" } }}
              paragraph
            >
              illuminate your world with brilliant experiences from vibrant
              moments to mesmerizing lifestyle
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "1em",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
          >
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
      </Box>
      <Divider
        color="white"
        variant="middle"
        sx={{ width: { xs: "90%", sm: "90%", md: "50%", lg: "50%" } }}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          marginBottom: "2em",
        }}
      >
        <Typography>
          © 2024 All Rights Reserved By Mike Larry Incorporated
        </Typography>
        <Typography>Powered by JK</Typography>
      </Box>
    </Box>
  );
};

export default Footer;
