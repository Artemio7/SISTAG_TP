import { collection, deleteDoc, doc, setDoc } from 'firebase/firestore';
import { addDays, formatISO } from 'date-fns';

import { FirebaseDB } from '../../firebase/config';

import type { Project } from '../../projects/types/project';
import type { AppDispach, RootState } from '../store';
import { fileUpload, loadProjects } from '../../helpers';

import {
  savingNewProject,
  addNewEntryProject,
  setActiveProject,
  setProjets,
  setSaving,
  updatedProject,
  setPhotosToActiveProject,
  deleteProyectById,
} from './projects-slice';
import { setSnackbarOpen } from '../ui/ui-slice';

export const startNewProject = () => {
  return async (dispatch: AppDispach, getState: () => RootState) => {
    dispatch(savingNewProject());

    const { uid } = getState().auth;

    const newDoc = doc(collection(FirebaseDB, `${uid}/gallery/projects`));
    const startDate = Date.now();

    const newProject: Project = {
      id: newDoc.id,
      title: 'Nuevo proyecto',
      description: '',
      startDate: formatISO(startDate),
      endDate: formatISO(addDays(startDate, 2)),
      acceptanceCriteria: [],
      milestones: [],
      imagesUrls: [],
    };

    await setDoc(newDoc, newProject);

    dispatch(addNewEntryProject(newProject));
    dispatch(setActiveProject(newProject));
  };
};

export const startLoadingProjects = () => {
  return async (dispatch: AppDispach, getState: () => RootState) => {
    const { uid } = getState().auth;
    if (!uid) throw new Error("UID doesn't exist");

    const projects = await loadProjects(uid);
    dispatch(setProjets(projects));
  };
};

export const startSavingProject = () => {
  return async (dispatch: AppDispach, getState: () => RootState) => {
    dispatch(setSaving());

    const { uid } = getState().auth;
    const { active: project } = getState().projects;

    const projectToFirestore = {
      ...project,
    };

    delete projectToFirestore.id;

    const docRef = doc(FirebaseDB, `${uid}/gallery/projects/${project!.id}`);
    await setDoc(docRef, projectToFirestore, { merge: true });

    dispatch(updatedProject(project!));
    dispatch(setSnackbarOpen(true));
  };
};

export const startUploadingFiles = (files: FileList) => {
  return async (dispatch: AppDispach) => {
    dispatch(setSaving());

    const fileUploadPromises: Promise<string>[] = [];

    for (const file of files) {
      const filePath = fileUpload(file);

      if (!filePath) continue;

      fileUploadPromises.push(filePath);
    }

    const photosUrl = await Promise.all(fileUploadPromises);

    dispatch(setPhotosToActiveProject(photosUrl));
  };
};

export const startDeletingProject = () => {
  return async (dispatch: AppDispach, getState: () => RootState) => {
    const { uid } = getState().auth;
    const { active: project } = getState().projects;

    const docRef = doc(FirebaseDB, `${uid}/gallery/projects/${project!.id}`);
    await deleteDoc(docRef);

    dispatch(deleteProyectById(project!.id));
  };
};
