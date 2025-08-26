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
  updateCvLinks(currentLang);
  if (flagIcon) flagIcon.src = `images/${currentLang === "en" ? "gb" : "se"}.png`;
});

langToggle?.addEventListener("click", (e) => {
  e.preventDefault();
  currentLang = currentLang === "en" ? "sv" : "en";
  localStorage.setItem("language", currentLang);
  flagIcon.src = `images/${currentLang === "en" ? "gb" : "se"}.png`;
  loadLanguage(currentLang);
  updateCvLinks(currentLang);
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
      document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
        const key = el.getAttribute("data-i18n-placeholder");
        const value = key.split(".").reduce((obj, part) => obj?.[part], translations);
        if (value !== undefined) {
          el.placeholder = value;
        } else {
          console.warn(`Saknad placeholder-översättning för: ${key}`);
        }
      });
    })
    .catch((err) => console.error("Språkfil kunde inte laddas:", err));
}
    
  document.getElementById('BuzzSearchBtn')
    .addEventListener('click', function() {
      window.location.href = 'projects/buzz.html';
    });

    document.getElementById('RecipediaSearchBtn')
    .addEventListener('click', function() {
      window.location.href = 'projects/recipedia.html';
    });

    document.getElementById('sthlmExitSearchBtn')
    .addEventListener('click', function() {
      window.location.href = 'projects/sthlmExit.html';
    });

    document.getElementById('revuSearchBtn')
    .addEventListener('click', function() {
      window.location.href = 'projects/revu.html';
    });

    document.getElementById('portifySearchBtn')
    .addEventListener('click', function() {
      window.location.href = 'projects/portify.html';
    });

    document.getElementById('pastCastSearchBtn')
    .addEventListener('click', function() {
      window.location.href = 'projects/pastcast.html';
    });

    document.getElementById('echoTypeSearchBtn')
    .addEventListener('click', function() {
      window.location.href = 'projects/echotype.html';
    });

    document.getElementById('savrSearchBtn')
    .addEventListener('click', function() {
      window.location.href = 'projects/savr.html';
    });
    document.getElementById('unsubSearchBtn')
    .addEventListener('click', function() {
      window.location.href = 'projects/unsub.html';
    });
    document.getElementById('mallsySearchBtn')
    .addEventListener('click', function() {
      window.location.href = 'projects/mallsy.html';
    });
    document.getElementById('beautiqSearchBtn')
    .addEventListener('click', function() {
      window.location.href = 'projects/beautiq.html';
    });
    document.getElementById('dishdashSearchBtn')
    .addEventListener('click', function() {
      window.location.href = 'projects/dishdash.html';
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

    function showPopup(event) {
      event.preventDefault();
    
      const iconEl = document.getElementById("popupIcon");
      const messageEl = document.getElementById("popupMessage");
    
      if (event.target.closest(".coming-soon-badge")) {
        iconEl.textContent = "🛠️";
        messageEl.textContent = "Yeah… I haven’t started yet either";
      } else {
        iconEl.textContent = "🚧";
        messageEl.textContent = "// TODO: Implement this feature (eventually)";
      }
      
    
      document.getElementById("popup").style.display = "flex";
    }
    function closePopup() {
      document.getElementById("popup").style.display = "none";
    }

    // --- CV länkar ---
const CV_FILES = {
  en: 'files/Matilda_Erenius-CV-en.pdf',
  sv: 'files/Matilda_Erenius-CV-sv.pdf'
};

function updateCvLinks(lang) {
  const url = CV_FILES[lang] || CV_FILES.en;
  document.querySelectorAll('[data-cv]').forEach(a => {
    a.setAttribute('href', url);
    if (a.dataset.cv === 'download') {
      
      a.setAttribute('download', url.split('/').pop());
    }
  });
}
    
    
    

