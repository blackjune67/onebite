import { createTodo } from "@/api/create-todo";
import { QUERY_KEYS } from "@/lib/constants";
import type { Todo } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useCreateTodoMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTodo,
    onMutate: () => {},
    onSettled: () => {},
    onSuccess: (newTodo) => {
      queryClient.setQueryData<Todo>(
        QUERY_KEYS.todo.detail(newTodo.id),
        newTodo
      );
      queryClient.setQueryData<string[]>(
        QUERY_KEYS.todo.list,
        (prevTodosIds) => {
          if (!prevTodosIds) return [newTodo.id];
          return [...prevTodosIds, newTodo.id];
        }
      );
      // queryClient.setQueryData<Todo[]>(QUERY_KEYS.todo.list, (prevTodos) => {
      //   if (!prevTodos) return [newTodo];
      //   if (prevTodos.some((todo) => todo.id === newTodo.id)) return prevTodos;
      //   return [...prevTodos, newTodo];
      // });
    },
    onError: (error) => {
      window.alert(error.message);
    },
  });
}
