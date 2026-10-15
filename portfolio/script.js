const root = document.documentElement;
const themeToggle = document.getElementById("themeToggle");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.getElementById("nav-links");

function setTheme(theme) {
  root.dataset.theme = theme;

  const light = theme === "light";
  themeToggle.setAttribute(
    "aria-label",
    light ? "Switch to dark theme" : "Switch to light theme"
  );
  themeToggle.title = light ? "Switch to dark theme" : "Switch to light theme";
  themeToggle.querySelector("span").textContent = light ? "☀" : "☾";

  try {
    localStorage.setItem("akshara-theme", theme);
  } catch {
    // The theme still works when browser storage is unavailable.
  }
}

let savedTheme;

try {
  savedTheme = localStorage.getItem("akshara-theme");
} catch {
  // Use the default dark theme.
}

setTheme(savedTheme === "light" ? "light" : "dark");

themeToggle.addEventListener("click", () => {
  setTheme(root.dataset.theme === "dark" ? "light" : "dark");
});

function closeMenu() {
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation");
  navLinks.classList.remove("is-open");
}

menuToggle.addEventListener("click", () => {
  const open = menuToggle.getAttribute("aria-expanded") !== "true";

  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  navLinks.classList.toggle("is-open", open);
});

navLinks.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    closeMenu();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
  }
});

document.addEventListener("click", (event) => {
  const menuIsOpen = menuToggle.getAttribute("aria-expanded") === "true";

  if (menuIsOpen && !event.target.closest(".nav")) {
    closeMenu();
  }
});