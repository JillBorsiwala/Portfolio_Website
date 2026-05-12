const yearElement = document.querySelector("#year");
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

const themeToggle = document.querySelector("[data-theme-toggle]");
const body = document.body;

const setTheme = (theme) => {
  body.classList.remove("theme-night", "theme-light");
  body.classList.add(theme);
  if (themeToggle) {
    const isNight = theme === "theme-night";
    themeToggle.setAttribute(
      "aria-label",
      isNight ? "Switch to light mode" : "Switch to night mode"
    );
    themeToggle.setAttribute("aria-pressed", String(!isNight));
  }
};

const savedTheme = localStorage.getItem("theme");
if (savedTheme === "theme-light" || savedTheme === "theme-night") {
  setTheme(savedTheme);
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const nextTheme = body.classList.contains("theme-night")
      ? "theme-light"
      : "theme-night";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
  });
}
