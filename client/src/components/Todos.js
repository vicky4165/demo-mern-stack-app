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
import EditTodoForm from './EditTodoForm';

export default function TodoList({ todos, updateTodos, handleSnackbar }) {
  const [checked, setChecked] = useState([0]);
  const [selectedTodoId, setSelectedTodoId] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editFlag, setEditFlag] = useState(false);

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
    // console.log('id - ', id);
    setSelectedTodoId(id);
    setEditFlag(true);
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
        setSelectedTodoId("");
      } else {
        console.log("R: ", res);
      }
      toggleDialog(false);
    } catch (e) {
      console.log("ERR: ", e);
    }
  }
  const handleUpdateTodo = ({ title, _id }) => {
    let index = todos.findIndex(todo => todo._id === _id);
    todos[index].title = title;
    updateTodos(todos);
    setEditFlag(false);
    setSelectedTodoId("");
  }
  const handleCheckboxChange = (e) => {
    console.log(e)
    console.log(e.target.attributes)
    console.log(e.target.checked)
    console.log(e.currentTarget.id);
    const todoId = e.currentTarget.id;
    let index = todos.findIndex(todo => todo._id === todoId);
    todos[index].isCompleted = e.target.checked;
    updateTodos(todos);
    // setEditFlag(false);
    // setSelectedTodoId("");
  }

  return (
    <>
      {(editFlag && selectedTodoId) && <EditTodoForm handleUpdateTodo={handleUpdateTodo} handleSnackbar={handleSnackbar} todoId={selectedTodoId} />}
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
                    id={todo._id}
                    onChange={handleCheckboxChange}
                    checked={todo.isCompleted}
                    // checked={checked.indexOf(todo._id) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </ListItemIcon>
                <ListItemText className={todo.isCompleted ? 'todo-title-text' : ''} id={labelId} primary={`${todo.title}`} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </>
  );
}