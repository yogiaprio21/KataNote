import Swal from 'sweetalert2';
import { icon } from '../component/icons.js';
import { loginUser } from '../script/auth.js';
import { navigateTo } from '../script/routes.js';

class LoginComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.addEventListeners();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          min-height: 100vh;
          display: grid;
          place-items: center;
          padding: 32px 16px;
          box-sizing: border-box;
          font-family: var(--font-family);
          background: var(--color-bg);
        }
        .auth-shell {
          width: min(100%, 980px);
          display: grid;
          grid-template-columns: 0.95fr 1.05fr;
          overflow: hidden;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-xl);
          background: var(--color-surface);
          box-shadow: var(--shadow-lg);
        }
        .auth-panel {
          padding: clamp(28px, 5vw, 56px);
          background: linear-gradient(145deg, #23483b, #407d68);
          color: #f8fff8;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 42px;
        }
        .brand {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-weight: 900;
          font-size: 1.05rem;
        }
        .brand-mark,
        .feature-icon,
        .input-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .brand-mark {
          width: 40px;
          height: 40px;
          border-radius: 14px;
          color: #23483b;
          background: #f8fff8;
        }
        .auth-panel h1 {
          margin: 0 0 16px;
          max-width: 11ch;
          font-size: clamp(2.2rem, 5vw, 4rem);
          line-height: 0.98;
          letter-spacing: 0;
        }
        .auth-panel p {
          margin: 0;
          color: rgba(248, 255, 248, 0.78);
          line-height: 1.7;
        }
        .feature-list {
          display: grid;
          gap: 14px;
        }
        .feature-item {
          display: flex;
          align-items: center;
          gap: 12px;
          color: rgba(248, 255, 248, 0.9);
          font-weight: 700;
        }
        .feature-icon {
          width: 34px;
          height: 34px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.14);
        }
        .auth-card {
          padding: clamp(28px, 5vw, 56px);
          display: grid;
          align-content: center;
        }
        .auth-card h2 {
          margin: 0 0 8px;
          color: var(--color-ink);
          font-size: clamp(1.7rem, 4vw, 2.35rem);
          line-height: 1.1;
          letter-spacing: 0;
        }
        .auth-card > p {
          margin: 0 0 28px;
          color: var(--color-muted);
          line-height: 1.7;
        }
        form {
          display: grid;
          gap: 18px;
        }
        .input-group {
          display: grid;
          gap: 8px;
        }
        label {
          color: var(--color-ink);
          font-weight: 800;
          font-size: 0.9rem;
        }
        .input-wrapper {
          position: relative;
        }
        .input-icon {
          position: absolute;
          left: 15px;
          top: 50%;
          width: 18px;
          height: 18px;
          color: var(--color-soft-text);
          transform: translateY(-50%);
        }
        input {
          width: 100%;
          min-height: 50px;
          padding: 0 48px 0 46px;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          box-sizing: border-box;
          color: var(--color-ink);
          background: #fff;
          font: 650 0.95rem/1 var(--font-family);
          transition: border-color 160ms ease, box-shadow 160ms ease;
        }
        input:focus {
          outline: none;
          border-color: var(--color-accent);
          box-shadow: 0 0 0 4px var(--color-focus);
        }
        input[aria-invalid="true"] {
          border-color: var(--color-danger);
        }
        .toggle-password {
          position: absolute;
          right: 8px;
          top: 50%;
          width: 36px;
          height: 36px;
          border: 0;
          border-radius: 10px;
          color: var(--color-muted);
          background: transparent;
          cursor: pointer;
          transform: translateY(-50%);
        }
        .field-error {
          min-height: 18px;
          margin: 0;
          color: var(--color-danger);
          font-size: 0.82rem;
          font-weight: 700;
        }
        .primary-button {
          min-height: 50px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          border: 0;
          border-radius: var(--radius-md);
          color: var(--color-on-accent);
          background: var(--color-accent);
          font: 900 0.96rem/1 var(--font-family);
          cursor: pointer;
          transition: transform 160ms ease, box-shadow 160ms ease, background 160ms ease;
        }
        .primary-button:hover,
        .primary-button:focus-visible {
          outline: none;
          transform: translateY(-2px);
          box-shadow: var(--shadow-xs);
        }
        .auth-switch {
          margin: 22px 0 0;
          color: var(--color-muted);
          font-weight: 650;
        }
        a {
          color: var(--color-accent);
          font-weight: 900;
          text-decoration: none;
        }
        a:hover,
        a:focus-visible {
          text-decoration: underline;
          outline: none;
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
        .brand-mark svg {
          width: 22px;
          height: 22px;
        }
        @media (max-width: 760px) {
          .auth-shell {
            grid-template-columns: 1fr;
          }
          .auth-panel {
            gap: 24px;
          }
          .auth-panel h1 {
            max-width: none;
          }
        }
      </style>
      <section class="auth-shell">
        <aside class="auth-panel">
          <div class="brand"><span class="brand-mark">${icon('bookOpen')}</span>KataNote</div>
          <div>
            <h1>Masuk ke ruang catatan.</h1>
            <p>Kelola ide aktif, arsip lama, dan referensi penting dari satu pengalaman yang lebih bersih.</p>
          </div>
          <div class="feature-list">
            <span class="feature-item"><span class="feature-icon">${icon('search')}</span>Pencarian cepat</span>
            <span class="feature-item"><span class="feature-icon">${icon('archive')}</span>Arsip tertata</span>
            <span class="feature-item"><span class="feature-icon">${icon('check')}</span>Validasi jelas</span>
          </div>
        </aside>
        <div class="auth-card">
          <h2>Selamat datang kembali</h2>
          <p>Gunakan email dan password akun demo yang sudah Anda daftarkan.</p>
          <form id="login-form" novalidate>
            <div class="input-group">
              <label for="username">Email atau username</label>
              <div class="input-wrapper">
                <span class="input-icon">${icon('mail')}</span>
                <input type="text" id="username" name="username" placeholder="nama@email.com" autocomplete="username" aria-describedby="username-error" required>
              </div>
              <p class="field-error" id="username-error"></p>
            </div>
            <div class="input-group">
              <label for="password">Password</label>
              <div class="input-wrapper">
                <span class="input-icon">${icon('lock')}</span>
                <input type="password" id="password" name="password" placeholder="Minimal 8 karakter" autocomplete="current-password" aria-describedby="password-error" required>
                <button class="toggle-password" type="button" aria-label="Tampilkan password">${icon('eye')}</button>
              </div>
              <p class="field-error" id="password-error"></p>
            </div>
            <button class="primary-button" type="submit">${icon('logIn')}Masuk</button>
          </form>
          <p class="auth-switch">Belum punya akun? <a href="/register" data-link>Daftar sekarang</a></p>
        </div>
      </section>
    `;
  }

  addEventListeners() {
    const form = this.shadowRoot.querySelector('#login-form');
    const usernameInput = this.shadowRoot.querySelector('#username');
    const passwordInput = this.shadowRoot.querySelector('#password');
    const usernameError = this.shadowRoot.querySelector('#username-error');
    const passwordError = this.shadowRoot.querySelector('#password-error');
    const togglePassword = this.shadowRoot.querySelector('.toggle-password');

    togglePassword.addEventListener('click', () => {
      const isPassword = passwordInput.type === 'password';
      passwordInput.type = isPassword ? 'text' : 'password';
      togglePassword.innerHTML = isPassword ? icon('eyeOff') : icon('eye');
      togglePassword.setAttribute('aria-label', isPassword ? 'Sembunyikan password' : 'Tampilkan password');
    });

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      usernameError.textContent = '';
      passwordError.textContent = '';
      usernameInput.removeAttribute('aria-invalid');
      passwordInput.removeAttribute('aria-invalid');

      const username = usernameInput.value.trim();
      const password = passwordInput.value.trim();
      let isValid = true;

      if (!username) {
        usernameError.textContent = 'Email atau username wajib diisi.';
        usernameInput.setAttribute('aria-invalid', 'true');
        isValid = false;
      }

      if (!password) {
        passwordError.textContent = 'Password wajib diisi.';
        passwordInput.setAttribute('aria-invalid', 'true');
        isValid = false;
      }

      if (!isValid) return;

      const user = loginUser(username, password);
      if (user) {
        await Swal.fire({
          icon: 'success',
          title: 'Berhasil masuk',
          text: 'Selamat mengelola catatan Anda.',
          timer: 1300,
          showConfirmButton: false,
        });
        navigateTo('/home', { replace: true });
        return;
      }

      await Swal.fire({
        icon: 'error',
        title: 'Login gagal',
        text: 'Email/username atau password tidak sesuai.',
        confirmButtonColor: '#23483b',
      });
    });
  }
}

customElements.define('login-component', LoginComponent);

const renderLogin = () => {
  document.getElementById('app').innerHTML = '<login-component></login-component>';
};

export default renderLogin;
