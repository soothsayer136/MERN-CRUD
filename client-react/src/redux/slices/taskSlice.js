import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    isTableDisplay: false,
  },

  reducers: {
    fetchTasks: (state, action) => {
      state.tasks = action.payload;
    },
    displayTable: (state, action) => {
      state.isTableDisplay = action.payload.showTable;
    },
  },
});

export const { fetchTasks, displayTable } = taskSlice.actions;
export default taskSlice.reducer;
