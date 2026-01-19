import { useDeleteTodo } from "@/store/todos";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

export default function TodoItem(
    {
        id,
        content
    }: {
        id: number;
        content: string;
    }) {
    const deleteTodo = useDeleteTodo();
    const handleDeleteClick = () => {
        deleteTodo(id);
    }
    return (
        <div className="flex items-center justify-between border p-2">
            <Link to={`/todolist/${id}`}>{content}</Link>
            {content}
            <Button
                onClick={handleDeleteClick}
                variant={"destructive"}>삭제</Button>
        </div >);
}