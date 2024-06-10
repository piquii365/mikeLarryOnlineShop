import { Box, Typography, styled, Paper, Divider } from "@mui/material";
import { DeliveryDining, AcUnit, HighQuality } from "@mui/icons-material";
const Papers = styled(Paper)({
  flex: 1,
  marginBottom: 10,
  backgroundColor: "#002c3e",
  height: "15vmax",
  display: "flex",
  flexDirection: "column",
  gap: "1em",
  color: "white",
  alignItems: "center",
  justifyContent: "center",
});
const Blog = () => {
  return (
    <Box
      sx={{
        boxSizing: "border-box",
        width: "100%",
        height: "90dvh",
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
          Blog
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
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontFamily: "'Playfair Display', serif",
            fontSize: { xs: 30, sm: 30, md: 53 },
            fontWeight: "bolder",
            color: "black",
          }}
        >
          Why Shop With Us
        </Typography>
        <Divider color="black" orientation="horizontal" />
        <Box
          sx={{
            width: "80%",
            display: { sm: "block", md: "flex" },
            gap: "3em",
            marginBottom: "8em",
          }}
        >
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
      </Box>
    </Box>
  );
};

export default Blog;
