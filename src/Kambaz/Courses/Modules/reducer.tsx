import { createSlice } from "@reduxjs/toolkit";

/* ---------- State ---------- */
const initialState = {
  modules: [] as any[], // start empty; we load from DB
};

/* ---------- Slice ---------- */
const modulesSlice = createSlice({
  name: "modules",
  initialState,
  reducers: {
    setModules: (state, { payload }) => {
      state.modules = payload;
    },

    // Push server-created module AS-IS (do not generate client ID)
    addModule: (state, { payload }) => {
      state.modules.push(payload);
    },

    deleteModule: (state, { payload: moduleId }) => {
      state.modules = state.modules.filter((m) => m._id !== moduleId);
    },

    // Replace by _id; use spread to merge
    updateModule: (state, { payload: module }) => {
      state.modules = state.modules.map((m) =>
        m._id === module._id ? { ...m, ...module } : m
      );
    },

    // Toggle edit mode by id
    editModule: (state, { payload: moduleId }) => {
      state.modules = state.modules.map((m) =>
        m._id === moduleId ? { ...m, editing: true } : m
      );
    },
  },
});

export const { addModule, deleteModule, updateModule, editModule, setModules } =
  modulesSlice.actions;

export default modulesSlice.reducer;
