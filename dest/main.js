function handleRangePrice() {
  const slider = document.querySelector(".range-slider");
  const progress = slider.querySelector(".progress");
  const minPriceInput = slider.querySelector(".min-price");
  const maxPriceInput = slider.querySelector(".max-price");
  const minInput = slider.querySelector(".min-input");
  const maxInput = slider.querySelector(".max-input");

  const updateProgress = () => {
    const minValue = parseInt(minInput.value);
    const maxValue = parseInt(maxInput.value);

    // get the total range of the slider
    const range = maxInput.max - minInput.min;
    // get the selected value range of the progress
    const valueRange = maxValue - minValue;
    // calculate the width percentage
    const width = (valueRange / range) * 100;
    // calculate the min thumb offset
    const minOffset = ((minValue - minInput.min) / range) * 100;

    // update the progress width
    progress.style.width = width + "%";
    // update the progress left position
    progress.style.left = minOffset + "%";

    // update the number inputs
    minPriceInput.value = minValue;
    maxPriceInput.value = maxValue;
  };

  const updateRange = (event) => {
    const input = event.target;

    let min = parseInt(minPriceInput.value);
    let max = parseInt(maxPriceInput.value);

    if (input === minPriceInput && min > max) {
      max = min;
      maxPriceInput.value = max;
    } else if (input === maxPriceInput && max < min) {
      min = max;
      minPriceInput.value = min;
    }

    minInput.value = min;
    maxInput.value = max;

    updateProgress();
  };

  minPriceInput.addEventListener("input", updateRange);
  maxPriceInput.addEventListener("input", updateRange);

  minInput.addEventListener("input", () => {
    if (parseInt(minInput.value) >= parseInt(maxInput.value)) {
      maxInput.value = minInput.value;
    }
    updateProgress();
  });

  maxInput.addEventListener("input", () => {
    if (parseInt(maxInput.value) <= parseInt(minInput.value)) {
      minInput.value = maxInput.value;
    }
    updateProgress();
  });

  let isDragging = false;
  let startOffsetX;

  progress.addEventListener("mousedown", (e) => {
    e.preventDefault(); // prevent text selection

    isDragging = true;

    startOffsetX = e.clientX - progress.getBoundingClientRect().left;

    slider.classList.toggle("dragging", isDragging);
  });

  document.addEventListener("mousemove", (e) => {
    if (isDragging) {
      // get the size and position of the slider
      const sliderRect = slider.getBoundingClientRect();
      const progressWidth = parseFloat(progress.style.width || 0);

      // calculate the new left position for the progress element
      let newLeft =
        ((e.clientX - sliderRect.left - startOffsetX) / sliderRect.width) * 100;

      // ensure the progress is not exceeding the slider boundaries
      newLeft = Math.min(Math.max(newLeft, 0), 100 - progressWidth);

      // update the progress position
      progress.style.left = newLeft + "%";

      // calculate the new min thumb position
      const range = maxInput.max - minInput.min;
      const newMin =
        Math.round((newLeft / 100) * range) + parseInt(minInput.min);
      const newMax =
        newMin + parseInt(maxInput.value) - parseInt(minInput.value);

      // update the min input
      minInput.value = newMin;
      maxInput.value = newMax;

      // update the progress
      updateProgress();
    }
    slider.classList.toggle("dragging", isDragging);
  });

  document.addEventListener("mouseup", () => {
    if (isDragging) {
      isDragging = false;
    }
    slider.classList.toggle("dragging", isDragging);
  });

  updateProgress();
}

function handleTabsNew() {
  let tabs = document.querySelectorAll(".scproduct__tabs-item"),
    listNews = document.querySelectorAll(".scproduct__list");

  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      // remove all class active of tabs
      tabs.forEach(function (tab) {
        tab.classList.remove("active");
      });

      // addclass active to tab
      this.classList.add("active");

      // hide all news list
      listNews.forEach(function (newlist) {
        newlist.classList.remove("active");
      });

      // get data-tab
      let id = this.dataset.tab; // cách 2: let id = this.getAttribute('data-tab')
      // addclass active to news list
      document.querySelector(".new__list-" + id).classList.add("active");
    });
  });
}
handleTabsNew();

// SLIDER HERO
function handleSliderHero() {
  // Khởi tạo slider
  var slider = document.querySelector(".schero__slider");
  var flktySlider = new Flickity(slider, {
    // options
    cellAlign: "left",
    contain: true,
    autoPlay: true,
    pauseAutoPlayOnHover: true,
    imagesLoaded: true,
  });

  // Dots
  function handleDotsSlider() {
    let dotsSlider = document.querySelector(".flickity-page-dots"),
      dotsSliderBottom = document.querySelector(".schero__bottom");
    dotsSliderBottom.appendChild(dotsSlider);
  }
}

function handleCarousel() {
  // Khởi tạo slider
  var carousel = document.querySelector(".carousel");
  var flktycarousel = new Flickity(carousel, {
    // options
    cellAlign: "left",
    contain: true,
    freeScroll: true,
    // prevNextButtons: false,
    wrapAround: false,
    pageDots: false,
  });
}
function handleCarouselWelcome() {
  // Khởi tạo slider
  var flktyWelcome = new Flickity(".welcome__carousel", {
    // options
    cellAlign: "left",
    contain: true,
    freeScroll: true,
    // prevNextButtons: false,
    wrapAround: false,
    pageDots: false,
  });
}

// scroll to section
function scrollToSection() {
  const menuItems = document.querySelectorAll(
      ".header .header__bottom .header__bottom-nav li a"
    ),
    heightHeader = document.querySelector(".header").offsetHeight;

  // function removeActive() {
  //   menuItems.forEach(function (item) {
  //     item.classList.remove("--show");
  //   });
  // }

  menuItems.forEach(function (item) {
    item.addEventListener("click", function (e) {
      // ngăn chặn sự chuyển trang
      // e.preventDefault();
      // lấy #....
      const atrHref = item.getAttribute("href");
      window.scrollTo({
        top: document.querySelector(atrHref).offsetTop - heightHeader,
        behavior: "smooth",
      });
      //  Xóa class active hiện tại
      // removeActive();
      // thêm class active vào item đã chọn
      // item.classList.add("--show");
    });
  });

  // Active menu when scrolling
  // const sections = document.querySelectorAll("section[id]");
  // window.addEventListener("scroll", function () {
  //   sections.forEach(function (section, index) {
  //     let scrolly = window.scrollY,
  //       sectionTop = section.offsetTop - heightHeader,
  //       sectionHeight = section.offsetHeight;
  //     // scrolly >= sectionTop : scroll đến section
  //     // scrolly < sectionTop + sectionHeight : chưa scroll ra khỏi section
  //     if (scrolly >= sectionTop && scrolly < sectionTop + sectionHeight) {
  //       removeActive();
  //       menuItems[index].classList.add("--show");
  //     }
  //   });
  // });
}
scrollToSection();

// // Register Form
// function registerForm() {
//   const btnSignUp = document.querySelector(
//       ".header .header__top .header__right .btnaccount"
//     ),
//     // btnmob = document.querySelector(".menumobile .header__menu .btnmob"),
//     register = document.querySelector(".register"),
//     btnClose = document.querySelector(
//       ".register .register__inner .register__inner-items .iconclose"
//     ),
//     overlay = document.querySelector(".register__overlay"),
//     body = document.querySelector("body");
//   // show
//   function showRegisterForm() {
//     register.classList.add("active");
//     body.classList.add("--disable-scroll");
//   }

//   btnSignUp.addEventListener("click", function () {
//     showRegisterForm();
//   });
//   // btnmob.addEventListener("click", function () {
//   //   showRegisterForm();
//   // });
//   // remove
//   function hideRegisterForm() {
//     register.classList.remove("active");
//     body.classList.remove("--disable-scroll");
//   }
//   btnClose.addEventListener("click", function () {
//     hideRegisterForm();
//   });
//   overlay.addEventListener("click", function () {
//     hideRegisterForm();
//   });
// }
// registerForm();

// Handle Icon Password
function handleShowPassword() {
  const togglePassword = document.querySelectorAll(".eye");
  togglePassword.forEach((item) => {
    item.addEventListener("click", handleTogglePassword);
  });

  function handleTogglePassword() {
    const eyeOpen = this.previousElementSibling,
      input = eyeOpen.previousElementSibling;
    if (eyeOpen) {
      eyeOpen.classList.add("is-active");
    }
    if (input) {
      input.setAttribute("type", "text");
    } else {
      const input = this.previousElementSibling;
      this.classList.remove("is-active");
      if (input) {
        input.setAttribute("type", "password");
      }
    }
  }
}
handleShowPassword();

window.addEventListener("load", function () {
  handleSliderHero();
  handleCarousel();
  handleCarouselWelcome();
});

window.addEventListener("load", function () {
  const slider = document.querySelector(".range-slider");
  if (slider != null) {
    handleRangePrice();
  }
});

// FORM VALIDATE
function Validator(options) {
  function valiate(inputElement, rule) {
    var errorMessage = rule.test(inputElement.value);
    var errorElement = inputElement.parentElement.querySelector(
      options.errorSelector
    );

    if (errorMessage) {
      errorElement.innerText = errorMessage;
      inputElement.parentElement.classList.add("--invalid");
    } else {
      errorElement.innerText = "";
      inputElement.parentElement.classList.remove("--invalid");
    }
  }

  // lấy element của form cần validate
  var formElement = document.querySelector(options.form);

  if (formElement) {
    //khi submit form
    formElement.onsubmit = function (e) {
      e.preventDefault();

      // lặp qua từng rule và validate
      options.rules.forEach(function (rule) {
        var inputElement = formElement.querySelector(rule.selector);
        valiate(inputElement, rule);
      });
    };

    // lặp qua và xử lí
    options.rules.forEach(function (rule) {
      var inputElement = formElement.querySelector(rule.selector);
      var errorElement = inputElement.parentElement.querySelector(
        options.errorSelector
      );

      if (inputElement) {
        // xử lí trường hợp blur khỏi input
        inputElement.onblur = function () {
          valiate(inputElement, rule);
        };
        // Xử lí khi người dùng nhập
        inputElement.oninput = function () {
          errorElement.innerText = "";
          inputElement.parentElement.classList.remove("--invalid");
        };
      }
    });
  }
}
// Nguyên tắc của rules:
// 1. khi có lỗi -> trả ra mess lỗi
// 2. khi hợp lệ -> ko trả tra gì cả ( undefined)
Validator.isRequired = function (selector) {
  return {
    selector: selector,
    test: function (value) {
      return value.trim() ? undefined : "Please fill out this field";
    },
  };
};

Validator.isEmail = function (selector) {
  return {
    selector: selector,
    test: function (value) {
      var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      return regex.test(value) ? undefined : "This field must be email !";
    },
  };
};

Validator({
  form: "#formgroupjs",
  formGroupSelector: ".formgroup__input",
  errorSelector: ".form-error",
  rules: [
    Validator.isRequired("#name"),
    Validator.isEmail("#email"),
    Validator.isRequired("#subject"),
    Validator.isRequired("#message"),
  ],
});

Validator({
  form: "#formsubjs",
  formGroupSelector: ".formsub",
  errorSelector: ".form-error",
  rules: [Validator.isEmail("#subscribe")],
});

Validator({
  form: "#formwrap",
  formGroupSelector: ".formgroup",
  errorSelector: ".form-error",
  rules: [
    Validator.isRequired("#name"),
    Validator.isEmail("#email"),
    Validator.isRequired("#subject"),
    Validator.isRequired("#message"),
  ],
});
