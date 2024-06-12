import {
  styled,
  Button,
  Link,
  Box,
  Stack,
  IconButton,
  Tooltip,
  Modal,
  Divider,
  Avatar,
  Typography,
} from "@mui/material";
import { Link as ReactLink } from "react-scroll";
import { useState } from "react";
const Logo = styled("img")({
  width: "200px",
});
const NavLink = styled(Link)({
  textDecoration: "none",
  color: "black",
  fontWeight: "bolder",
  fontSize: "1.5rem",
  fontFamily: "Helvetica, serif",
});
import { List } from "@mui/icons-material";
const Nav = () => {
  const [show, setShow] = useState(false);
  const handleShow = () => {
    setShow(true);
  };
  const handleHide = () => {
    setShow(false);
  };

  return (
    <>
      <Stack
        sx={{
          display: "flex",
          position: "sticky",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0.5em",
          flexDirection: "row",
        }}
      >
        <Box>
          <Typography
            component={Link}
            href="/"
            variant="h4"
            sx={{
              color: "#002c3e",
              fontWeight: "bolder",
              size: 200,
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            MIKE LARRY INC
          </Typography>
        </Box>
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: "3em" }}>
          <NavLink href="/">HOME</NavLink>
          <ReactLink
            style={{
              textDecoration: "none",
              color: "black",
              fontWeight: "bolder",
              fontSize: "1.5rem",
              fontFamily: "Helvetica, serif",
              cursor: "pointer",
            }}
            smooth={true}
            spy={true}
            duration={700}
            to="products"
          >
            PRODUCTS
          </ReactLink>
          <NavLink href="/blog">BLOG</NavLink>
          <NavLink href="/contact">CONTACT</NavLink>
        </Box>
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: "0.5em" }}>
          <Button
            href="/login"
            sx={{ backgroundColor: "#f0f0f0" }}
            component={Link}
          >
            Log In
          </Button>
          <Button
            href="/register"
            sx={{
              backgroundColor: "#002c3e",
              color: "white",
              "&:hover": { color: "#002c3e", border: "1px solid #002c3e" },
            }}
            component={Link}
          >
            Sign Up
          </Button>
          <Tooltip title="My Account">
            <Avatar />
          </Tooltip>
        </Box>
        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <IconButton size="large" onClick={handleShow}>
            <List />
          </IconButton>
        </Box>
        <Box sx={{ display: { md: "none" } }}>
          <Modal open={show} onClose={handleHide}>
            <Box
              sx={{
                width: "100%",
                minHeight: "50vh",
                bgcolor: "white",
                position: "relative",
                padding: "2em 1em",
                display: "flex",
                alignItems: "center",
                gap: "1em",
                flexDirection: "column",
              }}
            >
              <Box>
                <Button href="/" component={Link}>
                  <Logo src="/images/logo.png" />
                </Button>
                <Divider />
                <Box
                  sx={{
                    marginTop: "1em",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1em",
                    alignItems: "center",
                  }}
                >
                  <NavLink href="/">HOME</NavLink>
                  <NavLink href="/blog">BLOG</NavLink>
                  <NavLink href="/contact">CONTACT</NavLink>
                  <NavLink href="/login">Sign Up</NavLink>
                  <NavLink href="/register">Sign In</NavLink>
                  <Button onClick={handleHide}>Close</Button>
                </Box>
              </Box>
            </Box>
          </Modal>
        </Box>
      </Stack>
    </>
  );
};

export default Nav;
