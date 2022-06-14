/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
 */

/**
 * Define Global Variables
 *
 */

const sections = document.querySelectorAll("section");
const navList = document.querySelector("#navbar__list");
const pageHeader = document.querySelector(".page__header");
/**
 * End Global Variables
 * Start Helper Functions
 *
 */

function getNavLinkIdFromSection(sectionId) {
  return `link-${sectionId}`;
}

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav
function buildNavForMenu() {
  sections.forEach((section) => {
    const newListItem = document.createElement("li");
    const newLink = document.createElement("a");
    newLink.setAttribute("href", `#${section.id}`);
    newLink.innerText = section.dataset.nav;
    newLink.dataset.nav = section.id;
    newLink.classList.add("menu__link");
    newLink.setAttribute("id", getNavLinkIdFromSection(section.id));
    newListItem.appendChild(newLink);
    navList.appendChild(newListItem);
  });
}

// Add class 'active' to section when near top of viewport
function makeActive() {
  for (const section of sections) {
    const box = section.getBoundingClientRect();
    const navLinkId = getNavLinkIdFromSection(section.id);
    const navLink = document.getElementById(navLinkId);

    if (box.top <= 100 && box.bottom >= 100) {
      // Apply active state on the current section and the corresponding Nav link.
      section.classList.add("your-active-class");
      navLink.classList.add("active");
    } else {
      // Remove active state from other section and corresponding Nav link.
      section.classList.remove("your-active-class");
      navLink.classList.remove("active");
    }
  }
}

// Scroll to anchor ID using scrollTO event
function onClickNavListItem(event) {
  event.preventDefault();
  if (event.target.nodeName.toLowerCase() === "a") {
    const section = document.getElementById(event.target.dataset.nav);
    section.scrollIntoView({ behavior: "smooth" });
  }
  return;
}

/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu
buildNavForMenu();

// Scroll to section on link click
navList.addEventListener("click", (event) => onClickNavListItem(event));

// Set sections as active
document.addEventListener("scroll", makeActive);

// Auto hide navbar when inactive
let timer;
document.addEventListener("scroll", () => {
  clearTimeout(timer);
  pageHeader.classList.add('fade-in');
  pageHeader.style.display = 'block';
  timer = setTimeout(() => {
    pageHeader.classList.remove('fade-in');
    pageHeader.style.display = 'none';
  }, 2000);
})
