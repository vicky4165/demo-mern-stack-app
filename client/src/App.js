import { useState, useCallback } from "react";
import { Box } from "@mui/material";
import SearchAppBar from "./components/AppBar";
import Todos from "./components/Todos";
import Drawer from "./components/Drawer";
import FloatingActionButton from "./components/FloatingIcon";
import TodoForm from "./components/TodoForm";
import SnackbarAlert from './components/SnackbarAlert.js';

function App() {
  const [snackbarOptions, setSnackbarOptions] = useState({ open: false, title: "", type: "" });
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [formDialogOpen, setFormDialogOpen] = useState(false);
  const [todos, setTodos] = useState([]);

  const toggleDrawer = (val) =>setDrawerOpen(val);
  const toggleFormDialog = (val) => setFormDialogOpen(val);
  const updateTodos = useCallback((newTodos) => {
    if(Array.isArray(newTodos)) {
      setTodos([...newTodos]);
    } else {
      setTodos([...todos, newTodos]);
    }
  }, [todos]);
  const handleSnackbar = useCallback((options) => setSnackbarOptions({ ...options }) , []);

  return (
    <>
      <Box>
        <TodoForm handleSnackbar={handleSnackbar} formDialogOpen={formDialogOpen} toggleFormDialog={toggleFormDialog} updateTodos={updateTodos} />
        <FloatingActionButton toggleFormDialog={toggleFormDialog} />
        <SearchAppBar toggleDrawer={toggleDrawer} />
          <Drawer toggleFormDialog={toggleFormDialog} drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} />
          <Todos handleSnackbar={handleSnackbar} todos={todos} updateTodos={updateTodos} />
      </Box>
      <SnackbarAlert {...snackbarOptions} handleSnackbar={handleSnackbar}/>
    </>
  );
}
export default App;