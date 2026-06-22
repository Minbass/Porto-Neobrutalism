const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const navLinks = document.querySelectorAll(".site-nav a");
const preloader = document.querySelector(".preloader");

function hidePreloader() {
  if (!preloader) return;

  preloader.classList.add("is-hidden");
  document.body.classList.remove("is-loading");

  window.setTimeout(() => {
    preloader.setAttribute("aria-hidden", "true");
  }, 450);
}

window.addEventListener("load", () => {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const loadingDuration = prefersReducedMotion ? 600 : 2400;

  window.setTimeout(hidePreloader, loadingDuration);
});

function setNavState(isOpen) {
  navToggle.setAttribute("aria-expanded", String(isOpen));
  siteNav.classList.toggle("is-open", isOpen);
  document.body.classList.toggle("nav-open", isOpen);
}

navToggle.addEventListener("click", () => {
  const isOpen = navToggle.getAttribute("aria-expanded") === "true";
  setNavState(!isOpen);
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => setNavState(false));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setNavState(false);
  }
});

const cards = document.querySelectorAll(".project-card, .skill-logo");

cards.forEach((card) => {
  card.addEventListener("pointermove", (event) => {
    const bounds = card.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;
    card.style.setProperty("--pointer-x", `${x}px`);
    card.style.setProperty("--pointer-y", `${y}px`);
  });
});
