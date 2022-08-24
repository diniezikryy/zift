export interface Subtask {
  subtaskTitle: string;
  isCompleted: boolean;
}

export interface Task {
  taskDescription: string;
  taskStatus: string;
  taskTitle: string;
  subtasks: Subtask[];
}

export interface Column {
  columnName: string;
  tasks: Task[];
}

export interface Board {
  name: string;
  columns: Column[];
}
