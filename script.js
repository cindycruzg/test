const tabs = [
  {
    id: "current",
    label: "Current",
    heading: "Current Courses"
  },
  {
    id: "upcoming",
    label: "Upcoming",
    heading: "Upcoming Courses",
    empty: {
      title: "You do not have any upcoming courses.",
      body: "Courses scheduled to begin soon will appear in this section."
    }
  },
  {
    id: "previous",
    label: "Previous",
    heading: "Previous Courses",
    empty: {
      title: "You do not have any previous courses.",
      body: "Once your access expires, courses will move to this section."
    }
  }
];

const coursesByTab = {
  current: [
    {
      title: "Pharmacy Technician (Voucher Included)",
      partner: "Blue Ridge Community College",
      image: "https://www.figma.com/api/mcp/asset/15d63a08-7eba-4123-98d6-2b320436cddc",
      dates: "Oct 31 2025 - Jul 31 2026",
      instructor: "Sharon Blackford",
      showProgress: true,
      actions: [
        {
          label: "Launch",
          icon: "https://www.figma.com/api/mcp/asset/c30e605e-b85b-4459-9bc2-b79012dd69e0",
          tone: "primary"
        },
        {
          label: "Log My Time",
          icon: "https://www.figma.com/api/mcp/asset/02d05319-ebdf-40c4-9a3b-66738981bf3a",
          tone: "soft"
        },
        {
          label: "Course Support",
          icon: "https://www.figma.com/api/mcp/asset/708199da-78c0-40fc-995b-d1aad870d9e1"
        }
      ]
    },
    {
      title: "Start a Pet Sitting Business",
      partner: "",
      image: "https://www.figma.com/api/mcp/asset/39248732-9663-4ee6-af42-b5d34f31f5ae",
      dates: "Dec 23 2025 - Mar 23 2026",
      instructor: "",
      showProgress: false,
      actions: [
        {
          label: "Launch",
          icon: "https://www.figma.com/api/mcp/asset/c30e605e-b85b-4459-9bc2-b79012dd69e0",
          tone: "primary"
        },
        {
          label: "Report",
          icon: "https://www.figma.com/api/mcp/asset/ceeb32f8-e75a-45b2-9267-03366f08c969"
        },
        {
          label: "Course Support",
          icon: "https://www.figma.com/api/mcp/asset/708199da-78c0-40fc-995b-d1aad870d9e1"
        }
      ]
    }
  ],
  upcoming: [],
  previous: []
};

const resourceCourses = [
  {
    title: "Get Career Ready",
    partner: "",
    image: "https://www.figma.com/api/mcp/asset/a6f08a8d-6d69-4938-a16e-8cb59e759216",
    dates: "Oct 31 2025 - Jul 31 2026",
    instructor: "",
    showProgress: false,
    tag: "Optional",
    isResource: true,
    actions: [
      {
        label: "Launch",
        icon: "https://www.figma.com/api/mcp/asset/2c351c1b-f03a-40d4-894a-3e348b9ff8fe",
        tone: "primary"
      },
      {
        label: "Report",
        icon: "https://www.figma.com/api/mcp/asset/28316123-6188-442f-9570-71a5d7c94d00"
      },
      {
        label: "Course Support",
        icon: "https://www.figma.com/api/mcp/asset/ceeb32f8-e75a-45b2-9267-03366f08c969"
      }
    ]
  }
];

let activeTab = "current";

function createActionButton(action) {
  const button = document.createElement("button");
  button.className = "action-button";

  if (action.tone === "primary") {
    button.classList.add("action-button--primary");
  }

  if (action.tone === "soft") {
    button.classList.add("action-button--soft");
  }

  button.type = "button";
  button.innerHTML = `
    <img src="${action.icon}" alt="" />
    <span>${action.label}</span>
  `;

  return button;
}

function createCourseCard(course) {
  const template = document.getElementById("course-card-template");

  if (!(template instanceof HTMLTemplateElement)) {
    return null;
  }

  const fragment = template.content.cloneNode(true);
  const card = fragment.querySelector(".course-card");
  const title = fragment.querySelector("h3");
  const partner = fragment.querySelector(".course-card__partner");
  const tag = fragment.querySelector(".course-card__tag");
  const progressButton = fragment.querySelector(".progress-button");
  const image = fragment.querySelector(".course-card__image");
  const dates = fragment.querySelector(".course-card__dates");
  const instructor = fragment.querySelector(".course-card__instructor");
  const instructorWrap = fragment.querySelector(".course-card__instructor-wrap");
  const actions = fragment.querySelector(".course-card__actions");

  if (!(card instanceof HTMLElement)) {
    return null;
  }

  if (course.isResource) {
    card.classList.add("course-card--resource");
  }

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

  if (tag instanceof HTMLElement) {
    tag.textContent = course.tag ?? "";
  }

  if (progressButton instanceof HTMLElement && !course.showProgress) {
    progressButton.remove();
  }

  if (image instanceof HTMLImageElement) {
    image.src = course.image;
    image.alt = course.title;
  }

  if (dates instanceof HTMLElement) {
    dates.textContent = course.dates;
  }

  if (instructor instanceof HTMLElement && instructorWrap instanceof HTMLElement) {
    if (course.instructor) {
      instructor.textContent = course.instructor;
    } else {
      instructorWrap.classList.add("is-hidden");
    }
  }

  if (actions instanceof HTMLElement) {
    course.actions.forEach((action) => actions.appendChild(createActionButton(action)));
  }

  return fragment;
}

function renderTabs(containerId) {
  const container = document.getElementById(containerId);
  const template = document.getElementById("tab-button-template");

  if (!(container instanceof HTMLElement) || !(template instanceof HTMLTemplateElement)) {
    return;
  }

  container.innerHTML = "";

  tabs.forEach((tab) => {
    const fragment = template.content.cloneNode(true);
    const button = fragment.querySelector(".tab-button");

    if (!(button instanceof HTMLButtonElement)) {
      return;
    }

    button.textContent = tab.label;
    button.dataset.tab = tab.id;
    button.classList.toggle("is-active", tab.id === activeTab);
    button.setAttribute("aria-pressed", String(tab.id === activeTab));
    button.addEventListener("click", () => {
      activeTab = tab.id;
      renderView();
    });

    container.appendChild(fragment);
  });
}

function renderCourses() {
  const list = document.getElementById("course-list");
  const sectionTitle = document.getElementById("course-section-title");
  const emptyState = document.getElementById("empty-state");
  const emptyTitle = document.getElementById("empty-state-title");
  const emptyBody = document.getElementById("empty-state-body");
  const currentTab = tabs.find((tab) => tab.id === activeTab);
  const courses = coursesByTab[activeTab] ?? [];

  if (
    !(list instanceof HTMLElement) ||
    !(sectionTitle instanceof HTMLElement) ||
    !(emptyState instanceof HTMLElement) ||
    !(emptyTitle instanceof HTMLElement) ||
    !(emptyBody instanceof HTMLElement) ||
    !currentTab
  ) {
    return;
  }

  sectionTitle.textContent = currentTab.heading;
  list.innerHTML = "";

  if (courses.length > 0) {
    courses.forEach((course) => {
      const card = createCourseCard(course);

      if (card) {
        list.appendChild(card);
      }
    });

    emptyState.hidden = true;
    return;
  }

  emptyTitle.textContent = currentTab.empty?.title ?? "No courses found.";
  emptyBody.textContent = currentTab.empty?.body ?? "";
  emptyState.hidden = false;
}

function renderResourceCourses() {
  const list = document.getElementById("resource-courses");

  if (!(list instanceof HTMLElement)) {
    return;
  }

  list.innerHTML = "";
  resourceCourses.forEach((course) => {
    const card = createCourseCard(course);

    if (card) {
      list.appendChild(card);
    }
  });
}

function renderView() {
  const resourcesSection = document.getElementById("resources-section");

  renderTabs("desktop-tab-nav");
  renderTabs("mobile-tab-nav");
  renderCourses();

  if (resourcesSection instanceof HTMLElement) {
    resourcesSection.hidden = activeTab !== "current";
  }
}

function setupMobileMenu() {
  const menuButton = document.getElementById("mobile-menu-button");
  const mobileNav = document.getElementById("mobile-nav");

  if (!(menuButton instanceof HTMLButtonElement) || !(mobileNav instanceof HTMLElement)) {
    return;
  }

  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    const nextState = !isOpen;

    menuButton.setAttribute("aria-expanded", String(nextState));
    mobileNav.hidden = !nextState;
    mobileNav.classList.toggle("is-open", nextState);
  });
}

function setupFooterAccordions() {
  const mediaQuery = window.matchMedia("(max-width: 767px)");
  const footerColumns = Array.from(document.querySelectorAll(".footer-column"));

  footerColumns.forEach((column, index) => {
    const toggle = column.querySelector(".footer-toggle");

    if (!(toggle instanceof HTMLButtonElement)) {
      return;
    }

    toggle.addEventListener("click", () => {
      if (!mediaQuery.matches || column.classList.contains("footer-column--legal")) {
        return;
      }

      const isOpen = column.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    if (index < 3) {
      column.classList.add("is-open");
    }
  });

  function syncFooterState() {
    footerColumns.forEach((column, index) => {
      const toggle = column.querySelector(".footer-toggle");

      if (!(toggle instanceof HTMLButtonElement) || column.classList.contains("footer-column--legal")) {
        return;
      }

      if (mediaQuery.matches) {
        if (!column.classList.contains("is-open") && index < 3) {
          column.classList.add("is-open");
        }

        toggle.setAttribute("aria-expanded", String(column.classList.contains("is-open")));
      } else {
        column.classList.add("is-open");
        toggle.setAttribute("aria-expanded", "true");
      }
    });
  }

  syncFooterState();
  mediaQuery.addEventListener("change", syncFooterState);
}

renderResourceCourses();
renderView();
setupMobileMenu();
setupFooterAccordions();
