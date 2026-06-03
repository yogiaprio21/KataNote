import { icon } from './icons.js';

class CustomHeader extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });

    const template = `
      <style>
        :host {
          display: block;
          position: sticky;
          top: 0;
          z-index: 900;
          border-bottom: 1px solid var(--color-border);
          background: rgba(248, 250, 247, 0.86);
          backdrop-filter: blur(18px);
        }
        .jumbotron {
          width: min(1180px, calc(100% - 32px));
          margin: 0 auto;
          padding: 14px 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
        }
        .jumbotron_title {
          margin: 0;
          color: var(--color-ink);
          font-size: 1.08rem;
          font-weight: 800;
          display: flex;
          align-items: center;
          gap: 10px;
          letter-spacing: 0;
          white-space: nowrap;
        }
        .brand-mark {
          width: 38px;
          height: 38px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: var(--color-accent);
          border-radius: 12px;
          background: var(--color-accent-soft);
          border: 1px solid rgba(64, 125, 104, 0.18);
        }
        svg {
          width: 20px;
          height: 20px;
          fill: none;
          stroke: currentColor;
          stroke-width: 2;
          stroke-linecap: round;
          stroke-linejoin: round;
        }
        @media (max-width: 760px) {
          .jumbotron {
            width: min(100% - 24px, 1180px);
          }
        }
      </style>
      <header class="jumbotron">
        <h1 class="jumbotron_title"><span class="brand-mark">${icon('brandMark')}</span>KataNote</h1>
        <custom-nav></custom-nav>
      </header>
    `;

    const templateElement = document.createElement("template");
    templateElement.innerHTML = template;

    shadow.appendChild(templateElement.content.cloneNode(true));
  }
}

customElements.define("custom-header", CustomHeader);
