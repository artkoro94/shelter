export function initMobileNavigation(): void {
  const toggle = document.querySelector<HTMLButtonElement>('#burger');
  const menu = document.querySelector<HTMLElement>('#menu');

  if (!toggle || !menu) return;

  const setOpen = (open: boolean): void => {
    toggle.classList.toggle('active', open);
    menu.classList.toggle('active', open);
    document.body.classList.toggle('no-scroll', open);
    toggle.setAttribute('aria-expanded', String(open));
    const locale = document.documentElement.lang === 'en' ? 'en' : 'ru';
    const labels = {
      en: { open: 'Open navigation menu', close: 'Close navigation menu' },
      ru: { open: 'Открыть меню навигации', close: 'Закрыть меню навигации' },
    };
    toggle.setAttribute('aria-label', labels[locale][open ? 'close' : 'open']);
    menu.setAttribute('aria-hidden', String(!open));
  };

  toggle.setAttribute('aria-controls', menu.id);
  setOpen(false);

  toggle.addEventListener('click', () => {
    setOpen(toggle.getAttribute('aria-expanded') !== 'true');
  });

  menu.addEventListener('click', (event: MouseEvent) => {
    if (event.target instanceof Element && event.target.closest('a')) {
      setOpen(false);
    }
  });

  document.addEventListener('keydown', (event: KeyboardEvent) => {
    if (event.key === 'Escape') setOpen(false);
  });

  document.addEventListener('click', (event: MouseEvent) => {
    if (
      menu.classList.contains('active') &&
      event.target instanceof Node &&
      !menu.contains(event.target) &&
      !toggle.contains(event.target)
    ) {
      setOpen(false);
    }
  });
}
