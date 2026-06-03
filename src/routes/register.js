import Swal from 'sweetalert2';
import { icon } from '../component/icons.js';
import { registerUser } from '../script/auth.js';
import { navigateTo } from '../script/routes.js';

class RegisterComponent extends HTMLElement {
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
          grid-template-columns: 1.05fr 0.95fr;
          overflow: hidden;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-xl);
          background: var(--color-surface);
          box-shadow: var(--shadow-lg);
        }
        .auth-card,
        .auth-panel {
          padding: clamp(28px, 5vw, 56px);
        }
        .auth-card {
          display: grid;
          align-content: center;
        }
        .auth-card h1 {
          margin: 0 0 8px;
          color: var(--color-ink);
          font-size: clamp(1.8rem, 4vw, 2.55rem);
          line-height: 1.08;
          letter-spacing: 0;
        }
        .auth-card > p {
          margin: 0 0 28px;
          color: var(--color-muted);
          line-height: 1.7;
        }
        .auth-panel {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 36px;
          color: var(--color-ink);
          background:
            linear-gradient(135deg, rgba(64, 125, 104, 0.12), rgba(180, 119, 40, 0.1)),
            #f4f7f2;
        }
        .brand {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-weight: 900;
        }
        .brand-mark,
        .input-icon,
        .point-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .brand-mark {
          width: 40px;
          height: 40px;
          border-radius: 14px;
          color: var(--color-accent);
          background: var(--color-surface);
          border: 1px solid var(--color-border);
        }
        .auth-panel h2 {
          margin: 0 0 16px;
          font-size: clamp(2rem, 5vw, 3.6rem);
          line-height: 1;
          letter-spacing: 0;
        }
        .auth-panel p {
          margin: 0;
          color: var(--color-muted);
          line-height: 1.75;
        }
        .points {
          display: grid;
          gap: 14px;
        }
        .point {
          display: flex;
          gap: 12px;
          align-items: flex-start;
          font-weight: 750;
          color: var(--color-ink);
        }
        .point-icon {
          width: 34px;
          height: 34px;
          flex: 0 0 auto;
          border-radius: 12px;
          color: var(--color-accent);
          background: var(--color-accent-soft);
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
          transition: transform 160ms ease, box-shadow 160ms ease;
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
        .demo-note {
          margin-top: 18px;
          padding: 14px;
          border-radius: var(--radius-md);
          color: var(--color-muted);
          background: #f7f5ee;
          font-size: 0.86rem;
          line-height: 1.6;
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
            order: -1;
          }
        }
      </style>
      <section class="auth-shell">
        <div class="auth-card">
          <h1>Buat akun demo</h1>
          <p>Simpan identitas lokal untuk membuka pengalaman aplikasi catatan yang sudah dipoles.</p>
          <form id="register-form" novalidate>
            <div class="input-group">
              <label for="email">Email</label>
              <div class="input-wrapper">
                <span class="input-icon">${icon('mail')}</span>
                <input type="email" id="email" name="email" placeholder="nama@email.com" autocomplete="email" aria-describedby="email-error" required>
              </div>
              <p class="field-error" id="email-error"></p>
            </div>
            <div class="input-group">
              <label for="password">Password</label>
              <div class="input-wrapper">
                <span class="input-icon">${icon('lock')}</span>
                <input type="password" id="password" name="password" placeholder="Minimal 8 karakter" autocomplete="new-password" aria-describedby="password-error" required>
                <button class="toggle-password" type="button" aria-label="Tampilkan password">${icon('eye')}</button>
              </div>
              <p class="field-error" id="password-error"></p>
            </div>
            <button class="primary-button" type="submit">${icon('userPlus')}Daftar</button>
          </form>
          <p class="demo-note">Catatan portfolio: akun ini hanya untuk demo client-side. Password tidak disimpan sebagai teks mentah, tetapi produksi nyata tetap membutuhkan backend auth.</p>
          <p class="auth-switch">Sudah punya akun? <a href="/login" data-link>Masuk</a></p>
        </div>
        <aside class="auth-panel">
          <div class="brand"><span class="brand-mark">${icon('bookOpen')}</span>KataNote</div>
          <div>
            <h2>Mulai dengan alur yang rapi.</h2>
            <p>Register menjadi pintu masuk yang terasa niat: validasi jelas, kontrol terlihat, dan responsif untuk layar kecil.</p>
          </div>
          <div class="points">
            <span class="point"><span class="point-icon">${icon('check')}</span>Email tervalidasi langsung dari browser.</span>
            <span class="point"><span class="point-icon">${icon('eye')}</span>Password bisa ditampilkan saat dibutuhkan.</span>
            <span class="point"><span class="point-icon">${icon('sparkles')}</span>Visual konsisten dengan halaman aplikasi.</span>
          </div>
        </aside>
      </section>
    `;
  }

  addEventListeners() {
    const form = this.shadowRoot.querySelector('#register-form');
    const emailInput = this.shadowRoot.querySelector('#email');
    const passwordInput = this.shadowRoot.querySelector('#password');
    const emailError = this.shadowRoot.querySelector('#email-error');
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
      const isValid = validateRegister(emailInput, passwordInput, emailError, passwordError);
      if (!isValid) return;

      registerUser({
        email: emailInput.value.trim(),
        password: passwordInput.value.trim(),
      });

      await Swal.fire({
        icon: 'success',
        title: 'Akun demo dibuat',
        text: 'Silakan masuk untuk mulai memakai KataNote.',
        timer: 1400,
        showConfirmButton: false,
      });
      navigateTo('/login', { replace: true });
    });
  }
}

function validateRegister(emailInput, passwordInput, emailError, passwordError) {
  let isValid = true;
  emailError.textContent = '';
  passwordError.textContent = '';
  emailInput.removeAttribute('aria-invalid');
  passwordInput.removeAttribute('aria-invalid');

  if (!emailInput.validity.valid) {
    emailError.textContent = 'Masukkan alamat email yang valid.';
    emailInput.setAttribute('aria-invalid', 'true');
    isValid = false;
  }

  if (passwordInput.value.trim().length < 8) {
    passwordError.textContent = 'Password minimal 8 karakter.';
    passwordInput.setAttribute('aria-invalid', 'true');
    isValid = false;
  }

  return isValid;
}

customElements.define('register-component', RegisterComponent);

const renderRegister = () => {
  document.getElementById('app').innerHTML = '<register-component></register-component>';
};

export default renderRegister;
