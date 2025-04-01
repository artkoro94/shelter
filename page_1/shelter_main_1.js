// Burger Menu

document.querySelector(".burger_menu").addEventListener("click", function () {
  this.classList.toggle("active");
});

document.addEventListener("DOMContentLoaded", function () {
  const burger = document.getElementById("burger");
  const menu = document.getElementById("menu");
  const body = document.body;

  burger.addEventListener("click", function () {
      burger.classList.toggle("active");
      menu.classList.toggle("active");
      body.classList.toggle("no-scroll"); // Блокируем/разблокируем скролл
  });

  // Закрытие меню при клике на ссылку
  document.querySelectorAll(".mobile_menu a").forEach(link => {
      link.addEventListener("click", () => {
          burger.classList.remove("active");
          menu.classList.remove("active");
          body.classList.remove("no-scroll"); // Убираем блокировку скролла
      });
  });
});

// Slider with Infinite Loop and Corrected Movement

const leftBtn = document.getElementById('left-btn');
const rightBtn = document.getElementById('right-btn');
const cards = document.getElementById('friend-cards');
let currentIndex = 0;
const cardWidth = 300;
const totalCards = cards.children.length;

function updateSlider() {
    cards.style.transition = 'transform 0.5s ease';
    cards.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
}

function updateSlide2() {
    cards.style.transition = 'transform 0.5s ease';
    cards.style.transform = `translateX(+${currentIndex * cardWidth}px)`;
}

rightBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % totalCards;
    updateSlider();
});

leftBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 2 + totalCards) % totalCards;
    updateSlide2();
});

// Swipe

const container = document.querySelector('.friend_cards');
const items = document.querySelectorAll('.swipe-item');

let startX = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let isDragging = false;
let gap = 120;
let itemWidth = 290;

function getSlideWidth() {
  return itemWidth + gap;
}

container.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
  isDragging = true;
});

container.addEventListener('touchmove', (e) => {
  if (!isDragging) return;
  const currentX = e.touches[0].clientX;
  const diff = currentX - startX;
  currentTranslate = prevTranslate + diff;
  container.style.transform = `translateX(${currentTranslate}px)`;
});

container.addEventListener('touchend', () => {
  isDragging = false;
  const slideWidth = getSlideWidth();
  const currentSlide = Math.round(-currentTranslate / slideWidth);
  currentTranslate = -currentSlide * slideWidth;
  prevTranslate = currentTranslate;
  container.style.transition = 'transform 0.3s ease';
  container.style.transform = `translateX(${currentTranslate}px)`;
  setTimeout(() => {
    container.style.transition = '';
  }, 300);
});