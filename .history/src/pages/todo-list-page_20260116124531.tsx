import TodoEditor from "@/components/todo-list/todo-editor";



export default function TodoListPage() {
  return (
    <div className="flex flex-col gap-5 p-5">
      <h1 className="text-2xml font-bold">TodoList</h1>
      <TodoEditor />

    </div>
  );
}
