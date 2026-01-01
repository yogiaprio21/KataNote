import '../styles/style.css';
import '../component/custom-footer.js';
import '../component/custom-header.js';
import '../component/custom-nav.js';
import '../component/custome-loading.js';
import '../component/note-card.js';
import { createNote, getNotes, displayNotes } from '../main.js';

const Home = () => {
  const app = document.getElementById('app');
  app.innerHTML = `
    <custom-header></custom-header>
    <main>
      <div class="container">
        <div class="note-form">
          <h2>Buat Catatan Baru</h2>
          <form id="noteForm">
            <div class="form-group">
              <label for="noteTitle">Judul</label>
              <input type="text" id="noteTitle" placeholder="Masukkan judul catatan..." required />
            </div>
            <div class="form-group">
              <label for="noteBody">Isi Catatan</label>
              <textarea id="noteBody" placeholder="Tuliskan catatan Anda di sini..." required></textarea>
            </div>
            <button type="submit">
              <i class="fa-solid fa-plus"></i>
              <span>Buat Catatan</span>
            </button>
          </form>
        </div>
        <h2 class="section-title">Catatan Aktif</h2>
        <div class="notes-container"></div>
      </div>
    </main>
    <custom-footer>© 2024 KataNote. All rights reserved.</custom-footer>
  `;

  setupEventListeners();
  getNotesFromAPI();
};

function setupEventListeners() {
  const noteForm = document.getElementById('noteForm');
  noteForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const titleInput = document.getElementById('noteTitle');
    const bodyInput = document.getElementById('noteBody');

    if (!validateForm(titleInput, bodyInput)) {
      return;
    }

    try {
      await createNote(titleInput.value, bodyInput.value);
      titleInput.value = '';
      bodyInput.value = '';
      getNotesFromAPI(); // Refresh notes list
    } catch (error) {
      console.error('Gagal membuat catatan:', error);
      // Optionally, show an error message to the user
    }
  });
}

function validateForm(titleInput, bodyInput) {
  let isValid = true;
  if (titleInput.value.trim() === '') {
    // You can add more specific error handling here, e.g., showing a message
    isValid = false;
  }
  if (bodyInput.value.trim() === '') {
    isValid = false;
  }
  return isValid;
}

async function getNotesFromAPI() {
  const notesContainer = document.querySelector(".notes-container");
  try {
    const notesResponse = await getNotes();
    displayNotes(notesResponse.data, notesContainer, "Belum ada catatan aktif. Silakan buat satu!");
  } catch (error) {
    notesContainer.innerHTML = `
      <div class="empty-state">
        <i class="fa-solid fa-wifi-slash"></i>
        <p>Gagal memuat catatan. Silakan coba lagi nanti.</p>
      </div>
    `;
  }
}

export default Home;