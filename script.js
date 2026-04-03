const currentCourses = [
  {
    title: "Pharmacy Technician (Voucher Included)",
    partner: "Blue Ridge Community College",
    image: "https://www.figma.com/api/mcp/asset/5c03986c-23b8-425e-9e69-a51d6a1c0d00",
    dates: "Oct 31, 2025 - Jul 31, 2026",
    instructor: "Sharon Blackford",
    progress: "Lesson 6 of 12",
    status: "In progress",
    badge: "Lab track",
    actions: [
      { label: "Launch", icon: "https://www.figma.com/api/mcp/asset/a7b1f247-e0a8-49bc-bb01-990708b47999", primary: true },
      { label: "Log My Time", icon: "https://www.figma.com/api/mcp/asset/bd83a824-8a00-4c9f-9936-01a63a5eda33" },
      { label: "Report", icon: "https://www.figma.com/api/mcp/asset/c99aa6a4-9988-478f-820e-ad5c5e809b48" },
      { label: "Completion", icon: "https://www.figma.com/api/mcp/asset/48849eff-4985-4151-8004-f0f2912d8cf7" },
      { label: "Course Support", icon: "https://www.figma.com/api/mcp/asset/27be01aa-adb6-4fda-b2dd-248ad86c62b9" }
    ]
  },
  {
    title: "Start a Pet Sitting Business",
    partner: "",
    image: "https://www.figma.com/api/mcp/asset/39248732-9663-4ee6-af42-b5d34f31f5ae",
    dates: "Dec 23, 2025 - Mar 23, 2026",
    instructor: "",
    progress: "Ready to launch",
    status: "New",
    badge: "",
    actions: [
      { label: "Launch", icon: "https://www.figma.com/api/mcp/asset/a7b1f247-e0a8-49bc-bb01-990708b47999", primary: true },
      { label: "Report", icon: "https://www.figma.com/api/mcp/asset/c99aa6a4-9988-478f-820e-ad5c5e809b48" },
      { label: "Completion", icon: "https://www.figma.com/api/mcp/asset/48849eff-4985-4151-8004-f0f2912d8cf7" },
      { label: "Course Support", icon: "https://www.figma.com/api/mcp/asset/27be01aa-adb6-4fda-b2dd-248ad86c62b9" }
    ]
  }
];

const resourceCourses = [
  {
    title: "Get Career Ready",
    partner: "",
    image: "https://www.figma.com/api/mcp/asset/61384465-53f9-4c7e-abd0-1435c5772a16",
    dates: "Oct 31, 2025 - Jul 31, 2026",
    instructor: "",
    progress: "Optional resource",
    status: "Available",
    badge: "Optional",
    actions: [
      { label: "Launch", icon: "https://www.figma.com/api/mcp/asset/a7b1f247-e0a8-49bc-bb01-990708b47999", primary: true },
      { label: "Report", icon: "https://www.figma.com/api/mcp/asset/c99aa6a4-9988-478f-820e-ad5c5e809b48" },
      { label: "Completion", icon: "https://www.figma.com/api/mcp/asset/48849eff-4985-4151-8004-f0f2912d8cf7" },
      { label: "Course Support", icon: "https://www.figma.com/api/mcp/asset/27be01aa-adb6-4fda-b2dd-248ad86c62b9" }
    ]
  }
];

const weeklyTasks = [
  {
    title: "Complete dosage calculations review",
    meta: "Pharmacy Technician · Due Thursday"
  },
  {
    title: "Submit your lab hours",
    meta: "Clinical support · Due Friday"
  },
  {
    title: "Open the Get Career Ready resource",
    meta: "Optional activity · 20 min"
  }
];

function createActionButton(action) {
  const button = document.createElement("button");
  button.className = `action-button${action.primary ? " action-button--primary" : ""}`;
  button.type = "button";
  button.innerHTML = `
    <img src="${action.icon}" alt="" />
    <span>${action.label}</span>
  `;
  return button;
}

function renderCourseCard(course, container) {
  const template = document.getElementById("course-card-template");
  if (!(template instanceof HTMLTemplateElement) || !(container instanceof HTMLElement)) {
    return;
  }

  const fragment = template.content.cloneNode(true);
  const card = fragment.querySelector(".course-card");
  if (!(card instanceof HTMLElement)) {
    return;
  }

  const title = card.querySelector("h3");
  const partner = card.querySelector(".course-card__partner");
  const image = card.querySelector(".course-card__image");
  const dates = card.querySelector(".course-card__dates");
  const instructor = card.querySelector(".course-card__instructor");
  const progress = card.querySelector(".course-card__progress");
  const status = card.querySelector(".course-card__status");
  const badge = card.querySelector(".course-card__badge");
  const instructorWrap = card.querySelector(".course-card__instructor-wrap");
  const progressWrap = card.querySelector(".course-card__progress-wrap");
  const actions = card.querySelector(".course-card__actions");

  if (title instanceof HTMLElement) {
    title.textContent = course.title;
  }

  if (partner instanceof HTMLElement) {
    if (course.partner) {
      partner.textContent = course.partner;
    } else {
      partner.remove();
    }
  }

  if (image instanceof HTMLImageElement) {
    image.src = course.image;
    image.alt = course.title;
  }

  if (dates instanceof HTMLElement) {
    dates.textContent = course.dates;
  }

  if (status instanceof HTMLElement) {
    status.textContent = course.status;
  }

  if (badge instanceof HTMLElement) {
    badge.textContent = course.badge ?? "";
  }

  if (instructor instanceof HTMLElement && instructorWrap instanceof HTMLElement) {
    if (course.instructor) {
      instructor.textContent = course.instructor;
    } else {
      instructorWrap.classList.add("is-hidden");
    }
  }

  if (progress instanceof HTMLElement && progressWrap instanceof HTMLElement) {
    if (course.progress) {
      progress.textContent = course.progress;
    } else {
      progressWrap.classList.add("is-hidden");
    }
  }

  if (actions instanceof HTMLElement) {
    course.actions.forEach((action) => {
      actions.appendChild(createActionButton(action));
    });
  }

  container.appendChild(fragment);
}

function renderSection(courses, containerId) {
  const container = document.getElementById(containerId);
  if (!(container instanceof HTMLElement)) {
    return;
  }

  courses.forEach((course) => renderCourseCard(course, container));
}

function renderTasks(tasks, containerId) {
  const template = document.getElementById("task-item-template");
  const container = document.getElementById(containerId);
  if (!(template instanceof HTMLTemplateElement) || !(container instanceof HTMLElement)) {
    return;
  }

  tasks.forEach((task) => {
    const fragment = template.content.cloneNode(true);
    const title = fragment.querySelector(".task-item__title");
    const meta = fragment.querySelector(".task-item__meta");

    if (title instanceof HTMLElement) {
      title.textContent = task.title;
    }

    if (meta instanceof HTMLElement) {
      meta.textContent = task.meta;
    }

    container.appendChild(fragment);
  });
}

const mobileMenuButton = document.getElementById("mobile-menu-button");

mobileMenuButton?.addEventListener("click", () => {
  const isOpen = document.body.classList.toggle("nav-open");
  mobileMenuButton.setAttribute("aria-expanded", String(isOpen));
});

renderSection(currentCourses, "current-courses");
renderSection(resourceCourses, "resource-courses");
renderTasks(weeklyTasks, "task-list");
