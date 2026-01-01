import Home from '../routes/home.js';
import LoginComponent from '../routes/login.js';
import RegisterComponent from '../routes/register.js';
import AboutUsComponent from '../routes/about-us.js';
import TentangKataNote from '../routes/tentang.js'; 
import Archived from '../routes/archived.js';


const routes = {
  '/': LoginComponent,           
  '/home': Home,
  '/login': LoginComponent,
  '/register': RegisterComponent,
  '/about-us': AboutUsComponent,
  '/tentang': TentangKataNote, 
  '/archived': Archived,
};

const render = (page) => {
  const app = document.getElementById('app');
  app.innerHTML = ''; // Clear existing content
  page();
};

const router = () => {
  const path = window.location.pathname;
  console.log(`Navigating to: ${path}`); // Debug log
  const page = routes[path] || Login;  // Ganti halaman default jika rute tidak ditemukan
  render(page);
};

window.addEventListener('load', router);
window.addEventListener('popstate', router);

document.body.addEventListener('click', (e) => {
  if (e.target.matches('[data-link]')) {
    e.preventDefault();
    const href = e.target.getAttribute('href');
    window.history.pushState(null, null, href);
    router();
  }
});

export default router;