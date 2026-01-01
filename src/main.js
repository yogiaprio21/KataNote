import Swal from 'sweetalert2';
import "./component/note-card.js";

const BASE_URL = "https://notes-api.dicoding.dev/v2";

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

const handleResponse = async (response) => {
    hideLoading();
    const data = await response.json();
    if (!response.ok) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: data.message || 'Something went wrong!',
        });
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
        hideLoading();
        Swal.fire({
            icon: 'error',
            title: 'Connection Error',
            text: 'Could not connect to the server. Please check your internet connection.',
        });
        throw error;
    }
};

// 1. Menambahkan catatan baru
export const createNote = (note) => apiRequest('/notes', {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(note),
});

// 2. Mendapatkan dan menampilkan daftar catatan
export const getNotes = () => apiRequest('/notes');

// 3. Menghapus catatan
export const deleteNote = (noteId) => apiRequest(`/notes/${noteId}`, {
    method: "DELETE",
});

// 4. Mengarsipkan catatan
export const archiveNote = (noteId) => apiRequest(`/notes/${noteId}/archive`, {
    method: "POST",
});

// 5. Mengembalikan catatan
export const unarchiveNote = (noteId) => apiRequest(`/notes/${noteId}/unarchive`, {
    method: "POST",
});

// Ambil daftar catatan diarsipkan dari API
export const getArchivedNotes = () => apiRequest('/notes/archived');

// Menampilkan catatan
export const displayNotes = (notes, container) => {
    container.innerHTML = "";
    if (notes.length === 0) {
        container.innerHTML = "<p>Tidak ada catatan untuk ditampilkan.</p>";
        return;
    }
    notes.forEach(note => {
        const noteCard = document.createElement("note-card");
        noteCard.note = note; // Mengirim seluruh objek note sebagai properti
        container.appendChild(noteCard);
    });
};