import Header from "./components/Header/Header.tsx";
import HabitManager from "./components/HabitManager/HabitManager.tsx";
import Footer from "./components/Footer/Footer.tsx";
import { Container, Paper } from "@mui/material";

function App() {
  return (
    <>
      <Container
        maxWidth="md"
        component="main"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Header heading="Habit Tracker" />
        <HabitManager />
        <Footer footercontent="&copy; Ceridwen Roberts 2024" />
      </Container>
    </>
  );
}

export default App;
