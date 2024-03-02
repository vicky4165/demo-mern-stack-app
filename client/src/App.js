import * as React from "react";
import { Box } from "@mui/material";
import SearchAppBar from "./components/AppBar";
import Todos from "./components/Todos";
import Drawer from "./components/Drawer";
// import AlertDialog from "./components/AlertDialog";
import FloatingActionButton from "./components/FloatingIcon";
import TodoForm from "./components/TodoForm";
import SnackbarAlert from './components/SnackbarAlert.js';
import "./App.css";

function App() {
  const [snackbarOptions, setSnackbarOptions] = React.useState({
    open: false,
    title: "",
    type: ""
  });
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  // const [dialogOpen, setDialogOpen] = React.useState(false);
  const [formDialogOpen, setFormDialogOpen] = React.useState(false);
  const [todos, setTodos] = React.useState([]);

  const toggleDrawer = (val) =>setDrawerOpen(val);
  // const toggleDialog = (val) =>  setDialogOpen(val);
  const toggleFormDialog = (val) => setFormDialogOpen(val);
  const updateTodos = React.useCallback((newTodos) => {
    if(Array.isArray(newTodos)) {
      setTodos([...newTodos]);
    } else {
      setTodos([...todos, newTodos]);
    }
  }, [todos]);
  const handleSnackbar = React.useCallback((options) => setSnackbarOptions({ ...options }) , []);

  return (
    <>
        <Box>
          <TodoForm handleSnackbar={handleSnackbar} formDialogOpen={formDialogOpen} toggleFormDialog={toggleFormDialog} updateTodos={updateTodos} />
          <FloatingActionButton toggleFormDialog={toggleFormDialog} />
          <SearchAppBar toggleDrawer={toggleDrawer} />
            <Drawer toggleFormDialog={toggleFormDialog} drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} />
            <Todos 
              handleSnackbar={handleSnackbar} 
              // setSelectedTodoId={setSelectedTodoId} 
              todos={todos} 
              updateTodos={updateTodos} 
            />
        </Box>
        <SnackbarAlert {...snackbarOptions} handleSnackbar={handleSnackbar}/>
    </>
  );
}
export default App;