import './styles.css';
import { initPreferences } from './i18n';
import { initFeaturedSlider } from './modules/featured-slider';
import { initMobileNavigation } from './modules/navigation';
import { initPetDialog } from './modules/pet-dialog';

function initApp(): void {
  initPreferences();
  initMobileNavigation();
  initFeaturedSlider();
  initPetDialog();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp, { once: true });
} else {
  initApp();
}
