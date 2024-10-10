document.addEventListener("DOMContentLoaded", function() {
  const hamburger = document.getElementById("hamburger");
  const navbarMenu = document.getElementById("navbar-menu");
  const menuLinks = navbarMenu.querySelectorAll("a"); // Selecciona todos los enlaces en el menú

  hamburger.addEventListener("click", function() {
      navbarMenu.classList.toggle("open");
      document.body.classList.toggle("no-scroll");
  });

  menuLinks.forEach(link => {
      link.addEventListener("click", function() {
          navbarMenu.classList.remove("open");
          document.body.classList.remove("no-scroll");
      });
  });
});
