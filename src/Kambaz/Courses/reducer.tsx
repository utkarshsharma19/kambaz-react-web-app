import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

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
  courses: CourseType[];   // data shown in Dashboard
  draft  : CourseType;     // used by the form in Dashboard
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

/* ---------- initial store ---------- */
const initialState: CoursesState = {
  courses: [],             // start empty; filled from the server
  draft  : emptyCourse(),
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    /* copy a course into the Dashboard form */
    setDraft: (state, action: PayloadAction<CourseType>) => {
      state.draft = action.payload;
    },

    /* server just returned a new course → append to list */
    addCourse: (state, { payload }: PayloadAction<CourseType>) => {
      state.courses.push(payload);
      state.draft = emptyCourse();
    },

    /* server just returned an updated course → replace in list */
    updateCourse: (state, { payload }: PayloadAction<CourseType>) => {
      state.courses = state.courses.map((c) =>
        c._id === payload._id ? payload : c
      );
      state.draft = emptyCourse();
    },

    /* server confirmed deletion → filter it out */
    deleteCourse: (state, action: PayloadAction<string>) => {
      state.courses = state.courses.filter((c) => c._id !== action.payload);
      if (state.draft._id === action.payload) state.draft = emptyCourse();
    },

    /* wholesale replacement (used after fetchAllCourses) */
    replaceCourses: (state, { payload }: PayloadAction<CourseType[]>) => {
      state.courses = payload;
    },
  },
});

export const {
  setDraft,
  addCourse,
  updateCourse,
  deleteCourse,
  replaceCourses,     // ← newly exported
} = coursesSlice.actions;

export default coursesSlice.reducer;
