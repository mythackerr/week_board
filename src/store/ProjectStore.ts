import { create } from "zustand";
import { Project, TaskGroup } from "./defination";

const default_task_group: TaskGroup = {
  def: true,
  name: "Default Task Group",
  tasks: [],
};

const default_project: Project = {
  def: true,
  name: "Default Project",
  task_group: [{ ...default_task_group }],
};
interface ProjectStore {
  projects: Project[];
  addProject: (project_name: string) => void;
  removeProject: (project: Project) => void;

  activeProjectIndex: number;
  activeProject: () => Project;
  setActiveProject: (i: number) => void;

  addTaskGroup: (tg: TaskGroup) => void;
}

export const useProjectStore = create<ProjectStore>((set, get) => ({
  projects: [{ ...default_project }],
  activeProjectIndex: 0,
  activeProject: () => {
    return get().projects[get().activeProjectIndex];
  },
  setActiveProject: (i) => {
    set(() => ({ activeProjectIndex: i }));
  },
  addProject: (project_name) => {
    set((ps) => {
      return {
        projects: [
          ...ps.projects,
          {
            name: project_name,
            def: false,
            task_group: [{ ...default_task_group }],
          },
        ],
      };
    });
  },
  removeProject: (project) => {
    set((ps) => {
      return { projects: ps.projects.filter((v) => v.name !== project.name) };
    });
  },
  addTaskGroup: (tg) => {
    const active = get().activeProject();
    active.task_group?.push(tg);
  },
}));
