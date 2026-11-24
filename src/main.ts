import './styles.css';
import { initPreferences } from './i18n';
import { initFeaturedSlider } from './modules/featured-slider';
import { initMobileNavigation } from './modules/navigation';

function initApp(): void {
  initPreferences();
  initMobileNavigation();
  initFeaturedSlider();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp, { once: true });
} else {
  initApp();
}
