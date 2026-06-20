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

const contactForm = document.querySelector("#contactForm");
if (contactForm) {
  const fieldRules = {
    name: {
      validate: (value) => value.trim().length >= 2,
      message: "Please enter at least 2 characters."
    },
    email: {
      validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()),
      message: "Please enter a valid email address."
    },
    message: {
      validate: (value) => value.trim().length >= 10,
      message: "Please add at least 10 characters."
    }
  };

  const statusElement = document.querySelector("#contactFormStatus");
  const emailTarget = "jborsiwala@gmail.com";

  const showFieldError = (name, message = "") => {
    const input = contactForm.elements[name];
    const error = contactForm.querySelector(`[data-error-for="${name}"]`);
    if (!input || !error) return;
    error.textContent = message;
    input.classList.toggle("invalid", Boolean(message));
    input.setAttribute("aria-invalid", String(Boolean(message)));
  };

  const validateField = (name) => {
    const rule = fieldRules[name];
    const input = contactForm.elements[name];
    if (!rule || !input) return true;
    const valid = rule.validate(input.value);
    showFieldError(name, valid ? "" : rule.message);
    return valid;
  };

  Object.keys(fieldRules).forEach((name) => {
    const input = contactForm.elements[name];
    if (!input) return;
    input.addEventListener("input", () => {
      if (input.classList.contains("invalid")) {
        validateField(name);
      }
    });
    input.addEventListener("blur", () => validateField(name));
  });

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const fields = Object.keys(fieldRules);
    const isValid = fields.every((name) => validateField(name));
    if (!isValid) {
      if (statusElement) {
        statusElement.textContent = "Please fix the highlighted fields.";
      }
      return;
    }

    const name = contactForm.elements.name.value.trim();
    const email = contactForm.elements.email.value.trim();
    const message = contactForm.elements.message.value.trim();
    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\nFrom: ${name} (${email})`);

    if (statusElement) {
      statusElement.textContent = "Opening your email app…";
    }
    window.location.href = `mailto:${emailTarget}?subject=${subject}&body=${body}`;
    contactForm.reset();
    fields.forEach((fieldName) => showFieldError(fieldName, ""));
  });
}
