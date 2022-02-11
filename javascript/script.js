"use strict";
const bothNav = document.querySelectorAll("[data-nav]");
const nav = document.querySelector(".header__nav");
const navLink = document.querySelectorAll("header__nav--link");
const toggleBtn = document.querySelector(".btn-toggler");

const heroSection = document.querySelector(".hero__section");

const section2 = document.querySelector("#section--2");
const section1 = document.querySelector("#section--1");
const icon = document.querySelector(".header__social--media");
const scrollHome = document.querySelector(".scroll__home");
const contactUs = document.querySelector(".contact__us");
const header = document.querySelector("#header");
const allSection = document.querySelectorAll(".section");
const faq = document.querySelectorAll(".faq");
const footer = document.querySelector("#footer");

//global function for all times
const date = new Date();
//scroll behaviour
function scroller(ele) {
  ele.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
}
//
//hover effect on social media
function fadingOut() {
  const hoverEffect = function (e) {
    if (e.target.classList.contains("icons")) {
      const hover = e.target;
      const allIcons = hover
        .closest(".header__social--media")
        .querySelectorAll(".icons");
      allIcons.forEach((ele) => {
        if (ele != hover) ele.style.opacity = this;
      });
    }
  };
  icon.addEventListener("mouseover", hoverEffect.bind(0.5));
  icon.addEventListener("mouseout", hoverEffect.bind(1));
}
fadingOut();
// active nav
function activeNav() {
  nav.addEventListener("click", function (e) {
    if (e.target.classList.contains("header__nav--link")) {
      const link = e.target;
      const siblings = nav
        .closest(".header__nav")
        .querySelectorAll(".header__nav--link");
      siblings.forEach((ele) =>
        ele === link
          ? ele.classList.add("header__nav--link-active")
          : ele.classList.remove("header__nav--link-active")
      );
    }
  });
}
activeNav();
//nav smooth scrolling
function smoothNavScroll() {
  bothNav.forEach((ele) => {
    ele.addEventListener("click", function (e) {
      e.preventDefault();

      if (e.target.dataset.link === "link") {
        const id = e.target.getAttribute("href");

        document.querySelector(id).scrollIntoView({ behavior: "smooth" });
      }
    });
  });
}
smoothNavScroll();
/////////////////////////////////////////////////////////////////////
//observer API
function observeAPI() {
  //sticky nav
  const stickyNav = function (entries) {
    const [entry] = entries;
    !entry.isIntersecting
      ? nav.classList.add("sticky__nav")
      : nav.classList.remove("sticky__nav");
  };
  const sectionObserver = new IntersectionObserver(stickyNav, {
    root: null,
    threshold: 0,
  });
  sectionObserver.observe(section1);

  //////////////////////////////////////////////////////////////////

  //late loading  all sections
  const sections = function (entries, observer) {
    const [entry] = entries;
    if (!entry.isIntersecting) return;
    entry.target.classList.remove("section__hidden");
    observer.unobserve(entry.target);
  };
  const slowLoad = new IntersectionObserver(sections, {
    root: null,
    threshold: 0.1,
  });
  allSection.forEach((ele) => {
    slowLoad.observe(ele);
    ele.classList.add("section__hidden");
  });

  ///////////////////////////////////////////////////////////

  //lazy loading img
  const lazyImg = document.querySelectorAll("img[data-src]");

  const lazyLoad = function (entries, observe) {
    const [entry] = entries;
    if (!entry.isIntersecting) return;
    entry.target.src = entry.target.dataset.src;

    entry.target.addEventListener("load", function () {
      entry.target.classList.remove("lazy--img");
    });
    observe.unobserve(entry.target);
  };

  const imgObserver = new IntersectionObserver(lazyLoad, {
    root: null,
    threshold: 0,
    rootMargin: "300px",
  });
  lazyImg.forEach((img) => {
    imgObserver.observe(img);
  });
  ///////////////////////////////////////////////////////
}
observeAPI();
//faq
function askQuestion() {
  faq.forEach((ele) =>
    ele.addEventListener("click", function () {
      this.querySelector("i").classList.toggle("rotate");
      this.querySelector(".p").classList.toggle("hidden--p");
    })
  );
}
// askQuestion();
setTimeout(askQuestion, 3000);
//header toggler btn
toggleBtn.addEventListener("click", function () {
  document.querySelector(".header__nav--ul").classList.toggle("nav--open");
});

////////////////////////////////////////////////////////////////////////////////
// slider
function slider() {
  const card1 = document.querySelectorAll(".cards__card--img-1");
  const card2 = document.querySelectorAll(".cards__card--img-2");
  const card3 = document.querySelectorAll(".cards__card--img-3");

  const rightBtn = document.querySelectorAll(".slider-btn-right");
  const leftBtn = document.querySelectorAll(".slider-btn-left");

  let current = 0;
  //all card initial code
  function init() {
    card(card1);
    card(card2);
    card(card3);
  }
  init();

  //acutal logic
  function card(currCard, number = 0) {
    return currCard.forEach(
      (ele, i) => (ele.style.transform = `translateX(${100 * (i - number)}%)`)
    );
  }

  //btn inside code
  function btnCode(e) {
    const { slider } = e.target.closest(".cards__card--img").dataset;

    const latestCard = e.target
      .closest(".cards__card--img")
      .querySelectorAll(`.cards__card--img-${slider}`);

    if (e.target.classList.contains(`slider-btn-right`)) {
      current === latestCard.length - 1 ? (current = 0) : current++;
      card(latestCard, current);
    }
    if (e.target.classList.contains(`slider-btn-left`)) {
      current === 0 ? (current = latestCard.length - 1) : current--;
      card(latestCard, current);
    }
  }
  //right Btn
  rightBtn.forEach((ele) => {
    ele.addEventListener("click", btnCode.bind());
  });
  // leftBtn
  leftBtn.forEach((ele) => {
    ele.addEventListener("click", btnCode.bind());
  });
}
slider();
///////////////////////////////////////////////////////////////////////////////
//feedback
function addComment() {
  const testimonial = document.querySelector("input[type=submit]");
  const testimonialContainer = document.querySelector(
    ".testimonial__container"
  );
  const feedback = document.querySelector(".testimonial__input [data-comment]");
  const userName = document.querySelector(
    ".testimonial__input [data-fullname]"
  );
  //full date/m/year
  function checkDate(d) {
    return d < 10 ? `0${d}` : d;
  }
  //user profile name
  function userProfile(value) {
    return value
      .toLowerCase()
      .split(" ")
      .slice(0, 2)
      .map((ele) => ele[0])
      .join("")
      .toUpperCase();
  }

  //random color
  function minMax(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function userProfileColor() {
    const random = `rgb(${minMax(0, 250)},${minMax(0, 255)},${minMax(0, 254)})`;
    document.querySelector(
      ".testimonial__container--user-photo"
    ).style.backgroundColor = random;
    //border top
    document.querySelector(
      ".testimonial__container"
    ).style.borderTop = `6px solid ${random}`;
  }

  //////////////////////////////////////////////////////////
  const commentHTML = function () {
    document.querySelector(".testimonial__container-lg").insertAdjacentHTML(
      "afterbegin",
      ` 
       <div >
      <div class="testimonial__container--user">
        <div class="testimonial__container--user-photo">${userProfile(
          userName.value
        )}</div>
        <div class="testimonial__container--date">${checkDate(
          date.getDate()
        )}/${checkDate(date.getMonth() + 1)}/${date.getFullYear()}</div>
      </div>

     <div class="testimonial__container">
      <div class="testimonial__container--text">

        <p class="paragraph testimonial--paragraph-1">
          ${feedback.value}
        </p>
        <p class="paragraph testimonial--paragraph">
          &mdash; &nbsp;${userName.value}
          <span class="phone--date">09/09/2021</span>
        </p>
      </div>
      </div>
      </div>`
    );
    userProfileColor();
  };
  testimonial.addEventListener("click", (e) => {
    if (feedback.value === "" || userName.value === "") {
      alert("Please fill both input fields");
      return feedback.focus();
    }
    commentHTML();

    feedback.value = "";
    userName.value = "";
  });
}
addComment();
////////////////////////////////////////////////////////////////////////////////
//show more btn
function testimonialButton() {
  const showMore = document.querySelector(".testimonial__show--more");
  const testimonialLg = document.querySelector(".testimonial__container-lg");

  showMore.addEventListener("click", function () {
    testimonialLg.classList.toggle("testimonial__container-show");

    //show the show less btn;
    if (testimonialLg.classList.contains("testimonial__container-show")) {
      this.innerHTML = `show less &nbsp; &uparrow;`;
      this.classList.add("show--less");
    } else {
      this.innerHTML = "show more &downarrow;";
      this.classList.remove("show--less");
    }

    //scroll to first element;
    if (!testimonialLg.classList.contains("testimonial__container-show")) {
      scroller(testimonialLg);
    }
  });
}

testimonialButton();

/////////////////////////////////////////////////////////////////////////////////////////
// cookies
function cookies() {
  const cookie = document.createElement("div");
  cookie.classList.add("cookie");
  cookie.innerHTML = `<i class="fas fa-cookie-bite"></i> By using this website, you agree to our cookie policy <button class='cookie__btn'>ok</button>`;
  section1.append(cookie);

  document.querySelector(".cookie__btn").addEventListener("click", function () {
    cookie.remove();
  });
}
setTimeout(cookies, 3000);
/////////////////////////////////////////////////////////////////////////////////////////
// event on scroll up btn
function scrollBtn() {
  scrollHome.addEventListener("click", function () {
    scroller(window);
    //remove active class
    nav
      .closest(".header__nav")
      .querySelectorAll(".header__nav--link")
      .forEach((ele) => {
        ele.classList.remove("header__nav--link-active");
      });
  });

  // render the scroll btn
  const scrollBtn = function (entries) {
    entries.forEach((entry) => {
      entry.isIntersecting
        ? document.querySelector(".scroll").classList.add("scroll__home")
        : document.querySelector(".scroll").classList.remove("scroll__home");
    });
  };
  const contactObserver = new IntersectionObserver(scrollBtn, {
    root: null,
    threshold: [0, 0.7],
  });
  contactObserver.observe(footer);
}
scrollBtn();
/////////////////////////////////////////////////////////////////////////////
// copy right date
function dateUpdate() {
  document.querySelector(
    ".footer__copyright"
  ).innerHTML = `  copyright &copy; ${date.getFullYear()} by Bhagirathi travel | terms of use | privacy
 policy | created by Anuj Panwar...`;
}
dateUpdate();
////////////////////////////////////////////////
//login and sign up
function userLogin() {
  const closeLogin = document.querySelector(".close__login");
  const overlay = document.querySelector(".overlay");
  const login = document.querySelector(".login");

  const loginBtn = document.querySelector(".login--btn");
  loginBtn.addEventListener("click", function () {
    login.classList.remove("hidden--login");
    overlay.classList.remove("hidden--overlay");
  });

  const hidden = function () {
    login.classList.add("hidden--login");
    overlay.classList.add("hidden--overlay");
    loginBtn.classList.remove("header__nav--link-active");
  };

  closeLogin.addEventListener("click", hidden.bind());
  overlay.addEventListener("click", hidden.bind());
}
userLogin();
// console.log(el.closest(".section__faqs"));
// const a = el.closest(".section__faqs").querySelectorAll(".faq");
// console.log(
//   a.forEach((ele) =>
//     console.log(ele.querySelector(".p").classList.remove("hidden--p"))
//   )
// );
// console.log(a);

// const allQues = document.querySelectorAll(".faq");
// allQues.forEach((ele) =>
//   document.querySelector(".p").classList.remove("hidden--p")
// );
// });
// nav.addEventListener("click", function (e) {
//   e.preventDefault();
//   if (e.target.classList.contains("header__nav--link")) {
//     const id = e.target.getAttribute("href");
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: "smooth" });
//   }
// });

// //nav open class
// toggleBtn.addEventListener("click", function () {
//   nav.classList.add("nav__open");
//   closeBtn.style.display = "block";
//   ul.classList.add("nav__ul");
//   toggleBtn.style.zIndex = 1;
//   // diffImg(1, 5);
// });

// closeBtn.addEventListener("click", function () {
//   nav.classList.remove("nav__open");
//   ul.classList.remove("nav__ul");
//   closeBtn.style.display = "none";
// });
// top: -1.1rem;
// transform: rotate(
// 120deg
// ) translate(8px, 0px);
// // hover effect
// function hoverEffect(e) {
//   if (e.target.classList.contains("header__nav--link")) {
//     const link = e.target;
//     const siblings = link.closest("nav").querySelectorAll(".header__nav--link");
//     siblings.forEach((ele) => {
//       if (ele != link) {
//         ele.style.opacity = this;
//       }
//     });
//   }
// }
// nav.addEventListener("mouseover", hoverEffect.bind(0.5));
// nav.addEventListener("mouseout", hoverEffect.bind(1));

// //minmax

// //header img
// function minMax(min, max) {
//   return Math.floor(Math.random() * (max - min + 1) + min);
// }

// function diffImg() {
//   const random = minMax(1, 12);

//   heroSection.style.backgroundImage = `linear-gradient(to bottom,#2BC0E4,

// #eaecc6)`;
// }
// //url(./img/img--${random}.jpg)`;
// //headerImg.src = `img/img--${random}.jpg`
// //header img add event listner
// headerImg.addEventListener("click", diffImg);

// if (navigator.geolocation) {
//   navigator.geolocation.getCurrentPosition(
//     function (position) {
//       const { latitude } = position.coords;
//       const { longtitude } = position.coords;
//       console.log(latitude, longtitude);

//       const map = L.map("map").setView(croods, 13);

//       L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//         attribution:
//           '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//       }).addTo(map);

//       L.marker()
//         .addTo(map)
//         .bindPopup("A pretty CSS3 popup.<br> Easily customizable.");
//     },
//     function () {
//       alert(`Sorry! did'nt get the location.`);
//     }
//   );
// }
// https://www.google.com/maps/place/Mussoorie,+Uttarakhand/@30.4549303,78.0839608,14.04z/data=!4m5!3m4!1s0x3908d0cfa61cda5b:0x197fd47d980e85b1!8m2!3d30.4597892!4d78.0643723
