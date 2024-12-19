import { useEffect } from "react";
import { useCards } from "../../contexts/CardsContext.tsx";
import Habit from "../../types/HabitInterface.tsx";
import Grid from "@mui/material/Grid2";
import { Typography } from "@mui/material";

const Counter = () => {
  const { totalCards, setTotalCards, doneCards, setDoneCards } = useCards();

  useEffect(() => {
    const storedHabits = JSON.parse(
      localStorage.getItem("habits") || "[]"
    ) as Habit[];
    setTotalCards(storedHabits.length);
    setDoneCards(
      storedHabits.filter((habit: Habit): boolean => habit.isDone).length
    );
  }, []);

  useEffect(() => {
    localStorage.setItem("doneCards", JSON.stringify(doneCards));
  }, [doneCards]);

  return (
    <>
      <Typography
        variant="h5"
        align="center"
        gutterBottom
        sx={{
          lineHeight: "40px",
        }}
      >
        <Grid container spacing={1}>
          <Grid>
            <h3>&#129365;</h3>
          </Grid>
          <Grid>
            <h3>
              {totalCards}/{doneCards}
            </h3>
          </Grid>
        </Grid>
      </Typography>
    </>
  );
};

export default Counter;
