import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export default function TodoForm({ handleSnackbar, todoId, handleUpdateTodo }) {
  const API_URL = `/api/todos/${todoId}`;
  const [open, setOpen] = useState(false);
  const [todoTitle, setTodoTitle] = useState("");

  useEffect(() => {
    async function fetchTodoDetails() {
      try {
        let res = await fetch(API_URL);
        res = await res.json();
        console.log("Res: ", res);
        if (res.err == null) {
          setTodoTitle(res.data.title ?? "");
          setOpen(true);
        }
      } catch (e) {
        console.log("ERR: ", e);
      }
    }
    fetchTodoDetails();
  }, [API_URL]);

  async function updateTodo(todo_title) {
    try {
      let res = await fetch(API_URL, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: todo_title }),
      });
      res = await res.json();
      if (res.err == null) {
        console.log("Res: ", res);
        const todo = { ...res.data };
        handleUpdateTodo(todo)
        handleSnackbar({ title: "Todo Updated", type: "success", open: true });
      } else {
        console.log("R: ", res);
      }
      setOpen(false);
    } catch (e) {
      console.log("ERR: ", e);
    }
  }

  return (
    <>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          component: "form",
          onSubmit: async (e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            await updateTodo(formJson.edit_todo_title);
          },
        }}
        fullWidth={true}
      >
        <DialogTitle>Edit Todo</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="edit_todo_title"
            name="edit_todo_title"
            label="Update Todo title here"
            type="text"
            fullWidth
            variant="standard"
            value={todoTitle}
            onChange={e => setTodoTitle(e.currentTarget.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpen(false)}
            variant="contained"
            color="secondary"
          >
            Cancel
          </Button>
          <Button variant="contained" color="success" type="submit">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
