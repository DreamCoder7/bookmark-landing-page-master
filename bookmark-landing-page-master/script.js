/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
                    # SELECTIONS
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
const btnContainer = document.querySelector(".operation-tab-cont");
const allBtn = document.querySelectorAll(".operation-btn");
const allContent = document.querySelectorAll(".operation-content");
const accordion = document.querySelector(".accordion");
const answer = document.querySelectorAll(".answer");
const icon = document.querySelectorAll(".icon");
const sectionAll = document.querySelectorAll(".section");
const nav = document.querySelector(".nav");
const headerEl = document.querySelector(".header");
const sectionHero = document.querySelector(".section-hero");
const btnMobile = document.querySelector(".btn-mobile-nav");
const links = document.querySelectorAll(".nav-link");

/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
                    # OPERATIONS
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
btnContainer.addEventListener("click", function (e) {
  //   const btn = e.target;
  const btn = e.target.closest(".operation-btn");

  if (!btn) return;

  //   Remove active class
  allBtn.forEach((btn) => btn.classList.remove("btn-active"));
  allContent.forEach((text) => {
    text.classList.remove("operation-content-active");
  });

  //   Add Active class
  btn.classList.add("btn-active");
  document
    .querySelector(`.operation-content-${btn.dataset.tab}`)
    .classList.add("operation-content-active");
});

/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
                    # ACCORDION
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
//   Add Hidden answer
answer.forEach((ans) => ans.classList.add("hidden-answer"));

accordion.addEventListener("click", function (e) {
  const accordionBtn = e.target.closest(".icon");

  if (!accordionBtn) return;

  const activeAccordion = document.querySelector(
    `.answer-${accordionBtn.dataset.icon}`
  );

  // //   Add Hidden answer
  answer.forEach((ans) => ans.classList.add("hidden-answer"));

  // Remove Hidden answer
  document
    .querySelector(`.answer-${accordionBtn.dataset.icon}`)
    .classList.remove("hidden-answer");

  // TODO: IF there is a better way of doing this (Impelement)
  answer.forEach((el) => {
    if (!el.classList.contains("hidden-answer")) {
      icon.forEach((e) => {
        if (accordionBtn.dataset.icon === e.dataset.icon)
          e.style.transform = "rotate(180deg)";
        else e.style.transform = "rotate(0)";
      });
    }
  });
});

/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
                    # SECTION REVEAL
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */

const section = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.style.transform = "translateY(0)";
  entry.target.style.opacity = "100";

  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(section, {
  root: null,
  threshold: 0,
});

sectionAll.forEach((section) => {
  sectionObserver.observe(section);

  section.style.transform = "translateY(8rem)";
  section.style.opacity = "0";
});

/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
                    # SCROLL
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */

nav.addEventListener("click", function (e) {
  e.preventDefault();

  if (e.target.classList.contains("nav-link")) {
    const id = e.target.getAttribute("href");

    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});
//////////////////// UNFINSHED
// Email
const input = document.querySelector(".contact-input");
const contactBtn = document.querySelector(".btn-contact");
const formIcon = document.querySelector(".form-icon");

contactBtn.addEventListener("click", function (e) {
  e.preventDefault();

  if (!input.value.includes("@") && !input.value.includes("gmail.com"))
    formIcon.style.display = "block";
});
///////////////////// UNFINSHED

/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
                    # STICKY
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */

const headerHeight = headerEl.getBoundingClientRect().height;

const sticky = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) headerEl.classList.add("sticky");
  else headerEl.classList.remove("sticky");
};

const observer = new IntersectionObserver(sticky, {
  root: null,
  threshold: [0, 0.2],
  rootMargin: `-${headerHeight}px`,
});

observer.observe(sectionHero);

/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
                    # MOBILE NAVIGATION
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */

btnMobile.addEventListener("click", function (e) {
  headerEl.classList.toggle("nav-open");
});

links.forEach((link) =>
  link.addEventListener("click", function (e) {
    headerEl.classList.remove("nav-open");
  })
);