import { v4 } from "uuid";

type SigAddTaskGroup = (tg: TaskGroup) => void;
type SigRemoveTaskGroup = (tg: TaskGroup) => void;

type SigGetAllTaskGroup = () => TaskGroup[];
type SigToJSONString = (pretty?: boolean) => string;
type SigAddTaskGroupAt = (tg: TaskGroup, at: number) => void;
export interface Project {
  name: string;
  addTaskGroup: SigAddTaskGroup;
  addTaskGroupAt: SigAddTaskGroupAt;
  removeTaskGroup: SigRemoveTaskGroup;
  getAllTaskGroups: SigGetAllTaskGroup;
  toJSONString: SigToJSONString;
}
type ProjectJSON = { project_name: string; group: Record<string, Task[]> };

type SigAddTask = (t: Task) => void;
type SigGetAllTasks = () => Task[];
type SigGetTask = (id: TaskID) => Task | undefined;
type SigUpdateTask = (id: TaskID, updatedTask: Task) => void;
type SigDeleteTask = (id: TaskID) => void;
type SigDeleteAllTask = () => void;

export interface TaskGroup {
  name: string;
  addTask: SigAddTask;
  getTask: SigGetTask;
  getAllTasks: SigGetAllTasks;
  updateTask: SigUpdateTask;
  deleteTask: SigDeleteTask;
  deleteAllTask: SigDeleteAllTask;
}

export type TaskID = string;
export interface Task {
  id: TaskID;
  title: string;
  description: string;
  time: TaskTime;
  style: TaskStyle;
}

interface TaskTime {
  assigned: boolean;
  start?: Date;
  end?: Date;
}

interface TaskStyle {
  color: string;
}

export function createProject(name: string): Project {
  const taskGroups: TaskGroup[] = [];
  const addTaskGroup: SigAddTaskGroup = (tg) => {
    taskGroups.push(tg);
  };
  const addTaskGroupAt: SigAddTaskGroupAt = (tg, at) => {
    taskGroups.splice(at, 0, tg);
  };

  const removeTaskGroup: SigRemoveTaskGroup = (tg) => {
    const i = taskGroups.findIndex((v) => v === tg);

    if (i >= 0) {
      taskGroups.splice(i, 1);
    } else
      console.log(`Taskgroup: ${tg.name} doesn't exist in project: ${name}`);
  };
  const getAllTaskGroups: SigGetAllTaskGroup = () => taskGroups;

  const toJSON: SigToJSONString = (pretty = false) => {
    const finalData: ProjectJSON = {
      project_name: name,
      group: {},
    };
    taskGroups.forEach((tg) => {
      finalData.group[tg.name] = tg.getAllTasks();
    });
    return JSON.stringify(finalData, null, pretty ? 2 : 0);
  };

  return {
    name,
    addTaskGroup,
    removeTaskGroup,
    getAllTaskGroups,
    toJSONString: toJSON,
    addTaskGroupAt,
  };
}

export function createProjectFromJSONString(value: string): Project | null {
  try {
    const project_json: ProjectJSON = JSON.parse(value);
    const project = createProject(project_json.project_name);
    for (const g in project_json.group) {
      const lg = createGroup(g);
      project_json.group[g].forEach((t) => {
        lg.addTask(t);
      });
      project.addTaskGroup(lg);
    }
    return project;
  } catch (e) {
    console.log(e);
  }

  return null;
}

export function createGroup(name: string): TaskGroup {
  const tasks: Task[] = [];
  const addTask: SigAddTask = (t) => {
    tasks.push(t);
  };
  const getAllTask: SigGetAllTasks = () => tasks;
  const updateTask: SigUpdateTask = (id, updatedTask) => {
    tasks.forEach((t, i) => {
      if (t.id === id) {
        tasks[i] = updatedTask;
      }
    });
  };
  const getTask: SigGetTask = (id) => tasks.find((v) => v.id === id);
  const deleteTask: SigDeleteTask = (id) => {
    const pos = tasks.findIndex((v) => v.id === id);
    console.log(`deleteTask`, pos);
    if (pos >= 0) {
      tasks.splice(pos, 1);
    }
  };

  const deleteAllTask: SigDeleteAllTask = () => {
    tasks.splice(0);
  };
  return {
    name,
    addTask,
    getAllTasks: getAllTask,
    updateTask,
    getTask,
    deleteTask,
    deleteAllTask,
  };
}

export function createTask(title: string, description?: string): Task {
  return {
    id: v4(),
    title,
    description: description ?? "placeholder description",
    style: { color: "palegreen" },
    time: { assigned: false },
  };
}

// testing ground

// const paddleDNA = createProject("paddleDNA");
// const indigenus = createProject("indegenus");

// const development = createGroup("devel");
// development.addTask(createTask("Person Api", "returns all the person data"));
// development.addTask(
//   createTask("Products Api", "returns all the product information"),
// );
// let i = development.getAllTasks()[0].id;
// paddleDNA.addTaskGroup(development);
// console.log(paddleDNA.toJSONString(true));
// const ft = development.getTask(i);
// if (ft) development.updateTask(i, { ...ft, title: "asd" });
// console.log(paddleDNA.toJSONString(true));
// development.deleteTask(development.getAllTasks()[0].id);
// console.log(paddleDNA.toJSONString(true));
// development.deleteAllTask();
// console.log(paddleDNA.toJSONString(true));
