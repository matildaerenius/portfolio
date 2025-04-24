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

  document.getElementById('searchBtn')
    .addEventListener('click', function() {
      window.location.href = 'buzz.html';
    });


