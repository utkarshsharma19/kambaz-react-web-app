import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { enrollments as seed } from "../../Database/index"; // initial JSON array

export interface Enrollment {
  user: string;   // user _id
  course: string; // course _id
}

interface State {
  enrollments: Enrollment[];
}

const initialState: State = { enrollments: seed };

const slice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    enroll: (s, { payload }: PayloadAction<Enrollment>) => {
      // avoid dupes
      if (!s.enrollments.find(e => e.user === payload.user && e.course === payload.course)) {
        s.enrollments.push(payload);
      }
    },
    replaceEnrollments: (state, { payload }) => {
      state.enrollments = payload;
    },
    unenroll: (s, { payload }: PayloadAction<Enrollment>) => {
      s.enrollments = s.enrollments.filter(
        e => !(e.user === payload.user && e.course === payload.course)
      );
    },
    toggle: (s, { payload }: PayloadAction<Enrollment>) => {
      const i = s.enrollments.findIndex(
        e => e.user === payload.user && e.course === payload.course
      );
      i === -1 ? s.enrollments.push(payload) : s.enrollments.splice(i, 1);
    },
  },
});

export const { enroll, unenroll, toggle, replaceEnrollments } = slice.actions;
export default slice.reducer;
