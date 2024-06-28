import { createSlice } from '@reduxjs/toolkit';

const storySlice = createSlice({
  name: 'story',
  initialState: {
    currentStory: null,
    currentNode: null,
    storyHistory: [],
    userChoices: [],
  },
  reducers: {
    setCurrentStory: (state, action) => {
      state.currentStory = action.payload;
      state.currentNode = action.payload.startNode;
      state.storyHistory = [];
      state.userChoices = [];
    },
    progressStory: (state, action) => {
      state.storyHistory.push(state.currentNode);
      state.currentNode = action.payload.nextNode;
      state.userChoices.push(action.payload.choice);
    },
  },
});

export const { setCurrentStory, progressStory } = storySlice.actions;
export default storySlice.reducer;
