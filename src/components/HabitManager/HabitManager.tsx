import { FC, useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import { Container } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Card from "../Card/Card.tsx";
import Box from "@mui/material/Box";
import AddBox from "../AddBox/AddBox.tsx";
import AddDialog from "../AddDialog/AddDialog.tsx";
import Habit from "../../types/HabitInterface.tsx";
import { useCards } from "../../contexts/CardsContext.tsx";

const HabitManager: FC = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const { totalCards, setTotalCards, doneCards, setDoneCards } = useCards();

  const storeHabits = (updatedHabits: Habit[]): void => {
    localStorage.setItem("habits", JSON.stringify(updatedHabits));
  };

  const storeDoneCards = (count: number): void => {
    localStorage.setItem("doneCards", JSON.stringify(count));
  };

  //Get all
  useEffect(() => {
    try {
      const storedHabits = JSON.parse(
        localStorage.getItem("habits") || "[]"
      ) as Habit[];
      setHabits(storedHabits);

      const storedLastVisitData: string | null =
        localStorage.getItem("lastVisit");

      if (storedLastVisitData) {
        try {
          const storedLastVisit: string = JSON.parse(storedLastVisitData);
          console.log("Stored last visit: ", storedLastVisit);

          const diff = differenceInCalendarDays(
            new Date(storedLastVisit),
            new Date()
          );

          if (diff !== 0) {
            const resetHabits: Habit[] = storedHabits.map((habit: Habit) => ({
              ...habit,
              isDone: false,
            }));
            console.log(resetHabits);
            setHabits(resetHabits);
            storeHabits(resetHabits);
          }
        } catch (error) {
          console.error("Error parsing lastVisit data:", error);
          localStorage.removeItem("lastVisit");
        }
      }
      const currentDate: string = new Date().toISOString();
      localStorage.setItem("lastVisit", JSON.stringify(currentDate));
    } catch (error) {
      console.error("Error parsing habits from localStorage:", error);
      setHabits([]);
    }
  }, []);

  const addHabit = (habitId: string, newHabitData: string): void => {
    const newHabit: Habit = {
      key: habitId,
      id: habitId,
      habit: newHabitData,
      isDone: false,
    };
    const updatedHabits = [...habits, newHabit];
    setTotalCards(totalCards + 1);
    setHabits(updatedHabits);
    storeHabits(updatedHabits);
  };

  const deleteHabit = (id: string): void => {
    try {
      const currentHabits = JSON.parse(
        localStorage.getItem("habits") || "''"
      ) as Habit[];
      const habitToDelete: Habit[] = currentHabits.filter(
        (habit: Habit) => habit.id === id
      );
      if (habitToDelete && habitToDelete[0].isDone) {
        setDoneCards(doneCards - 1);
        storeDoneCards(doneCards - 1);
      }
      const habitsOnDelete = currentHabits.filter(
        (habit: Habit) => habit.id !== id
      );
      setHabits(habitsOnDelete);
      setTotalCards(totalCards - 1);
      localStorage.setItem("habits", JSON.stringify(habitsOnDelete));
    } catch (error) {
      console.error("Error deleting habit:", error);
    }
  };

  const toggleDone = (id: string) => {
    const updatedHabits = habits.map((habit: Habit) =>
      habit.id === id ? { ...habit, isDone: !habit.isDone } : habit
    );
    setHabits(updatedHabits);
    storeHabits(updatedHabits);
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
      }}
    >
      <AddDialog addHabit={addHabit} />
      <AddBox addHabit={addHabit} />
      <Box
        sx={{
          borderRadius: 1,
          bgColor: "#0066CC",
        }}
      >
        <Grid container spacing={2}>
          {habits.map((habit) => (
            <Grid key={habit.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <Card
                key={habit.id}
                id={habit.id}
                text={habit.habit}
                isDone={habit.isDone}
                deleteHabit={deleteHabit}
                toggleDone={toggleDone}
              />
            </Grid>
          ))}
          <Grid></Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default HabitManager;
