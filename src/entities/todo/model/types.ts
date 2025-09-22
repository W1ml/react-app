export interface Todo {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

export interface CreateTodoRequest {
  userId: number;
  title: string;
  completed?: boolean;
}

export interface UpdateTodoRequest {
  id: number;
  userId?: number;
  title?: string;
  completed?: boolean;
}

export type TodoId = Todo['id'];
export type UserId = Todo['userId'];
