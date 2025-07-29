import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import * as db from "../Database/index";              // initial JSON

export type CourseType = {
  _id: string;
  name: string;
  number: string;
  startDate: string;
  endDate: string;
  image: string;
  description: string;
};

type CoursesState = {
  courses: CourseType[];
  draft: CourseType;            // used by Dashboard form only
};

export const emptyCourse = (): CourseType => ({
  _id: "0",
  name: "",
  number: "",
  startDate: "",
  endDate: "",
  image: "/images/reactjs.jpg",
  description: "",
});

const initialState: CoursesState = {
  courses: db.courses,          // deep‑copy if you mutate objects
  draft: emptyCourse(),
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    setDraft: (state, action: PayloadAction<CourseType>) => {
      state.draft = action.payload;
    },

    addCourse: (state) => {
      state.courses.push({ ...state.draft, _id: uuidv4() });
      state.draft = emptyCourse();
    },

    updateCourse: (state) => {
      state.courses = state.courses.map((c) =>
        c._id === state.draft._id ? state.draft : c
      );
      state.draft = emptyCourse();
    },

    deleteCourse: (state, action: PayloadAction<string>) => {
      state.courses = state.courses.filter((c) => c._id !== action.payload);
      if (state.draft._id === action.payload) state.draft = emptyCourse();
    },
  },
});

export const { setDraft, addCourse, updateCourse, deleteCourse } =
  coursesSlice.actions;
export default coursesSlice.reducer;
