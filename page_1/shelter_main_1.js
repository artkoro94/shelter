(() => {
  "use strict";

  const burger = document.querySelector("#burger");
  const mobileMenu = document.querySelector("#menu");

  const setMenuState = (isOpen) => {
    if (!burger || !mobileMenu) return;

    burger.classList.toggle("active", isOpen);
    mobileMenu.classList.toggle("active", isOpen);
    document.body.classList.toggle("no-scroll", isOpen);
    burger.setAttribute("aria-expanded", String(isOpen));
    mobileMenu.setAttribute("aria-hidden", String(!isOpen));
  };

  if (burger && mobileMenu) {
    burger.setAttribute("aria-controls", "menu");
    burger.setAttribute("aria-expanded", "false");
    mobileMenu.setAttribute("aria-hidden", "true");

    burger.addEventListener("click", () => {
      setMenuState(!mobileMenu.classList.contains("active"));
    });

    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => setMenuState(false));
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") setMenuState(false);
    });

    document.addEventListener("click", (event) => {
      if (
        mobileMenu.classList.contains("active") &&
        !mobileMenu.contains(event.target) &&
        !burger.contains(event.target)
      ) {
        setMenuState(false);
      }
    });
  }

  const track = document.querySelector("#friend-cards");
  const previousButton = document.querySelector("#left-btn");
  const nextButton = document.querySelector("#right-btn");

  if (!track || !previousButton || !nextButton) return;

  const cards = Array.from(track.children);
  let currentIndex = 0;

  const getVisibleCount = () => {
    if (window.matchMedia("(max-width: 620px)").matches) return 1;
    if (window.matchMedia("(max-width: 850px)").matches) return 2;
    return 3;
  };

  const getStep = () => {
    const firstCard = cards[0];
    if (!firstCard) return 0;

    const gap = Number.parseFloat(window.getComputedStyle(track).columnGap) || 0;
    return firstCard.getBoundingClientRect().width + gap;
  };

  const updateSlider = () => {
    const maxIndex = Math.max(0, cards.length - getVisibleCount());
    currentIndex = Math.min(currentIndex, maxIndex);

    track.style.transform = `translateX(-${currentIndex * getStep()}px)`;
    previousButton.disabled = currentIndex === 0;
    nextButton.disabled = currentIndex === maxIndex;
  };

  previousButton.addEventListener("click", () => {
    currentIndex = Math.max(0, currentIndex - 1);
    updateSlider();
  });

  nextButton.addEventListener("click", () => {
    const maxIndex = Math.max(0, cards.length - getVisibleCount());
    currentIndex = Math.min(maxIndex, currentIndex + 1);
    updateSlider();
  });

  let touchStartX = 0;

  track.addEventListener("touchstart", (event) => {
    touchStartX = event.changedTouches[0].clientX;
  }, { passive: true });

  track.addEventListener("touchend", (event) => {
    const difference = event.changedTouches[0].clientX - touchStartX;
    if (Math.abs(difference) < 40) return;

    const maxIndex = Math.max(0, cards.length - getVisibleCount());
    currentIndex = difference < 0
      ? Math.min(maxIndex, currentIndex + 1)
      : Math.max(0, currentIndex - 1);
    updateSlider();
  }, { passive: true });

  window.addEventListener("resize", updateSlider);
  updateSlider();
})();