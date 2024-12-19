import { CardsProvider } from "./contexts/CardsContext.tsx";
import Counter from "./components/Counter/Counter.tsx";
import Header from "./components/Header/Header.tsx";
import HabitManager from "./components/HabitManager/HabitManager.tsx";
import Footer from "./components/Footer/Footer.tsx";
import { Container } from "@mui/material";

function App() {
  return (
    <>
      <CardsProvider>
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
          <Header />
          <Counter />
          <HabitManager />
          <Footer footercontent="&copy; Ceridwen Roberts 2024" />
        </Container>
      </CardsProvider>
    </>
  );
}

export default App;
