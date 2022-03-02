$(document).ready(function(){
let accord = document.getElementsByClassName("accordion");
let i;

for (i = 0; i < accord.length; i++) {
  accord[i].addEventListener("click", function() {
    this.classList.toggle("active");
     let panel = this.nextElementSibling;
     if (panel.style.maxHeight) {
       panel.style.maxHeight = null;
     } else {
      panel.style.maxHeight = panel.scrollHeight+"px";
      panel.style.maxWidth = panel.scrollWidth+"px";
      panel.style.overflow = "scroll";
     }
  });
}

/****************************************************** */
const formsub = document.querySelector(".main-form");

formsub.addEventListener('submit', e => {

alert(`Thank you for submitting, I'll be in touch soon `)})

/****************************************************/

$("#btn").click(function compute() {
  
{
    let principal = $("#principal").value();

    if(principal == "" || principal <= 0)
    {
        alert("Enter a positive number");
        
        return;
    }
    else {
    let rate = $("#rate").value();
    let years = $("#years").value();
    let interest = principal * years * rate / 100;

    let dateNow = new Date();
    let yearNow = parseInt(dateNow.getFullYear()) + parseInt(years);
    
    
    $("#result").html=(`If you deposit  ${principal} at an interest rate of ${rate}  You will receive an amount of  ${interest} in the year ${yearNow}`);
  }
}
});});

$("#rate").change(function slider(){
  
  $("#rate_val").html = $("#rate").value();
   
});
 
