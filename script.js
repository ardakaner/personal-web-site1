const body = document.body;
const loader = document.getElementById("loader");
const header = document.getElementById("header");
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
const navItems = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section[id]");
const revealEls = document.querySelectorAll(".reveal");
const cursorGlow = document.querySelector(".cursor-glow");
const tiltCards = document.querySelectorAll(".tilt-card");

window.addEventListener("load", () => {
  setTimeout(() => {
    body.classList.add("loaded");
  }, 1850);
});

window.addEventListener("scroll", () => {
  if (window.scrollY > 16) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }

  updateActiveNav();
});

menuBtn.addEventListener("click", () => {
  menuBtn.classList.toggle("active");
  navLinks.classList.toggle("open");
});

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    menuBtn.classList.remove("active");
    navLinks.classList.remove("open");
  });
});

function updateActiveNav() {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 140;
    const sectionHeight = section.offsetHeight;

    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute("id");
    }
  });

  navItems.forEach((link) => {
    link.classList.remove("active");
    const href = link.getAttribute("href").replace("#", "");
    if (href === current) {
      link.classList.add("active");
    }
  });
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  },
  {
    threshold: 0.14,
  }
);

revealEls.forEach((el) => revealObserver.observe(el));

window.addEventListener("mousemove", (e) => {
  if (!cursorGlow) return;
  cursorGlow.style.left = `${e.clientX}px`;
  cursorGlow.style.top = `${e.clientY}px`;
});

tiltCards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;

    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)";
  });
});

updateActiveNav();