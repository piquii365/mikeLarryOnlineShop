import {
  AcUnit,
  ArrowBack,
  ArrowForward,
  DeliveryDining,
  HighQuality,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  Paper,
  styled,
  Typography,
  TextField,
} from "@mui/material";
import { useState, useRef } from "react";
const HomePicture = styled(Box)({
  width: "inherit",
  height: { md: "90dvh", lg: "90dvh" },
});
const ShopWithUs = styled(Box)({
  width: "inherit",
  height: { md: "70dvh", lg: "70dvh" },
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: { xs: "0.2em", sm: "0.2em", md: "1em", lg: "1em" },
});
const Papers = styled(Paper)({
  flex: 1,
  backgroundColor: "#002c3e",
  height: "28dvh",
  display: "flex",
  flexDirection: "column",
  gap: "1em",
  color: "white",
  alignItems: "center",
  justifyContent: "center",
});
const Testimonies = styled(Box)({
  width: "inherit",
  position: "relative",
  minHeight: { md: "70dvh" },
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "1em",
});
const Subscribe = styled(Box)({
  display: "flex",
  backgroundColor: "#999998",
  flexDirection: "column",
  width: "inherit",
  height: "50dvh",
  alignItems: "center",
  justifyContent: "center",
});
import HomeProducts from "../components/HomeProducts.jsx";
import { axiosPrivate } from "../api/axios.js";
const Home = () => {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const testimonies = [
    {
      name: "Tendai",
      image: "/images/testimonial1.jpg",
      testimony:
        "l am deligted to say the stunt-car l ordered exceed my expectations in every aspect. l used to strive to find electronic gadgets that are not only entertaining but also safe and durable, but this stunt-car has proven to incredibly resilient. lt has survived numerous crashes, bumps, and tumbles without showing any sign of damage. l like the quality madriantly",
    },
    {
      name: "Thembi",
      image: "/images/BLACK PEOPLE 10.jpeg",
      testimony:
        "l'm truly impressed that l just received my order in no time. The delivery was so fast, upon unboxing the hooverboard, l was immediately struck by it's sleek and modern design. The build quality was outstanding, with sturdy materials and a robust construction that instilled confidence in its durability.",
    },
    {
      name: "Xiomara",
      image: "/images/testimonial3.jpg",
      testimony:
        "l was impressed with the seamless ordering process and the prompt delivery of the hooverboard l recently purchased. The package arrived well-packaged and in perfect condition.",
    },
  ];
  const scrollAmount = 1800;
  const containerRef = useRef();
  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = (scrollAmount) => {
    const newScrollPosition = scrollPosition + scrollAmount;
    setScrollPosition(newScrollPosition);
    containerRef.current.scrollLeft = newScrollPosition;
  };
  const handleSubscribe = () => {
    if (email === "") {
      return;
    } else {
      axiosPrivate.post("/user/subscribe", { email }).then((result) => {
        if (result.data.status) {
          setEmail("");
          setMsg("Subscribed");
        } else {
          setMsg(result.data.Result);
        }
      });
    }
  };
  return (
    <Box sx={{ width: "98dvw" }}>
      <HomePicture>
        <img
          width={"100%"}
          height={"100%"}
          src="/images/cover2.jpg"
          alt="cover"
        />
      </HomePicture>
      <ShopWithUs>
        <Typography
          variant={"h2"}
          sx={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: "bolder",
            color: "black",
          }}
        >
          Why Shop With Us
        </Typography>
        <Divider variant="middle" sx={{ color: "white" }} />
        <Box sx={{ width: "80%", display: "flex", gap: "3em" }}>
          <Papers>
            <DeliveryDining sx={{ fontSize: 40 }} />
            <Typography variant={"h5"} sx={{ fontWeight: "bold" }}>
              Fast Delivery
            </Typography>
          </Papers>
          <Papers>
            <AcUnit sx={{ fontSize: 40 }} />
            <Typography variant={"h5"} sx={{ fontWeight: "bold" }}>
              Free Delivery
            </Typography>
          </Papers>
          <Papers>
            <HighQuality sx={{ fontSize: 40 }} />
            <Typography variant={"h5"} sx={{ fontWeight: "bold" }}>
              Best Quality
            </Typography>
          </Papers>
        </Box>
      </ShopWithUs>
      <HomeProducts />
      <Testimonies>
        <Typography
          variant={"h2"}
          sx={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: "bolder",
          }}
        >
          Customer&apos;s Testimonial
        </Typography>
        <Box
          sx={{
            position: "relative",
            width: "75%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "inherit",
          }}
        >
          <IconButton
            onClick={() => handleScroll(-scrollAmount)}
            size="large"
            sx={{
              color: "white",
              backgroundColor: "#002c3e",
              "&:hover": { color: "#002c3e" },
              position: "absolute",
              top: "30%",
              left: "30%",
            }}
          >
            <ArrowBack />
          </IconButton>
          <IconButton
            onClick={() => handleScroll(scrollAmount)}
            size="large"
            sx={{
              color: "white",
              backgroundColor: "#002c3e",
              "&:hover": { color: "#002c3e" },
              position: "absolute",
              top: "30%",
              right: "30%",
            }}
          >
            <ArrowForward />
          </IconButton>
          <Box
            ref={containerRef}
            sx={{
              display: "flex",
              width: "inherit",
              overflowX: "hidden",
            }}
          >
            {testimonies.map((customer, index) => (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  minWidth: "100%",
                }}
                key={index}
              >
                <Avatar
                  alt="Profile"
                  src={customer.image}
                  sx={{ width: 150, height: 150 }}
                />
                <Typography variant="h6" sx={{ fontWeight: "bold" }} paragraph>
                  {customer.name}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ fontWeight: "bold", color: "gray" }}
                  paragraph
                >
                  Customer
                </Typography>
                <Typography variant="body2" paragraph>
                  {customer.testimony}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Testimonies>
      <Subscribe>
        <Typography
          variant={"h2"}
          sx={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: "bolder",
            color: "#002c3e",
          }}
        >
          Subscribe To Get Discount Offers
        </Typography>
        {msg && (
          <Typography color="red" variant="bod1" paragraph>
            {msg}
          </Typography>
        )}
        <Box
          component={"form"}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1em",
            width: "inherit",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TextField
            placeholder="youremailaddress@gmail.com"
            id="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              width: "50%",
              border: "none",
              outline: "none",
              backgroundColor: "white",
            }}
          />
          <Button
            onClick={handleSubscribe}
            sx={{
              backgroundColor: "#002c3e",
              padding: "0.8em 1em",
              color: "white",
              width: "20%",
              fontWeight: "bold",
              fontSize: "large",
              "&:hover": { border: "1px solid black", color: "#002c3e" },
            }}
          >
            Subscribe
          </Button>
        </Box>
      </Subscribe>
    </Box>
  );
};

export default Home;
