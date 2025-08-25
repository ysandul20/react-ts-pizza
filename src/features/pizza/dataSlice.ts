import {
   createAsyncThunk,
   createSlice,
   type PayloadAction,
} from "@reduxjs/toolkit";
import type { PizzaDataType } from "../../app/types";

type DataStateType = {
   pizzas: PizzaDataType[];
   isLoading: boolean;
   error: null | string;
};

const initialState: DataStateType = {
   pizzas: [],
   isLoading: true,
   error: null,
};

type fetchDataParamsType = {
   filterQuery: string;
   sortQuery: string;
};

/* 
createAsyncThunk<
   Returned, - що повертає thunk
   ThunkArg, - які аргументи приймає
   ThunkApiConfig - додаткові опції (state, rejectWithValue)
>;
*/

export const fetchData = createAsyncThunk<
   PizzaDataType[],
   fetchDataParamsType,
   { rejectValue: string }
>("data/fetch", async ({ filterQuery, sortQuery }, { rejectWithValue }) => {
   try {
      const res = await fetch(
         `https://67f176fec733555e24ad443e.mockapi.io/items?${filterQuery}&${sortQuery}`
      );
      if (!res.ok) throw new Error("Failed to fetch");
      const data: PizzaDataType[] = await res.json();
      return data;
   } catch (error) {
      const err = error as Error;
      return rejectWithValue(`Something went wrong, message: ${err.message}`);
   }
});

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
         .addCase(
            fetchData.fulfilled,
            (state, action: PayloadAction<PizzaDataType[]>) => {
               state.isLoading = false;
               state.pizzas = action.payload;
            }
         )
         .addCase(
            fetchData.rejected,
            (state, action: PayloadAction<string | undefined>) => {
               state.isLoading = false;
               state.error = action.payload ?? "Unknown error";
            }
         );
   },
});

export default dataSlice.reducer;
