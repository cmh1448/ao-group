import { createStore, useStore } from "zustand";

export type ApplicatorType = "Mentor" | "Mentee";

interface ApplicationStoreContext {
  applicatorType?: ApplicatorType;
  studentId?: string;
  name?: string;
  setApplicatorType: (applicatorType: ApplicatorType) => void;
  setStudentId: (studentId: string) => void;
  setName: (name: string) => void;
}

export const ApplicationStore = createStore<ApplicationStoreContext>((set) => {
  const saved = localStorage.getItem("applicationStore");
  const initialState = saved ? JSON.parse(saved) : {};

  return {
    ...initialState,
    setApplicatorType: (applicatorType: ApplicatorType) =>
      set((state) => ({ ...state, applicatorType })),
    setStudentId: (studentId: string) =>
      set((state) => ({ ...state, studentId })),
    setName: (name: string) => set((state) => ({ ...state, name })),
  };
});

export const useApplicationStore = () => useStore(ApplicationStore);

// autoSave to LocalStorage
ApplicationStore.subscribe((state) => {
  const toSave = JSON.stringify(state);
  localStorage.setItem("applicationStore", toSave);
});
