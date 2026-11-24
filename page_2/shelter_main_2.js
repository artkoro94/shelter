(() => {
  "use strict";

  const burger = document.querySelector(".burger_menu");
  const mobileMenu = document.querySelector("#menu");

  if (burger && mobileMenu) {
    const setMenuState = (isOpen) => {
      burger.classList.toggle("active", isOpen);
      mobileMenu.classList.toggle("active", isOpen);
      document.body.classList.toggle("no-scroll", isOpen);
      burger.setAttribute("aria-expanded", String(isOpen));
      mobileMenu.setAttribute("aria-hidden", String(!isOpen));
    };

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
  }

  const cards = Array.from(document.querySelectorAll(".cards_container .card"));
  const pagination = document.querySelector(".navigation_pets");
  if (!cards.length || !pagination) return;

  const firstButton = pagination.querySelector(".button_l_x2");
  const previousButton = pagination.querySelector(".button_l_x1");
  const nextButton = pagination.querySelector(".button_r_x1");
  const lastButton = pagination.querySelector(".button_r_x2");
  const pageNumber = pagination.querySelector(".number_text");

  // The current catalog contains eight pets and therefore occupies one page.
  const currentPage = 1;
  const totalPages = 1;

  if (pageNumber) pageNumber.textContent = String(currentPage);

  [firstButton, previousButton].forEach((button) => {
    if (button) button.disabled = currentPage === 1;
  });

  [nextButton, lastButton].forEach((button) => {
    if (button) button.disabled = currentPage === totalPages;
  });

  pagination.setAttribute("aria-label", "Pets catalog pagination");
})();