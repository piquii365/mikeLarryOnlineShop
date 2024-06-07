import {
  styled,
  Button,
  Link,
  Box,
  Stack,
  Menu,
  MenuItem,
  IconButton,
  Tooltip,
  Modal,
  Divider,
} from "@mui/material";
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
import {
  KeyboardArrowDown,
  Search,
  ShoppingCart,
  List,
  Close,
} from "@mui/icons-material";
const Nav = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [show, setShow] = useState(false);
  const handleShow = () => {
    setShow(true);
  };
  const handleHide = () => {
    setShow(false);
  };

  return (
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
        <Button href="/" component={Link}>
          <Logo src="/images/logo.png" />
        </Button>
      </Box>
      <Box sx={{ display: { xs: "none", md: "flex" }, gap: "3em" }}>
        <NavLink href="/">HOME</NavLink>
        <Button
          onClick={handleClick}
          sx={{
            all: "unset",
            cursor: "pointer",
            textDecoration: "none",
            color: "black",
            padding: 0,
            margin: 0,
            display: "flex",
            fontWeight: "bolder",
            fontSize: "1.5rem",
            fontFamily: "Helvetica, serif",
            "&:hover": { backgroundColor: "none" },
          }}
          endIcon={<KeyboardArrowDown />}
        >
          PAGES
        </Button>
        <Menu id="menu" anchorEl={anchorEl} open={open} onClose={handleClose}>
          <MenuItem onClick={handleClose}>ABOUT</MenuItem>
          <MenuItem onClick={handleClose}>TESTIMONIAL</MenuItem>
        </Menu>
        <NavLink href="/products">PRODUCTS</NavLink>
        <NavLink href="/blog">BLOG</NavLink>
        <NavLink href="/contact">CONTACT</NavLink>
      </Box>
      <Box sx={{ display: { xs: "none", md: "flex" }, gap: "0.5em" }}>
        <Tooltip title="cart">
          <IconButton href="/cart" component={Link}>
            <ShoppingCart />
          </IconButton>
        </Tooltip>
      </Box>
      <Box sx={{ display: { xs: "flex", md: "none" } }}>
        <Tooltip title="cart">
          <IconButton sx={{ color: "black" }} size="large">
            <ShoppingCart />
          </IconButton>
        </Tooltip>
        <Tooltip title="search">
          <IconButton sx={{ color: "black" }} size="large">
            <Search />
          </IconButton>
        </Tooltip>
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
            <IconButton
              onClick={handleHide}
              sx={{ position: "absolute", top: 0, right: 0, color: "black" }}
            >
              <Close />
            </IconButton>
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
                <Button
                  onClick={handleClick}
                  sx={{
                    all: "unset",
                    cursor: "pointer",
                    textDecoration: "none",
                    color: "black",
                    fontWeight: "bolder",
                    padding: 0,
                    margin: 0,
                    display: "flex",
                    fontSize: "larger",
                    fontFamily: "Montserrat, sans-serif",
                    "&:hover": { backgroundColor: "none" },
                  }}
                  endIcon={<KeyboardArrowDown />}
                >
                  PAGES
                </Button>
                <Menu
                  id="menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>ABOUT</MenuItem>
                  <MenuItem onClick={handleClose}>TESTIMONIAL</MenuItem>
                </Menu>
                <NavLink href="/">PRODUCTS</NavLink>
                <NavLink href="/">BLOG</NavLink>
                <NavLink href="/">CONTACT</NavLink>
              </Box>
            </Box>
          </Box>
        </Modal>
      </Box>
    </Stack>
  );
};

export default Nav;
