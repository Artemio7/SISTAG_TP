import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ProjectsState } from '../../projects/types/projects-state';
import type { Project } from '../../projects/types/project';

const initialState: ProjectsState = {
  isSaving: false,
  savedMessage: '',
  projects: [],
  active: null,
};

export const projectsSlice = createSlice({
  name: 'gallery',
  initialState: initialState,
  reducers: {
    savingNewProject: (state) => {
      state.isSaving = true;
    },

    addNewEntryProject: (state, action: PayloadAction<Project>) => {
      state.projects.push(action.payload);
      state.isSaving = false;
    },

    setActiveProject: (state, action: PayloadAction<Project | null>) => {
      state.active = action.payload;
      state.savedMessage = '';
    },

    setProjets: (state, action: PayloadAction<Project[]>) => {
      state.projects = action.payload;
    },

    setSaving: (state) => {
      state.isSaving = true;
      state.savedMessage = '';
    },

    updatedProject: (state, action: PayloadAction<Project>) => {
      state.isSaving = false;
      state.projects = state.projects.map((project) => {
        if (project.id === action.payload.id) return action.payload;
        return project;
      });

      state.savedMessage = `${action.payload.title}, actualizada correctamente`;
    },

    setPhotosToActiveProject: (state, action: PayloadAction<string[]>) => {
      state.active!.imagesUrls = [
        ...state.active!.imagesUrls,
        ...action.payload,
      ];
      state.isSaving = false;
    },

    clearProjectsLogout: (state) => {
      state.isSaving = false;
      state.savedMessage = '';
      state.projects = [];
      state.active = null;
    },

    deleteProyectById: (state, action) => {
      state.active = null;
      state.projects = state.projects.filter(
        (project) => project.id != action.payload
      );
    },
  },
});

export const {
  savingNewProject,
  addNewEntryProject,
  setActiveProject,
  setProjets,
  setSaving,
  updatedProject,
  setPhotosToActiveProject,
  clearProjectsLogout,
  deleteProyectById,
} = projectsSlice.actions;
