import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../apiService";
import { fetchBooks } from "./bookAPI";
import { toast } from "react-toastify";

const initialState = {
  books: [],
  readingList: [],
  bookDetail: null,
  status: null,
};

export const addToReadingList = createAsyncThunk(
  "book/addToReadingList",
  async (book) => {
    const response = await api.post("/favorites", book);
    return response.data;
  }
);

export const getReadingList = createAsyncThunk(
  "book/getReadingList ",
  async () => {
    const response = await api.get("/favorites");
    return response.data;
  }
);

export const removeBook = createAsyncThunk(
  "book/removeBook ",
  async (removeBookId) => {
    const response = await api.delete(`/favorites/${removeBookId}`);
    return response.data;
  }
);

export const getBookDetail = createAsyncThunk(
  "book/getBookDetail ",
  async (bookId) => {
    const response = await api.get(`/books/${bookId}`);
    return response.data;
  }
);

export const fetchData = createAsyncThunk("book/fetchData ", async (props) => {
  const response = await fetchBooks(props);
  return response.data;
});

export const bookSlice = createSlice({
  name: "book",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = null;
        state.books = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = "failed";
      });
    builder
      .addCase(addToReadingList.pending, (state) => {
        toast.loading();
      })
      .addCase(addToReadingList.fulfilled, (state, action) => {
        toast.success("Added to reading list!");
      })
      .addCase(addToReadingList.rejected, (state, action) => {
        toast.error(action.error.message);
      });
    builder
      .addCase(getReadingList.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getReadingList.fulfilled, (state, action) => {
        state.status = null;
        state.readingList = action.payload;
      })
      .addCase(getReadingList.rejected, (state, action) => {
        state.status = "failed";
      });
    builder
      .addCase(removeBook.pending, (state) => {
        state.status = "pending";
      })
      .addCase(removeBook.fulfilled, (state, action) => {
        state.status = null;
        toast.success("removed");
      })
      .addCase(removeBook.rejected, (state, action) => {
        state.status = "Failed to remove bool";
      });
    builder
      .addCase(getBookDetail.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getBookDetail.fulfilled, (state, action) => {
        state.status = null;
        state.bookDetail = action.payload;
      })
      .addCase(getBookDetail.rejected, (state, action) => {
        state.status = "Failed to remove book";
      });
  },
});

export default bookSlice.reducer;
