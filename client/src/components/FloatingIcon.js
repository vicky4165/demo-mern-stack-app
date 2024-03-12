import * as React from "react";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

const fabStyle = {
  position: "absolute",
  bottom: 16,
  right: 16,
};

export default function FloatingActionButton({ toggleFormDialog }) {
  return (
    <Box sx={{ "& > :not(style)": { m: 1 } }}>
      <Fab color="primary" aria-label="add" style={fabStyle} onClick={() => toggleFormDialog(true)}>
        <AddIcon />
      </Fab>
    </Box>
  );
}