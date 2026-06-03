class LoadingIndicator extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: none;
          align-items: center;
          justify-content: center;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(16, 28, 23, 0.28);
          backdrop-filter: blur(4px);
          z-index: 9999;
        }

        .loading-spinner {
          border: 4px solid rgba(255, 255, 255, 0.65);
          border-top: 4px solid var(--color-accent, #23483b);
          border-radius: 50%;
          width: 54px;
          height: 54px;
          animation: spin 0.8s linear infinite;
          box-shadow: var(--shadow-md, 0 20px 50px rgba(0,0,0,0.16));
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      </style>
      <div class="loading-spinner"></div>
    `;
  }

  show() {
    this.style.display = 'flex';
  }

  hide() {
    this.style.display = 'none';
  }
}

customElements.define('loading-indicator', LoadingIndicator);
