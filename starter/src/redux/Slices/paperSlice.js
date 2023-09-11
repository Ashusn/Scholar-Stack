import { createSlice } from "@reduxjs/toolkit";

const paperSlice = createSlice({
  name: "paper",
  initialState: [],
  reducers: {
    addPaper: (state, action) => {
      state.push(action.payload);
      console.log(action);
    },
    addAuthor: (state, action) => {
      state.push(action.payload);
      console.log(action);
    },
    addCitation: (state, action) => {
      state.push(action.payload);
      console.log(action);
    },
    updatePaper: (state, action) => {
      const updatedPaper = action.payload;
      // Find the index of the paper to update based on its unique identifier (e.g., paperID)
      const indexToUpdate = state.findIndex(
        (paper) => paper.paperID === updatedPaper.paperID
      );

      if (indexToUpdate !== -1) {
        // Replace the existing paper with the updated paper
        state[indexToUpdate] = updatedPaper;
      }
    },
    removePaper: (state, action) => {
      return state.filter((item) => item.paperID !== action.payload);
    },
  },
});

export const { addPaper, removePaper, updatePaper, addCitation, addAuthor } =
  paperSlice.actions;
export default paperSlice.reducer;
