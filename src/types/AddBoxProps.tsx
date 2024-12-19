export default interface AddBoxProps {
  addHabit: (id: string, habitName: string) => void;
}

export interface ReactSpringTransitionProps {
  children: React.ReactNode;
  trigger: boolean;
}
