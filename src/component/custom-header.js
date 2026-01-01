class CustomHeader extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });

    const template = `
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css"/>
      <style>
        .jumbotron {
          padding: 20px;
        }
        .jumbotron_title {
          text-align: center;
          margin-bottom: 20px;
          color: #333;
          font-size: 3rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 15px;
        }
      </style>
      <header class="jumbotron">
        <h1 class="jumbotron_title"><i class="fa-solid fa-note-sticky"></i>Kata Note</h1>
        <custom-nav></custom-nav>
      </header>
    `;

    const templateElement = document.createElement("template");
    templateElement.innerHTML = template;

    shadow.appendChild(templateElement.content.cloneNode(true));
  }
}

customElements.define("custom-header", CustomHeader);