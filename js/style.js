// When the user scrolls the page, execute myFunction
window.onscroll = function() {myFunction()};

// Get the navbar
var navbar = document.getElementById("navbar");

// Get the offset position of the navbar
var sticky = navbar.offsetTop;

// Sticky Button
var stickyButton = document.getElementById("earnButton");
var bank = document.getElementById("bank");

// Value Text
var text1 = document.getElementById("valueText1");
var text2 = document.getElementById("valueText2");

// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
    if (window.pageYOffset >= sticky) {
        navbar.classList.add("sticky");
        text1.style.cssText = "font-size: 16px;";
        text2.style.cssText = "font-size: 16px;";
        stickyButton.classList.remove("navbarButtons");
        bank.classList.remove("navbarButtons");
    } else {
        navbar.classList.remove("sticky");
        text1.style.cssText = "font-size: 24px;";
        text2.style.cssText = "font-size: 24px;";
        stickyButton.classList.add("navbarButtons");
        bank.classList.add("navbarButtons");
    }
} 

/* if (navigator.appVersion.indexOf("Win")!=-1) 
{
  $(html).css("::-webkit-scrollbar", "display:none;");
} */