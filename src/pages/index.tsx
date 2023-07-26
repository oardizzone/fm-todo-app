import { api } from "~/utils/api";

export default function Home() {
  const { data } = api.todoItems.getAll.useQuery();

  return (
    <main>
      <div className="absolute h-full w-full bg-[url('../../todo-app-main/images/bg-mobile-light.jpg')] bg-auto bg-no-repeat dark:bg-[url('../../todo-app-main/images/bg-mobile-dark.jpg')] sm:hidden"></div>
      <div className="absolute hidden h-full w-full bg-[url('../../todo-app-main/images/bg-desktop-light.jpg')] bg-auto bg-no-repeat dark:bg-[url('../../todo-app-main/images/bg-desktop-dark.jpg')] sm:block"></div>
    </main>
  );
}
