import { useTheme } from "next-themes";
import { useState } from "react";
import { api } from "~/utils/api";
import { cn } from "~/utils/cn";

const MoonIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26">
      <path
        fill="#FFF"
        fill-rule="evenodd"
        d="M13 0c.81 0 1.603.074 2.373.216C10.593 1.199 7 5.43 7 10.5 7 16.299 11.701 21 17.5 21c2.996 0 5.7-1.255 7.613-3.268C23.22 22.572 18.51 26 13 26 5.82 26 0 20.18 0 13S5.82 0 13 0z"
      />
    </svg>
  );
};

const SunIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26">
      <path
        fill="#FFF"
        fill-rule="evenodd"
        d="M13 21a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-5.657-2.343a1 1 0 010 1.414l-2.121 2.121a1 1 0 01-1.414-1.414l2.12-2.121a1 1 0 011.415 0zm12.728 0l2.121 2.121a1 1 0 01-1.414 1.414l-2.121-2.12a1 1 0 011.414-1.415zM13 8a5 5 0 110 10 5 5 0 010-10zm12 4a1 1 0 110 2h-3a1 1 0 110-2h3zM4 12a1 1 0 110 2H1a1 1 0 110-2h3zm18.192-8.192a1 1 0 010 1.414l-2.12 2.121a1 1 0 01-1.415-1.414l2.121-2.121a1 1 0 011.414 0zm-16.97 0l2.121 2.12A1 1 0 015.93 7.344L3.808 5.222a1 1 0 011.414-1.414zM13 0a1 1 0 011 1v3a1 1 0 11-2 0V1a1 1 0 011-1z"
      />
    </svg>
  );
};

const CheckIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="11" height="9">
      <path
        fill="none"
        stroke="#FFF"
        stroke-width="2"
        d="M1 4.304L3.696 7l6-6"
      />
    </svg>
  );
};

const CrossIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      className="h-4 w-4 fill-current"
    >
      <path
        fill="#494C6B"
        fill-rule="evenodd"
        d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"
      />
    </svg>
  );
};

const CreateTodoWizard = () => {
  const [todoText, setTodoText] = useState("");
  const ctx = api.useContext();
  const { mutate } = api.todoItems.create.useMutation({
    onSuccess: () => {
      setTodoText("");
      void ctx.todoItems.getAll.invalidate();
    },
  });

  return (
    <div className="flex w-full items-center gap-4 rounded-lg bg-white p-4">
      <div className="h-6 w-6 rounded-full border border-very-light-greyish-blue bg-white"></div>
      <input
        type="text"
        placeholder="Create a new todo..."
        value={todoText}
        onChange={(e) => {
          setTodoText(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key !== "Enter" || todoText === "") return;
          mutate({ content: todoText });
        }}
      />
    </div>
  );
};

const TodosList = () => {
  const { data } = api.todoItems.getAll.useQuery();
  const ctx = api.useContext();
  const { mutate: toggleTodoCompleted } = api.todoItems.complete.useMutation({
    onSuccess: () => {
      void ctx.todoItems.getAll.invalidate();
    },
  });
  const { mutate: deleteTodo } = api.todoItems.delete.useMutation({
    onSuccess: () => {
      void ctx.todoItems.getAll.invalidate();
    },
  });

  return (
    <div className="w-full rounded-lg bg-white">
      {data?.map((todoItem) => (
        <div
          key={todoItem.id}
          className="flex items-center justify-between border-b border-light-greyish-blue p-4 last:border-none"
        >
          <div className="flex items-center gap-4">
            <button
              className={cn(
                "flex h-6 w-6 items-center justify-center rounded-full border border-very-light-greyish-blue bg-white",
                {
                  "bg-gradient-to-br from-check-cyan to-check-magenta":
                    todoItem.completed,
                }
              )}
              onClick={() => {
                toggleTodoCompleted({
                  id: todoItem.id,
                  completed: !todoItem.completed,
                });
              }}
            >
              {todoItem.completed && <CheckIcon />}
            </button>
            <p
              className={cn("text-sm text-very-dark-greyish-blue", {
                "line-through opacity-25": todoItem.completed,
              })}
            >
              {todoItem.content}
            </p>
          </div>
          <button
            className="h-6 w-6"
            onClick={() => {
              deleteTodo({ id: todoItem.id });
            }}
          >
            <CrossIcon />
          </button>
        </div>
      ))}
    </div>
  );
};

export default function Home() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <>
      <div className="absolute -z-10 h-screen w-full bg-very-light-greyish-blue"></div>
      <div className="absolute -z-10 h-full w-full bg-[url('../../todo-app-main/images/bg-mobile-light.jpg')] bg-auto bg-no-repeat dark:bg-[url('../../todo-app-main/images/bg-mobile-dark.jpg')] sm:hidden"></div>
      <div className="absolute -z-10 hidden h-full w-full bg-[url('../../todo-app-main/images/bg-desktop-light.jpg')] bg-auto bg-no-repeat dark:bg-[url('../../todo-app-main/images/bg-desktop-dark.jpg')] sm:block"></div>
      <main className="px-4 pt-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold tracking-[0.8rem] text-white">
            TODO
          </h1>
          <button
            onClick={() => {
              resolvedTheme === "dark" ? setTheme("light") : setTheme("dark");
            }}
          >
            {resolvedTheme === "dark" ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>
        <div className="h-8"></div>
        <CreateTodoWizard />
        <div className="h-4"></div>
        <TodosList />
      </main>
    </>
  );
}
