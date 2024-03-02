import { useEffect, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete';
import AlertDialog from "./AlertDialog";
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';

export default function TodoList({ todos, updateTodos, handleSnackbar }) {
  const [checked, setChecked] = useState([0]);
  const [selectedTodoId, setSelectedTodoId] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    async function fetchTodos() {
      try {
        let res = await fetch(`/api/todos`);
        res = await res.json();
        updateTodos(res.data ?? []);
      } catch (e) {
        console.log('ERR: ', e);
      }
    }
    fetchTodos();
  }, []);
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };
  const toggleDialog = (val) =>  setDialogOpen(val);
  const handleClickOnDelete = (id) => {
    toggleDialog(true)
    setSelectedTodoId(id)
  };
  const handleClickOnEdit = (id) => {
    console.log('id - ', id);
  };
  const deleteTodo = async () => {
    try {
      let res = await fetch(`/api/todos/${selectedTodoId}`, { method: "DELETE" });
      res = await res.json();
      if (res.err == null) {
        console.log('Res: ', res);
        handleSnackbar({ title: "Todo Deleted", type: "success", open: true });
        const updatedTodos = todos.filter(item => item._id !== selectedTodoId);
        updateTodos(updatedTodos);
      } else {
        console.log("R: ", res);
      }
      toggleDialog(false);
    } catch (e) {
      console.log("ERR: ", e);
    }
  }

  return (
    <>
      {selectedTodoId && <AlertDialog dialogOpen={dialogOpen} toggleDialog={toggleDialog} deleteTodo={deleteTodo} />}
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {todos && todos.map((todo) => {
          const labelId = `checkbox-list-label-${todo._id}`;
          return (
            <ListItem
              key={todo._id}
              secondaryAction={
                <>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      border: '1px solid',
                      borderColor: 'divider',
                      borderRadius: 2,
                      bgcolor: 'background.paper',
                      color: 'text.secondary',
                      '& svg': {
                        m: 1,
                      },
                    }}
                  >
                    <EditIcon onClick={() => handleClickOnEdit(todo._id)} />
                    <Divider orientation="vertical" variant="middle" flexItem />
                    <DeleteIcon onClick={() => handleClickOnDelete(todo._id)} />
                  </Box>                 
                </>
              }
            >
              <ListItemButton role={undefined} onClick={handleToggle(todo._id)} dense>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={checked.indexOf(todo._id) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={`${todo.title}`} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </>
  );
}