import { api } from "../../../api/api";
import type { CreateTodo, Todo } from "../types";

export const todosApi = {
  getTodos: async (): Promise<Todo[]> => {
    const { data } = await api.get<Todo[]>("/todos");

    return data;
  },

  createTodo: async (todo: CreateTodo): Promise<Todo> => {
    const { data } = await api.post<Todo>("/todos", todo);

    return data;
  },

  updateTodo: async (
    id: number,
    todo: Partial<Todo>,
  ): Promise<Todo> => {
    const { data } = await api.patch<Todo>(`/todos/${id}, todo`);

    return data;
  },

  deleteTodo: async (id: number): Promise<void> => {
    await api.delete(`/todos/${id}`);
  },
};