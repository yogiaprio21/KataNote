class CustomFooter extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });

    const template = `
      <style>
        :host {
          display: block;
          width: 100%;
          text-align: center;
          padding: 32px 16px;
          box-sizing: border-box;
          background-color: transparent;
          border-top: 1px solid var(--color-border);
        }
        p {
          margin: 0;
          font-weight: 700;
          font-size: 0.92rem;
          color: var(--color-soft-text);
        }
      </style>
      <p>${this.innerHTML}</p>
    `;

    const templateElement = document.createElement("template");
    templateElement.innerHTML = template;

    shadow.appendChild(templateElement.content.cloneNode(true));
  }
}

customElements.define("custom-footer", CustomFooter);
