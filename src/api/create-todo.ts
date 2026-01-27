import { API_URL } from "@/lib/constants";
import type { Todo } from "@/types";

export async function createTodo(content: string) {
  const reponse = await fetch(`${API_URL}/todos`, {
    method: "POST",
    body: JSON.stringify({
      content,
      isDone: false,
    }),
  });
  if (!reponse.ok) throw new Error("Create Todo Failed");

  const data: Todo = await reponse.json();
  return data;
}
