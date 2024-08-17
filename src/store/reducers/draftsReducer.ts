import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type Draft = {
  id: string;
  themeId: string;
  content: string;
};

type DraftState = {
  drafts: Record<string, Draft>;
};

const initialState: DraftState = {
  drafts: {},
};

const draftsSlice = createSlice({
  name: "drafts",
  initialState,
  reducers: {
    newDraft(state, action: PayloadAction<Draft>) {
      state.drafts[action.payload.id] = action.payload;
    },
  },
});

export const draftsActions = {
  ...draftsSlice.actions,
};

export default draftsSlice.reducer;
