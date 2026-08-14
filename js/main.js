const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion) {
  const tiles = document.querySelectorAll('.gallery .tile');

  tiles.forEach((tile) => tile.classList.add('reveal'));

  const sectionHeader = document.querySelector('.section-header');
  if (sectionHeader) sectionHeader.classList.add('reveal-up');

  const revealTargets = [...tiles, sectionHeader];

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
  );

  revealTargets.forEach((el) => el && observer.observe(el));
}

// Tap-to-toggle overlay on large project tiles (for touch devices without hover)
// On mobile, start with the text overlay showing; tap reveals the image, tap again goes back.
const isMobile = window.matchMedia('(max-width: 899px)').matches;

document.querySelectorAll('.tile-big').forEach((tile) => {
  if (isMobile) tile.classList.add('tap-active');

  tile.addEventListener('click', () => {
    tile.classList.toggle('tap-active');
  });
});
