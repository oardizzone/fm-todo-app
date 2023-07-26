import { api } from "~/utils/api";
import Image from "next/image";
import bgMobileDark from "../../todo-app-main/images/bg-mobile-dark.jpg";
import bgMobileLight from "../../todo-app-main/images/bg-mobile-light.jpg";
import bgDesktopDark from "../../todo-app-main/images/bg-desktop-dark.jpg";
import bgDesktopLight from "../../todo-app-main/images/bg-desktop-light.jpg";
import { useTheme } from "~/utils/hooks/useTheme";

export default function Home() {
  const { data } = api.todoItems.getAll.useQuery();
  const [theme, toggleTheme] = useTheme();
  return (
    <main>
      {theme === "dark" ? (
        <>
          <div className="absolute w-full sm:hidden">
            <Image
              src={bgMobileDark}
              alt="A background illustration for dark mode"
            />
          </div>
          <div className="absolute hidden w-full sm:block">
            <Image
              src={bgDesktopDark}
              alt="A background illustration for dark mode"
            />
          </div>
        </>
      ) : (
        <>
          <div className="absolute w-full sm:hidden">
            <Image
              src={bgMobileLight}
              alt="A background illustration for dark mode"
            />
          </div>
          <div className="absolute hidden w-full sm:block">
            <Image
              src={bgDesktopLight}
              alt="A background illustration for dark mode"
            />
          </div>
        </>
      )}
    </main>
  );
}
