import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const initialState = {
  todos: [],
  loading: false,
};

export const getTodos = createAsyncThunk("todos/get", async (_, thunkAPI) => {
  try {
    const res = await fetch("http://localhost:4000/todos");
    return res.json();
  } catch (e) {
    return thunkAPI.rejectWithValue(e);
  }
});
export const delTodos = createAsyncThunk("todos/del", async (el, thunkAPI) => {
  try {
    await fetch(`http://localhost:4000/todos/${el._id}`, {
      method: "DELETE",
    });
    console.log(el._id)
    return el._id;
  } catch (e) {
    return thunkAPI.rejectWithValue(e);
  }
});
export const addTodos = createAsyncThunk(
  "todos/add",
  async (text, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:4000/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      return res.json();
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);
export const changeTodos = createAsyncThunk(
  "todos/patch",
  async (el, thunkAPI) => {
    try {
      const res = await fetch(`http://localhost:4000/todos/${el._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !el.completed }),
      });
      return res.json();
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTodos.fulfilled, (state, action) => {
        state.todos = action.payload;
        state.loading = false;
      })
      .addCase(getTodos.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(delTodos.fulfilled, (state, action) => {
        state.todos = state.todos.filter((el) => el._id !== action.payload);
      })
      .addCase(addTodos.fulfilled, (state, action) => {
        state.todos.push(action.payload);
        state.loading = false
      })

      .addCase(addTodos.pending, (state, action) => {
        state.loading = true
      })
      
      .addCase(changeTodos.fulfilled, (state, action) => {
        state.todos = state.todos.map((el) => {
          if (el._id === action.payload._id) {
            return action.payload;
          }
          return el;
        });
      });
  },
});
export default todoSlice.reducer;
