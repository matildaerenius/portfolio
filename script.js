/* Skills sektionen*/
document.querySelectorAll('.skill-card').forEach(card => {
  card.addEventListener('click', () => {
    card.classList.toggle('open');
  });
});

const langToggle = document.getElementById("langToggle");
const flagIcon = document.getElementById("flagIcon");

let currentLang = localStorage.getItem("language") || "en";

window.addEventListener("DOMContentLoaded", () => {
  loadLanguage(currentLang);
  if (flagIcon) flagIcon.src = `images/${currentLang === "en" ? "gb" : "se"}.png`;
});

langToggle?.addEventListener("click", (e) => {
  e.preventDefault();
  currentLang = currentLang === "en" ? "sv" : "en";
  localStorage.setItem("language", currentLang);
  flagIcon.src = `images/${currentLang === "en" ? "gb" : "se"}.png`;
  loadLanguage(currentLang);
});

function loadLanguage(lang) {
  fetch(`lang/${lang}.json`)
    .then((res) => res.json())
    .then((translations) => {
      document.querySelectorAll("[data-i18n]").forEach((el) => {
        const key = el.getAttribute("data-i18n");
        const value = key.split(".").reduce((obj, part) => obj && obj[part], translations);

        if (value) {
          if (["input", "textarea"].includes(el.tagName.toLowerCase())) {
            el.placeholder = value;
          } else {
            el.innerHTML = value;
          }
        }
      });
    })
    .catch((err) => console.error("Språkfil kunde inte laddas:", err));
}

  document.getElementById('BuzzSearchBtn')
    .addEventListener('click', function() {
      window.location.href = 'buzz.html';
    });

    document.getElementById('RecipediaSearchBtn')
    .addEventListener('click', function() {
      window.location.href = 'recipedia.html';
    });

    document.getElementById('sthlmExitSearchBtn')
    .addEventListener('click', function() {
      window.location.href = 'sthlmExit.html';
    });

    document.getElementById('revuSearchBtn')
    .addEventListener('click', function() {
      window.location.href = 'revu.html';
    });

    document.getElementById('portifySearchBtn')
    .addEventListener('click', function() {
      window.location.href = 'portify.html';
    });

    
    document.addEventListener('DOMContentLoaded', () => {
      const itemsPerBatch = 3;
      const initialVisible = 6;
      const projects = Array.from(document.querySelectorAll('.project-item'));
      const loadMoreBtn = document.getElementById('loadMoreBtn');
      let visibleCount = initialVisible;
    
      
      projects.forEach((item, i) => {
        if (i >= visibleCount) item.style.display = 'none';
      });

      if (typeof AOS !== 'undefined') {
        AOS.refresh();
      }
    
      loadMoreBtn.addEventListener('click', () => {
        
        const nextCount = visibleCount + itemsPerBatch;
        projects.forEach((item, i) => {
          if (i < nextCount) {
            item.style.display = '';
          }
        });
        visibleCount = nextCount;
    
        
        if (visibleCount >= projects.length) {
          loadMoreBtn.style.display = 'none';
        }
        if (typeof AOS !== 'undefined') AOS.refresh();
      });
    });
    

