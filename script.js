const body = document.body;
const navToggle = document.getElementById("nav-toggle");
const assistantClose = document.getElementById("assistant-close");
const promptChips = document.querySelectorAll(".prompt-chip");
const assistantInput = document.getElementById("assistant-input");
const assistantPanel = document.getElementById("assistant-panel");

navToggle?.addEventListener("click", () => {
  const isCollapsed = body.classList.toggle("nav-collapsed");
  navToggle.setAttribute("aria-expanded", String(!isCollapsed));
});

assistantClose?.addEventListener("click", () => {
  body.classList.toggle("assistant-hidden");
});

promptChips.forEach((chip) => {
  chip.addEventListener("click", () => {
    if (!(assistantInput instanceof HTMLTextAreaElement)) {
      return;
    }

    assistantInput.value = chip.textContent?.trim() ?? "";
    assistantInput.focus();
  });
});

assistantPanel?.addEventListener("transitionend", () => {
  if (!body.classList.contains("assistant-hidden")) {
    return;
  }

  if (window.innerWidth > 1200 && assistantInput instanceof HTMLTextAreaElement) {
    assistantInput.blur();
  }
});

document.querySelector(".assistant-input-wrap")?.addEventListener("submit", (event) => {
  event.preventDefault();
});
