
 
document.addEventListener('DOMContentLoaded', () => {

  // Reveal sections with fade/slide when in view
  const revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');   // add the fade/slide class
        obs.unobserve(entry.target);             // run only once per element
      }
    });
  }, { threshold: 0.1 });

  document
    .querySelectorAll('.fade-in, .slide-in-left, .slide-in-right')
    .forEach(el => revealObserver.observe(el));


  // Animate counter numbers when visible
  const counters = document.querySelectorAll('.count');

  const animateCounter = (el) => {
    const target = Number(el.dataset.target);    // e.g. 10000
    const duration = 1500;                       // total time in ms
    const startTime = performance.now();

    const step = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);     // 0 → 1
      const value = Math.floor(progress * target);
      el.textContent = value.toLocaleString();
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  };

  const counterObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => counterObserver.observe(counter));
});
