import { Box, Typography } from "@mui/material";

type FooterProps = {
  footercontent: string;
};

const Footer = ({ footercontent }: FooterProps) => {
  return (
    <Box
      padding={4}
      sx={{
        marginTop: "auto",
        display: {
          xs: "none",
          sm: "block",
        },
      }}
    >
      <Typography
        variant="h1"
        align="center"
        gutterBottom
        sx={{
          letterSpacing: "-8.94px",
          lineHeight: "40px",
        }}
      >
        <div>(\_/)</div>
      </Typography>
      {footercontent}
    </Box>
  );
};

export default Footer;
