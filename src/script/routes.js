import Home from '../routes/home.js';
import LoginComponent from '../routes/login.js';
import RegisterComponent from '../routes/register.js';
import AboutUsComponent from '../routes/about-us.js';
import TentangKataNote from '../routes/tentang.js'; 
import Archived from '../routes/archived.js';
import { isAuthenticated } from './auth.js';


const routes = {
  '/': { page: LoginComponent, public: true, title: 'Masuk | KataNote' },
  '/home': { page: Home, public: false, title: 'Catatan | KataNote' },
  '/login': { page: LoginComponent, public: true, title: 'Masuk | KataNote' },
  '/register': { page: RegisterComponent, public: true, title: 'Daftar | KataNote' },
  '/about-us': { page: AboutUsComponent, public: true, title: 'Tentang Pembuat | KataNote' },
  '/tentang': { page: TentangKataNote, public: true, title: 'Tentang KataNote' },
  '/archived': { page: Archived, public: false, title: 'Arsip | KataNote' },
};

const render = (page) => {
  const app = document.getElementById('app');
  app.innerHTML = ''; // Clear existing content
  page();
};

const router = () => {
  const path = window.location.pathname;
  const route = routes[path] || routes['/login'];

  if (!route.public && !isAuthenticated()) {
    navigateTo('/login', { replace: true });
    return;
  }

  if (isAuthenticated() && (path === '/' || path === '/login' || path === '/register')) {
    navigateTo('/home', { replace: true });
    return;
  }

  document.title = route.title;
  render(route.page);
};

window.addEventListener('popstate', router);

export const navigateTo = (path, options = {}) => {
  if (options.replace) {
    window.history.replaceState(null, '', path);
  } else {
    window.history.pushState(null, '', path);
  }
  router();
};

document.body.addEventListener('click', (e) => {
  const link = e.composedPath().find((element) => element?.matches?.('[data-link]'));
  if (link) {
    e.preventDefault();
    navigateTo(link.getAttribute('href'));
  }
});

window.addEventListener('app:navigate', (event) => {
  navigateTo(event.detail.path, event.detail.options || {});
});

export default router;
