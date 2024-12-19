import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";
import { useCards } from "../../contexts/CardsContext.tsx";
import { Button } from "@mui/material";

interface TallySnackbarProps {
  snackOpen: boolean;
  autoHideDuration: number;
  message: string;
  undoAction: () => void;
  onClose: (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => void;
}

const TallySnackbar = ({
  snackOpen,
  undoAction,
  onClose,
}: TallySnackbarProps) => {
  const { totalCards, doneCards } = useCards();
  const tasksLeft = totalCards - doneCards;

  return (
    <>
      <Snackbar
        open={snackOpen}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={6000}
        onClose={onClose}
        action={
          <Button color="secondary" size="small" onClick={undoAction}>
            UNDO
          </Button>
        }
        message={`You've earned another \u{1F955}! Only ${tasksLeft} left until you are a happy \u{1F407}.`}
        sx={{
          "& .MuiSnackbarContent-root": {
            fontSize: {
              xs: "0.8rem",
              sm: "1rem",
              md: "1.5rem",
            },
          },
        }}
      />
    </>
  );
};

export default TallySnackbar;
