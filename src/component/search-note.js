import { icon } from './icons.js';

class SearchNote extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.shadowRoot.querySelector('#search-input').addEventListener('input', (event) => {
      this.dispatchEvent(new CustomEvent('search-changed', {
        bubbles: true,
        composed: true,
        detail: { query: event.target.value.trim().toLowerCase() },
      }));
    });
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }
        .search-container {
          display: grid;
          gap: 8px;
        }
        label {
          color: var(--color-ink);
          font-weight: 800;
          font-size: 0.86rem;
        }
        .search-input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }
        #search-input {
          width: 100%;
          min-height: 48px;
          padding: 0 16px 0 46px;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          background: var(--color-surface);
          color: var(--color-ink);
          font: 600 0.95rem/1 var(--font-family);
          box-sizing: border-box;
          transition: border-color 160ms ease, box-shadow 160ms ease;
        }
        #search-input:focus {
          outline: none;
          border-color: var(--color-accent);
          box-shadow: 0 0 0 4px var(--color-focus);
        }
        #search-input::placeholder {
          color: var(--color-soft-text);
        }
        .search-icon {
          position: absolute;
          left: 16px;
          width: 18px;
          height: 18px;
          display: inline-flex;
          color: var(--color-soft-text);
          pointer-events: none;
        }
        svg {
          width: 18px;
          height: 18px;
          fill: none;
          stroke: currentColor;
          stroke-width: 2;
          stroke-linecap: round;
          stroke-linejoin: round;
        }
      </style>
      <div class="search-container">
        <label for="search-input">Cari catatan</label>
        <div class="search-input-wrapper">
          <span class="search-icon">${icon('search')}</span>
          <input id="search-input" type="search" placeholder="Cari berdasarkan judul atau isi..." autocomplete="off" />
        </div>
      </div>
    `;
  }
}

customElements.define('search-note', SearchNote);
