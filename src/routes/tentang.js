import '../styles/style.css';
import '../component/custom-footer.js';
import '../component/custom-header.js';
import '../component/custom-loading.js';
import '../component/custom-nav.js';
import { icon } from '../component/icons.js';

const features = [
  {
    iconName: 'penLine',
    title: 'Form catatan yang jelas',
    description: 'Judul dan isi divalidasi secara inline sehingga pengguna tahu apa yang perlu diperbaiki.',
  },
  {
    iconName: 'search',
    title: 'Pencarian cepat',
    description: 'Catatan aktif dapat difilter berdasarkan judul maupun isi tanpa perlu memuat data berulang.',
  },
  {
    iconName: 'archive',
    title: 'Arsip terpisah',
    description: 'Catatan lama tetap tersimpan, tetapi tidak mengganggu daftar aktif yang dipakai harian.',
  },
  {
    iconName: 'trash',
    title: 'Aksi destruktif aman',
    description: 'Hapus catatan memakai konfirmasi modal agar pengguna tidak kehilangan data karena salah klik.',
  },
];

const TentangKataNote = () => {
  const app = document.getElementById('app');
  app.innerHTML = `
    <custom-header></custom-header>
    <main class="page-shell">
      <section class="page-hero page-hero--about">
        <div>
          <p class="section-kicker">Tentang KataNote</p>
          <h2>Aplikasi catatan ringan yang fokus pada alur harian.</h2>
          <p>KataNote membantu pengguna menulis, mencari, mengarsipkan, dan menghapus catatan dengan tampilan yang bersih serta responsif di berbagai ukuran layar.</p>
        </div>
        <div class="hero-note">
          <span>${icon('bookOpen')}</span>
          <p>Project ini menggunakan Web Components, Webpack, CSS design tokens, dan Dicoding Notes API sebagai sumber data.</p>
        </div>
      </section>

      <section class="content-section">
        <div class="section-heading">
          <div>
            <h3>Fitur utama</h3>
            <p>Setiap fitur dirancang agar mudah dipahami tanpa instruksi panjang di layar.</p>
          </div>
        </div>
        <div class="feature-grid">
          ${features.map((feature) => `
            <article class="feature-card">
              <span>${icon(feature.iconName)}</span>
              <h4>${feature.title}</h4>
              <p>${feature.description}</p>
            </article>
          `).join('')}
        </div>
      </section>

      <section class="content-section content-section--split">
        <div>
          <p class="section-kicker">Pendekatan redesign</p>
          <h3>Lebih segar tanpa meninggalkan fondasi project.</h3>
        </div>
        <p>Redesign ini tidak mengubah project menjadi framework besar. Web Components tetap dipakai, tetapi struktur halaman, state UI, ikon, token warna, dan responsivitas dirapikan agar terlihat lebih siap sebagai portfolio.</p>
      </section>
    </main>
    <custom-footer>&copy; 2026 KataNote. Built by Yogi Aprio.</custom-footer>
  `;
};

export default TentangKataNote;
