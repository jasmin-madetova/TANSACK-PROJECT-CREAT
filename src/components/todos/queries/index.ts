import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { todosApi } from "../api";
import type { CreateTodo } from "../types";

export const useGetTodos = () => {
  return useQuery({
    queryKey: ["todos"],
    queryFn: todosApi.getTodos,
  });
};

export const useCreateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (todo: CreateTodo) =>
      todosApi.createTodo(todo),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    },
  });
};

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      completed,
    }: {
      id: number;
      completed: boolean;
    }) =>
      todosApi.updateTodo(id, { completed }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    },
  });
};

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) =>
      todosApi.deleteTodo(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    },
  });
};