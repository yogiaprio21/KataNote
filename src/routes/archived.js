import '../styles/style.css';
import '../component/custom-footer.js';
import '../component/custom-header.js';
import '../component/custom-nav.js';
import '../component/custome-loading.js';
import '../component/note-card.js';
import { getArchivedNotes, displayNotes } from "../main.js";

const Archived = () => {
  const app = document.getElementById('app');
  app.innerHTML = `
    <custom-header></custom-header>
    <main>
        <div class="container">
          <h2>Catatan Diarsipkan</h2>
          <div class="archived-notes notes-container"></div>
        </div>
    </main>
    <custom-footer>© 2024 KataNote. All rights reserved.</custom-footer>
  `;

  getArchivedNotesFromAPI();
};

async function getArchivedNotesFromAPI() {
  const notesContainer = document.querySelector(".archived-notes");
  try {
    const notesResponse = await getArchivedNotes();
    displayNotes(notesResponse.data, notesContainer, "Tidak ada catatan yang diarsipkan saat ini.");
  } catch (error) {
    notesContainer.innerHTML = `
      <div class="empty-state">
        <i class="fa-solid fa-wifi-slash"></i>
        <p>Gagal memuat catatan yang diarsipkan. Silakan coba lagi nanti.</p>
      </div>
    `;
  }
}

export default Archived;