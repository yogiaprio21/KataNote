import Swal from 'sweetalert2';
import { archiveNote, deleteNote, unarchiveNote } from '../main.js';
import { icon } from './icons.js';

const escapeHtml = (value = '') => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#039;');

class NoteCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._note = null;
  }

  set note(note) {
    this._note = note;
    this.render();
  }

  get note() {
    return this._note;
  }

  render() {
    if (!this._note) {
      this.shadowRoot.innerHTML = '';
      return;
    }

    const { title, body, createdAt, archived } = this._note;
    const safeTitle = escapeHtml(title);
    const safeBody = escapeHtml(body);
    const date = new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(new Date(createdAt));

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: flex;
          min-width: 0;
        }
        .note-card {
          width: 100%;
          min-height: 270px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 22px;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          background: var(--color-surface);
          box-shadow: var(--shadow-sm);
          transition: transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease;
        }
        .note-card:hover,
        .note-card:focus-within {
          transform: translateY(-3px);
          border-color: rgba(64, 125, 104, 0.34);
          box-shadow: var(--shadow-md);
        }
        .note-top {
          display: grid;
          gap: 14px;
        }
        .note-status {
          width: fit-content;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 10px;
          border-radius: 999px;
          color: ${archived ? 'var(--color-warning)' : 'var(--color-accent)'};
          background: ${archived ? 'rgba(180, 119, 40, 0.1)' : 'var(--color-accent-soft)'};
          font-weight: 800;
          font-size: 0.75rem;
        }
        .note-title {
          margin: 0;
          color: var(--color-ink);
          font-size: 1.2rem;
          line-height: 1.25;
          letter-spacing: 0;
          overflow-wrap: anywhere;
        }
        .note-body {
          margin: 0;
          color: var(--color-muted);
          font-size: 0.95rem;
          line-height: 1.65;
          overflow-wrap: anywhere;
          display: -webkit-box;
          -webkit-line-clamp: 5;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .note-footer {
          display: grid;
          gap: 18px;
          padding-top: 18px;
          margin-top: 24px;
          border-top: 1px solid var(--color-border);
        }
        .note-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          color: var(--color-soft-text);
          font-size: 0.83rem;
          font-weight: 700;
        }
        .note-actions {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }
        button {
          min-height: 42px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          border: 1px solid transparent;
          border-radius: var(--radius-sm);
          padding: 0 12px;
          font: 800 0.88rem/1 var(--font-family);
          cursor: pointer;
          transition: transform 160ms ease, box-shadow 160ms ease, background 160ms ease;
        }
        button:focus-visible {
          outline: 3px solid var(--color-focus);
          outline-offset: 2px;
        }
        .archive-button {
          color: var(--color-on-accent);
          background: var(--color-accent);
        }
        .delete-button {
          color: var(--color-danger);
          background: var(--color-danger-soft);
          border-color: rgba(183, 56, 56, 0.2);
        }
        button:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-xs);
        }
        svg {
          width: 17px;
          height: 17px;
          fill: none;
          stroke: currentColor;
          stroke-width: 2;
          stroke-linecap: round;
          stroke-linejoin: round;
        }
        @media (max-width: 420px) {
          .note-actions {
            grid-template-columns: 1fr;
          }
          .note-card {
            min-height: auto;
            padding: 18px;
          }
        }
      </style>
      <article class="note-card">
        <div class="note-top">
          <span class="note-status">${archived ? icon('archive') : icon('fileText')}${archived ? 'Diarsipkan' : 'Aktif'}</span>
          <h3 class="note-title">${safeTitle}</h3>
          <p class="note-body">${safeBody}</p>
        </div>
        <footer class="note-footer">
          <div class="note-meta">
            <span>Dibuat ${date}</span>
            <span>${String(body).length} karakter</span>
          </div>
          <div class="note-actions">
            <button class="archive-button" type="button">
              ${archived ? icon('arrowUp') : icon('archive')}
              ${archived ? 'Pulihkan' : 'Arsipkan'}
            </button>
            <button class="delete-button" type="button">
              ${icon('trash')}
              Hapus
            </button>
          </div>
        </footer>
      </article>
    `;

    this.shadowRoot.querySelector('.delete-button').addEventListener('click', () => this.handleDelete());
    this.shadowRoot.querySelector('.archive-button').addEventListener('click', () => this.handleArchive());
  }

  async handleDelete() {
    const result = await Swal.fire({
      title: 'Hapus catatan?',
      text: 'Catatan yang dihapus tidak dapat dipulihkan dari API.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Hapus',
      cancelButtonText: 'Batal',
      confirmButtonColor: '#b73838',
    });

    if (!result.isConfirmed) return;

    try {
      await deleteNote(this._note.id);
      this.dispatchRefresh('note-deleted');
      await Swal.fire({
        icon: 'success',
        title: 'Catatan dihapus',
        timer: 1400,
        showConfirmButton: false,
      });
    } catch (error) {
      await Swal.fire({
        icon: 'error',
        title: 'Gagal menghapus',
        text: 'Silakan coba lagi beberapa saat.',
        confirmButtonColor: '#23483b',
      });
    }
  }

  async handleArchive() {
    const archived = this._note.archived;
    const action = archived ? unarchiveNote : archiveNote;
    const successMessage = archived ? 'Catatan dipulihkan' : 'Catatan diarsipkan';

    try {
      await action(this._note.id);
      this.dispatchRefresh('note-archived');
      await Swal.fire({
        icon: 'success',
        title: successMessage,
        timer: 1400,
        showConfirmButton: false,
      });
    } catch (error) {
      await Swal.fire({
        icon: 'error',
        title: 'Gagal memperbarui catatan',
        text: 'Silakan coba lagi beberapa saat.',
        confirmButtonColor: '#23483b',
      });
    }
  }

  dispatchRefresh(type) {
    document.dispatchEvent(new CustomEvent(type, { bubbles: true }));
    document.dispatchEvent(new CustomEvent('notes-updated', { bubbles: true }));
  }
}

customElements.define('note-card', NoteCard);
