import { useDeleteTodo } from "@/store/todos";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import useDeleteTodoMutation from "@/hooks/mutations/use-delete-todo-mutation";

export default function TodoItem({
  id,
  content,
}: {
  id: string;
  content: string;
}) {
  const { mutate: deleteTodo, isPending } = useDeleteTodoMutation();
  //   const deleteTodo = useDeleteTodo();
  const handleDeleteClick = () => {
    deleteTodo(id);
  };
  return (
    <div className="flex items-center justify-between border p-2">
      <Link to={`/todolist/${id}`}>{content}</Link>
      {content}
      <Button
        disabled={isPending}
        onClick={handleDeleteClick}
        variant={"destructive"}
      >
        삭제
      </Button>
    </div>
  );
}
