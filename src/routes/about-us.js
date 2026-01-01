class AboutUsComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <style>
        :host {
          display: block;
          font-family: "Figtree", sans-serif;
          background-color: #f0f2f5;
          padding: 2rem;
        }

        .container {
          max-width: 900px;
          margin: 0 auto;
          background-color: #ffffff;
          border-radius: 12px;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
          padding: 2rem;
        }

        .profile {
          display: flex;
          align-items: center;
          border-bottom: 1px solid #e2e8f0;
          padding-bottom: 2rem;
          margin-bottom: 2rem;
        }

        .profile-pic {
          border-radius: 50%;
          width: 120px;
          height: 120px;
          margin-right: 2rem;
          object-fit: cover;
          border: 4px solid #7f9f80;
        }

        .profile-info .name {
          font-size: 2rem;
          font-weight: 700;
          color: #2c3e50;
          margin: 0;
        }

        .profile-info .job-title {
          font-size: 1.1rem;
          color: #7f8c8d;
          margin-top: 0.5rem;
        }

        .section-title {
          font-size: 1.8rem;
          font-weight: 700;
          color: #2c3e50;
          margin: 2rem 0 1.5rem;
          border-bottom: 2px solid #7f9f80;
          padding-bottom: 0.5rem;
        }

        .contact-info, .experience-item {
          display: flex;
          align-items: center;
          background-color: #f8f9fa;
          border-radius: 8px;
          padding: 1.5rem;
          margin-bottom: 1rem;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .contact-info:hover, .experience-item:hover {
          transform: translateY(-5px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .contact-info .icon {
          font-size: 1.5rem;
          color: #7f9f80;
          margin-right: 1.5rem;
          width: 40px;
          text-align: center;
        }

        .contact-info .text p, .experience-item .text p {
          margin: 0;
        }

        .contact-info .text p:first-child, .experience-item .text p:first-child {
          font-weight: 600;
          color: #34495e;
        }

        .contact-info .text p:last-child, .experience-item .text p:nth-child(2) {
          color: #7f8c8d;
        }
        
        .experience-item .text p:last-child {
            font-style: italic;
            color: #95a5a6;
            margin-top: 0.5rem;
        }

        .skills {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .skill-item {
          background-color: #7f9f80;
          color: #ffffff;
          border-radius: 20px;
          padding: 0.5rem 1.5rem;
          font-weight: 600;
          transition: background-color 0.3s ease;
        }

        .skill-item:hover {
          background-color: #6a8a6b;
        }
      </style>
      <div class="container">
        <div class="profile">
          <img src="./images/profil-pic.jpg" alt="Profile Picture" class="profile-pic" onerror="this.src='images/default.png'">
          <div class="profile-info">
            <p class="name">Yogi Aprio</p>
            <p class="job-title">Front-end and Back-end Developer at Dicoding Academy || Website Developer || Undergraduate Electrical Engineering Student, University of Lampung</p>
          </div>
        </div>
        <h2 class="section-title">Contact</h2>
        <div class="contact-info">
          <div class="icon"><i class="fa-solid fa-envelope"></i></div>
          <div class="text">
            <p>Email</p>
            <p>yogiaprio21@gmail.com</p>
          </div>
        </div>
        <div class="contact-info">
          <div class="icon"><i class="fa-solid fa-phone"></i></div>
          <div class="text">
            <p>Phone</p>
            <p>+62 822-8210-4482</p>
          </div>
        </div>
        <h2 class="section-title">Experience</h2>
        <div class="experience-item">
          <div class="text">
            <p>Program Kreativitas Mahasiswa Pengabdian Masyarakat (PKM-PM)</p>
            <p>Menginisiasi dan melaksanakan proyek "Ajar Tanam Mentimun Berbasis Soilless Culture System untuk Pengkayaan Eko-Agrowisata". Proyek ini bertujuan untuk mengedukasi masyarakat mengenai metode bercocok tanam yang ramah lingkungan tanpa menggunakan tanah, sehingga dapat meningkatkan nilai tambah agrowisata setempat dan mendukung keberlanjutan lingkungan.</p>
            <p>2023</p>
          </div>
        </div>
        <div class="experience-item">
          <div class="text">
            <p>Program Penguatan Kapasitas Organisasi Kemahasiswaan (PPK Ormawa)</p>
            <p>Berkolaborasi dalam proyek "Pengembangan Desa Gisting Permai sebagai Desa Agropolitan dengan Sistem Smart Green House Berbasis Internet of Things (IoT)". Proyek ini melibatkan penerapan teknologi IoT untuk menciptakan pertanian yang cerdas dan efisien, yang berkontribusi pada pengembangan wilayah agropolitan yang berkelanjutan dan meningkatkan kesejahteraan masyarakat desa.</p>
            <p>2023</p>
          </div>
        </div>
        <h2 class="section-title">Skills</h2>
        <div class="skills">
          <div class="skill-item"><p>HTML</p></div>
          <div class="skill-item"><p>CSS</p></div>
          <div class="skill-item"><p>JavaScript</p></div>
          <div class="skill-item"><p>React</p></div>
          <div class="skill-item"><p>Node.js</p></div>
          <div class="skill-item"><p>Python</p></div>
          <div class="skill-item"><p>SQL</p></div>
        </div>
      </div>
    `;
  }
}

customElements.define('about-us-component', AboutUsComponent);

const renderAboutUs = () => {
  document.getElementById('app').innerHTML = '<about-us-component></about-us-component>';
};

export default renderAboutUs;