export function initPetDialog(): void {
  const triggers = document.querySelectorAll<HTMLButtonElement>(
    '.card_button, .katrine_button, .jennifer_button, .woody_button',
  );
  if (triggers.length === 0) return;

  const dialog = document.createElement('dialog');
  dialog.className = 'pet-dialog';
  dialog.setAttribute('aria-labelledby', 'pet-dialog-title');

  const panel = document.createElement('div');
  panel.className = 'pet-dialog__panel';

  const close = document.createElement('button');
  close.className = 'pet-dialog__close';
  close.type = 'button';
  close.setAttribute('aria-label', 'Close dialog');
  close.textContent = '×';

  const image = document.createElement('img');
  image.className = 'pet-dialog__image';
  image.alt = '';

  const content = document.createElement('div');
  content.className = 'pet-dialog__content';

  const eyebrow = document.createElement('p');
  eyebrow.className = 'pet-dialog__eyebrow';

  const title = document.createElement('h2');
  title.id = 'pet-dialog-title';

  const description = document.createElement('p');
  description.className = 'pet-dialog__description';

  const contact = document.createElement('a');
  contact.className = 'pet-dialog__contact';
  contact.href = 'mailto:email@shelter.com';

  content.append(eyebrow, title, description, contact);
  panel.append(close, image, content);
  dialog.append(panel);
  document.body.append(dialog);

  const copy = {
    ru: {
      eyebrow: 'Знакомьтесь поближе',
      description: 'У каждого питомца свой характер и своя история. Свяжитесь с приютом, чтобы узнать больше об этом животном и возможном знакомстве.',
      contact: 'Связаться с приютом',
      close: 'Закрыть окно',
    },
    en: {
      eyebrow: 'A little introduction',
      description: 'Every pet has a unique personality and story. Contact the shelter to learn more about this animal and arrange a possible introduction.',
      contact: 'Contact the shelter',
      close: 'Close dialog',
    },
  };

  const closeDialog = (): void => dialog.close();
  close.addEventListener('click', closeDialog);
  dialog.addEventListener('click', (event: MouseEvent) => {
    if (event.target === dialog) closeDialog();
  });

  triggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const card = trigger.closest('.card, .card_1, .card_2, .card_3');
      if (!card) return;

      const cardImage = card.querySelector<HTMLImageElement>('img');
      const name = card.querySelector<HTMLElement>('.title_card, .katrine_name, .jennifer_name, .woody_name')?.textContent?.trim();
      if (!name) return;

      const locale = document.documentElement.lang === 'en' ? 'en' : 'ru';
      const text = copy[locale];

      const featuredImages: Record<string, string> = {
        card_1: new URL('../../assets/cards_main/Katrine.png', import.meta.url).href,
        card_2: new URL('../../assets/cards_main/Jennifer.png', import.meta.url).href,
        card_3: new URL('../../assets/cards_main/Woody.png', import.meta.url).href,
      };
      const featuredClass = ['card_1', 'card_2', 'card_3'].find((className) => card.classList.contains(className));
      const source = cardImage?.src ?? (featuredClass ? featuredImages[featuredClass] : '');
      if (source) image.src = source;
      else image.removeAttribute('src');
      image.alt = name;
      image.hidden = !source;
      eyebrow.textContent = text.eyebrow;
      title.textContent = name;
      description.textContent = text.description;
      contact.textContent = text.contact;
      close.setAttribute('aria-label', text.close);

      if (!dialog.open) dialog.showModal();
    });
  });
}
