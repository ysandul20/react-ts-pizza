import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { PizzaDataType } from "../../app/types";

const apiURL = "https://67f176fec733555e24ad443e.mockapi.io";

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
type determineQueryStringType = {
  filterQuery: string;
  sortQuery: string;
};
function makeQueryString({ filterQuery, sortQuery }: determineQueryStringType) {
  if (filterQuery && sortQuery) return `${apiURL}/items?${filterQuery}&${sortQuery}`;
  else if (!filterQuery && sortQuery) return `${apiURL}/items?${sortQuery}`;
  else return `${apiURL}/items`;
}

export const fetchData = createAsyncThunk<PizzaDataType[], fetchDataParamsType, { rejectValue: string }>(
  "data/fetch",
  async (params, { rejectWithValue }) => {
    try {
      const { filterQuery, sortQuery } = params;
      console.log("current filter and sort", filterQuery, sortQuery);
      const res = await fetch(makeQueryString({ filterQuery, sortQuery }));

      if (!res.ok) throw new Error("Failed to fetch");
      const data: PizzaDataType[] = await res.json();
      return data;
    } catch (error) {
      const err = error as Error;
      return rejectWithValue(`Something went wrong, message: ${err.message}`);
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
      .addCase(fetchData.fulfilled, (state, action: PayloadAction<PizzaDataType[]>) => {
        state.isLoading = false;
        state.pizzas = action.payload;
      })
      .addCase(fetchData.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.isLoading = false;
        state.error = action.payload ?? "Unknown error";
      });
  },
});

export default dataSlice.reducer;
