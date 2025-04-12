/* Skills sektionen*/
document.querySelectorAll('.skill-card').forEach(card => {
  card.addEventListener('click', () => {
    card.classList.toggle('open');
  });
});

const langToggle = document.getElementById("langToggle");
const flagIcon = document.getElementById("flagIcon");

let currentLang = "en"; 

langToggle.addEventListener("click", (e) => {
  e.preventDefault();

  if (currentLang === "en") {
    // Byt till svenska
    flagIcon.src = "images/se.png";
    flagIcon.alt = "Swedish flag";
    currentLang = "sv";
    changeLanguageToSwedish();
  } else {
    // Byt tillbaka till engelska
    flagIcon.src = "images/gb.png";
    flagIcon.alt = "English flag";
    currentLang = "en";
    changeLanguageToEnglish();
  }
});

function changeLanguageToSwedish() {
  document.querySelector('a.nav-link[href="#about"]').textContent = "Om mig";
  document.querySelector('a.nav-link[href="#skills"]').textContent = "Färdigheter";
  document.querySelector('a.nav-link[href="#projects"]').textContent = "Projekt";
  document.querySelector('a.nav-link[href="#contact"]').textContent = "Kontakt";
  document.querySelector('.contact-me-btn').textContent = "Kontakta mig";
  document.querySelector('#contact h3').textContent = "Kontakta mig";
  document.querySelector('#contact p').textContent = "Vill du veta mer om mig eller bara säga hej, skicka ett meddelande eller kontakta mig via mina sociala kanaler. Jag ser fram emot att höra från dig!";
  
}

function changeLanguageToEnglish() {
  document.querySelector('a.nav-link[href="#about"]').textContent = "About";
  document.querySelector('a.nav-link[href="#skills"]').textContent = "Skills";
  document.querySelector('a.nav-link[href="#projects"]').textContent = "Projects";
  document.querySelector('a.nav-link[href="#contact"]').textContent = "Contact";
  document.querySelector('.contact-me-btn').textContent = "Contact Me";
  document.querySelector('#contact h3').textContent = "Get In Touch";
  document.querySelector('#contact p').textContent = "If you want to know more about me, or just like to say hello, send me a message or contact me through my socials. I'd love to hear from you.";
  
}
