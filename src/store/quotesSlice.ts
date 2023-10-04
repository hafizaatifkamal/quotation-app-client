import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from ".";

const BASE_URL = "http://localhost:3000/api";

export interface QuotesState {
  data: any;
  quote: any;
  status: "idle" | "loading" | "failed";
  errors: string | null;
}

const initialState: QuotesState = {
  data: [],
  quote: {},
  status: "idle",
  errors: null,
};

export const createQuote = createAsyncThunk(
  `quotes`,
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/quotes`, payload);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

export const fetchAllQuotes = createAsyncThunk(
  `quotes/list`,
  async (_: any, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/quotes`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

export const fetchQuotesDetails = createAsyncThunk(
  `quotes/details`,
  async (quoteID: any, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/quotes/${quoteID}/`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

export const updateQuote = createAsyncThunk(
  `quotes/update`,
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${BASE_URL}/quotes/${payload?._id}`,
        payload
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

export const quotesSlice = createSlice({
  name: "quotes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createQuote.pending, (state: any) => {
        state.status = "loading";
      })
      .addCase(createQuote.fulfilled, (state: any) => {
        state.status = "idle";
      })
      .addCase(createQuote.rejected, (state: any) => {
        state.status = "failed";
      });

    builder
      .addCase(fetchAllQuotes.pending, (state: any) => {
        state.status = "loading";
      })
      .addCase(fetchAllQuotes.fulfilled, (state: any, action: any) => {
        state.status = "idle";
        state.data = action.payload?.data;
      })
      .addCase(fetchAllQuotes.rejected, (state: any) => {
        state.status = "failed";
      });

    builder
      .addCase(fetchQuotesDetails.pending, (state: any) => {
        state.status = "loading";
      })
      .addCase(fetchQuotesDetails.fulfilled, (state: any, action: any) => {
        state.status = "idle";
        state.quote = action.payload?.data;
      })
      .addCase(fetchQuotesDetails.rejected, (state: any) => {
        state.status = "failed";
      });

    builder
      .addCase(updateQuote.pending, (state: any) => {
        state.status = "loading";
      })
      .addCase(updateQuote.fulfilled, (state: any) => {
        state.status = "idle";
      })
      .addCase(updateQuote.rejected, (state: any) => {
        state.status = "failed";
      });
  },
});

export const selectQuotes = (state: RootState) => state.quotes;
export default quotesSlice.reducer;
