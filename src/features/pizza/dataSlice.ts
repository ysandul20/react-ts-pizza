import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
   pizzas: [],
   isLoading: true,
   error: null,
};

export const fetchData = createAsyncThunk(
   "data/fetch",
   async ({ filterQuery, sortQuery }, { rejectWithValue }) => {
      try {
         const res = await fetch(
            `https://67f176fec733555e24ad443e.mockapi.io/items?${filterQuery}&${sortQuery}`
         );
         if (!res.ok) throw new Error("Failed to fetch");
         const data = res.json();
         return data;
      } catch (error) {
         return rejectWithValue(
            `Something went wrong, message: ${error.message}`
         );
      }
   }
);

export const dataSlice = createSlice({
   name: "data",
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(fetchData.pending, (state) => {
            state.isLoading = true;
            state.error = null;
         })
         .addCase(fetchData.fulfilled, (state, action) => {
            state.isLoading = false;
            state.pizzas = action.payload;
         })
         .addCase(fetchData.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
         });
   },
});

export default dataSlice.reducer;
