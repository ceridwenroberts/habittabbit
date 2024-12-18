import * as React from "react";
import { useState } from "react";
import { useCards } from "../../contexts/CardsContext.tsx";
import { IconButton, Paper } from "@mui/material";
import Grid from "@mui/material/Grid2";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import ReplayCircleFilledIcon from "@mui/icons-material/ReplayCircleFilled";
import AspectRatio from "@mui/joy/AspectRatio";
import { SnackbarCloseReason } from "@mui/material/Snackbar";
import TallySnackbar from "../../components/TallySnackbar/TallySnackbar";

interface CardProps {
  text: string;
  id: string;
  isDone: boolean;
  toggleDone: (id: string) => void;
  deleteHabit: (id: string) => void;
}

const Card = ({ text, id, isDone, toggleDone, deleteHabit }: CardProps) => {
  const { doneCards, setDoneCards } = useCards();
  const [snackOpen, setSnackOpen] = useState<boolean>(false);

  const handleDone = () => {
    toggleDone(id);
    if (!isDone) {
      setDoneCards(doneCards + 1);
    } else {
      setDoneCards(doneCards - 1);
    }
    setSnackOpen(true);
  };

  const handleUndo = () => {
    toggleDone(id);
    setDoneCards(isDone ? doneCards + 1 : doneCards - 1);
    setSnackOpen(false);
  };

  const handleDelete = () => {
    deleteHabit(id);
    setSnackOpen(false);
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ): void => {
    if (reason === "clickaway") {
      return;
    }
    setSnackOpen(false);
  };

  return (
    <Paper
      elevation={6}
      sx={{
        borderRadius: 3,
        overflow: "hidden",
      }}
    >
      <AspectRatio>
        {/* <Box border={1} p={1} bgcolor="#abe4a0" justifyContent="center" */}
        <Grid
          container
          direction="column"
          justifyContent="space-between"
          sx={{
            position: "relative",
            opacity: isDone ? 0.5 : 1,
            backgroundColor: isDone ? "#d8e4bc" : "",
          }}
        >
          <Grid>
            <IconButton
              onClick={handleDelete}
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
              }}
            >
              <RemoveCircleOutlineIcon />
            </IconButton>
          </Grid>
          <Grid
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "center",
              //   outline: "auto",
              alignItems: "center",
              textAlign: "center",
              paddingLeft: 4,
              paddingRight: 4,
              paddingTop: 4,
            }}
          >
            {text}
          </Grid>
          <Grid
            sx={{
              paddingBottom: 1,
            }}
          >
            <IconButton size="large" onClick={handleDone}>
              {isDone ? (
                <ReplayCircleFilledIcon
                  sx={{
                    fontSize: 32,
                    opacity: 1,
                  }}
                />
              ) : (
                <CheckCircleIcon
                  sx={{
                    fontSize: 32,
                  }}
                />
              )}
            </IconButton>
            <TallySnackbar
              snackOpen={snackOpen}
              autoHideDuration={3000}
              undoAction={handleUndo}
              onClose={handleClose}
              message={`You've earned another \u{1F955}! Only X left until you are a happy \u{1F407}.`}
            />
          </Grid>
        </Grid>
      </AspectRatio>
    </Paper>
  );
};
export default Card;
