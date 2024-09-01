document.addEventListener("DOMContentLoaded", function() {
    const hamburger = document.getElementById("hamburger");
    const navbarMenu = document.getElementById("navbar-menu");
  
    hamburger.addEventListener("click", function() {
      navbarMenu.classList.toggle("open");
      document.body.classList.toggle("no-scroll");
    });
  });