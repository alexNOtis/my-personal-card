const views = document.querySelectorAll('.view');
const navLinks = document.querySelectorAll('[data-view]');

function showView(viewName) {
  views.forEach((view) => view.classList.toggle('is-visible', view.id === `${viewName}-view`));
  navLinks.forEach((link) => link.classList.toggle('is-active', link.dataset.view === viewName));
  history.replaceState(null, '', `#${viewName}`);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function setLink(id, value, prefix = '') {
  const link = document.getElementById(id);
  if (link && value) link.href = `${prefix}${value}`;
}

function setText(id, value) {
  const element = document.getElementById(id);
  if (element && value) {
    if (id === 'location' && element.firstChild) element.firstChild.nodeValue = `${value} `;
    else element.textContent = value;
  }
}

function renderPortfolioProjects() {
  const grid = document.getElementById('portfolio-grid');
  const emptyState = document.getElementById('portfolio-empty');
  if (!grid || !portfolioConfig.portfolioProjects.length) return;

  emptyState.remove();
  portfolioConfig.portfolioProjects.forEach((project, index) => {
    const card = document.createElement('article');
    card.className = `portfolio-card portfolio-card-${(index % 3) + 1} portfolio-${project.palette || 'default'}`;
    const imageMarkup = project.image ? `<div class="portfolio-media"><img src="${project.image}" alt="${project.name} project preview"><span>image slot</span></div>` : '<div class="portfolio-media"><span>image slot</span></div>';
    const linkMarkup = project.url ? `<a href="${project.url}" target="_blank" rel="noreferrer">view project ↗</a>` : '<span class="portfolio-link-muted">project details soon</span>';
    card.innerHTML = `<div class="portfolio-card-topline"><span>${String(index + 1).padStart(2, '0')} / ${project.type || 'client project'}</span><span>${project.year || ''}</span></div>${imageMarkup}<div class="portfolio-card-body"><div class="portfolio-label-row"><span class="portfolio-number">${project.label || 'CLIENT WORK'}</span><span class="portfolio-status portfolio-status-${project.status === 'done' ? 'done' : 'progress'}">${project.status || 'in progress'}</span></div><h3>${project.name}</h3><p>${project.description}</p>${linkMarkup}</div>`;
    const projectImage = card.querySelector('.portfolio-media img');
    if (projectImage) projectImage.addEventListener('error', () => projectImage.remove());
    grid.append(card);
  });
}

function applyPortfolioConfig() {
  const root = document.documentElement;
  const banner = document.getElementById('hero-banner');
  const profileImage = document.getElementById('profile-image');

  root.style.setProperty('--ink', portfolioConfig.textColor);
  setText('location', portfolioConfig.location);
  setText('employment', portfolioConfig.employment);
  setText('education', portfolioConfig.education);
  setText('current-project', portfolioConfig.currentProject);
  if (banner && portfolioConfig.bannerImage) banner.style.setProperty('--banner-image', `url(${portfolioConfig.bannerImage})`);
  if (profileImage && portfolioConfig.profileImage) {
    profileImage.addEventListener('error', () => profileImage.removeAttribute('src'), { once: true });
    profileImage.src = portfolioConfig.profileImage;
  }

  setLink('availability-link', portfolioConfig.email, 'mailto:');
  setLink('intro-email-link', portfolioConfig.email, 'mailto:');
  setLink('footer-email-link', portfolioConfig.email, 'mailto:');
  setLink('social-link', portfolioConfig.socialUrl);

  document.querySelectorAll('[data-statue]').forEach((stage) => {
    const statuePath = portfolioConfig.statues[stage.dataset.statue];
    if (statuePath) {
      const statueImage = stage.querySelector('.statue-image');
      statueImage.src = statuePath;
      stage.classList.add('has-image');
    }
  });
  renderPortfolioProjects();
}

navLinks.forEach((link) => link.addEventListener('click', () => showView(link.dataset.view)));

applyPortfolioConfig();

const initialView = window.location.hash.slice(1);
if (['home', 'projects', 'skills', 'portfolio'].includes(initialView)) showView(initialView);
