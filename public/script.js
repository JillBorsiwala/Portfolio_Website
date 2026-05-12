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

const MAX_SPARKS = 25;
const SPARK_DURATION = getComputedStyle(document.documentElement)
  .getPropertyValue("--spark-duration")
  .trim();
const SPARK_DURATION_MS = (() => {
  if (SPARK_DURATION.endsWith("ms")) {
    return Number.parseFloat(SPARK_DURATION);
  }
  if (SPARK_DURATION.endsWith("s")) {
    return Number.parseFloat(SPARK_DURATION) * 1000;
  }
  const asNumber = Number(SPARK_DURATION);
  return Number.isFinite(asNumber) ? asNumber : 5000;
})();

document.addEventListener("click", (event) => {
  const sparks = document.querySelectorAll(".click-spark");
  if (sparks.length >= MAX_SPARKS) {
    sparks[0].remove();
  }

  const spark = document.createElement("span");
  spark.className = "click-spark";
  spark.style.left = `${event.clientX}px`;
  spark.style.top = `${event.clientY}px`;
  document.body.appendChild(spark);

  window.setTimeout(() => {
    spark.remove();
  }, SPARK_DURATION_MS);
});
