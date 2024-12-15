// src/store.js
import { configureStore, createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  jobs: [],
  display: false,
  selectedJob: {},
};

const initialAuthState = {
    user: null, 
    token: null, 
};

// Create job slice
const jobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    setJobs(state, action) {
      state.jobs = action.payload;
    },
    addJob(state, action) {
      state.jobs.push(action.payload);
    },
    updateJob(state, action) {
      const index = state.jobs.findIndex((job) => job._id === action.payload._id);
      if (index !== -1) {
        state.jobs[index] = action.payload;
      }
    },
    deleteJob(state, action) {
      state.jobs = state.jobs.filter((job) => job._id !== action.payload);
    },
    toggleDisplay(state) {
        state.display = !state.display;
    },
    setDisplay(state, action) {
        state.display = action.payload;
    },
    setSelectedJob(state, action) {
        state.selectedJob = action.payload;
    }
  },
});

//auth slice
const authSlice = createSlice({
    name: "auth",
    initialState: initialAuthState,
    reducers: {
      setUser(state, action) {
        state.user = action.payload.user;
        state.token = action.payload.token;
      },
      logout(state) {
        state.user = null;
        state.token = null;
      },
    },
  });

// Export actions for use in components
export const { setJobs, addJob, updateJob, deleteJob, toggleDisplay, setDisplay, setSelectedJob } = jobSlice.actions;

export const { setUser, logout } = authSlice.actions;

// Configure store with job reducer
const store = configureStore({
  reducer: {
    jobs: jobSlice.reducer,
    auth: authSlice.reducer,
  },
});

export default store;
