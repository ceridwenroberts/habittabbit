import { Box } from "@mui/material";

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
      {footercontent}
    </Box>
  );
};

export default Footer;
