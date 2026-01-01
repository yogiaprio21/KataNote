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
          padding: 25px 0;
          background-color: #f1f1f1;
          margin-top: 50px;
          border-top: 1px solid #ddd;
        }
        p {
          margin: 0;
          font-weight: 500;
          font-size: 1rem;
          color: #555;
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