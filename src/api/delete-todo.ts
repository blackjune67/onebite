import { API_URL } from "@/lib/constants";
import type { Todo } from "@/types";

export async function deleteTodo(id: string) {
  const reponse = await fetch(`${API_URL}/todos/${id}`, {
    method: "DELETE",
  });
  if (!reponse.ok) throw new Error("Delete Todo Failed");

  const data: Todo = await reponse.json();
  return data;
}
