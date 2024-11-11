import { FC, useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import { Container } from "@mui/material";
import Grid from '@mui/material/Grid2';
import Card from "../Card/Card.tsx";
import Box from '@mui/material/Box';
// import AspectRatio from "@mui/joy/AspectRatio"
import AddBox from "../AddBox/AddBox.tsx";
import AddDialog from "../AddDialog/AddDialog.tsx"

interface Habit {
  key: string;
  id: string;
  habit: string;
  isDone: boolean;
}

const HabitManager: FC = () => {
  const [habits, setHabits] = useState<Habit[]>([]);

  const storeHabits = (updatedHabits: Habit[]): void => {
    localStorage.setItem("habits", JSON.stringify(updatedHabits));
  };

  //Get all
  useEffect(() => {
    try {
      const storedHabits = JSON.parse(
        localStorage.getItem("habits") || "[]" 
      ) as Habit[];
      setHabits(storedHabits);
      // setTotalCards(storedHabits.length);

      const storedLastVisitData: string | null =
        localStorage.getItem("lastVisit");

      if (storedLastVisitData) {
        try {
          const storedLastVisit:string = JSON.parse(storedLastVisitData);
          console.log(storedLastVisit);

          const diff: number = differenceInCalendarDays(
            new Date(storedLastVisit),
            new Date().toLocaleString()
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
      const currentDate:string = new Date().toLocaleString();
      localStorage.setItem("lastVisit", JSON.stringify(currentDate))
    } catch (error) {
      console.error("Error parsing habits from localStorage:", error);
      setHabits([]);
    }
  }, []);

  //Add
  const addHabit = (habitId: string, newHabitData: string): void => {
    const newHabit: Habit = {
      key: habitId,
      id: habitId,
      habit: newHabitData,
      isDone: false,
    };
    const updatedHabits = [...habits, newHabit];
    // setTotalCards(updatedHabits.length);
    setHabits(updatedHabits);
    storeHabits(updatedHabits);
  };

  //Delete
  const deleteHabit = (id: string): void => {
    try {
      const currentHabits = JSON.parse(
        localStorage.getItem("habits") || "''"
      ) as Habit[];
      // const habitToDelete = currentHabits.filter((habit: Habit) => habit.id === id);
      // if(habitToDelete && habitToDelete.isDone) {
      //   setDoneCards(doneCards -1);
      //   storeDoneCards( doneCards -1);
      // }
      const habitsOnDelete = currentHabits.filter(
        (habit: Habit) => habit.id !== id
      );
      // setTotalCards(habitsOnDelete.length);
      setHabits(habitsOnDelete);
      // storeHabits(habitsOnDelete);
      localStorage.setItem("habits", JSON.stringify(habitsOnDelete));
    } catch (error) {
      console.error("Error deleting habit:", error);
    }
  };

  //buttonToggle
  const toggleDone = (id: string) => {
    const updatedHabits = habits.map((habit: Habit) =>
      habit.id === id ? { ...habit, isDone: !habit.isDone } : habit
    );
    setHabits(updatedHabits);
    storeHabits(updatedHabits);
  };

  // const habit = updatedHabits.find((habit) => habit.id === id);
  // const newDoneCount = habit.isDone ? doneCards + 1 : doneCards - 1;
  // setDoneCards(newDoneCount);
  // storeDoneCards(newDoneCount);
  // // localStorage.setItem("habits", JSON.stringify(checkHabits));

  return (
    <Container
      maxWidth="md" sx={{
      display: "flex",
      flexDirection: "column",
      flexGrow: 1
      
    }}>
      <AddDialog addHabit={addHabit} />
      <AddBox addHabit={addHabit} />
      <Box
      sx={{
          borderRadius: 1,
          bgColor: "#0066CC"
      }}>
        <Grid container spacing={2}>
    
          {habits.map((habit) => (
            <Grid key={habit.id} size={{ xs:12, sm: 6, md: 4}}
            // sx={{
            //   border: "1px solid black",
            //     borderRadius: 1,
            //     bgColor: "#0066CC"
            // }}
            >  
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
          <Grid>
            
          </Grid>
        </Grid>
      </Box>
      
      {/* {habits.length ? (
        habits.map((habit: Habit) => (
          <Card
            key={habit.id}
            id={habit.id}
            text={habit.habit}
            isDone={habit.isDone}
            deleteHabit={deleteHabit}
            toggleDone={toggleDone}
          />
        ))
      ) : (
        <p>Please add a carrot!</p>
      )} */}
    </Container>
  );
};

export default HabitManager;
