import '../styles/style.css';
import '../component/custom-footer.js';
import '../component/custom-header.js';
import '../component/custom-loading.js';
import '../component/custom-nav.js';
import '../component/note-card.js';
import '../component/search-note.js';
import { createNote, displayEmptyState, displayNotes, getNotes } from '../main.js';
import { icon } from '../component/icons.js';

let notesCache = [];
let activeQuery = '';

const Home = () => {
  const app = document.getElementById('app');
  app.innerHTML = `
    <custom-header></custom-header>
    <main class="page-shell">
      <section class="page-hero page-hero--workspace">
        <div>
          <p class="section-kicker">Workspace catatan</p>
          <h2>Susun ide, tugas, dan arsip penting dalam satu ruang yang tenang.</h2>
          <p>KataNote dibuat sebagai aplikasi catatan ringan dengan alur buat, cari, arsipkan, dan hapus yang cepat untuk dipakai harian.</p>
        </div>
        <div class="hero-actions" aria-label="Ringkasan catatan">
          <div class="metric-card">
            <span class="metric-icon">${icon('fileText')}</span>
            <strong id="activeCount">0</strong>
            <span>Catatan aktif</span>
          </div>
          <div class="metric-card">
            <span class="metric-icon">${icon('sparkles')}</span>
            <strong>API</strong>
            <span>Dicoding Notes</span>
          </div>
        </div>
      </section>

      <section class="workspace-grid" aria-label="Ruang kerja catatan">
        <aside class="editor-panel">
          <div class="panel-heading">
            <span class="panel-icon">${icon('penLine')}</span>
            <div>
              <h3>Buat catatan baru</h3>
              <p>Tulis judul yang mudah dicari dan isi yang cukup jelas.</p>
            </div>
          </div>
          <form id="noteForm" novalidate>
            <div class="form-group">
              <label for="noteTitle">Judul</label>
              <input type="text" id="noteTitle" placeholder="Contoh: Ide portfolio minggu ini" aria-describedby="titleError" required />
              <p class="field-error" id="titleError"></p>
            </div>
            <div class="form-group">
              <label for="noteBody">Isi catatan</label>
              <textarea id="noteBody" placeholder="Tuliskan konteks, keputusan, atau daftar tugas..." aria-describedby="bodyError" required></textarea>
              <p class="field-error" id="bodyError"></p>
            </div>
            <button class="primary-button" type="submit">
              ${icon('plus')}
              Simpan catatan
            </button>
          </form>
        </aside>

        <section class="notes-panel">
          <div class="panel-toolbar">
            <div>
              <h3>Catatan aktif</h3>
              <p id="resultSummary">Memuat catatan...</p>
            </div>
            <search-note></search-note>
          </div>
          <div class="notes-container" aria-live="polite"></div>
        </section>
      </section>
    </main>
    <custom-footer>&copy; 2026 KataNote. Built by Yogi Aprio.</custom-footer>
  `;

  setupHomeInteractions();
  loadNotes();
};

function setupHomeInteractions() {
  if (window.katanoteHomeAbort) {
    window.katanoteHomeAbort.abort();
  }
  window.katanoteHomeAbort = new AbortController();
  const { signal } = window.katanoteHomeAbort;

  const noteForm = document.getElementById('noteForm');
  noteForm.addEventListener('submit', handleSubmit, { signal });

  document.querySelector('search-note').addEventListener('search-changed', (event) => {
    activeQuery = event.detail.query;
    renderNotes();
  }, { signal });

  document.addEventListener('notes-updated', () => loadNotes(), { signal });
}

async function handleSubmit(event) {
  event.preventDefault();
  const titleInput = document.getElementById('noteTitle');
  const bodyInput = document.getElementById('noteBody');

  if (!validateForm(titleInput, bodyInput)) {
    return;
  }

  const submitButton = event.submitter;
  submitButton.disabled = true;

  try {
    await createNote({
      title: titleInput.value.trim(),
      body: bodyInput.value.trim(),
    });
    titleInput.value = '';
    bodyInput.value = '';
    await loadNotes();
  } catch (error) {
    console.error('Gagal membuat catatan:', error);
  } finally {
    submitButton.disabled = false;
  }
}

function validateForm(titleInput, bodyInput) {
  const titleError = document.getElementById('titleError');
  const bodyError = document.getElementById('bodyError');
  let isValid = true;

  titleError.textContent = '';
  bodyError.textContent = '';
  titleInput.removeAttribute('aria-invalid');
  bodyInput.removeAttribute('aria-invalid');

  if (titleInput.value.trim().length < 3) {
    titleError.textContent = 'Judul minimal 3 karakter.';
    titleInput.setAttribute('aria-invalid', 'true');
    isValid = false;
  }

  if (bodyInput.value.trim().length < 10) {
    bodyError.textContent = 'Isi catatan minimal 10 karakter.';
    bodyInput.setAttribute('aria-invalid', 'true');
    isValid = false;
  }

  return isValid;
}

async function loadNotes() {
  const notesContainer = document.querySelector('.notes-container');
  try {
    const notesResponse = await getNotes();
    notesCache = notesResponse.data || [];
    renderNotes();
  } catch (error) {
    displayEmptyState(notesContainer, {
      title: 'Gagal memuat catatan',
      message: 'Periksa koneksi internet Anda, lalu coba muat ulang halaman.',
      iconName: 'wifiOff',
    });
  }
}

function renderNotes() {
  const notesContainer = document.querySelector('.notes-container');
  const resultSummary = document.getElementById('resultSummary');
  const activeCount = document.getElementById('activeCount');
  const filteredNotes = notesCache.filter((note) => {
    const haystack = `${note.title} ${note.body}`.toLowerCase();
    return haystack.includes(activeQuery);
  });

  activeCount.textContent = String(notesCache.length);
  resultSummary.textContent = activeQuery
    ? `${filteredNotes.length} hasil untuk "${activeQuery}"`
    : `${notesCache.length} catatan aktif tersedia`;

  displayNotes(
    filteredNotes,
    notesContainer,
    activeQuery ? 'Tidak ada catatan yang cocok dengan pencarian.' : 'Buat catatan pertama Anda dari panel di samping.'
  );
}

export default Home;
