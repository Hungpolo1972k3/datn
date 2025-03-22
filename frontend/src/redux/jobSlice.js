import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  currentJob: null,
  loading: false,
  error: false,
};

export const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    fetchJob: (state) => {
      state.loading = true;
    },
    fetchSuccess: (state, action) => {
      state.loading = false;
      state.currentJob = action.payload;
    },
    fetchFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});
export const { fetchJob, fetchSuccess, fetchFailure } = jobSlice.actions;
export default jobSlice.reducer;
