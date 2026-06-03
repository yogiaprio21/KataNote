import Swal from 'sweetalert2';
import { icon } from './component/icons.js';

const BASE_URL = 'https://notes-api.dicoding.dev/v2';

const showLoading = () => {
  const loadingIndicator = document.querySelector('loading-indicator');
  if (loadingIndicator) {
    loadingIndicator.show();
  }
};

const hideLoading = () => {
  const loadingIndicator = document.querySelector('loading-indicator');
  if (loadingIndicator) {
    loadingIndicator.hide();
  }
};

const notifyError = (title, text) => Swal.fire({
  icon: 'error',
  title,
  text,
  confirmButtonColor: '#23483b',
});

const handleResponse = async (response) => {
  const data = await response.json();
  if (!response.ok) {
    notifyError('Permintaan gagal', data.message || 'Terjadi kesalahan pada server.');
    throw new Error(data.message || 'Request failed');
  }
  return data;
};

const apiRequest = async (endpoint, options = {}) => {
  showLoading();
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, options);
    return await handleResponse(response);
  } catch (error) {
    if (!error.message || error.message === 'Failed to fetch') {
      notifyError('Koneksi bermasalah', 'Tidak dapat terhubung ke server. Periksa koneksi internet Anda.');
    }
    throw error;
  } finally {
    hideLoading();
  }
};

export const createNote = ({ title, body }) => apiRequest('/notes', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ title, body }),
});

export const getNotes = () => apiRequest('/notes');

export const deleteNote = (noteId) => apiRequest(`/notes/${noteId}`, {
  method: 'DELETE',
});

export const archiveNote = (noteId) => apiRequest(`/notes/${noteId}/archive`, {
  method: 'POST',
});

export const unarchiveNote = (noteId) => apiRequest(`/notes/${noteId}/unarchive`, {
  method: 'POST',
});

export const getArchivedNotes = () => apiRequest('/notes/archived');

export const displayEmptyState = (container, {
  title = 'Belum ada catatan',
  message = 'Mulai buat catatan baru untuk melihatnya di sini.',
  iconName = 'fileText',
} = {}) => {
  container.innerHTML = `
    <div class="empty-state">
      <span class="empty-state__icon">${icon(iconName)}</span>
      <h3>${title}</h3>
      <p>${message}</p>
    </div>
  `;
};

export const displayNotes = (notes, container, emptyMessage = 'Tidak ada catatan untuk ditampilkan.') => {
  container.innerHTML = '';
  if (!notes || notes.length === 0) {
    displayEmptyState(container, {
      title: 'Ruang catatan masih kosong',
      message: emptyMessage,
    });
    return;
  }

  notes.forEach((note) => {
    const noteCard = document.createElement('note-card');
    noteCard.note = note;
    container.appendChild(noteCard);
  });
};
