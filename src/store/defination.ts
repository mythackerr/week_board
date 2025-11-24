export interface Project {
  def?: boolean; // determines if it's default or not
  name: string; // This will be unique
  task_group?: TaskGroup[];
}

export interface TaskGroup {
  def?: boolean;
  name: string;
  tasks: [];
}
