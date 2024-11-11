import { ChangeEvent, FC, FormEvent, KeyboardEvent, useState } from "react";
import { nanoid } from "nanoid";
import { Box, IconButton, TextField } from "@mui/material";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
// import { Theme } from "@mui/material/styles"
import AddBoxProps from "../../types/AddBoxProps.tsx";

const AddBox: FC<AddBoxProps> = ({ addHabit }) => {
  const [newHabitData, setNewHabitData] = useState<string>("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewHabitData(e.target.value);
  };

  const submitForm = (e: FormEvent<HTMLFormElement> | KeyboardEvent) => {
    if (newHabitData.trim()) {
      e.preventDefault();
      const habitId = nanoid(7);
      addHabit(habitId, newHabitData);
      setNewHabitData("");
    }
  };

  return (
    <>
      <Box
        sx={{
          display: {
            xs: "none",
            sm: "block",
          },
        }}
      >
        <form onSubmit={submitForm}>
          <Box
            sx={{
              backgroundColor: "",
              border: "1px solid #000",
              borderRadius: 8,
              display: "flex",
              flexDirection: "row",
              // columnGap: 2,
              marginBottom: 4,
              paddingLeft: 4,
              paddingRight: 1,
              paddingTop: 0,
              paddingBottom: 0,
            }}
          >
            <TextField
              id="standard-basic"
              label="Add a habit"
              variant="standard"
              fullWidth
              // margin="normal"
              onChange={handleInputChange}
              value={newHabitData}
              onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
                if (e.key === "Enter") {
                  submitForm(e);
                }
              }}
            />

            <IconButton
              color="success"
              size="large"
              aria-label="add"
              type="submit"
              disabled={!newHabitData}
              sx={{}}
            >
              <ArrowCircleUpIcon
                sx={{
                  fontSize: 38,
                }}
              />
            </IconButton>
          </Box>
        </form>
      </Box>
    </>
  );
};

export default AddBox;
