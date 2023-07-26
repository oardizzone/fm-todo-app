import { api } from "~/utils/api";

export default function Home() {
  const { data } = api.todoItems.getAll.useQuery();
  return (
    <main>
      {data?.map((todoItem) => (
        <p key={todoItem.id}>{todoItem.content}</p>
      ))}
    </main>
  );
}
