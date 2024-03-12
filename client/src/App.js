import { useState } from "react";
import { useSelector } from 'react-redux';
import { isLoading } from "./redux/reducers/loaderReducer.js";
import { Box } from "@mui/material";
import SearchAppBar from "./components/AppBar";
import Todos from "./components/Todos";
import Drawer from "./components/Drawer";
import FloatingActionButton from "./components/FloatingIcon";
import TodoForm from "./components/TodoForm";
import Loader from "./components/Loader.js";

function App() {

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [formDialogOpen, setFormDialogOpen] = useState(false);
  const toggleDrawer = (val) =>setDrawerOpen(val);
  const toggleFormDialog = (val) => setFormDialogOpen(val);
  const showLoader = useSelector(isLoading);

  return (
    <>
      <Box>
        <TodoForm formDialogOpen={formDialogOpen} toggleFormDialog={toggleFormDialog} />
        <FloatingActionButton toggleFormDialog={toggleFormDialog} />
        <SearchAppBar toggleDrawer={toggleDrawer} />
          <Drawer toggleFormDialog={toggleFormDialog} drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} />
          <Todos />
      </Box>
      {showLoader && <Loader />}
    </>
  );
}
export default App;