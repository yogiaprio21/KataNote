import Swal from 'sweetalert2';

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
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background-color: #f0f2f5;
          font-family: 'Figtree', sans-serif;
        }

        .register-container {
          background: #ffffff;
          padding: 40px;
          border-radius: 12px;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
          width: 100%;
          max-width: 400px;
          text-align: center;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .register-container:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
        }

        h1 {
          margin-bottom: 10px;
          font-size: 28px;
          color: #333;
          font-weight: 700;
        }

        p {
          margin-bottom: 30px;
          color: #666;
        }

        #register-form {
          display: flex;
          flex-direction: column;
        }

        .input-group {
          position: relative;
          margin-bottom: 20px;
        }

        input {
          width: 100%;
          padding: 15px;
          border: 1px solid #ccc;
          border-radius: 8px;
          font-size: 16px;
          box-sizing: border-box;
          transition: border-color 0.3s ease;
        }

        input:focus {
          outline: none;
          border-color: #7f9f80;
        }

        .error-message {
          color: #e74c3c;
          font-size: 12px;
          text-align: left;
          margin-top: 5px;
          display: none;
        }

        button {
          padding: 15px;
          background-color: #7f9f80;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 16px;
          font-weight: 600;
          transition: background-color 0.3s ease;
        }

        button:hover {
          background-color: #6a8a6b;
        }

        a[data-link] {
          color: #7f9f80;
          text-decoration: none;
          font-weight: 600;
        }

        a[data-link]:hover {
          text-decoration: underline;
        }
      </style>
      <div class="register-container">
        <h1>Create an Account</h1>
        <p>Fill in the details below to register.</p>
        <form id="register-form">
          <div class="input-group">
            <input type="email" id="email" name="email" placeholder="Email" required>
            <div class="error-message" id="email-error">Please enter a valid email address.</div>
          </div>
          <div class="input-group">
            <input type="password" id="password" name="password" placeholder="Password" required>
            <div class="error-message" id="password-error">Password must be at least 8 characters long.</div>
          </div>
          <button type="submit">Register</button>
        </form>
        <p>Already have an Account? <a href="/login" data-link>Login</a></p>
      </div>
    `;
  }

  addEventListeners() {
    const form = this.shadowRoot.querySelector('#register-form');
    const emailInput = this.shadowRoot.querySelector('#email');
    const passwordInput = this.shadowRoot.querySelector('#password');
    const emailError = this.shadowRoot.querySelector('#email-error');
    const passwordError = this.shadowRoot.querySelector('#password-error');

    const validateEmail = () => {
      if (emailInput.validity.valid) {
        emailError.style.display = 'none';
      } else {
        emailError.style.display = 'block';
      }
    };

    const validatePassword = () => {
      if (passwordInput.value.length >= 8) {
        passwordError.style.display = 'none';
      } else {
        passwordError.style.display = 'block';
      }
    };

    emailInput.addEventListener('input', validateEmail);
    passwordInput.addEventListener('input', validatePassword);

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      validateEmail();
      validatePassword();

      const email = emailInput.value.trim();
      const password = passwordInput.value.trim();

      if (emailInput.validity.valid && password.length >= 8) {
        // Note: Storing passwords in localStorage is insecure.
        // This is for demonstration purposes only in a client-side application.
        // In a real-world application, you should hash passwords on the server.
        localStorage.setItem('user', JSON.stringify({ email, password }));

        Swal.fire({
          icon: 'success',
          title: 'Registration Successful!',
          text: 'You have been registered successfully!',
          timer: 2000,
          showConfirmButton: false,
        }).then(() => {
          window.location.hash = '/login';
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Registration Failed',
          text: 'Please correct the errors and try again.',
        });
      }
    });
  }
}

customElements.define('register-component', RegisterComponent);

const renderRegister = () => {
  document.getElementById('app').innerHTML = '<register-component></register-component>';
};

export default renderRegister;