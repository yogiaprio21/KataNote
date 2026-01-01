import Swal from 'sweetalert2';

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
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background-color: #f0f2f5;
          font-family: 'Figtree', sans-serif;
        }

        .login-container {
          background: #ffffff;
          padding: 40px;
          border-radius: 12px;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
          width: 100%;
          max-width: 400px;
          text-align: center;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .login-container:hover {
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

        #login-form {
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
      <div class="login-container">
        <h1>Login to Your Account</h1>
        <p>Enter your email and password to login.</p>
        <form id="login-form">
          <div class="input-group">
            <input type="text" id="username" name="username" placeholder="Email or Username" required>
          </div>
          <div class="input-group">
            <input type="password" id="password" name="password" placeholder="Password" required>
          </div>
          <button type="submit">Login</button>
        </form>
        <p>Don't have an Account? <a href="/register" data-link>Register</a></p>
      </div>
    `;
  }

  addEventListeners() {
    const form = this.shadowRoot.querySelector('#login-form');
    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const username = this.shadowRoot.querySelector('#username').value.trim();
      const password = this.shadowRoot.querySelector('#password').value.trim();

      if (!username || !password) {
        Swal.fire({
          icon: 'error',
          title: 'Login Failed!',
          text: 'Please enter both username and password!',
        });
        return;
      }

      const storedUser = JSON.parse(localStorage.getItem('user'));

      if (
        storedUser &&
        (storedUser.username === username || storedUser.email === username) &&
        storedUser.password === password
      ) {
        Swal.fire({
          icon: 'success',
          title: 'Login Successful!',
          text: 'You have successfully logged in!',
          timer: 2000,
          showConfirmButton: false,
        }).then(() => {
          window.location.hash = '/home';
          // Dispatch a popstate event to trigger the router
          window.dispatchEvent(new PopStateEvent('popstate'));
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Login Failed!',
          text: 'Invalid email/username or password!',
        });
      }
    });
  }
}

customElements.define('login-component', LoginComponent);

const renderLogin = () => {
  document.getElementById('app').innerHTML = '<login-component></login-component>';
};

export default renderLogin;