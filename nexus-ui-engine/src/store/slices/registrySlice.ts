import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAvailableWidgets = createAsyncThunk(
  "registry/fetchWidgets",
  async () => {
    const response = await fetch("/api/widgets");
    return response.json();
  },
);

const registrySlice = createSlice({
  name: "registry",
  initialState: { items: [], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAvailableWidgets.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loading = false;
    });
  },
});

export default registrySlice.reducer;
