class SearchNote extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.shadowRoot.querySelector("#search-input").addEventListener("input", () => this.searchNotes());
  }

  render() {
    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css">
      <style>
        .search-container {
          max-width: 600px;
          margin: 0 auto 40px auto;
        }

        .search-input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        #search-input {
          width: 100%;
          padding: 15px 20px 15px 50px; /* Add padding for icon */
          border-radius: 25px; /* Pill shape */
          border: 1px solid var(--border-color);
          font-size: 1rem;
          font-family: var(--font-family);
          box-sizing: border-box;
          transition: border-color 0.3s, box-shadow 0.3s;
        }

        #search-input:focus {
          outline: none;
          border-color: var(--primary-color);
          box-shadow: 0 0 0 3px rgba(127, 159, 128, 0.2);
        }
        
        .search-icon {
            position: absolute;
            left: 20px;
            color: #aaa;
        }

        .results {
          margin-top: 20px;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 25px;
        }
      </style>
      <div class="search-container">
        <div class="search-input-wrapper">
            <i class="fa-solid fa-magnifying-glass search-icon"></i>
            <input id="search-input" type="text" placeholder="Cari berdasarkan judul..." />
        </div>
        <div class="results" id="results-container"></div>
      </div>
    `;
  }

  async searchNotes() {
    const query = this.shadowRoot.querySelector("#search-input").value.trim().toLowerCase();
    const resultsContainer = this.shadowRoot.querySelector("#results-container");

    // Clear previous results
    resultsContainer.innerHTML = '';

    if (query) {
      try {
        const notesResponse = await fetch("https://notes-api.dicoding.dev/v2/notes");
        const notes = await notesResponse.json();

        const filteredNotes = notes.data.filter(note =>
          note.title.toLowerCase().includes(query)
        );

        filteredNotes.forEach(note => {
          const noteCard = document.createElement("note-card");
          noteCard.setAttribute("id", note.id);
          noteCard.setAttribute("title", note.title);
          noteCard.setAttribute("body", note.body);
          noteCard.setAttribute("createdAt", note.createdAt);
          noteCard.setAttribute("archived", note.archived);
          resultsContainer.appendChild(noteCard);
        });
      } catch (error) {
        console.error("Gagal mencari catatan:", error);
      }
    }
  }
}

customElements.define("search-note", SearchNote);
