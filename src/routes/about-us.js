import '../styles/style.css';
import '../component/custom-footer.js';
import '../component/custom-header.js';
import '../component/custom-loading.js';
import '../component/custom-nav.js';
import { icon } from '../component/icons.js';

const skills = ['HTML', 'CSS', 'JavaScript', 'Web Components', 'Webpack', 'Responsive UI', 'API Integration'];

const AboutUsComponent = () => {
  const app = document.getElementById('app');
  app.innerHTML = `
    <custom-header></custom-header>
    <main class="page-shell">
      <section class="profile-layout">
        <div class="profile-card">
          <img src="./images/profil-pic.jpg" alt="Foto profil Yogi Aprio" class="profile-photo">
          <div>
            <p class="section-kicker">Pembuat aplikasi</p>
            <h2>Yogi Aprio</h2>
            <p>Front-end dan back-end enthusiast yang membangun KataNote sebagai portfolio aplikasi catatan berbasis Web Components, API, dan desain responsif.</p>
          </div>
        </div>

        <div class="profile-details">
          <section class="content-section content-section--flat">
            <div class="section-heading">
              <div>
                <h3>Kontak</h3>
                <p>Informasi singkat untuk reviewer atau recruiter.</p>
              </div>
            </div>
            <div class="info-list">
              <div class="info-row">
                <span>${icon('mail')}</span>
                <div>
                  <strong>Email</strong>
                  <p>yogiaprio21@gmail.com</p>
                </div>
              </div>
              <div class="info-row">
                <span>${icon('user')}</span>
                <div>
                  <strong>Profil</strong>
                  <p>Website Developer dan mahasiswa Teknik Elektro Universitas Lampung.</p>
                </div>
              </div>
            </div>
          </section>

          <section class="content-section content-section--flat">
            <div class="section-heading">
              <div>
                <h3>Nilai portfolio</h3>
                <p>Bagian ini menjelaskan keputusan teknis dan UX yang bisa dibahas saat interview.</p>
              </div>
            </div>
            <div class="timeline-list">
              <article>
                <span>${icon('sparkles')}</span>
                <div>
                  <h4>Product polish</h4>
                  <p>Layout auth, workspace, card, dan arsip dibuat konsisten agar aplikasi terasa seperti produk utuh.</p>
                </div>
              </article>
              <article>
                <span>${icon('check')}</span>
                <div>
                  <h4>Frontend fundamentals</h4>
                  <p>Routing SPA, custom elements, state sederhana, form validation, dan API integration tetap dipertahankan.</p>
                </div>
              </article>
            </div>
          </section>

          <section class="content-section content-section--flat">
            <div class="section-heading">
              <div>
                <h3>Skill yang ditampilkan</h3>
                <p>Teknologi dan praktik yang terlihat langsung di project.</p>
              </div>
            </div>
            <div class="skill-cloud">
              ${skills.map((skill) => `<span>${skill}</span>`).join('')}
            </div>
          </section>
        </div>
      </section>
    </main>
    <custom-footer>&copy; 2026 KataNote. Built by Yogi Aprio.</custom-footer>
  `;
};

export default AboutUsComponent;
