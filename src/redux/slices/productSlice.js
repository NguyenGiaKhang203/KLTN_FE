import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Gọi API danh sách khóa học
export const fetchCourses = createAsyncThunk(
  "courses/fetchCourses",
  async (params) => {
    const response = await axios.get("/api/courses", { params });
    return response.data;
  }
);

// Gọi API chi tiết khóa học
export const fetchCourseDetails = createAsyncThunk(
  "courses/fetchCourseDetails",
  async (courseId) => {
    const response = await axios.get(`/api/courses/${courseId}`);
    return response.data;
  }
);

const courseSlice = createSlice({
  name: "courses",
  initialState: {
    courseList: [],
    courseDetails: null,
    search: "",
    status: "idle",
    error: null,
  },
  reducers: {
    searchCourse(state, action) {
      state.search = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.courseList = action.payload;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchCourseDetails.fulfilled, (state, action) => {
        state.courseDetails = action.payload;
      });
  },
});

export const { searchCourse } = courseSlice.actions;
export default courseSlice.reducer;
