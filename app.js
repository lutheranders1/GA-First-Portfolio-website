let accord = document.getElementsByClassName("accordion");
let i;

for (i = 0; i < accord.length; i++) {
  accord[i].addEventListener("click", function () {
    this.classList.toggle("active");
    let panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
      panel.style.maxWidth = panel.scrollWidth + "px";
      panel.style.overflow = "scroll";
    }
  });
}

/****************************************************** */
const formsub = document.querySelector(".main-form");

formsub.addEventListener("submit", (e) => {
  alert(`Thank you for submitting, I'll be in touch soon `);
});

/****************************************************/

function compute() {
  let principal = document.getElementById("principal").value;

  if (principal == "" || principal <= 0) {
    alert("Enter a positive number");
    document.getElementById("principal").focus();
    return;
  }

  let rate = document.getElementById("rate").value;
  let years = document.getElementById("years").value;
  let interest = (principal * years * rate) / 100;

  let dateNow = new Date();
  let yearNow = parseInt(dateNow.getFullYear()) + parseInt(years);

  let rate_val = document.getElementById("result");

  let answer = parseInt(principal) + parseInt(interest);
  document.getElementById(
    "result"
  ).innerHTML = `If you deposit ${principal} at a rate of ${rate}% you will receive $${answer} dollars in year ${yearNow}`;
}

function SliderValue() {
  let slider = document.getElementById("rate");
  let output = document.getElementById("rate_val");
  output.innerHTML = slider.value; // Display the default slider value

  // Update the current slider value (each time you drag the slider handle)
  slider.onchange = function () {
    output.innerHTML = this.value;
  };
}

/**************************************/

function off() {
  document.getElementById("overlay").style.display = "none";
}

function off1() {
  document.getElementById("overlay1").style.display = "none";
}
function off2() {
  document.getElementById("overlay2").style.display = "none";
}
function off3() {
  document.getElementById("overlay3").style.display = "none";
}
function on() {
  document.getElementById("overlay").style.display = "block";
}
function on1() {
  document.getElementById("overlay1").style.display = "block";
}
function on2() {
  document.getElementById("overlay2").style.display = "block";
}
function on3() {
  document.getElementById("overlay3").style.display = "block";
}
