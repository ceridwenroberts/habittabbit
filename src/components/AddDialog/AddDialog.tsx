import * as React from "react";
import { nanoid } from "nanoid";
import { Button, Fab } from "@mui/material";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AddBoxProps from "../../types/AddBoxProps.tsx";
import AddIcon from "@mui/icons-material/Add";

const AddDialog: React.FC<AddBoxProps> = ({ addHabit }) => {
  const [open, setOpen] = React.useState(false);
  const [newHabitData, setNewHabitData] = React.useState<string>("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewHabitData(e.target.value);
  };

  const submitForm = (
    e: React.FormEvent<HTMLFormElement> | React.KeyboardEvent
  ) => {
    if (newHabitData.trim()) {
      e.preventDefault();
      const habitId = nanoid(7);
      addHabit(habitId, newHabitData);
      setNewHabitData("");
      handleClose();
    }
  };

  return (
    <React.Fragment>
      <Fab
        onClick={handleClickOpen}
        aria-label="add"
        sx={{
          display: {
            sm: "none",
          },
          position: {
            xs: "fixed",
            bottom: 24,
            left: "50%",
            transform: "translateX(-50%)",
          },
        }}
      >
        <AddIcon />
      </Fab>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: submitForm,
          //   onSubmit:
          //   (event: React.FormEvent<HTMLFormElement>) => {
          //     event.preventDefault();
          //     const input = new FormData(event.currentTarget).toString;
          //     console.log("input", input);
          //     setNewHabitData(input);
          //     //     const formJson = Object.fromEntries((formData as any).entries()
          //     // );

          //     handleClose();
          //   },
        }}
      >
        <DialogTitle>Add a habit!</DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            // id="name"
            // name="email"
            // label="Email Address"
            value={newHabitData}
            onChange={handleInputChange}
            fullWidth
            variant="standard"
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === "Enter") {
                submitForm(e);
              }
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" onClick={handleClose}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default AddDialog;
