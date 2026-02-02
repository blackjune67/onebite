import { useDeleteTodo } from "@/store/todos";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import type { Todo } from "@/types";
import { useUpdateTodoMutation } from "@/hooks/mutations/use-update-todo-mutation";
import useDeleteTodoMutation from "@/hooks/mutations/use-delete-todo-mutation";

export default function TodoItem({ id, content, isDone }: Todo) {
  const { mutate: deleteTodo, isPending: isDeleteTodoPending } =
    useDeleteTodoMutation();
  const { mutate: updateTodo } = useUpdateTodoMutation();
  const handleDeleteClick = () => {
    deleteTodo(id);
  };
  const handleCheckboxClick = () => {
    updateTodo({
      id,
      isDone: !isDone,
    });
  };

  return (
    <div className="flex items-center justify-between border p-2">
      <div className="flex items-center gap-2">
        <input
          disabled={isDeleteTodoPending}
          onChange={handleCheckboxClick}
          type="checkbox"
          checked={isDone}
        />
        <Link to={`/todolist/${id}`}>{content}</Link>
      </div>
      <Button
        disabled={isDeleteTodoPending}
        onClick={handleDeleteClick}
        variant={"destructive"}
      >
        삭제
      </Button>
    </div>
  );
}
