import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectTodos, updateTodo, deleteTodo } from "../redux/reducers/todoReducer";
import { setIsLoading } from "../redux/reducers/loaderReducer";
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

export default function TodoList({ handleSnackbar }) {
  const [selectedTodoId, setSelectedTodoId] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editFlag, setEditFlag] = useState(false);

  const todosList = useSelector(selectTodos);
  const dispatch = useDispatch();
  
  useEffect(() => {
    async function fetchTodos() {
      dispatch(setIsLoading({ isLoading: true }));
      try {
        let res = await fetch(`/api/todos`);
        res = await res.json();
        const dbTodos = res.data ?? [];
        dispatch(updateTodo({ todos: dbTodos }));
      } catch (e) {
        console.log('ERR: ', e);
      } finally {
        setTimeout(() => dispatch(setIsLoading({ isLoading: false })), 500);
      }
    }
    fetchTodos();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const toggleDialog = (val) =>  setDialogOpen(val);
  const handleClickOnDelete = (id) => {
    toggleDialog(true)
    setSelectedTodoId(id)
  };
  const handleClickOnEdit = (id) => {
    setSelectedTodoId(id);
    setEditFlag(true);
  };
  const resetClickOnEdit = () => {
    setSelectedTodoId("");
    setEditFlag(false);
  };
  const deleteTodoMethod = async () => {
    dispatch(setIsLoading({ isLoading: true }));
    try {
      let res = await fetch(`/api/todos/${selectedTodoId}`, { method: "DELETE" });
      res = await res.json();
      if (res.err == null) {
        dispatch(deleteTodo({ todo: { _id: selectedTodoId } }));
        setSelectedTodoId("");
        handleSnackbar({ title: "Todo Deleted", type: "success", open: true });
      } else {
        console.error("R: ", res);
      }
    } catch (e) {
      console.error("ERR: ", e);
    } finally {
      toggleDialog(false);
      setTimeout(() => dispatch(setIsLoading({ isLoading: false })), 500);
    }
  }
  const handleToggleCheckbox = (todoId) => async () => {
    dispatch(setIsLoading({ isLoading: true }));
    const API_URL = `/api/todos/${todoId}`;
    try {
      let todos = [...todosList];
      let index = todos.findIndex(todo => todo._id === todoId);
      let isCompleted = !todos[index].isCompleted;      
      todos[index] = { ...todos[index], isCompleted: isCompleted };
      let res = await fetch(API_URL, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isCompleted }),
      });
      res = await res.json();
      if (res.err == null) {
        dispatch(updateTodo({ todos: todos }));
        handleSnackbar({ title: "Todo Updated", type: "success", open: true });
      } else {
        console.error("R: ", res);
      }
    } catch (e) {
      console.error("ERR: ", e);
    } finally {
      setTimeout(() => dispatch(setIsLoading({ isLoading: false })), 500);
    }
  };

  return (
    <>
      {(editFlag && selectedTodoId) && <EditTodoForm todoId={selectedTodoId} handleSnackbar={handleSnackbar} resetClickOnEdit={resetClickOnEdit} />}
      {selectedTodoId && <AlertDialog dialogOpen={dialogOpen} toggleDialog={toggleDialog} deleteTodoMethod={deleteTodoMethod} />}
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {todosList && todosList.map((todo) => {
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
                      color: 'text.secondary', '& svg': { m: 1, },
                    }}
                  >
                    <EditIcon onClick={() => handleClickOnEdit(todo._id)} />
                    <Divider orientation="vertical" variant="middle" flexItem />
                    <DeleteIcon onClick={() => handleClickOnDelete(todo._id)} />
                  </Box>                 
                </>
              }
            >
              <ListItemButton role={undefined} onClick={handleToggleCheckbox(todo._id)} dense>
                <ListItemIcon>
                  <Checkbox edge="start" id={todo._id} checked={todo.isCompleted} tabIndex={-1} disableRipple inputProps={{ 'aria-labelledby': labelId }} />
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