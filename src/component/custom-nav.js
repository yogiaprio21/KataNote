import Swal from 'sweetalert2';
import { icon } from './icons.js';
import { getSession, isAuthenticated, logoutUser } from '../script/auth.js';

const navItems = [
  { href: '/home', label: 'Catatan', icon: 'home', authOnly: true },
  { href: '/archived', label: 'Arsip', icon: 'archive', authOnly: true },
  { href: '/tentang', label: 'Tentang', icon: 'info' },
  { href: '/about-us', label: 'Pembuat', icon: 'users' },
  { href: '/login', label: 'Masuk', icon: 'logIn', guestOnly: true },
  { href: '/register', label: 'Daftar', icon: 'userPlus', guestOnly: true },
];

class CustomNav extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.toggleMenu = this.toggleMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.handleKeydown = this.handleKeydown.bind(this);
    this.handleAuthChange = this.handleAuthChange.bind(this);
  }

  connectedCallback() {
    this.render();
    window.addEventListener('keydown', this.handleKeydown);
    window.addEventListener('auth-changed', this.handleAuthChange);
    window.addEventListener('popstate', this.handleAuthChange);
  }

  disconnectedCallback() {
    window.removeEventListener('keydown', this.handleKeydown);
    window.removeEventListener('auth-changed', this.handleAuthChange);
    window.removeEventListener('popstate', this.handleAuthChange);
  }

  handleAuthChange() {
    this.render();
  }

  get visibleItems() {
    const loggedIn = isAuthenticated();
    return navItems.filter((item) => {
      if (item.authOnly) return loggedIn;
      if (item.guestOnly) return !loggedIn;
      return true;
    });
  }

  render() {
    const loggedIn = isAuthenticated();
    const session = getSession();
    const pathname = window.location.pathname;
    const items = this.visibleItems.map((item) => `
      <li>
        <a href="${item.href}" data-link class="${pathname === item.href ? 'active' : ''}" aria-current="${pathname === item.href ? 'page' : 'false'}">
          <span class="nav-icon">${icon(item.icon)}</span>
          <span>${item.label}</span>
        </a>
      </li>
    `).join('');

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }
        .menu {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        ul {
          display: flex;
          align-items: center;
          gap: 4px;
          list-style: none;
          padding: 0;
          margin: 0;
        }
        a,
        button {
          min-height: 40px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          border: 0;
          border-radius: 12px;
          padding: 0 14px;
          font: 700 0.92rem/1 var(--font-family);
          color: var(--color-muted);
          background: transparent;
          text-decoration: none;
          cursor: pointer;
          transition: color 180ms ease, background 180ms ease, box-shadow 180ms ease;
        }
        a:hover,
        a:focus-visible,
        button:hover,
        button:focus-visible,
        a.active {
          color: var(--color-ink);
          background: var(--color-surface);
          box-shadow: inset 0 0 0 1px var(--color-border);
          outline: none;
        }
        a.active {
          color: var(--color-accent);
        }
        .nav-icon,
        .button-icon {
          width: 18px;
          height: 18px;
          display: inline-flex;
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
        .session {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          padding-left: 12px;
          border-left: 1px solid var(--color-border);
        }
        .avatar {
          width: 34px;
          height: 34px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          color: var(--color-accent);
          background: var(--color-accent-soft);
          font-weight: 800;
        }
        .menu-toggle,
        .overlay {
          display: none;
        }
        @media (max-width: 760px) {
          .menu-toggle {
            min-width: 42px;
            min-height: 42px;
            display: inline-flex;
            padding: 0;
            border: 1px solid var(--color-border);
            background: var(--color-surface);
          }
          .overlay {
            position: fixed;
            inset: 0;
            display: block;
            opacity: 0;
            visibility: hidden;
            background: rgba(10, 20, 16, 0.4);
            transition: opacity 180ms ease, visibility 180ms ease;
            z-index: 990;
          }
          .overlay.open {
            opacity: 1;
            visibility: visible;
          }
          .menu {
            position: fixed;
            top: 0;
            right: 0;
            width: min(86vw, 330px);
            height: 100vh;
            padding: 22px;
            box-sizing: border-box;
            flex-direction: column;
            align-items: stretch;
            justify-content: flex-start;
            background: var(--color-surface);
            box-shadow: -20px 0 60px rgba(23, 47, 38, 0.18);
            transform: translateX(110%);
            transition: transform 220ms ease;
            z-index: 1000;
          }
          .menu.open {
            transform: translateX(0);
          }
          ul {
            width: 100%;
            flex-direction: column;
            align-items: stretch;
            gap: 8px;
            margin-top: 42px;
          }
          a,
          button {
            width: 100%;
            justify-content: flex-start;
            padding: 0 14px;
          }
          .session {
            width: 100%;
            margin-top: auto;
            padding: 16px 0 0;
            border-left: 0;
            border-top: 1px solid var(--color-border);
            flex-direction: column;
            align-items: stretch;
          }
          .session-user {
            display: flex;
            align-items: center;
            gap: 10px;
          }
        }
      </style>
      <button class="menu-toggle" type="button" aria-label="Buka navigasi" aria-expanded="false">${icon('menu')}</button>
      <div class="overlay" aria-hidden="true"></div>
      <nav class="menu" aria-label="Navigasi utama">
        <ul>${items}</ul>
        ${loggedIn ? `
          <div class="session">
            <span class="session-user">
              <span class="avatar">${(session?.name || 'U').slice(0, 1).toUpperCase()}</span>
            </span>
            <button class="logout-button" type="button">
              <span class="button-icon">${icon('logOut')}</span>
              Keluar
            </button>
          </div>
        ` : ''}
      </nav>
    `;

    this.shadowRoot.querySelector('.menu-toggle')?.addEventListener('click', this.toggleMenu);
    this.shadowRoot.querySelector('.overlay')?.addEventListener('click', this.closeMenu);
    this.shadowRoot.querySelectorAll('a[data-link]').forEach((link) => {
      link.addEventListener('click', () => this.closeMenu());
    });
    this.shadowRoot.querySelector('.logout-button')?.addEventListener('click', () => this.handleLogout());
  }

  toggleMenu() {
    const menu = this.shadowRoot.querySelector('.menu');
    const overlay = this.shadowRoot.querySelector('.overlay');
    const toggleButton = this.shadowRoot.querySelector('.menu-toggle');
    const isOpen = menu.classList.toggle('open');
    overlay.classList.toggle('open', isOpen);
    toggleButton.setAttribute('aria-expanded', String(isOpen));
  }

  closeMenu() {
    const menu = this.shadowRoot.querySelector('.menu');
    const overlay = this.shadowRoot.querySelector('.overlay');
    const toggleButton = this.shadowRoot.querySelector('.menu-toggle');
    menu?.classList.remove('open');
    overlay?.classList.remove('open');
    toggleButton?.setAttribute('aria-expanded', 'false');
  }

  handleKeydown(event) {
    if (event.key === 'Escape') {
      this.closeMenu();
    }
  }

  async handleLogout() {
    const result = await Swal.fire({
      title: 'Keluar dari KataNote?',
      text: 'Anda bisa masuk lagi kapan saja dengan akun demo yang sudah dibuat.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Keluar',
      cancelButtonText: 'Batal',
      confirmButtonColor: '#23483b',
    });

    if (result.isConfirmed) {
      logoutUser();
      this.closeMenu();
      window.dispatchEvent(new CustomEvent('app:navigate', {
        detail: { path: '/login', options: { replace: true } },
      }));
    }
  }
}

customElements.define('custom-nav', CustomNav);
