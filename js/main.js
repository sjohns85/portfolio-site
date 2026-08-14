const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion) {
  const tiles = document.querySelectorAll('.gallery .tile');

  tiles.forEach((tile, i) => {
    tile.classList.add(i % 2 === 0 ? 'reveal-left' : 'reveal-right');
  });

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
