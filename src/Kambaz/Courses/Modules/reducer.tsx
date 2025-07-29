import { createSlice } from "@reduxjs/toolkit";
import { modules as seedModules } from "../../Database";
import { v4 as uuidv4 } from "uuid";

/* ---------- State ---------- */
const initialState = {
  modules: seedModules,
};

/* ---------- Slice ---------- */
const modulesSlice = createSlice({
  name: "modules",
  initialState,
  reducers: {
    addModule: (state, { payload: module }) => {
      const newModule = {
        _id: uuidv4(),
        name: module.name,
        description: module.description ?? "",   // optional
        course: module.course,
        lessons: [],
      };
      state.modules = [...state.modules, newModule];
    },

    deleteModule: (state, { payload: moduleId }) => {
      state.modules = state.modules.filter((m) => m._id !== moduleId);
    },

    updateModule: (state, { payload: module }) => {
      state.modules = state.modules.map((m) =>
        m._id === module._id ? module : m
      );
    },

    editModule: (state, { payload: moduleId }) => {
      state.modules = state.modules.map((m) =>
        m._id === moduleId ? { ...m, editing: true } : m
      );
    },
  },
});

export const { addModule, deleteModule, updateModule, editModule } =
  modulesSlice.actions;
export default modulesSlice.reducer;
