import { useEffect, useState } from "react";

export const useTheme = () => {
  const [theme, setTheme] = useState<"light" | "dark">();

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    setTheme(
      storedTheme === "dark" ||
        (storedTheme == null &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
        ? "dark"
        : "light"
    );
  }, []);

  useEffect(() => {
    if (!theme) return;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return [theme, toggleTheme];
};
