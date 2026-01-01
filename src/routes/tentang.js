class TentangKataNote extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
        <style>
          .about-container {
            margin: 40px auto;
            padding: 40px;
            max-width: 800px;
            font-family: 'Figtree', sans-serif;
            background-color: #ffffff;
            border-radius: 12px;
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }

          .about-container:hover {
            transform: translateY(-5px);
            box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
          }

          h1 {
            text-align: center;
            font-size: 2.8em;
            margin-bottom: 30px;
            color: #2c3e50;
            font-weight: 700;
          }

          p {
            font-size: 1.2em;
            line-height: 1.8;
            margin-bottom: 25px;
            color: #34495e;
            text-align: justify;
          }

          ul {
            list-style-type: none;
            padding-left: 0;
            margin-bottom: 25px;
          }

          li {
            font-size: 1.1em;
            margin-bottom: 15px;
            line-height: 1.6;
            display: flex;
            align-items: center;
          }

          li::before {
            content: '✔';
            color: #27ae60;
            font-size: 1.5em;
            margin-right: 15px;
          }

          .highlight {
            font-weight: 600;
            color: #2980b9;
          }

          @media (max-width: 768px) {
            .about-container {
              padding: 20px;
              margin: 20px auto;
            }

            h1 {
              font-size: 2.2em;
            }

            p, li {
              font-size: 1em;
            }
          }
        </style>
        <div class="about-container">
          <h1>Tentang KataNote</h1>
          <p>KataNote adalah sebuah platform catatan daring yang dirancang untuk membantu Anda mengatur dan menyimpan catatan penting dengan mudah dan efisien. Kami menyediakan berbagai fitur yang memudahkan Anda untuk membuat, menyunting, mengarsipkan, dan menghapus catatan, sehingga Anda dapat dengan mudah mengelola informasi yang penting bagi Anda.</p>
          <p>KataNote dirancang dengan antarmuka yang sederhana dan intuitif, memungkinkan pengguna dari berbagai latar belakang untuk menggunakannya tanpa kesulitan. Baik Anda seorang pelajar, profesional, atau siapa pun yang membutuhkan tempat untuk menyimpan catatan, KataNote adalah solusi yang sempurna.</p>
          <p>Beberapa fitur utama dari KataNote termasuk:</p>
          <ul>
            <li><span class="highlight">Pembuatan Catatan:</span> Buat catatan baru dengan mudah menggunakan editor yang ramah pengguna.</li>
            <li><span class="highlight">Pencarian:</span> Temukan catatan Anda dengan cepat menggunakan fitur pencarian yang canggih.</li>
            <li><span class="highlight">Pengarsipan:</span> Arsipkan catatan yang sudah tidak aktif tetapi ingin tetap disimpan.</li>
            <li><span class="highlight">Penghapusan:</span> Hapus catatan yang tidak diperlukan lagi dengan mudah.</li>
          </ul>
          <p>Kami berkomitmen untuk terus meningkatkan KataNote dengan menambahkan fitur-fitur baru yang dapat meningkatkan pengalaman pengguna. Jika Anda memiliki masukan atau saran, jangan ragu untuk menghubungi kami.</p>
          <p>Terima kasih telah menggunakan KataNote!</p>
        </div>
      `;
  }
}

customElements.define('tentang-katanote', TentangKataNote);

const renderTentangKataNote = () => {
  document.getElementById('app').innerHTML = '<tentang-katanote></tentang-katanote>';
};

export default renderTentangKataNote;