import { deleteNote, archiveNote, unarchiveNote } from "../main.js";
import swal from 'sweetalert';

class NoteCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._note = null;
  }

  set note(note) {
    this._note = note;
    this.render();
  }

  render() {
    if (!this._note) {
      this.shadowRoot.innerHTML = '';
      return;
    }

    const { id, title, body, createdAt, archived } = this._note;
    const isArchived = archived;

    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css">
      <style>
        :host {
            display: flex;
        }
        .note-card {
          background-color: var(--card-bg-color);
          border-radius: 16px;
          padding: 25px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.05);
          border: 1px solid #EAEAEA;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          width: 100%;
        }

        .note-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 12px 20px rgba(0,0,0,0.08);
        }

        .note-title {
          font-weight: 700;
          font-size: 1.5rem;
          margin-bottom: 10px;
          color: var(--primary-color);
        }

        .note-body {
          font-size: 1rem;
          line-height: 1.7;
          color: #555;
          flex-grow: 1;
          padding-bottom: 20px;
        }

        .note-footer {
            border-top: 1px solid #F0F0F0;
            padding-top: 20px;
            margin-top: 20px;
        }

        .note-meta {
          font-size: 0.85rem;
          color: #888;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .note-archived {
          background-color: var(--secondary-color);
          color: var(--primary-color);
          padding: 3px 8px;
          border-radius: 6px;
          font-weight: 500;
        }
        
        .note-actions {
            display: flex;
            gap: 10px;
        }

        .note-actions button {
            flex: 1;
            padding: 12px;
            font-size: 0.95rem;
            gap: 8px;
            border-radius: 10px;
        }

        #note-delete {
          background-color: transparent;
          color: var(--error-color);
          border: 1px solid var(--error-color);
        }
        
        #note-delete:hover {
            background-color: var(--error-color);
            color: white;
            transform: translateY(-2px);
        }

        #note-archive {
          background-color: var(--primary-color);
          border: 1px solid var(--primary-color);
        }
        
        #note-archive:hover {
            background-color: #6a8a6b;
            border-color: #6a8a6b;
            transform: translateY(-2px);
        }
      </style>
      <div class="note-card">
        <div>
            <div class="note-title">${title}</div>
            <div class="note-body">${body}</div>
        </div>
        <div class="note-footer">
            <div class="note-meta">
              <span class="note-createdAt">${new Date(createdAt).toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric' })}</span>
              ${isArchived ? `<span class="note-archived">Diarsipkan</span>` : ""}
            </div>
            <div class="note-actions">
                <button id="note-archive">
                    <i class="fa-solid ${isArchived ? 'fa-arrow-up-from-bracket' : 'fa-box-archive'}"></i>
                    ${isArchived ? 'Batal Arsip' : 'Arsipkan'}
                </button>
                <button id="note-delete"><i class="fa-solid fa-trash"></i>Hapus</button>
            </div>
        </div>
      </div>
    `;

    this.shadowRoot.querySelector("#note-delete").addEventListener("click", () => this.handleDelete());
    this.shadowRoot.querySelector("#note-archive").addEventListener("click", () => this.handleArchive());
  }

  async handleDelete() {
    const noteId = this._note.id;
    swal({
      title: "Apakah Anda yakin?",
      text: "Setelah dihapus, Anda tidak akan dapat memulihkan catatan ini!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then(async (willDelete) => {
      if (willDelete) {
        try {
          await deleteNote(noteId);
          this.remove();
          swal("Catatan Anda telah dihapus!", {
            icon: "success",
          });
          // Dispatch a custom event to notify that a note was deleted
          document.dispatchEvent(new CustomEvent('note-deleted'));
        } catch (error) {
          swal("Gagal menghapus catatan!", {
            icon: "error",
          });
        }
      } else {
        swal("Catatan Anda aman!");
      }
    });
  }

  async handleArchive() {
    const noteId = this._note.id;
    const isArchived = this._note.archived;
    const action = isArchived ? unarchiveNote : archiveNote;
    const successMessage = isArchived ? "Catatan telah dipulihkan!" : "Catatan telah diarsipkan!";

    try {
        await action(noteId);
        this.remove();
        swal(successMessage, {
            icon: "success",
        });
        // Dispatch a custom event to notify that a note was archived/unarchived
        document.dispatchEvent(new CustomEvent('note-archived'));
    } catch (error) {
        swal("Gagal memperbarui catatan!", {
            icon: "error",
        });
    }
  }
}

customElements.define("note-card", NoteCard);