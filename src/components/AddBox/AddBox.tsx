import { useEffect } from "react";
import { ChangeEvent, FC, FormEvent, KeyboardEvent, useState } from "react";
import { nanoid } from "nanoid";
import { Box, IconButton, TextField } from "@mui/material";
import AddBoxProps from "../../types/AddBoxProps.tsx";
import { useSpring, animated } from "@react-spring/web";

interface ReactSpringTransitionProps {
  children: React.ReactNode;
  trigger: boolean;
}

export function ReactSpringTransition({
  children,
  trigger,
}: ReactSpringTransitionProps) {
  const [springs, api] = useSpring(() => ({
    from: { opacity: 0, transform: "translateY(-8px) scale(0.95)" },
    to: { opacity: 0, transform: "translateY(-8px) scale(0.95)" },
  }));

  useEffect(() => {
    if (trigger) {
      api.start({
        opacity: 1,
        transform: "translateY(0) scale(1)",
        config: { tension: 250, friction: 10 },
      });
    } else {
      api.start({
        opacity: 0,
        transform: "translateY(-8px) scale(0.95)",
        config: { tension: 170, friction: 26 },
      });
    }
  }, [trigger, api]);

  return <animated.div style={springs}>{children}</animated.div>;
}

const AddBox: FC<AddBoxProps> = ({ addHabit }) => {
  const [newHabitData, setNewHabitData] = useState<string>("");
  const [showSubmitBtn, setShowSubmitBtn] = useState<boolean>(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewHabitData(e.target.value);
    // if (newHabitData) setShowSubmitBtn(true);
  };

  useEffect(() => {
    if (newHabitData) {
      setShowSubmitBtn(true);
    } else {
      setShowSubmitBtn(false);
    }
  }, [newHabitData]);

  const submitForm = (e: FormEvent<HTMLFormElement> | KeyboardEvent) => {
    if (newHabitData.trim()) {
      e.preventDefault();
      const habitId = nanoid(7);
      addHabit(habitId, newHabitData);
      setNewHabitData("");
      setShowSubmitBtn(false);
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
            {showSubmitBtn && (
              <ReactSpringTransition trigger={showSubmitBtn}>
                <IconButton
                  color="success"
                  size="large"
                  aria-label="add"
                  type="submit"
                  disabled={!newHabitData}
                  sx={{}}
                >
                  <img
                    src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20100%20100%22%3E%3Ctext%20y%3D%22.9em%22%20font-size%3D%2290%22%3E%F0%9F%A5%95%3C%2Ftext%3E%3C%2Fsvg%3E"
                    width="32"
                    height="32"
                    alt="Carrot Icon"
                  />
                </IconButton>
              </ReactSpringTransition>
            )}
          </Box>
        </form>
      </Box>
    </>
  );
};

export default AddBox;
