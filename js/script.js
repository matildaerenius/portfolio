/* Skills sektionen*/
document.querySelectorAll(".skill-card").forEach((card) => {
  card.addEventListener("click", () => {
    card.classList.toggle("open");
  });
});

const langToggle = document.getElementById("langToggle");
const flagIcon = document.getElementById("flagIcon");
const flagIconNext = document.getElementById("flagIconNext");

// Front shows the current language, back (seen on hover) the one you switch to
function updateFlags(lang) {
  const flag = (l) => `images/${l === "en" ? "gb" : "se"}.png`;
  if (flagIcon) flagIcon.src = flag(lang);
  if (flagIconNext) flagIconNext.src = flag(lang === "en" ? "sv" : "en");
}

let currentLang = localStorage.getItem("language") || "en";
let currentTranslations = {};

// Looks up a key in the most recently loaded language file
function translate(key, fallback = "") {
  const value = key
    .split(".")
    .reduce((obj, part) => obj?.[part], currentTranslations);
  return value ?? fallback;
}

window.addEventListener("DOMContentLoaded", () => {
  loadLanguage(currentLang);
  updateCvLinks(currentLang);
  updateFlags(currentLang);
});

langToggle?.addEventListener("click", (e) => {
  e.preventDefault();
  currentLang = currentLang === "en" ? "sv" : "en";
  localStorage.setItem("language", currentLang);
  updateFlags(currentLang);
  loadLanguage(currentLang);
  updateCvLinks(currentLang);
});

function loadLanguage(lang) {
  fetch(`lang/${lang}.json`)
    .then((res) => res.json())
    .then((translations) => {
      currentTranslations = translations;
      const t = (key) =>
        key.split(".").reduce((obj, part) => obj?.[part], translations);

      document.documentElement.lang = lang;

      document.querySelectorAll("[data-i18n]").forEach((el) => {
        const key = el.getAttribute("data-i18n");
        const value = t(key);

        if (value) {
          if (["input", "textarea"].includes(el.tagName.toLowerCase())) {
            el.placeholder = value;
          } else {
            el.innerHTML = value;
          }
        } else {
          console.warn(`Missing translation for: ${key}`);
        }
      });
      document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
        const key = el.getAttribute("data-i18n-placeholder");
        const value = t(key);
        if (value !== undefined) {
          el.placeholder = value;
        } else {
          console.warn(`Missing placeholder translation for: ${key}`);
        }
      });
      document.querySelectorAll("[data-i18n-alt]").forEach((el) => {
        const key = el.getAttribute("data-i18n-alt");
        const value = t(key);
        if (value !== undefined) {
          el.alt = value;
        } else {
          console.warn(`Missing alt translation for: ${key}`);
        }
      });
      // Animated buttons that render one <span> per letter
      document.querySelectorAll("[data-i18n-letters]").forEach((el) => {
        const value = t(el.getAttribute("data-i18n-letters"));
        if (!value) return;
        el.innerHTML = "";
        [...value].forEach((char, i) => {
          const span = document.createElement("span");
          if (char === " ") span.innerHTML = "&nbsp;";
          else span.textContent = char;
          span.style.setProperty("--i", i); // staggers the hover wave
          el.appendChild(span);
        });
      });

      // Translated text wraps differently, so re-align the project cards
      equalizeProjectCards();
    })
    .catch((err) => console.error("Could not load language file:", err));
}

// Magnifying-glass buttons that open a project's detail page.
// Some cards are commented out in index.html, so skip buttons that don't exist.
const PROJECT_PAGES = {
  BuzzSearchBtn: "buzz",
  RecipediaSearchBtn: "recipedia",
  stexSearchBtn: "stex",
  revuSearchBtn: "revu",
  bytelogSearchBtn: "bytelog",
  pastCastSearchBtn: "pastcast",
  echoTypeSearchBtn: "echotype",
  savrSearchBtn: "savr",
  fluxoSearchBtn: "fluxo",
  mallsySearchBtn: "mallsy",
  beautiqSearchBtn: "beautiq",
  dishdashSearchBtn: "dishdash",
};

Object.entries(PROJECT_PAGES).forEach(([id, page]) => {
  document.getElementById(id)?.addEventListener("click", () => {
    window.location.href = `projects/${page}.html`;
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const itemsPerBatch = 3;
  const initialVisible = 6;
  const projects = Array.from(document.querySelectorAll(".project-item"));
  const loadMoreBtn = document.getElementById("loadMoreBtn");
  let visibleCount = initialVisible;

  // Without a "Show More" button, hidden projects could never be revealed
  if (!loadMoreBtn) return;

  if (projects.length <= visibleCount) {
    loadMoreBtn.style.display = "none";
  }

  projects.forEach((item, i) => {
    if (i >= visibleCount) item.style.display = "none";
  });

  if (typeof AOS !== "undefined") {
    AOS.refresh();
  }

  loadMoreBtn.addEventListener("click", () => {
    const nextCount = visibleCount + itemsPerBatch;
    projects.forEach((item, i) => {
      if (i < nextCount) {
        item.style.display = "";
      }
    });
    visibleCount = nextCount;

    if (visibleCount >= projects.length) {
      loadMoreBtn.style.display = "none";
    }
    if (typeof AOS !== "undefined") AOS.refresh();
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
  en: "files/Matilda_Erenius-CV-en.pdf",
  sv: "files/Matilda_Erenius-CV-sv.pdf",
};

function updateCvLinks(lang) {
  const url = CV_FILES[lang] || CV_FILES.en;
  document.querySelectorAll("[data-cv]").forEach((a) => {
    a.setAttribute("href", url);
    if (a.dataset.cv === "download") {
      a.setAttribute("download", url.split("/").pop());
    }
  });
}

// --- Symmetric project cards ---
const MAX_BADGE_ROWS = 2;

// Number of wrapped lines the visible badges in a block take up
function badgeRows(block) {
  const tops = new Set(
    [...block.children]
      .filter((el) => el.offsetParent !== null)
      .map((el) => el.offsetTop)
  );
  return tops.size;
}

// Shows as many badges as fit on MAX_BADGE_ROWS lines and folds the rest into
// a "+N" chip. Clicking the chip shows all badges (and "−" folds them again).
function fitBadges(block) {
  const badges = [...block.querySelectorAll(".project-badge:not(.project-badge-more)")];
  let chip = block.querySelector(".project-badge-more");

  badges.forEach((b) => (b.hidden = false));
  if (chip) chip.hidden = true;
  if (block.classList.contains("expanded") || badgeRows(block) <= MAX_BADGE_ROWS) {
    if (chip && block.classList.contains("expanded")) {
      chip.hidden = false;
      chip.textContent = "−";
      chip.title = "";
    }
    return;
  }

  if (!chip) {
    chip = document.createElement("button");
    chip.type = "button";
    chip.className = "badge project-badge project-badge-more";
    chip.addEventListener("click", () => {
      block.classList.toggle("expanded");
      equalizeProjectCards();
    });
    block.appendChild(chip);
  }
  chip.hidden = false;

  let visible = badges.length;
  do {
    badges[--visible].hidden = true;
    const rest = badges.slice(visible);
    chip.textContent = `+${rest.length}`;
    chip.title = rest.map((b) => b.textContent.trim()).join(", ");
  } while (visible > 1 && badgeRows(block) > MAX_BADGE_ROWS);
}

// Lines up the description and badges of cards that sit side by side, so the
// badges, bullet lists and buttons start at the same height within each row.
// On phones every card is on its own row and keeps its natural layout.
const ALIGNED_SECTIONS = [".card-title", ".card-text", ".project-badges"];

function equalizeProjectCards() {
  const cards = [...document.querySelectorAll(".project-card")].filter(
    (card) => card.offsetParent !== null
  );

  cards.forEach((card) => {
    ALIGNED_SECTIONS.forEach((sel) => {
      const el = card.querySelector(sel);
      if (el) el.style.minHeight = "";
    });
    const badges = card.querySelector(".project-badges");
    if (badges) fitBadges(badges);
  });

  // Group cards by the row they are rendered in
  const rows = new Map();
  cards.forEach((card) => {
    const top = Math.round(card.getBoundingClientRect().top + window.scrollY);
    if (!rows.has(top)) rows.set(top, []);
    rows.get(top).push(card);
  });

  rows.forEach((rowCards) => {
    if (rowCards.length < 2) return;
    ALIGNED_SECTIONS.forEach((sel) => {
      const els = rowCards.map((card) => card.querySelector(sel)).filter(Boolean);
      const tallest = Math.max(0, ...els.map((el) => el.offsetHeight));
      els.forEach((el) => (el.style.minHeight = `${tallest}px`));
    });
  });
}

let equalizeFrame = null;
window.addEventListener("resize", () => {
  if (equalizeFrame) cancelAnimationFrame(equalizeFrame);
  equalizeFrame = requestAnimationFrame(equalizeProjectCards);
});
document.addEventListener("DOMContentLoaded", equalizeProjectCards);
document.fonts?.ready.then(equalizeProjectCards);

// --- Contact form: send without leaving the page ---
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

function showFormStatus(type, key, fallback) {
  if (!formStatus) return;
  formStatus.textContent = translate(`contact.form.${key}`, fallback);
  formStatus.classList.remove("is-success", "is-error");
  formStatus.classList.add(type === "success" ? "is-success" : "is-error");
}

contactForm?.addEventListener("submit", async (e) => {
  e.preventDefault();
  contactForm.classList.add("was-submitted"); // shows invalid fields

  if (!contactForm.checkValidity()) {
    showFormStatus("error", "invalid", "Please fill in your name, a valid email and a message.");
    contactForm.querySelector(":invalid")?.focus();
    return;
  }

  const button = contactForm.querySelector('button[type="submit"]');
  const label = button?.querySelector("span");
  if (button) button.disabled = true;
  if (label) label.textContent = translate("contact.form.sending", "Sending…");
  formStatus?.classList.remove("is-success", "is-error");
  if (formStatus) formStatus.textContent = "";

  try {
    const res = await fetch(contactForm.action, {
      method: "POST",
      body: new FormData(contactForm),
      headers: { Accept: "application/json" },
    });
    if (!res.ok) throw new Error(`Formspree responded ${res.status}`);
    contactForm.reset();
    contactForm.classList.remove("was-submitted");
    showFormStatus("success", "success", "Thanks! Your message has been sent.");
  } catch (err) {
    console.error("Could not send message:", err);
    showFormStatus("error", "error", "Something went wrong. Please try again or email me directly.");
  } finally {
    if (button) button.disabled = false;
    if (label) label.textContent = translate("contact.form.send", "Send Message");
  }
});
