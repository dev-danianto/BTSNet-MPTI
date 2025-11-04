/**
 * BTSNet - Main JavaScript File
 * Handles interactive features and animations
 */

// ============================================================================
// HAMBURGER MENU FUNCTIONALITY
// ============================================================================

document.addEventListener("DOMContentLoaded", function () {
  initializeHamburgerMenu();
  initializeCloseMenuOnClick();
});

/**
 * Initialize hamburger menu toggle functionality
 */
function initializeHamburgerMenu() {
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobileMenu");

  if (!hamburger) return;

  hamburger.addEventListener("click", function () {
    hamburger.classList.toggle("active");
    mobileMenu.classList.toggle("active");
  });
}

/**
 * Close mobile menu when clicking outside
 */
function initializeCloseMenuOnClick() {
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobileMenu");

  document.addEventListener("click", function (event) {
    if (!hamburger || !mobileMenu) return;

    const isClickInsideHamburger = hamburger.contains(event.target);
    const isClickInsideMenu = mobileMenu.contains(event.target);

    if (!isClickInsideHamburger && !isClickInsideMenu) {
      hamburger.classList.remove("active");
      mobileMenu.classList.remove("active");
    }
  });
}

/**
 * Close menu when clicking on navigation links
 */
function closeMobileMenu() {
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobileMenu");

  if (hamburger) hamburger.classList.remove("active");
  if (mobileMenu) mobileMenu.classList.remove("active");
}

// ============================================================================
// SMOOTH SCROLL & NAVIGATION
// ============================================================================

/**
 * Add smooth scroll behavior to all anchor links
 */
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");

    if (href !== "#" && document.querySelector(href)) {
      e.preventDefault();
      closeMobileMenu();

      document.querySelector(href).scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// ============================================================================
// BUTTON RIPPLE EFFECT
// ============================================================================

/**
 * Add ripple effect to buttons on click
 */
function addRippleEffect(event) {
  const button = event.currentTarget;

  if (!button.classList.contains("btn-hover")) return;

  const ripple = document.createElement("span");
  const rect = button.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;

  ripple.style.width = ripple.style.height = size + "px";
  ripple.style.left = x + "px";
  ripple.style.top = y + "px";
  ripple.classList.add("ripple-effect");

  button.appendChild(ripple);

  setTimeout(function () {
    ripple.remove();
  }, 600);
}

// Add ripple effect to all btn-hover elements
document.querySelectorAll(".btn-hover").forEach(function (button) {
  button.addEventListener("click", addRippleEffect);
});

// ============================================================================
// INTERSECTION OBSERVER FOR FADE-IN ANIMATIONS
// ============================================================================

/**
 * Initialize intersection observer for fade-in animations
 */
function initializeFadeInAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll(".fade-in-up").forEach(function (element) {
    element.style.opacity = "0";
    element.style.transform = "translateY(20px)";
    element.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(element);
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeFadeInAnimations);
} else {
  initializeFadeInAnimations();
}

// ============================================================================
// ACTIVE LINK INDICATOR
// ============================================================================

/**
 * Update active link in navigation based on scroll position
 */
function updateActiveLink() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll('nav a[href^="#"]');

  window.addEventListener("scroll", function () {
    let currentSection = "";

    sections.forEach(function (section) {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (scrollY >= sectionTop - 200) {
        currentSection = section.getAttribute("id");
      }
    });

    navLinks.forEach(function (link) {
      link.classList.remove("active");

      if (link.getAttribute("href") === "#" + currentSection) {
        link.classList.add("active");
      }
    });
  });
}

updateActiveLink();

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Debounce function for resize events
 * @param {Function} func - Function to debounce
 * @param {Number} wait - Wait time in milliseconds
 * @returns {Function} - Debounced function
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// ============================================================================
// PERFORMANCE OPTIMIZATION
// ============================================================================

/**
 * Lazy load images for better performance
 */
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver(function (entries, observer) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute("data-src");
        }
        observer.unobserve(img);
      }
    });
  });

  document.querySelectorAll("img[data-src]").forEach(function (img) {
    imageObserver.observe(img);
  });
}

// ============================================================================
// CONSOLE LOG
// ============================================================================

console.log(
  "%cBTSNet Website Loaded Successfully! 🚀",
  "color: #2563eb; font-size: 16px; font-weight: bold;"
);
console.log(
  "%cVersion 1.0 - Responsive & Interactive Design",
  "color: #10b981; font-size: 12px;"
);
