import { Container, Typography, Box } from "@mui/material";
type HeaderProps = {
    heading: string
}

const Header = ({ heading }: HeaderProps) => {
  return  (
    <>
    <Container>
    <Box p={4} >
    <Typography variant='h1' align='center' gutterBottom sx={{
      fontSize: {
        xs: "2.5rem",
        sm: "4rem",
        md: "6rem"
      }
    }} >{heading.toUpperCase()}</Typography>
    </Box>
    </Container>
  </>
  )
};

export default Header; 
