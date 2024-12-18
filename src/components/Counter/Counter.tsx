import { useEffect } from "react"
import { useCards } from "../../contexts/CardsContext.tsx"
import Habit from "../../types/HabitInterface.tsx"

const Counter = () => {
    const {totalCards, setTotalCards, doneCards, setDoneCards } = useCards();

    useEffect(() => {
           const storedHabits = JSON.parse(localStorage.getItem("habits") || "[]"
          ) as Habit[];
          setTotalCards(storedHabits.length);
          setDoneCards(storedHabits.filter((habit) => habit.isDone).length);  
          //Why is  * setDoneCards(storedHabits.filter((habit) => habit.isDone).length);  * working when this is not?:       
        //   const doneHabits:Habit[] = storedHabits.filter(habit => habit.isDone === true)
        //   localStorage.setItem("doneCards", JSON.stringify(doneHabits.length))
        //   setDoneCards(doneHabits.length);
    }, [])

    useEffect(()=> {
        localStorage.setItem("doneCards", JSON.stringify(doneCards));
    }, [doneCards])

    return (
        <>
        This is the Counter
        {totalCards}/{doneCards}
        </>
    )
}

export default Counter