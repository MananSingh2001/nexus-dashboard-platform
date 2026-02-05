import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Define the shape of our Widget based on our Spring Boot Entity
export interface Widget {
  id: number;
  name: string;
  entryPointUrl: string;
  requiredRole: string;
  configSchema: string; // We'll parse this JSON string later
}

interface WidgetState {
  items: Widget[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: WidgetState = {
  items: [],
  status: "idle",
  error: null,
};

// Async thunk to fetch widgets from the Spring Boot API
export const fetchWidgets = createAsyncThunk(
  "widgets/fetchWidgets",
  async (role: string) => {
    const response = await fetch(
      `http://localhost:8080/api/v1/widgets?role=${role}`,
    );
    if (!response.ok) throw new Error("Failed to fetch widgets");
    return (await response.json()) as Widget[];
  },
);

const widgetSlice = createSlice({
  name: "widgets",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWidgets.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWidgets.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchWidgets.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export default widgetSlice.reducer;
