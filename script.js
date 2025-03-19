/* Skills sektionen*/ 
document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('click', () => {
      card.classList.toggle('open');
    });
  });
  
  