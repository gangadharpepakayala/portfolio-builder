const fs = require('fs');
const path = require('path');
const JSZip = require('jszip');

async function createStaticZip() {
  const zip = new JSZip();

  const indexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="Alex Rivera - Senior Full Stack Software Architect Portfolio" />
  <title>Alex Rivera | Senior Full Stack Software Architect</title>
  
  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  
  <!-- FontAwesome Icons -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />

  <!-- Stylesheets -->
  <link rel="stylesheet" href="css/style.css" />
  <link rel="stylesheet" href="css/responsive.css" />
</head>
<body>

  <!-- Navigation Bar -->
  <header class="navbar sticky-top">
    <div class="container nav-container">
      <a href="#" class="nav-brand">Alex Rivera</a>
      <nav class="nav-menu" id="navMenu">
        <a href="#about" class="nav-link">About</a>
        <a href="#skills" class="nav-link">Skills</a>
        <a href="#experience" class="nav-link">Experience</a>
        <a href="#projects" class="nav-link">Projects</a>
        <a href="#education" class="nav-link">Education</a>
        <a href="#contact" class="nav-link">Contact</a>
      </nav>
      <button class="nav-toggle" id="navToggle" aria-label="Toggle navigation">
        <i class="fas fa-bars"></i>
      </button>
    </div>
  </header>

  <main>
    <!-- Hero Section -->
    <section id="hero" class="hero-section">
      <div class="container hero-container">
        <div class="hero-content">
          <span class="badge"><i class="fas fa-circle-dot"></i> Available for new projects & roles</span>
          <h1 class="hero-name">Alex Rivera</h1>
          <h2 class="hero-role">Senior Full Stack Software Architect</h2>
          <p class="hero-desc">Crafting high-performance web applications, scalable cloud microservices, and sleek user interfaces with modern web technologies.</p>
          <div class="hero-actions">
            <a href="#projects" class="btn btn-primary">Explore Projects</a>
            <a href="#contact" class="btn btn-secondary">Get In Touch</a>
          </div>
          <div class="social-links">
            <a href="https://github.com" target="_blank" class="social-icon-btn"><i class="fab fa-github"></i></a>
            <a href="https://linkedin.com" target="_blank" class="social-icon-btn"><i class="fab fa-linkedin-in"></i></a>
            <a href="https://twitter.com" target="_blank" class="social-icon-btn"><i class="fab fa-twitter"></i></a>
            <a href="https://stackoverflow.com" target="_blank" class="social-icon-btn"><i class="fab fa-stack-overflow"></i></a>
          </div>
        </div>
        <div class="hero-image-wrapper">
          <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600" alt="Alex Rivera" class="hero-avatar circle" />
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section id="about" class="section about-section">
      <div class="container">
        <div class="section-title-block text-center">
          <h2>About Me</h2>
          <p class="subtitle">Passionate about engineering elegant solutions for complex digital challenges</p>
        </div>
        <div class="about-grid image-right">
          <div class="about-img-box">
            <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800" alt="About Alex" class="about-img" />
          </div>
          <div class="about-text-box">
            <p class="about-desc">With over 8 years of hands-on experience in full-stack web software engineering, I specialize in building reactive frontend web apps in Angular & React, resilient Node microservices, and cloud infrastructure.</p>
            <ul class="highlights-list">
              <li><i class="fas fa-check-circle check-icon"></i> Architected cloud applications serving over 2M+ active monthly users.</li>
              <li><i class="fas fa-check-circle check-icon"></i> Pioneered design systems that boosted engineering team velocity by 40%.</li>
              <li><i class="fas fa-check-circle check-icon"></i> Strong proponent of open source software, micro-frontends, and automated CI/CD pipelines.</li>
            </ul>
            <div class="stats-row">
              <div class="stat-card"><span class="stat-num">8+</span><span class="stat-lbl">Years Exp.</span></div>
              <div class="stat-card"><span class="stat-num">45+</span><span class="stat-lbl">Projects</span></div>
              <div class="stat-card"><span class="stat-num">20+</span><span class="stat-lbl">Clients</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Skills Section -->
    <section id="skills" class="section skills-section">
      <div class="container">
        <div class="section-title-block text-center">
          <h2>Core Technical Expertise</h2>
          <p class="subtitle">Technologies, languages, frameworks & platforms I work with daily</p>
        </div>
        <div class="skills-grid">
          <div class="skill-card">
            <div class="skill-header"><span>Angular & RxJS</span><span>95%</span></div>
            <div class="progress-bar-bg"><div class="progress-bar-fill" style="width: 95%; background-color: #dd0031;"></div></div>
          </div>
          <div class="skill-card">
            <div class="skill-header"><span>TypeScript & JS</span><span>92%</span></div>
            <div class="progress-bar-bg"><div class="progress-bar-fill" style="width: 92%; background-color: #3178c6;"></div></div>
          </div>
          <div class="skill-card">
            <div class="skill-header"><span>Tailwind CSS</span><span>90%</span></div>
            <div class="progress-bar-bg"><div class="progress-bar-fill" style="width: 90%; background-color: #06b6d4;"></div></div>
          </div>
          <div class="skill-card">
            <div class="skill-header"><span>Node.js & Express</span><span>88%</span></div>
            <div class="progress-bar-bg"><div class="progress-bar-fill" style="width: 88%; background-color: #339933;"></div></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Experience Timeline -->
    <section id="experience" class="section experience-section">
      <div class="container">
        <div class="section-title-block text-center">
          <h2>Professional Experience</h2>
          <p class="subtitle">A timeline of my career trajectory and key engineering roles</p>
        </div>
        <div class="timeline">
          <div class="timeline-item">
            <div class="timeline-dot"></div>
            <div class="timeline-card">
              <div class="timeline-header">
                <div>
                  <h3 class="exp-role">Lead Frontend Architect</h3>
                  <h4 class="exp-company">Apex Tech Solutions &bull; San Francisco, CA</h4>
                </div>
                <span class="exp-badge">2023 - Present</span>
              </div>
              <p class="exp-desc">Directing frontend architecture for enterprise analytics dashboards. Migration of legacy modules to Standalone components & Signals resulting in 35% faster initial load time.</p>
              <div class="tech-tags"><span class="tag">Angular 20</span><span class="tag">Signals</span><span class="tag">Tailwind CSS</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Projects Section -->
    <section id="projects" class="section projects-section">
      <div class="container">
        <div class="section-title-block text-center">
          <h2>Featured Projects</h2>
          <p class="subtitle">Showcased applications, open source libraries, and production software</p>
        </div>
        <div class="projects-grid">
          <div class="project-card">
            <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800" alt="Quantum Dashboard" class="project-img" />
            <div class="project-body">
              <h3 class="project-title">Quantum Dashboard & Data Studio</h3>
              <p class="project-desc">Real-time financial analytics portal featuring customizable widgets, dynamic charting engine, and instant export capabilities.</p>
              <div class="tech-tags"><span class="tag">Angular</span><span class="tag">Tailwind CSS</span><span class="tag">RxJS</span></div>
              <div class="project-links">
                <a href="https://github.com" target="_blank" class="link-btn"><i class="fab fa-github"></i> Code</a>
                <a href="https://example.com" target="_blank" class="link-btn primary"><i class="fas fa-external-link-alt"></i> Live Demo</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="section contact-section">
      <div class="container">
        <div class="section-title-block text-center">
          <h2>Get In Touch</h2>
          <p class="subtitle">Have a project in mind or interested in collaborating? Reach out anytime!</p>
        </div>
        <div class="contact-grid">
          <div class="contact-info">
            <div class="info-item"><i class="fas fa-envelope"></i> <div><strong>Email:</strong> alex.rivera.dev@example.com</div></div>
            <div class="info-item"><i class="fas fa-phone"></i> <div><strong>Phone:</strong> +1 (555) 234-5678</div></div>
            <div class="info-item"><i class="fas fa-map-marker-alt"></i> <div><strong>Address:</strong> San Francisco, CA, USA</div></div>
          </div>
          <form class="contact-form" id="contactForm">
            <div class="form-group"><input type="text" placeholder="Your Name" required class="form-control" /></div>
            <div class="form-group"><input type="email" placeholder="Your Email" required class="form-control" /></div>
            <div class="form-group"><textarea placeholder="Your Message" rows="5" required class="form-control"></textarea></div>
            <button type="submit" class="btn btn-primary">Send Message</button>
          </form>
        </div>
      </div>
    </section>
  </main>

  <footer class="footer">
    <div class="container">
      <p class="copyright">&copy; 2026 Alex Rivera. All Rights Reserved. Built with Portfolio Builder.</p>
    </div>
  </footer>

  <script src="js/script.js"></script>
</body>
</html>`;

  const styleCss = `:root {
  --primary-color: #6366f1;
  --secondary-color: #818cf8;
  --accent-color: #ec4899;
  --bg-color: #0f172a;
  --section-bg: #1e293b;
  --text-color: #94a3b8;
  --heading-color: #f8fafc;
  --link-color: #818cf8;
  --button-bg: #6366f1;
  --button-hover: #4f46e5;
  --card-bg: #1e293b;
  --border-color: #334155;
  --footer-bg: #090d16;
}

* { margin: 0; padding: 0; box-sizing: border-box; }
body { background-color: var(--bg-color); color: var(--text-color); font-family: 'Inter', sans-serif; line-height: 1.6; }
.container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
h1, h2, h3, h4 { color: var(--heading-color); font-weight: 700; line-height: 1.2; }
a { color: var(--link-color); text-decoration: none; transition: color 0.2s; }

/* Navbar */
.navbar { padding: 20px 0; background-color: var(--bg-color); border-bottom: 1px solid var(--border-color); }
.navbar.sticky-top { position: sticky; top: 0; z-index: 1000; backdrop-filter: blur(12px); }
.nav-container { display: flex; justify-content: space-between; align-items: center; }
.nav-brand { font-size: 24px; font-weight: 800; color: var(--heading-color); }
.nav-menu { display: flex; gap: 28px; }
.nav-link { color: var(--text-color); font-weight: 500; }
.nav-link:hover { color: var(--primary-color); }
.nav-toggle { display: none; background: none; border: none; color: var(--heading-color); font-size: 24px; cursor: pointer; }

/* Sections */
.section { padding: 96px 0; background-color: var(--section-bg); }
.section:nth-child(even) { background-color: var(--bg-color); }
.section-title-block { margin-bottom: 56px; }
.section-title-block h2 { font-size: 36px; margin-bottom: 12px; }
.section-title-block .subtitle { font-size: 18px; opacity: 0.85; }
.text-center { text-align: center; }

/* Buttons */
.btn { display: inline-block; padding: 14px 28px; border-radius: 8px; font-weight: 600; cursor: pointer; transition: all 0.2s; }
.btn-primary { background-color: var(--button-bg); color: #fff; }
.btn-primary:hover { background-color: var(--button-hover); transform: translateY(-2px); }
.btn-secondary { background-color: transparent; border: 1px solid var(--border-color); color: var(--heading-color); }

/* Hero */
.hero-section { padding: 120px 0; background: linear-gradient(135deg, var(--bg-color), var(--section-bg)); }
.hero-container { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center; }
.badge { display: inline-block; padding: 6px 16px; border-radius: 99px; background: rgba(99, 102, 241, 0.1); border: 1px solid rgba(99, 102, 241, 0.2); color: var(--primary-color); font-size: 13px; font-weight: 600; margin-bottom: 16px; }
.hero-name { font-size: 54px; margin-bottom: 12px; }
.hero-role { font-size: 24px; color: var(--primary-color); margin-bottom: 20px; }
.hero-desc { font-size: 18px; margin-bottom: 32px; }
.hero-actions { display: flex; gap: 16px; margin-bottom: 32px; }
.social-links { display: flex; gap: 16px; }
.social-icon-btn { width: 44px; height: 44px; border-radius: 50%; background: var(--card-bg); border: 1px solid var(--border-color); display: flex; align-items: center; justify-content: center; color: var(--heading-color); }
.social-icon-btn:hover { background: var(--primary-color); color: #fff; }
.hero-avatar { width: 340px; height: 340px; object-fit: cover; border: 4px solid var(--primary-color); box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3); }
.hero-avatar.circle { border-radius: 50%; }

/* About & Skills */
.about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center; }
.about-img { width: 100%; border-radius: 16px; }
.highlights-list { list-style: none; margin: 24px 0; }
.highlights-list li { margin-bottom: 12px; display: flex; items-center; gap: 12px; }
.check-icon { color: var(--primary-color); }
.stats-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 32px; }
.stat-card { background: var(--card-bg); border: 1px solid var(--border-color); padding: 20px; border-radius: 12px; text-align: center; }
.stat-num { display: block; font-size: 28px; font-weight: 800; color: var(--primary-color); }

.skills-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; }
.skill-card { background: var(--card-bg); border: 1px solid var(--border-color); padding: 24px; border-radius: 12px; }
.skill-header { display: flex; justify-content: space-between; font-weight: 600; margin-bottom: 12px; }
.progress-bar-bg { height: 8px; background: var(--border-color); border-radius: 999px; overflow: hidden; }
.progress-bar-fill { height: 100%; border-radius: 999px; }

/* Timeline & Projects */
.timeline { position: relative; max-width: 800px; margin: 0 auto; }
.timeline-item { position: relative; padding-left: 36px; margin-bottom: 36px; }
.timeline-dot { position: absolute; left: 0; top: 6px; width: 16px; height: 16px; border-radius: 50%; background: var(--primary-color); }
.timeline-card { background: var(--card-bg); border: 1px solid var(--border-color); padding: 28px; border-radius: 16px; }
.timeline-header { display: flex; justify-content: space-between; margin-bottom: 16px; }
.exp-role { font-size: 20px; }
.exp-company { font-size: 15px; color: var(--primary-color); }
.exp-badge { background: var(--border-color); padding: 4px 12px; border-radius: 99px; font-size: 13px; }
.tech-tags { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 16px; }
.tag { background: var(--border-color); color: var(--heading-color); padding: 4px 12px; border-radius: 6px; font-size: 12px; font-weight: 500; }

.projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 32px; }
.project-card { background: var(--card-bg); border: 1px solid var(--border-color); border-radius: 16px; overflow: hidden; }
.project-img { width: 100%; height: 220px; object-fit: cover; }
.project-body { padding: 24px; }
.project-title { font-size: 22px; margin-bottom: 10px; }
.project-desc { margin-bottom: 16px; font-size: 15px; }
.project-links { display: flex; gap: 16px; margin-top: 20px; }

/* Contact & Footer */
.contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; }
.info-item { display: flex; gap: 16px; font-size: 16px; margin-bottom: 24px; }
.info-item i { color: var(--primary-color); font-size: 20px; margin-top: 4px; }
.form-group { margin-bottom: 20px; }
.form-control { width: 100%; padding: 14px 18px; border-radius: 8px; background: var(--card-bg); border: 1px solid var(--border-color); color: var(--heading-color); font-size: 15px; }
.footer { padding: 40px 0; background: var(--footer-bg); text-align: center; font-size: 14px; }
`;

  const responsiveCss = `@media (max-width: 992px) {
  .hero-container, .about-grid, .contact-grid { grid-template-columns: 1fr; text-align: center; }
  .hero-actions, .social-links { justify-content: center; }
  .hero-avatar { margin: 0 auto; }
}
@media (max-width: 768px) {
  .nav-menu { display: none; position: absolute; top: 100%; left: 0; width: 100%; background: var(--bg-color); flex-direction: column; padding: 24px; }
  .nav-menu.active { display: flex; }
  .nav-toggle { display: block; }
  .section { padding: 64px 0; }
  .hero-name { font-size: 38px; }
}`;

  const scriptJs = `document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => navMenu.classList.toggle('active'));
  }
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Thank you! Your message has been sent successfully.');
      contactForm.reset();
    });
  }
});`;

  const readmeMd = `# Alex Rivera - Personal Portfolio Website

Generated using **Portfolio Builder**.

## 📁 Package Contents
- \`index.html\` - Static HTML5 website
- \`css/style.css\` & \`responsive.css\` - Custom styling
- \`js/script.js\` - Interactivity
- \`assets/\` - Image & font assets
- \`README.md\` - Host instructions

## 🚀 How to Host
Deploy to GitHub Pages, Netlify, Vercel, or cPanel by uploading the contents of this folder!
`;

  zip.file('index.html', indexHtml);
  const cssFolder = zip.folder('css');
  cssFolder.file('style.css', styleCss);
  cssFolder.file('responsive.css', responsiveCss);
  
  const jsFolder = zip.folder('js');
  jsFolder.file('script.js', scriptJs);

  const assetsFolder = zip.folder('assets');
  assetsFolder.folder('images');
  assetsFolder.folder('icons');
  assetsFolder.folder('fonts');

  zip.file('README.md', readmeMd);

  const zipBuffer = await zip.generateAsync({ type: 'nodebuffer' });

  // Save to project directory
  const projPath = path.join(__dirname, '..', 'Portfolio.zip');
  fs.writeFileSync(projPath, zipBuffer);

  // Save to artifacts directory
  const artifactPath = 'C:\\Users\\gangadhar\\.gemini\\antigravity\\brain\\1d70e511-28b7-4f52-a0ae-4f05dfdc243a\\Portfolio.zip';
  fs.writeFileSync(artifactPath, zipBuffer);

  console.log(`Generated Portfolio.zip at ${projPath} and ${artifactPath}`);
}

createStaticZip().catch(console.error);
