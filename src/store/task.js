import { createSlice } from "@reduxjs/toolkit";
import { getRandomArbitrary } from "../services/random";
import todosService from "../services/todos.service";
import { setError } from "./errors";

const initialState = { entities: [], isLoading: true };

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    received(state, action) {
      state.entities = action.payload;
      state.isLoading = false;
    },
    update(state, action) {
      const elementIndex = state.entities.findIndex(
        (el) => el.id === action.payload.id
      );
      state.entities[elementIndex] = {
        ...state.entities[elementIndex],
        ...action.payload,
      };
    },
    remove(state, action) {
      state.entities = state.entities.filter((t) => t.id !== action.payload.id);
    },
    taskAdded(state, action) {
      state.entities.push(action.payload);
      state.isLoading = false;
    },
    loadTasksRequested(state) {
      state.isLoading = true;
    },

    taskRequestFailed(state) {
      state.isLoading = false;
    },
  },
});

const { actions, reducer: taskReducer } = taskSlice;
const {
  update,
  remove,
  taskAdded,
  received,
  taskRequestFailed,
  loadTasksRequested,
} = actions;

export const loadTasks = () => async (dispatch) => {
  dispatch(loadTasksRequested());
  try {
    const data = await todosService.fetch();
    dispatch(received(data));
  } catch (error) {
    dispatch(taskRequestFailed());
    dispatch(setError(error.message));
  }
};

export const createTask = () => async (dispatch) => {
  try {
    const data = await todosService.create(
      taskAdded({
        userId: getRandomArbitrary(200, 300),
        title: "New Task",
        completed: false,
      })
    );
    dispatch(taskAdded(data));
  } catch (error) {
    dispatch(taskRequestFailed());
    dispatch(setError(error.message));
  }
};

export const completeTask = (id) => (dispatch) => {
  dispatch(update({ id, completed: true }));
};

export function titleChanged(id) {
  return update({ id, title: `New title for ${id}` });
}

export function taskDeleted(id) {
  return remove({ id });
}

export const getTasks = () => (state) => state.tasks.entities;
export const getTasksLoadingStatus = () => (state) => state.tasks.isLoading;

export default taskReducer;
