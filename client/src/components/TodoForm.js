import { useDispatch } from "react-redux";
import { saveTodo } from "../redux/reducers/todoReducer";
import { setIsLoading } from "../redux/reducers/loaderReducer";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useSnackbar } from 'notistack';
import { constant } from "../constants";

export default function TodoForm({ formDialogOpen, toggleFormDialog }) {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  
  async function saveTodoMethod(todo_title) {
    toggleFormDialog(false);
    dispatch(setIsLoading({ isLoading: true }));
    try {
      let res = await fetch(`/api/todos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: todo_title }),
      });
      res = await res.json();
      if (res.err == null) {
        const todo = { ...res.data };
        dispatch(saveTodo({ todo: todo }));
        setTimeout(() => enqueueSnackbar('Todo Saved', { autoHideDuration: 3000 }), constant.DEFAULT_TIMEOUT);
      } else {
        console.log("R: ", res);
      }
    } catch (e) {
      console.log("ERR: ", e);
    } finally {
      setTimeout(() => dispatch(setIsLoading({ isLoading: false })), 500);
    }
  }

  return (
    <>
      <Dialog
        open={formDialogOpen}
        onClose={() => toggleFormDialog(false)}
        PaperProps={{
          component: "form",
          onSubmit: async (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            await saveTodoMethod(formJson.todo_title);
          },
        }}
        fullWidth={true}
      >
        <DialogTitle>Add Todo</DialogTitle>
        <DialogContent>
          <DialogContentText>To create todo, please enter todo title here.</DialogContentText>
          <TextField autoFocus required margin="dense" id="todo_title" name="todo_title" label="Todo title goes here" type="text" fullWidth variant="standard" />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => toggleFormDialog(false)} variant="contained" color="secondary">Cancel</Button>
          <Button variant="contained" color="success" type="submit">Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
