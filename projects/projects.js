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
            pause: 'hover',
            touch: true,
            keyboard: true,
            wrap: true
          });

          let playing = true; 
          carousel.cycle();

          const applyPlayback = () => {
            if (playing) { carousel.cycle(); } else { carousel.pause(); }
          };
        
          const setButton = () => {
            btn.setAttribute('aria-pressed', String(playing));
            btn.setAttribute('aria-label', playing ? 'Pause gallery' : 'Play gallery');
            btn.innerHTML = playing
              ? "<i class='bx bx-pause me-1' aria-hidden='true'></i> Pause"
              : "<i class='bx bx-play me-1' aria-hidden='true'></i> Play";
          };
        
          applyPlayback(); 
          setButton();     
        
          btn.addEventListener('click', () => {
            playing = !playing;
            applyPlayback();
            setButton();
          });
        
          
          el.addEventListener('slide.bs.carousel', () => { if (!playing) carousel.pause(); });
          el.addEventListener('slid.bs.carousel', () => { if (!playing) carousel.pause(); });
        };
         
        init();
      });
      
        
      