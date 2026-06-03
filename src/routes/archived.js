import '../styles/style.css';
import '../component/custom-footer.js';
import '../component/custom-header.js';
import '../component/custom-loading.js';
import '../component/custom-nav.js';
import '../component/note-card.js';
import { displayEmptyState, displayNotes, getArchivedNotes } from '../main.js';
import { icon } from '../component/icons.js';

const Archived = () => {
  const app = document.getElementById('app');
  app.innerHTML = `
    <custom-header></custom-header>
    <main class="page-shell">
      <section class="page-hero page-hero--compact">
        <div>
          <p class="section-kicker">Ruang arsip</p>
          <h2>Simpan catatan lama tanpa mengacaukan daftar aktif.</h2>
          <p>Gunakan arsip untuk menyimpan ide yang sudah selesai, referensi lama, atau catatan yang belum perlu ditampilkan setiap hari.</p>
        </div>
        <div class="metric-card metric-card--wide">
          <span class="metric-icon">${icon('archive')}</span>
          <strong id="archivedCount">0</strong>
          <span>Catatan diarsipkan</span>
        </div>
      </section>

      <section class="content-section">
        <div class="section-heading">
          <div>
            <h3>Catatan diarsipkan</h3>
            <p>Pulihkan catatan untuk mengembalikannya ke halaman aktif.</p>
          </div>
        </div>
        <div class="archived-notes notes-container" aria-live="polite"></div>
      </section>
    </main>
    <custom-footer>&copy; 2026 KataNote. Built by Yogi Aprio.</custom-footer>
  `;

  setupArchivedInteractions();
  loadArchivedNotes();
};

function setupArchivedInteractions() {
  if (window.katanoteArchivedAbort) {
    window.katanoteArchivedAbort.abort();
  }
  window.katanoteArchivedAbort = new AbortController();
  document.addEventListener('notes-updated', () => loadArchivedNotes(), {
    signal: window.katanoteArchivedAbort.signal,
  });
}

async function loadArchivedNotes() {
  const notesContainer = document.querySelector('.archived-notes');
  const archivedCount = document.getElementById('archivedCount');
  try {
    const notesResponse = await getArchivedNotes();
    const notes = notesResponse.data || [];
    archivedCount.textContent = String(notes.length);
    displayNotes(notes, notesContainer, 'Belum ada catatan yang diarsipkan.');
  } catch (error) {
    displayEmptyState(notesContainer, {
      title: 'Gagal memuat arsip',
      message: 'Periksa koneksi internet Anda, lalu coba muat ulang halaman.',
      iconName: 'wifiOff',
    });
  }
}

export default Archived;
