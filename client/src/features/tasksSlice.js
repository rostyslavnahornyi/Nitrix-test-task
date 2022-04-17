import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    tasks: [],
};

export const fetchTasks = createAsyncThunk(
    "tasks/fetchTasks",
    async (_, { rejectWithValue, dispatch }) => {
        const res = await axios.get("/app/");

        dispatch(get(res.data));
    }
);

export const createTask = createAsyncThunk(
    "tasks/createTask",
    async ({ name }, { rejectWithValue, dispatch }) => {
        const newTask = { name };

        const task = await axios.post("/app/", newTask);
        dispatch(create(task.data));
    }
);

export const updateTask = createAsyncThunk(
    "tasks/updateTask",
    async ({ _id, name, status }, { rejectWithValue, dispatch }) => {
        const updatedTask = { _id, name, status };

        await axios.patch("/app/", updatedTask);
        dispatch(update(updatedTask));
    }
);

export const deleteTask = createAsyncThunk(
    "tasks/deteleTask",
    async ({ _id }, { rejectWithValue, dispatch }) => {
        await axios.delete("/app/", { data: { _id } });
        dispatch(remove(_id));
    }
);

export const tasksSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        get: (state, action) => {
            state.tasks = action.payload;
        },
        create: (state, action) => {
            state.tasks.push(action.payload);
        },
        update: (state, action) => {
            const index = state.tasks.findIndex(
                (task) => task._id === action.payload._id
            );
            state.tasks.splice(index, 1, action.payload);
        },
        remove: (state, action) => {
            state.tasks = state.tasks.filter((task) => task._id !== action.payload);
        },
    },
    extraReducers: {
        [fetchTasks.pending]: (state, action) => {state.status = 'pending'},
        [fetchTasks.fulfilled]: (state, action) => {state.status = 'fulfilled'},
        [fetchTasks.rejected]: (state, action) => {state.status = 'rejected'},
    }
});

export const { get, create, update, remove } = tasksSlice.actions;
export default tasksSlice.reducer;
