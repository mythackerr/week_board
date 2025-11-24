"use client";
import {
  createGroup,
  createProject,
  Project,
  Task,
  TaskGroup,
  TaskID,
} from "@/lib/DataTypes";
import { useSyncExternalStore } from "react";

interface ProjectSnapshot {
  projects: Project[];
  activeProject: Project;
  events: {
    id: TaskID;
    title: string;
    backgroundColor?: string;
    borderColor?: string;
    textColor?: string;
    start: Date;
    end: Date;
    extendedProps?: {
      task: Task;
      taskGroup: TaskGroup;
    };
  }[];
}
const defaultProject = createProject("Default Project", true);
defaultProject.addTaskGroup(createGroup("Default Task Group", true));

let store_of_project: ProjectSnapshot = {
  projects: [defaultProject],
  activeProject: defaultProject,
  events: [],
};

type Listener = () => void;
let listeners: Listener[] = [];

type SigUpdateStore = (v: Partial<ProjectSnapshot>) => void;
const update_store: SigUpdateStore = (values) => {
  store_of_project = { ...store_of_project, ...values };
};
const update_active_project = () => {
  update_store({ activeProject: store_of_project.activeProject });
  emitChange();
};

export const projectStore = {
  getSnapshot(): ProjectSnapshot {
    return store_of_project;
  },
  subscribe(listener: Listener) {
    listeners = [...listeners, listener];
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  },

  getServerSnapshot() {
    return store_of_project;
  },

  addProject(p: Project) {
    if (
      !store_of_project.projects.find(
        (v) => v.name.trim().toLowerCase() === p.name.trim().toLowerCase()
      )
    ) {
      p.addTaskGroup(createGroup("Default Task Group", true));
      update_store({ projects: [...store_of_project.projects, p] });

      emitChange();
    }
  },

  setActiveProject(p: Project) {
    store_of_project.events.splice(0);
    p.getAllTaskGroups().forEach((tg) => {
      tg.getAllTasks().forEach((t) => {
        store_of_project.events.push({
          id: t.id,
          title: t.title,
          start: t.time.start!,
          end: t.time.end!,
        });
      });
    });
    console.log(p);
    console.log(store_of_project.events);

    update_store({ activeProject: p, events: [...store_of_project.events] });

    emitChange();
  },
  addTaskGroup(tg: TaskGroup) {
    store_of_project.activeProject.addTaskGroup(tg);

    update_active_project();
  },
  removeTaskGroup(tg: TaskGroup) {
    store_of_project.activeProject.removeTaskGroup(tg);
    update_active_project();
  },

  addTask(tg: TaskGroup, t: Task) {
    tg.addTask(t);
    update_store({
      activeProject: store_of_project.activeProject,
    });
    emitChange();
  },

  updateTask(tg: TaskGroup, t: Task) {
    tg.updateTask(t.id, t);
    const i = store_of_project.events.findIndex((e) => e.id === t.id);
    console.log(i);
    if (t.time.assigned) {
      if (i >= 0) {
        store_of_project.events.splice(i, 1, {
          id: t.id,
          title: t.title,
          start: t.time.start!,
          end: t.time.end!,
          extendedProps: {
            task: t,
            taskGroup: tg,
          },
        });
      } else {
        store_of_project.events.push({
          id: t.id,
          title: t.title,
          start: t.time.start!,
          end: t.time.end!,
          extendedProps: {
            task: t,
            taskGroup: tg,
          },
        });
      }
    }

    update_store({
      activeProject: store_of_project.activeProject,
      events: [...store_of_project.events],
    });

    emitChange();
  },
  deleteTask(tg: TaskGroup, t: Task) {
    const i = store_of_project.events.findIndex((e) => e.id === t.id);
    tg.deleteTask(t.id);
    store_of_project.events.splice(i, 1);
    update_store({
      activeProject: store_of_project.activeProject,
      events: [...store_of_project.events],
    });

    emitChange();
  },

  deleteProject(proj: Project) {
    const i = store_of_project.projects.findIndex((d) => d === proj);
    console.log(store_of_project.activeProject, proj);
    if (store_of_project.projects.length < 2) {
      alert("Please create another project before deleting the last one");
    } else if (store_of_project.activeProject == proj) {
      alert("Please switch to another project to delete active one");
    } else if (i >= 0) {
      store_of_project.projects.splice(i, 1);
    }

    update_store({
      projects: [...store_of_project.projects],
    });

    emitChange();
  },

  updateTaskGroup(ptg: TaskGroup, ctg: TaskGroup) {
    store_of_project.activeProject.updateTaskGroup(ptg, ctg);
    update_active_project();
  },
};

function emitChange() {
  for (const listener of listeners) {
    listener();
  }
}

export function useProject() {
  return useSyncExternalStore(
    projectStore.subscribe,
    projectStore.getSnapshot,
    projectStore.getServerSnapshot
  );
}
