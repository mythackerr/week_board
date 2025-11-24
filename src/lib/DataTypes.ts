import { v4 } from "uuid";
import { colors } from "./ColorsOption";

type SigAddTaskGroup = (tg: TaskGroup) => void;
type SigRemoveTaskGroup = (tg: TaskGroup) => void;

type SigGetAllTaskGroup = () => TaskGroup[];
type SigToJSONString = (pretty?: boolean) => string;
type SigAddTaskGroupAt = (tg: TaskGroup, at: number) => void;
type SigUpdateTaskGroup = (ptg: TaskGroup, ctg: TaskGroup) => void;
export interface Project {
  def: boolean;
  name: string;
  addTaskGroup: SigAddTaskGroup;
  addTaskGroupAt: SigAddTaskGroupAt;
  removeTaskGroup: SigRemoveTaskGroup;
  getAllTaskGroups: SigGetAllTaskGroup;
  toJSONString: SigToJSONString;
  updateTaskGroup: SigUpdateTaskGroup;
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
  def: boolean;
}

export type TaskID = string;
export interface Task {
  id: TaskID;
  title: string;
  description: string;
  time: TaskTime;
  color: string;
}

interface TaskTime {
  assigned: boolean;
  start?: Date;
  end?: Date;
}

export function createProject(name: string, def = false): Project {
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
  const updateTaskGroup: SigUpdateTaskGroup = (ptg, ctg) => {
    const i = taskGroups.findIndex((v) => v === ptg);

    if (i >= 0) {
      taskGroups.splice(i, 1, ctg);
    } else
      console.log(`Taskgroup: ${ptg.name} doesn't exist in project: ${name}`);
  };

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
    def,
    name,
    addTaskGroup,
    removeTaskGroup,
    getAllTaskGroups,
    toJSONString: toJSON,
    addTaskGroupAt,
    updateTaskGroup,
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

export function createGroup(name: string, def = false): TaskGroup {
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
    // console.log(`deleteTask`, pos);
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
    def,
  };
}

export function createTask(
  title: string,
  description?: string,
  color?: string
): Task {
  return {
    id: v4(),
    title,
    description: description ?? "placeholder description",
    color: color ?? Object.values(colors)[0],
    time: { assigned: false },
  };
}
