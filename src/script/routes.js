import Home from '../routes/home.js';
import LoginComponent from '../routes/login.js';
import RegisterComponent from '../routes/register.js';
import AboutUsComponent from '../routes/about-us.js';
import TentangKataNote from '../routes/tentang.js'; 
import Archived from '../routes/archived.js';
import { isAuthenticated } from './auth.js';
import { updateSeo } from './seo.js';


const routes = {
  '/': {
    page: LoginComponent,
    public: true,
    title: 'KataNote - Aplikasi Catatan Ringan untuk Ide Harian',
    description: 'KataNote membantu Anda menulis, mencari, mengarsipkan, dan mengelola ide harian lewat aplikasi catatan web yang rapi dan responsif.',
  },
  '/home': {
    page: Home,
    public: false,
    title: 'Catatan Aktif | KataNote',
    description: 'Workspace KataNote untuk membuat, mencari, mengarsipkan, dan menghapus catatan aktif.',
    robots: 'noindex,nofollow',
  },
  '/login': {
    page: LoginComponent,
    public: true,
    title: 'Masuk | KataNote',
    description: 'Masuk ke KataNote untuk mengelola catatan aktif dan arsip ide harian Anda.',
    robots: 'noindex,follow',
  },
  '/register': {
    page: RegisterComponent,
    public: true,
    title: 'Daftar Akun Demo | KataNote',
    description: 'Buat akun demo KataNote untuk mencoba pengalaman aplikasi catatan web yang bersih, cepat, dan responsif.',
    robots: 'noindex,follow',
  },
  '/about-us': {
    page: AboutUsComponent,
    public: true,
    title: 'Tentang Pembuat | KataNote by Yogi Aprio',
    description: 'Kenali Yogi Aprio, pembuat KataNote, dan nilai portfolio dari aplikasi catatan berbasis Web Components, API, dan UI responsif.',
  },
  '/tentang': {
    page: TentangKataNote,
    public: true,
    title: 'Tentang KataNote - Fitur dan Teknologi',
    description: 'Pelajari fitur KataNote: form catatan, pencarian, arsip, konfirmasi aksi, Web Components, dan integrasi Dicoding Notes API.',
  },
  '/archived': {
    page: Archived,
    public: false,
    title: 'Arsip Catatan | KataNote',
    description: 'Ruang arsip KataNote untuk menyimpan dan memulihkan catatan lama.',
    robots: 'noindex,nofollow',
  },
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

  updateSeo({
    title: route.title,
    description: route.description,
    path,
    robots: route.robots,
  });
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
