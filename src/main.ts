import './styles.css';
import { initPreferences } from './i18n';

initPreferences();

const burger = document.querySelector<HTMLButtonElement>('#burger');
const mobileMenu = document.querySelector<HTMLElement>('#menu');

if (burger && mobileMenu) {
  const setMenuState = (isOpen: boolean): void => {
    burger.classList.toggle('active', isOpen);
    mobileMenu.classList.toggle('active', isOpen);
    document.body.classList.toggle('no-scroll', isOpen);
    burger.setAttribute('aria-expanded', String(isOpen));
    mobileMenu.setAttribute('aria-hidden', String(!isOpen));
  };

  burger.setAttribute('aria-controls', 'menu');
  burger.setAttribute('aria-expanded', 'false');
  mobileMenu.setAttribute('aria-hidden', 'true');
  burger.addEventListener('click', () => setMenuState(burger.getAttribute('aria-expanded') !== 'true'));
  mobileMenu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenuState(false)));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setMenuState(false);
  });
  document.addEventListener('click', (event) => {
    if (mobileMenu.classList.contains('active') && event.target instanceof Node &&
      !mobileMenu.contains(event.target) && !burger.contains(event.target)) setMenuState(false);
  });
}

const track = document.querySelector<HTMLElement>('#friend-cards');
const previousButton = document.querySelector<HTMLButtonElement>('#left-btn');
const nextButton = document.querySelector<HTMLButtonElement>('#right-btn');

if (track && previousButton && nextButton) {
  const cards = Array.from(track.children) as HTMLElement[];
  let currentIndex = 0;
  const getVisibleCount = (): number => window.matchMedia('(max-width: 620px)').matches ? 1 :
    window.matchMedia('(max-width: 850px)').matches ? 2 : 3;
  const updateSlider = (): void => {
    const maxIndex = Math.max(0, cards.length - getVisibleCount());
    currentIndex = Math.min(currentIndex, maxIndex);
    const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 0;
    const step = (cards[0]?.getBoundingClientRect().width ?? 0) + gap;
    track.style.transform = `translateX(-${currentIndex * step}px)`;
    previousButton.disabled = currentIndex === 0;
    nextButton.disabled = currentIndex === maxIndex;
  };
  previousButton.addEventListener('click', () => { currentIndex = Math.max(0, currentIndex - 1); updateSlider(); });
  nextButton.addEventListener('click', () => { currentIndex += 1; updateSlider(); });
  window.addEventListener('resize', updateSlider);
  updateSlider();
}

const catalogCards = Array.from(document.querySelectorAll<HTMLElement>('.cards_container .card'));
const pagination = document.querySelector<HTMLElement>('.navigation_pets');
if (catalogCards.length && pagination) {
  pagination.setAttribute('aria-label', 'Pets catalog pagination');
  pagination.querySelectorAll<HTMLButtonElement>('button').forEach((button) => {
    button.disabled = true;
  });
}
