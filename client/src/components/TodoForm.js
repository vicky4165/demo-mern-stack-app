import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
// let d = { todos, setTodos, formDialogOpen, toggleFormDialog };
export default function TodoForm({ formDialogOpen, toggleFormDialog, updateTodos }) {

  async function saveTodo(todo_title) {
    try {
      let res = await fetch(`/api/todos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: todo_title }),
      });
      res = await res.json();
      if (res.err == null) {
        console.log('Res: ', res);
        const todo = { ...res.data };
        updateTodos(todo);
      } else {
        console.log("R: ", res);
      }
      toggleFormDialog(false);
    } catch (e) {
      console.log("ERR: ", e);
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
            await saveTodo(formJson.todo_title);
          },
        }}
        fullWidth={true}
      >
        <DialogTitle>Add Todo</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To create todo, please enter todo title here.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="todo_title"
            name="todo_title"
            label="Todo title goes here"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => toggleFormDialog(false)}>Cancel</Button>
          <Button type="submit">Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
