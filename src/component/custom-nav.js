class CustomNav extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css">
      <style>
        .menu {
          position: fixed;
          top: 0;
          left: -250px; /* Increased width */
          width: 250px; /* Increased width */
          height: 100%;
          background-color: #f8f9fa; /* Lighter background */
          box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
          transition: left 0.3s ease-in-out;
          z-index: 1000;
        }
        .menu.open {
          left: 0;
        }
        .menu ul {
          list-style: none;
          padding: 20px 0;
          margin: 0;
        }
        .menu a {
          display: flex;
          align-items: center;
          gap: 15px; /* Space between icon and text */
          padding: 15px 20px;
          text-decoration: none;
          font-weight: 500;
          font-size: 1.1rem;
          color: #333;
          transition: background-color 0.3s, color 0.3s;
        }
        .menu a i {
          width: 24px;
          text-align: center;
          color: #7F9F80; /* Icon color */
        }
        .menu a:hover, .menu a:focus {
          background-color: #A8D5BA; /* Hover color */
          color: #000;
        }
        .menu-toggle {
          position: fixed;
          top: 20px;
          left: 20px;
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          background: #fff;
          border: 1px solid #ccc;
          border-radius: 50%; /* Circular toggle */
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          z-index: 1100;
          font-size: 1.5rem;
        }
        .menu-toggle.hidden {
          display: none;
        }
        .overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.3s;
          z-index: 999;
        }
        .overlay.open {
          opacity: 1;
          visibility: visible;
        }

        @media (min-width: 768px) {
          .menu {
            position: static;
            width: 100%;
            height: auto;
            box-shadow: none;
            background-color: transparent;
            display: flex;
            justify-content: center;
            margin-bottom: 20px;
          }
          .menu ul {
            display: flex;
            padding: 0;
            gap: 10px;
          }
           .menu a {
            padding: 10px 20px;
            border-radius: 8px;
          }
          .menu-toggle, .overlay {
            display: none;
          }
        }
      </style>
      <div class="overlay"></div>
      <div class="menu">
        <ul>
          <li><a href="/home" data-link><i class="fa-solid fa-house"></i>Home</a></li>
          <li><a href="/archived" data-link><i class="fa-solid fa-box-archive"></i>Arsip</a></li>
          <li><a href="/login" data-link><i class="fa-solid fa-right-to-bracket"></i>Login</a></li>
          <li><a href="/register" data-link><i class="fa-solid fa-user-plus"></i>Register</a></li>
          <li><a href="/about-us" data-link><i class="fa-solid fa-users"></i>About Us</a></li>
          <li><a href="/tentang" data-link><i class="fa-solid fa-circle-info"></i>Tentang</a></li>
        </ul>
      </div>
      <div class="menu-toggle">☰</div>
    `;

    this.toggleMenu = this.toggleMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }

  connectedCallback() {
    this.shadowRoot.querySelector('.menu-toggle').addEventListener('click', this.toggleMenu);
    this.shadowRoot.querySelector('.overlay').addEventListener('click', this.closeMenu);
    window.addEventListener('scroll', this.handleScroll);
  }

  disconnectedCallback() {
    this.shadowRoot.querySelector('.menu-toggle').removeEventListener('click', this.toggleMenu);
    this.shadowRoot.querySelector('.overlay').removeEventListener('click', this.closeMenu);
    window.removeEventListener('scroll', this.handleScroll);
  }

  toggleMenu() {
    const menu = this.shadowRoot.querySelector('.menu');
    const overlay = this.shadowRoot.querySelector('.overlay');
    const toggleButton = this.shadowRoot.querySelector('.menu-toggle');
    menu.classList.toggle('open');
    overlay.classList.toggle('open');
    toggleButton.classList.toggle('hidden');
  }

  closeMenu() {
    const menu = this.shadowRoot.querySelector('.menu');
    const overlay = this.shadowRoot.querySelector('.overlay');
    const toggleButton = this.shadowRoot.querySelector('.menu-toggle');
    menu.classList.remove('open');
    overlay.classList.remove('open');
    toggleButton.classList.remove('hidden');
  }

  handleScroll() {
    const toggleButton = this.shadowRoot.querySelector('.menu-toggle');
    if (window.scrollY > 100) {
      toggleButton.classList.add('hidden');
    } else {
      toggleButton.classList.remove('hidden');
    }
  }
}

customElements.define('custom-nav', CustomNav);
