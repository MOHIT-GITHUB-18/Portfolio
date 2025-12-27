'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}

//custom js

// Auto-slide & drag scroll for testimonials
const testimonialsList = document.querySelector(".testimonials-list");
const testimonialItems = document.querySelectorAll(".testimonials-item");

if (testimonialsList && testimonialItems.length > 0) {
  let scrollAmount = 0;
  const itemWidth = testimonialItems[0].offsetWidth + 16; // include gap

  // Auto slide every 2s
  setInterval(() => {
    if ((scrollAmount + testimonialsList.offsetWidth) >= testimonialsList.scrollWidth) {
      scrollAmount = 0;
    } else {
      scrollAmount += itemWidth;
    }
    testimonialsList.scrollTo({ left: scrollAmount, behavior: "smooth" });
  }, 2000);

  // Drag to scroll
  let isDragging = false;
  let startX, scrollLeft;

  testimonialsList.addEventListener("mousedown", (e) => {
    isDragging = true;
    testimonialsList.classList.add("dragging");
    startX = e.pageX - testimonialsList.offsetLeft;
    scrollLeft = testimonialsList.scrollLeft;
  });

  testimonialsList.addEventListener("mouseleave", () => {
    isDragging = false;
    testimonialsList.classList.remove("dragging");
  });

  testimonialsList.addEventListener("mouseup", () => {
    isDragging = false;
    testimonialsList.classList.remove("dragging");
  });

  testimonialsList.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - testimonialsList.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed
    testimonialsList.scrollLeft = scrollLeft - walk;
  });

  // Optional: drag scroll for touch devices
  let touchStartX = 0;
  let touchScrollLeft = 0;

  testimonialsList.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].pageX;
    touchScrollLeft = testimonialsList.scrollLeft;
  });

  testimonialsList.addEventListener("touchmove", (e) => {
    const x = e.touches[0].pageX;
    const walk = (x - touchStartX) * 2;
    testimonialsList.scrollLeft = touchScrollLeft - walk;
  });
}

let count = 0;
let counter = document.getElementById("counter");
let progress = document.getElementById("progress-fill")

let interval = setInterval(() => {
  count++;
  counter.textContent = count + "%";
  progress.style.width = `${count}%`;

  if (count >= 100) {
    clearInterval(interval);
    document.getElementById("loader").style.opacity = "0";
    setTimeout(() => {
      document.getElementById("loader").style.display = "none";
      document.body.style.overflow = "auto";
    }, 1000);
  }
}, 20);

//random wisdom

var wisdom = {
  0:{ words:"“Man is what he believes.”", person:"- Anton Chekhov" },
  1:{ words:"“Stay hungry, stay foolish.”", person:"- Steve Jobs" },
  2:{ words:"“Simplicity is the ultimate sophistication.”", person:"- Leonardo da Vinci" },
  3:{ words:"“What we think, we become.”", person:"- Buddha" },
  4:{ words:"“Less is more.”", person:"- Mies van der Rohe" },
  5:{ words:"“Be yourself, everyone else is already taken.”", person:"- Oscar Wilde" },
  6:{ words:"“The unexamined life is not worth living.”", person:"- Socrates" },
  7:{ words:"“Knowing yourself is the beginning of all wisdom.”", person:"- Aristotle" },
  8:{ words:"“He who has a why can bear almost any how.”", person:"- Friedrich Nietzsche" },
  9:{ words:"“Happiness depends upon ourselves.", person:"- Aristotle" },
  10:{ words:"“To be is to do.”", person:"- Socrates" }
};

var wisdomText = document.getElementById("wisdom")
var wisdomPerson = document.getElementById("wisdom-person")
var randomNumberText = Math.round(Math.random()*10);


if(randomNumberText == 0){
  wisdomText.innerText = wisdom[0].words
  wisdomPerson.innerText = wisdom[0].person
}
else if(randomNumberText == 1){
  wisdomText.innerText = wisdom[1].words
  wisdomPerson.innerText = wisdom[1].person
}
else if(randomNumberText == 2){
  wisdomText.innerText = wisdom[2].words
  wisdomPerson.innerText = wisdom[2].person
}
else if(randomNumberText == 3){
  wisdomText.innerText = wisdom[3].words
  wisdomPerson.innerText = wisdom[3].person
}
else if(randomNumberText == 4){
  wisdomText.innerText = wisdom[4].words
  wisdomPerson.innerText = wisdom[4].person
}
else if(randomNumberText == 5){
  wisdomText.innerText = wisdom[5].words
  wisdomPerson.innerText = wisdom[5].person
}
else if(randomNumberText == 6){
  wisdomText.innerText = wisdom[6].words
  wisdomPerson.innerText = wisdom[6].person
}
else if(randomNumberText == 7){
  wisdomText.innerText = wisdom[7].words
  wisdomPerson.innerText = wisdom[7].person
}
else if(randomNumberText == 8){
  wisdomText.innerText = wisdom[8].words
  wisdomPerson.innerText = wisdom[8].person
}
else if(randomNumberText == 9){
  wisdomText.innerText = wisdom[9].words
  wisdomPerson.innerText = wisdom[9].person
}
else if(randomNumberText == 10){
  wisdomText.innerText = wisdom[10].words
  wisdomPerson.innerText = wisdom[10].person
}