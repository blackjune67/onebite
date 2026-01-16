import TodoEditor from "@/components/todo-list/todo-editor";

const dummyTodos = [
  {
    id: 1,
    content: "TODO 1",
  },
  {
    id: 2,
    content: "TODO 2",
  },
  {
    id: 3,
    content: "TODO 3",
  }
]

export default function TodoListPage() {
  return (
    <div className="flex flex-col gap-5 p-5">
      <h1 className="text-2xml font-bold">TodoList</h1>
      <TodoEditor />
      {}
    </div>
  );
}
