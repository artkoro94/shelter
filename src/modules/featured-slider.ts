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
    const maxIndex = Math.max(0, cards.length - getVisibleCount());
    index = Math.min(maxIndex, index + 1);
    render();
  });

  let touchStartX = 0;
  track.addEventListener('touchstart', (event: TouchEvent) => {
    touchStartX = event.changedTouches[0]?.clientX ?? 0;
  }, { passive: true });

  track.addEventListener('touchend', (event: TouchEvent) => {
    const touchEndX = event.changedTouches[0]?.clientX ?? touchStartX;
    const distance = touchEndX - touchStartX;
    if (Math.abs(distance) < 45) return;
    const maxIndex = Math.max(0, cards.length - getVisibleCount());
    index = distance < 0 ? Math.min(maxIndex, index + 1) : Math.max(0, index - 1);
    render();
  }, { passive: true });

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
