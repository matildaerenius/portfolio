function showPopup(event) {
    event.preventDefault(); 
    document.getElementById("popup").style.display = "flex";
  }
  
  function closePopup() {
    document.getElementById("popup").style.display = "none";
  }


      document.addEventListener('DOMContentLoaded', function () {
        const el = document.getElementById('recipediaCarousel');
        const btn = document.getElementById('carouselToggle');
      
        
        const init = () => {
          if (!window.bootstrap || !bootstrap.Carousel) { setTimeout(init, 50); return; }
      
          const carousel = bootstrap.Carousel.getOrCreateInstance(el, {
            interval: 3500,
            ride: 'carousel',
            pause: 'hover',
            touch: true,
            keyboard: true,
            wrap: true
          });
      
          
          if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            carousel.pause();
            btn.innerHTML = "<i class='bx bx-play me-1' aria-hidden='true'></i> Play";
            btn.setAttribute('aria-pressed', 'false');
            btn.setAttribute('aria-label', 'Play gallery');
          }
      
          let playing = btn.getAttribute('aria-pressed') !== 'false';
      
          const setState = () => {
            btn.setAttribute('aria-pressed', String(playing));
            btn.innerHTML = playing
              ? "<i class='bx bx-pause me-1' aria-hidden='true'></i> Pause"
              : "<i class='bx bx-play me-1' aria-hidden='true'></i> Play";
            btn.setAttribute('aria-label', playing ? 'Pause gallery' : 'Play gallery');
          };
      
          btn.addEventListener('click', () => {
            if (playing) { carousel.pause(); } else { carousel.cycle(); }
            playing = !playing;
            setState();
          });
      
          setState();
        };
      
        init();
      });
      