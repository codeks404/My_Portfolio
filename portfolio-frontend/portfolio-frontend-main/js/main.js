// ====== CONFIG ======
// Change this to your deployed backend URL once it's live (e.g. Render/Railway).
// For local dev, keep it as http://localhost:5000
const API_BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost:5000/api'
 : 'https://portfolio-backend-2udn.onrender.com/api'; // TODO: replace after deploying backend

// ====== THEME TOGGLE ======
const themeBtn = document.getElementById('themeToggle');
const root = document.documentElement;
let dark = false;
themeBtn.addEventListener('click', () => {
  dark = !dark;
  root.setAttribute('data-theme', dark ? 'dark' : '');
  themeBtn.textContent = dark ? '☀️' : '🌙';
});

// ====== SCROLL REVEAL ======
function initReveal() {
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add('visible');
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  reveals.forEach((el) => observer.observe(el));
}

window.addEventListener('load', () => {
  document.querySelectorAll('.hero .reveal').forEach((el) => el.classList.add('visible'));
});

// ====== FETCH HELPERS ======
async function fetchJSON(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json();
}

// ====== RENDER: PROFILE ======
async function loadProfile() {
  try {
    const { data: profile } = await fetchJSON(`${API_BASE_URL}/profile`);

    const [first, ...rest] = profile.name.split(' ');
    document.getElementById('heroName').innerHTML = `${first}<br><span>${rest.join(' ')}</span>`;
    document.getElementById('heroTitle').textContent = profile.title;
    document.getElementById('heroBio').textContent = profile.bio[0] || '';

    document.getElementById('aboutP1').textContent = profile.bio[0] || '';
    document.getElementById('aboutP2').textContent = profile.bio[1] || '';

    document.getElementById('infoLocation').textContent = profile.location;
    document.getElementById('infoEducation').textContent = profile.education;
    document.getElementById('infoFocus').textContent = profile.focus;
    document.getElementById('infoGoal').textContent = profile.goal;

    document.getElementById('contactLocation').textContent = profile.location;

    if (profile.photo) {
      document.getElementById('heroPhoto').src = profile.photo;
    } else {
      document.getElementById('heroPhoto').style.display = 'none';
    }

    if (profile.email) {
      document.getElementById('contactEmail').href = `mailto:${profile.email}`;
      document.getElementById('contactEmailText').textContent = profile.email;
    }
    if (profile.linkedin) document.getElementById('contactLinkedin').href = profile.linkedin;
    if (profile.github) document.getElementById('contactGithub').href = profile.github;
  } catch (err) {
    console.error('Failed to load profile:', err);
    document.getElementById('heroName').innerHTML = 'Kumkum<br><span>Shakya</span>';
    document.getElementById('heroTitle').textContent = 'Full Stack Developer & CS Undergraduate';
  }
}

// ====== RENDER: SKILLS ======
async function loadSkills() {
  const grid = document.getElementById('skillsGrid');
  try {
    const { data: skills } = await fetchJSON(`${API_BASE_URL}/skills`);
    grid.innerHTML = skills
      .map((s) => `<span class="skill-tag reveal">${s.icon} ${s.name}</span>`)
      .join('');
    initReveal();
  } catch (err) {
    console.error('Failed to load skills:', err);
    grid.innerHTML = '<p style="color: var(--muted);">Unable to load skills right now.</p>';
  }
}

// ====== RENDER: PROJECTS ======
async function loadProjects() {
  const grid = document.getElementById('projectsGrid');
  try {
    const { data: projects } = await fetchJSON(`${API_BASE_URL}/projects`);

    if (!projects.length) {
      grid.innerHTML = '<p style="color: var(--muted);">Projects coming soon.</p>';
      return;
    }

    grid.innerHTML = projects
      .map(
        (p) => `
      <div class="project-card reveal">
        <div class="project-header">
          <div class="project-icon">${p.icon || '💻'}</div>
          <div class="project-links">
            ${p.githubUrl ? `<a href="${p.githubUrl}" target="_blank" class="project-link" title="View on GitHub">↗</a>` : ''}
          </div>
        </div>
        <h3>${p.title}</h3>
        <p>${p.description}</p>
        <div class="project-tags">
          ${p.tags.map((t) => `<span class="project-tag">${t}</span>`).join('')}
        </div>
      </div>
    `
      )
      .join('');
    initReveal();
  } catch (err) {
    console.error('Failed to load projects:', err);
    grid.innerHTML = '<p style="color: var(--muted);">Unable to load projects right now.</p>';
  }
}

// ====== CONTACT FORM SUBMISSION ======
const form = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const formStatus = document.getElementById('formStatus');

function clearErrors() {
  ['name', 'email', 'message'].forEach((f) => {
    document.getElementById(`${f}Error`).textContent = '';
  });
  formStatus.className = 'form-status';
  formStatus.textContent = '';
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  clearErrors();

  const payload = {
    name: document.getElementById('name').value.trim(),
    email: document.getElementById('email').value.trim(),
    message: document.getElementById('message').value.trim()
  };

  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending...';

  try {
    const res = await fetch(`${API_BASE_URL}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const result = await res.json();

    if (!res.ok) {
      // Show field-level validation errors from backend
      if (result.errors) {
        result.errors.forEach((err) => {
          const el = document.getElementById(`${err.field}Error`);
          if (el) el.textContent = err.message;
        });
      }
      formStatus.textContent = result.message || 'Something went wrong. Please try again.';
      formStatus.className = 'form-status show error';
      return;
    }

    formStatus.textContent = result.message || 'Message sent successfully!';
    formStatus.className = 'form-status show success';
    form.reset();
  } catch (err) {
    console.error('Contact form submission failed:', err);
    formStatus.textContent = 'Network error — please try again in a moment.';
    formStatus.className = 'form-status show error';
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Send Message';
  }
});

// ====== INIT ======
initReveal();
loadProfile();
loadSkills();
loadProjects();
