"use strict";
const bothNav = document.querySelectorAll("[data-nav]"),
  nav = document.querySelector(".header__nav"),
  navLink = document.querySelectorAll("header__nav--link"),
  toggleBtn = document.querySelector(".btn-toggler"),
  heroSection = document.querySelector(".hero__section"),
  section2 = document.querySelector("#section--2"),
  section1 = document.querySelector("#section--1"),
  icon = document.querySelector(".header__social--media"),
  scrollHome = document.querySelector(".scroll__home"),
  contactUs = document.querySelector(".contact__us"),
  header = document.querySelector("#header"),
  allSection = document.querySelectorAll(".section"),
  faq = document.querySelectorAll(".faq"),
  footer = document.querySelector("#footer"),
  date = new Date();
function scroller(e) {
  e.scrollTo({ top: 0, left: 0, behavior: "smooth" });
}
function fadingOut() {
  const e = function (e) {
    if (e.target.classList.contains("icons")) {
      const t = e.target;
      t.closest(".header__social--media")
        .querySelectorAll(".icons")
        .forEach((e) => {
          e != t && (e.style.opacity = this);
        });
    }
  };
  icon.addEventListener("mouseover", e.bind(0.5)),
    icon.addEventListener("mouseout", e.bind(1));
}
function activeNav() {
  nav.addEventListener("click", function (e) {
    if (e.target.classList.contains("header__nav--link")) {
      const t = e.target;
      nav
        .closest(".header__nav")
        .querySelectorAll(".header__nav--link")
        .forEach((e) =>
          e === t
            ? e.classList.add("header__nav--link-active")
            : e.classList.remove("header__nav--link-active")
        );
    }
  });
}
function smoothNavScroll() {
  bothNav.forEach((e) => {
    e.addEventListener("click", function (e) {
      if ((e.preventDefault(), "link" === e.target.dataset.link)) {
        const t = e.target.getAttribute("href");
        document.querySelector(t).scrollIntoView({ behavior: "smooth" });
      }
    });
  });
}
function observeAPI() {
  new IntersectionObserver(
    function (e) {
      const [t] = e;
      t.isIntersecting
        ? nav.classList.remove("sticky__nav")
        : nav.classList.add("sticky__nav");
    },
    { root: null, threshold: 0 }
  ).observe(section1);
  const e = new IntersectionObserver(
    function (e, t) {
      const [n] = e;
      n.isIntersecting &&
        (n.target.classList.remove("section__hidden"), t.unobserve(n.target));
    },
    { root: null, threshold: 0.1 }
  );
  allSection.forEach((t) => {
    e.observe(t), t.classList.add("section__hidden");
  });
  const t = document.querySelectorAll("img[data-src]"),
    n = new IntersectionObserver(
      function (e, t) {
        const [n] = e;
        n.isIntersecting &&
          ((n.target.src = n.target.dataset.src),
          n.target.addEventListener("load", function () {
            n.target.classList.remove("lazy--img");
          }),
          t.unobserve(n.target));
      },
      { root: null, threshold: 0, rootMargin: "300px" }
    );
  t.forEach((e) => {
    n.observe(e);
  });
}
function askQuestion() {
  faq.forEach((e) =>
    e.addEventListener("click", function () {
      this.querySelector("i").classList.toggle("rotate"),
        this.querySelector(".p").classList.toggle("hidden--p");
    })
  );
}
function slider() {
  const e = document.querySelectorAll(".cards__card--img-1"),
    t = document.querySelectorAll(".cards__card--img-2"),
    n = document.querySelectorAll(".cards__card--img-3"),
    o = document.querySelectorAll(".slider-btn-right"),
    c = document.querySelectorAll(".slider-btn-left");
  let r = 0;
  function s(e, t = 0) {
    return e.forEach(
      (e, n) => (e.style.transform = `translateX(${100 * (n - t)}%)`)
    );
  }
  function i(e) {
    const { slider: t } = e.target.closest(".cards__card--img").dataset,
      n = e.target
        .closest(".cards__card--img")
        .querySelectorAll(`.cards__card--img-${t}`);
    e.target.classList.contains("slider-btn-right") &&
      (r === n.length - 1 ? (r = 0) : r++, s(n, r)),
      e.target.classList.contains("slider-btn-left") &&
        (0 === r ? (r = n.length - 1) : r--, s(n, r));
  }
  s(e),
    s(t),
    s(n),
    o.forEach((e) => {
      e.addEventListener("click", i.bind());
    }),
    c.forEach((e) => {
      e.addEventListener("click", i.bind());
    });
}
function addComment() {
  const e = document.querySelector("input[type=submit]"),
    t =
      (document.querySelector(".testimonial__container"),
      document.querySelector(".testimonial__input [data-comment]")),
    n = document.querySelector(".testimonial__input [data-fullname]");
  function o(e) {
    return e < 10 ? `0${e}` : e;
  }
  function c(e, t) {
    return Math.floor(Math.random() * (t - e + 1) + e);
  }
  const r = function () {
    var e;
    document.querySelector(".testimonial__container-lg").insertAdjacentHTML(
      "afterbegin",
      ` \n       <div class='user__feedback'>\n      <div class="testimonial__container--user">\n        <div class="testimonial__container--user-photo">${
        ((e = n.value),
        e
          .toLowerCase()
          .split(" ")
          .slice(0, 2)
          .map((e) => e[0])
          .join("")
          .toUpperCase())
      }</div>\n        <div class="testimonial__container--date">${o(
        date.getDate()
      )}/${o(
        date.getMonth() + 1
      )}/${date.getFullYear()}</div>\n      </div>\n\n     <div class="testimonial__container">\n      <div class="testimonial__container--text">\n\n        <p class="paragraph testimonial--paragraph-1">\n          ${
        t.value
      }\n        </p>\n        <p class="paragraph testimonial--paragraph">\n          &mdash; &nbsp;${
        n.value
      }\n          <span class="phone--date">09/09/2021</span>\n        </p>\n      </div>\n      </div>\n      </div>`
    ),
      (function () {
        const e = `rgb(${c(0, 250)},${c(0, 255)},${c(0, 254)})`;
        (document.querySelector(
          ".testimonial__container--user-photo"
        ).style.backgroundColor = e),
          (document.querySelector(
            ".testimonial__container"
          ).style.borderTop = `6px solid ${e}`);
      })();
  };
  e.addEventListener("click", (e) => {
    if ("" === t.value || "" === n.value)
      return alert("Please fill both input fields"), t.focus();
    r(), (t.value = ""), (n.value = "");
  });
}
function testimonialButton() {
  const e = document.querySelector(".testimonial__show--more"),
    t = document.querySelector(".testimonial__container-lg");
  e.addEventListener("click", function () {
    t.classList.toggle("testimonial__container-show"),
      t.classList.contains("testimonial__container-show")
        ? ((this.innerHTML = "show less &nbsp; &uparrow;"),
          this.classList.add("show--less"))
        : ((this.innerHTML = "show more &downarrow;"),
          this.classList.remove("show--less")),
      t.classList.contains("testimonial__container-show") || scroller(t);
  });
}
function cookies() {
  const e = document.createElement("div");
  e.classList.add("cookie"),
    (e.innerHTML =
      "<i class=\"fas fa-cookie-bite\"></i> By using this website, you agree to our cookie policy <button class='cookie__btn'>ok</button>"),
    section1.append(e),
    document
      .querySelector(".cookie__btn")
      .addEventListener("click", function () {
        e.remove();
      });
}
function scrollBtn() {
  scrollHome.addEventListener("click", function () {
    scroller(window),
      nav
        .closest(".header__nav")
        .querySelectorAll(".header__nav--link")
        .forEach((e) => {
          e.classList.remove("header__nav--link-active");
        });
  });
  new IntersectionObserver(
    function (e) {
      e.forEach((e) => {
        e.isIntersecting
          ? document.querySelector(".scroll").classList.add("scroll__home")
          : document.querySelector(".scroll").classList.remove("scroll__home");
      });
    },
    { root: null, threshold: [0, 0.7] }
  ).observe(footer);
}
function dateUpdate() {
  document.querySelector(
    ".footer__copyright"
  ).innerHTML = `  copyright &copy; ${date.getFullYear()} by Bhagirathi travel | terms of use | privacy\n policy | created by Anuj Panwar...`;
}
function userLogin() {
  const e = document.querySelector(".close__login"),
    t = document.querySelector(".overlay"),
    n = document.querySelector(".login"),
    o = document.querySelector(".login--btn");
  o.addEventListener("click", function () {
    n.classList.remove("hidden--login"), t.classList.remove("hidden--overlay");
  });
  const c = function () {
    n.classList.add("hidden--login"),
      t.classList.add("hidden--overlay"),
      o.classList.remove("header__nav--link-active");
  };
  e.addEventListener("click", c.bind()), t.addEventListener("click", c.bind());
}
fadingOut(),
  activeNav(),
  smoothNavScroll(),
  observeAPI(),
  setTimeout(askQuestion, 3e3),
  toggleBtn.addEventListener("click", function () {
    document.querySelector(".header__nav--ul").classList.toggle("nav--open");
  }),
  slider(),
  addComment(),
  testimonialButton(),
  setTimeout(cookies, 3e3),
  scrollBtn(),
  dateUpdate(),
  userLogin();
