import { createSlice } from '@reduxjs/toolkit'

export const todoSlice = createSlice({
  name: 'todo',
  initialState: {
    todos: []
  },
  reducers: {
    saveTodo: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      // state.todos.push(action.payload);
      state.todos.unshift(action.payload.todo);
    },
    deleteTodo: (state, action) => {
      let todos = state.todos.filter(todo => todo._id !== action.payload.todo._id);
      state.todos = [...todos];
    },
    updateTodo: (state, action) => {
      state.todos = [...action.payload.todos]
    }
  }
})

export const { saveTodo, deleteTodo, updateTodo } = todoSlice.actions;
export const selectTodos = state => state.todo.todos;

export default todoSlice.reducer