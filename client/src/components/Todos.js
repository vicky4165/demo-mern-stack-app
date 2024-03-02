import { useEffect, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

export default function TodoList({ todos, updateTodos, toggleDialog }) {
  const [checked, setChecked] = useState([0]);
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
  }, [updateTodos]);

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

  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {todos && todos.map((todo) => {
        const labelId = `checkbox-list-label-${todo._id}`;
        return (
          <ListItem
            key={todo._id}
            secondaryAction={
              <IconButton edge="end" aria-label="comments" onClick={() => toggleDialog(true)}>
                <DeleteIcon />
              </IconButton>
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
  );
}