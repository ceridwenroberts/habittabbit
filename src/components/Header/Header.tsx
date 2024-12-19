import { Container, Typography, Box } from "@mui/material";

const Header = () => {
  const title = "Habit Rabbit";
  return (
    <>
      <Container>
        <Box p={4}>
          <Typography
            variant="h1"
            align="center"
            gutterBottom
            sx={{
              fontSize: {
                xs: "2.5rem",
                sm: "4rem",
                md: "6rem",
              },
            }}
          >
            {title.toUpperCase()}
          </Typography>
        </Box>
      </Container>
    </>
  );
};

export default Header;
