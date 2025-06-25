// Common utility functions for loading components
async function loadComponent(componentPath, targetSelector) {
  try {
    const response = await fetch(componentPath);
    const html = await response.text();
    const targetElement = document.querySelector(targetSelector);
    if (targetElement) {
      targetElement.innerHTML = html;
    }
  } catch (error) {
    console.error(`Error loading component ${componentPath}:`, error);
  }
}

// Load navbar and footer components
async function loadCommonComponents() {
  await loadComponent("components/navbar.html", "#navbar-placeholder");
  await loadComponent("components/footer.html", "#footer-placeholder");

  // Initialize mobile menu after navbar is loaded
  setupMobileMenu();
}

// Mobile menu functionality
function setupMobileMenu() {
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mobileMenu = document.getElementById("mobileMenu");

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("active");
    });

    // Close menu when clicking on links
    const mobileLinks = document.querySelectorAll(".mobile-menu-links a");
    mobileLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("active");
      });
    });
  }
}

// Enhanced smooth scrolling for anchor links
function setupSmoothScrolling() {
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight = document.querySelector("header").offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });
}

// Header scroll effect
function handleHeaderScroll() {
  const header = document.getElementById("header");
  if (header) {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }
}

// Initialize common functionality
document.addEventListener("DOMContentLoaded", async function () {
  await loadCommonComponents();
  setupSmoothScrolling();

  // Add scroll event listener for header effect
  window.addEventListener("scroll", handleHeaderScroll);
});
