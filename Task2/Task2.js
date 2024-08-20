document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.querySelector(".nav-links");
  
    if (menuToggle && navLinks) {
      menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
      });
    }
  
    const links = document.querySelectorAll("nav a");
    const sections = document.querySelectorAll("section");
  
    // Function to remove active class from all links
    function removeActiveClass() {
      links.forEach((link) => link.classList.remove("active"));
    }
  
    // Function to add active class to the current link
    function setActiveLink() {
      let index = sections.length;
      while (--index && window.scrollY + 50 < sections[index].offsetTop) {}
      removeActiveClass();
      links[index].classList.add("active");
    }
  
    // Add scroll event listener
    window.addEventListener("scroll", setActiveLink);
  
    // Add click event listener for links
    links.forEach((link) => {
      link.addEventListener("click", () => {
        removeActiveClass();
        link.classList.add("active");
      });
    });
  
    // Initial setting of active link on page load
    setActiveLink();
  
    document.addEventListener('mousemove', (e) => {
      const cursor = document.querySelector('.cursor');
      if (cursor) {
        cursor.style.left = `${e.pageX}px`;
        cursor.style.top = `${e.pageY}px`;
      }
    });
    
    
  });
  