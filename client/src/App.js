import * as React from "react";
import { Container, Box } from "@mui/material";
import SearchAppBar from "./components/AppBar";
import TodoList from "./components/Todos";
import Drawer from "./components/Drawer";
import AlertDialog from "./components/Dialog";
import FloatingActionButton from "./components/FloatingIcon";
import TodoForm from "./components/TodoForm";
import "./App.css";

function App() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [formDialogOpen, setFormDialogOpen] = React.useState(false);
  const [todos, setTodos] = React.useState([]);

  function toggleDrawer(val) {
    setDrawerOpen(val);
  }
  function toggleDialog(val) {
    setDialogOpen(val);
  }
  function toggleFormDialog(val) {
    setFormDialogOpen(val);
  }
  const updateTodos = React.useCallback((newTodos) => {
    if(Array.isArray(newTodos)) {
      setTodos([...newTodos]);
    } else {
      setTodos([...todos, newTodos]);
    }
  }, [todos]);

  return (
    <Box>
      <TodoForm formDialogOpen={formDialogOpen} toggleFormDialog={toggleFormDialog} updateTodos={updateTodos} />
      <FloatingActionButton toggleFormDialog={toggleFormDialog} />
      <SearchAppBar toggleDrawer={toggleDrawer} />
      <Container maxWidth="">
        <Drawer drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} />
        <TodoList toggleDialog={toggleDialog} todos={todos} updateTodos={updateTodos} />
        <AlertDialog dialogOpen={dialogOpen} toggleDialog={toggleDialog} />
      </Container>
    </Box>
  );
}
export default App;