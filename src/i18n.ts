type Locale = 'ru' | 'en';

const translations: Record<Locale, Record<string, string>> = {
  ru: {
    'nav.home': 'Главная',
    'brand.tagline': 'Приют для животных в Бостоне',
    'nav.about': 'О приюте',
    'nav.pets': 'Наши питомцы',
    'nav.help': 'Как помочь',
    'nav.contacts': 'Контакты',
    'hero.title': 'Дом нужен не только людям',
    'hero.text': 'Подарите заботу и дом тому, кто особенно в них нуждается. Возможно, именно здесь вас ждёт ваш новый лучший друг.',
    'hero.cta': 'Найти друга',
    'about.title': 'О приюте «Cozy House»',
    'about.p1': 'Сейчас под нашей опекой находятся 121 собака и 342 кошки. Статистика показывает, что только 20% из них находят семью. Остальные продолжают жить в приюте и ждать своего шанса стать любимыми.',
    'about.p2': 'Мы заботимся о здоровье и комфорте наших подопечных. Нам помогают 87 волонтёров и 28 сотрудников. Каждый день мы делаем всё возможное, чтобы у животных появился любящий дом.',
    'friends.title': 'Наши друзья ищут дом',
    'friends.more': 'Посмотреть всех питомцев',
    'pet.more': 'Подробнее',
    'help.title': 'Как вы можете помочь приюту',
    'help.food': 'Корм',
    'help.transport': 'Транспорт',
    'help.toys': 'Игрушки',
    'help.bowls': 'Миски и поилки',
    'help.shampoo': 'Шампуни',
    'help.vitamins': 'Витамины',
    'help.medicine': 'Лекарства',
    'help.collars': 'Ошейники и поводки',
    'help.beds': 'Лежанки',
    'donation.title': 'Вы также можете помочь пожертвованием',
    'donation.bank': 'Название банка / Тип банковского счёта',
    'donation.disclaimer': 'Реквизиты и юридическая информация приведены в демонстрационных целях.',
    'footer.questions': 'Вопросы и предложения',
    'footer.visit': 'Будем рады вашему визиту',
    'footer.address1': '1 Central Street, Boston (вход со стороны магазина)',
    'footer.address2': '18 South Park, London',
    'catalog.title': 'Наши питомцы ждут вас дома',
    'catalog.pagination': 'Навигация по каталогу питомцев',
    'theme.light': 'Светлая тема',
    'theme.dark': 'Тёмная тема',
    'language.label': 'Выбрать язык',
  },
  en: {
    'nav.home': 'Home',
    'brand.tagline': 'Pet shelter in Boston',
    'nav.about': 'About the shelter',
    'nav.pets': 'Our pets',
    'nav.help': 'Help the shelter',
    'nav.contacts': 'Contacts',
    'hero.title': 'Not only people need a house',
    'hero.text': 'Give care and a home to someone who needs it most. Your new best friend might be waiting for you here.',
    'hero.cta': 'Find a friend',
    'about.title': 'About the shelter “Cozy House”',
    'about.p1': 'Currently, 121 dogs and 342 cats are in our care. Statistics show that only 20% of them find a family. The others continue to live at the shelter and wait for their chance to be loved.',
    'about.p2': 'We care about the health and comfort of our animals. We are supported by 87 volunteers and 28 employees. Every day, we do our best to help pets find a loving home.',
    'friends.title': 'Our friends are looking for a home',
    'friends.more': 'Meet all our pets',
    'pet.more': 'Learn more',
    'help.title': 'How you can help our shelter',
    'help.food': 'Pet food',
    'help.transport': 'Transportation',
    'help.toys': 'Toys',
    'help.bowls': 'Bowls and cups',
    'help.shampoo': 'Shampoos',
    'help.vitamins': 'Vitamins',
    'help.medicine': 'Medicines',
    'help.collars': 'Collars / leashes',
    'help.beds': 'Sleeping areas',
    'donation.title': 'You can also make a donation',
    'donation.bank': 'Name of the bank / Type of bank account',
    'donation.disclaimer': 'Bank details and legal information are provided for demonstration purposes.',
    'footer.questions': 'For questions and suggestions',
    'footer.visit': 'We are waiting for your visit',
    'footer.address1': '1 Central Street, Boston (entrance from the store)',
    'footer.address2': '18 South Park, London',
    'catalog.title': 'Our pets are waiting for a home',
    'catalog.pagination': 'Pets catalog pagination',
    'theme.light': 'Light theme',
    'theme.dark': 'Dark theme',
    'language.label': 'Choose language',
  },
};

const localeKey = 'cozy-house-locale';
const themeKey = 'cozy-house-theme';

function getLocale(): Locale {
  return localStorage.getItem(localeKey) === 'en' ? 'en' : 'ru';
}

function applyLocale(locale: Locale): void {
  document.documentElement.lang = locale;
  document.querySelectorAll<HTMLElement>('[data-i18n]').forEach((element) => {
    const key = element.dataset.i18n;
    if (key && translations[locale][key]) element.textContent = translations[locale][key];
  });
  document.querySelectorAll<HTMLElement>('[data-i18n-aria]').forEach((element) => {
    const key = element.dataset.i18nAria;
    if (key && translations[locale][key]) element.setAttribute('aria-label', translations[locale][key]);
  });
  document.title = locale === 'ru' ? 'Cozy House — Приют для животных' : 'Cozy House — Pet Shelter';
  document.querySelectorAll<HTMLButtonElement>('[data-locale]').forEach((button) => {
    button.setAttribute('aria-pressed', String(button.dataset.locale === locale));
  });
  localStorage.setItem(localeKey, locale);
}

function applyTheme(theme: 'light' | 'dark'): void {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem(themeKey, theme);
  document.querySelectorAll<HTMLButtonElement>('[data-theme-toggle]').forEach((button) => {
    button.setAttribute('aria-label', theme === 'dark' ? translations[getLocale()]['theme.light'] : translations[getLocale()]['theme.dark']);
    button.setAttribute('aria-pressed', String(theme === 'dark'));
  });
}

export function initPreferences(): void {
  const savedTheme = localStorage.getItem(themeKey);
  const preferredTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  applyTheme(savedTheme === 'dark' || savedTheme === 'light' ? savedTheme : preferredTheme);
  applyLocale(getLocale());

  document.querySelectorAll<HTMLButtonElement>('[data-locale]').forEach((button) => {
    button.addEventListener('click', () => applyLocale(button.dataset.locale === 'en' ? 'en' : 'ru'));
  });
  document.querySelectorAll<HTMLButtonElement>('[data-theme-toggle]').forEach((button) => {
    button.addEventListener('click', () => {
      applyTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark');
    });
  });
}