export function initFeaturedSlider(): void {
  const track = document.querySelector<HTMLElement>('#friend-cards');
  const previous = document.querySelector<HTMLButtonElement>('#left-btn');
  const next = document.querySelector<HTMLButtonElement>('#right-btn');

  if (!track || !previous || !next) return;

  const cards = Array.from(track.children).filter(
    (element): element is HTMLElement => element instanceof HTMLElement,
  );
  if (cards.length === 0) return;

  let index = 0;
  const getVisibleCount = (): number => {
    if (window.matchMedia('(max-width: 620px)').matches) return 1;
    if (window.matchMedia('(max-width: 850px)').matches) return 2;
    return 3;
  };

  const render = (): void => {
    const maxIndex = Math.max(0, cards.length - getVisibleCount());
    index = Math.min(index, maxIndex);

    const styles = window.getComputedStyle(track);
    const gap = Number.parseFloat(styles.columnGap || styles.gap) || 0;
    const cardWidth = cards[0].getBoundingClientRect().width;

    track.style.transform = `translate3d(-${index * (cardWidth + gap)}px, 0, 0)`;
    previous.disabled = index === 0;
    next.disabled = index >= maxIndex;
    track.setAttribute('aria-live', 'polite');
  };

  previous.addEventListener('click', () => {
    index = Math.max(0, index - 1);
    render();
  });

  next.addEventListener('click', () => {
    index = Math.min(cards.length - getVisibleCount(), index + 1);
    render();
  });

  const breakpoints = [
    window.matchMedia('(max-width: 620px)'),
    window.matchMedia('(max-width: 850px)'),
  ];
  breakpoints.forEach((query) => query.addEventListener('change', render));

  if ('ResizeObserver' in window) {
    const observer = new ResizeObserver(render);
    observer.observe(track.parentElement ?? track);
  } else {
    window.addEventListener('resize', render, { passive: true });
  }

  render();
}
