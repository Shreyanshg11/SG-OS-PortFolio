/* ============================================================
   SG-OS Portfolio — Behavior
   ============================================================
   Sections:
   1. Data (single source of truth for all content)
   2. Reusable render functions
   3. Boot sequence
   4. Mission Brief
   5. Desktop: icons, context menu, drag-to-reorder
   6. Window Manager: open/close/drag/resize/minimize/maximize
   7. Taskbar + Start Menu
   8. Terminal application (modular command registry)
   9. Command Palette (Ctrl+K) — apps + projects + skills + journey
   10. Theme + state persistence (localStorage)
   11. Classic page wiring
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ============================================================
     v5.0 — Service worker registration (offline app shell).
     Fails silently if sw.js isn't hosted alongside index.html.
     ============================================================ */
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('sw.js').catch(() => {});
    });
  }

  /* ============================================================
     0. THEME (applied first to avoid flash)
     ============================================================ */
  function loadTheme() {
    if (localStorage.getItem('sgos_theme') === 'amber') {
      document.body.classList.add('theme-amber');
    }
  }
  function toggleTheme() {
    document.body.classList.toggle('theme-amber');
    localStorage.setItem('sgos_theme', document.body.classList.contains('theme-amber') ? 'amber' : 'green');
  }
  loadTheme();

  /* ============================================================
     1. DATA
     ============================================================ */
  const EMAIL = 'shreyanshg232@gmail.com';
  const GITHUB_URL = 'https://github.com/Shreyanshg11';
  const LINKEDIN_URL = 'https://www.linkedin.com/in/shreyansh-gupta-928850324';

  const PROCESSES = [
    { pid: '1001', name: 'data-analytics.run', status: 'active' },
    { pid: '1002', name: 'machine-learning-fundamentals.run', status: 'active' },
    { pid: '1003', name: 'sql.train', status: 'active' },
    { pid: '1004', name: 'power-bi.build', status: 'active' },
    { pid: '1005', name: 'data-visualization.render', status: 'active' },
    { pid: '1006', name: 'frontend-development.compile', status: 'active' },
    { pid: '1007', name: 'sg-os.build --project=portfolio', status: 'active' },
    { pid: '1008', name: 'dsa-in-java.practice', status: 'active' },
    { pid: '1009', name: 'git-github.sync', status: 'active' },
  ];

  const SKILLS = [
    { title: 'Programming Languages', items: [
      { name: 'Python', learning: false }, { name: 'Java', learning: false },
      { name: 'C', learning: false }, { name: 'HTML', learning: false },
      { name: 'CSS', learning: false }, { name: 'JavaScript', learning: true },
    ]},
    { title: 'Data Analysis', items: [
      { name: 'Pandas', learning: false }, { name: 'NumPy', learning: false },
      { name: 'Matplotlib', learning: false }, { name: 'Seaborn', learning: false },
    ]},
    { title: 'Machine Learning', items: [
      { name: 'Scikit-learn', learning: false }, { name: 'Data Preprocessing', learning: false },
      { name: 'Feature Engineering', learning: false }, { name: 'Model Evaluation', learning: false },
      { name: 'Regression', learning: false }, { name: 'Classification', learning: false },
    ]},
    { title: 'Databases', items: [ { name: 'SQL', learning: true } ]},
    { title: 'Visualization', items: [
      { name: 'Power BI', learning: true }, { name: 'Excel', learning: false },
      { name: 'Matplotlib', learning: false }, { name: 'Seaborn', learning: false },
    ]},
    { title: 'Tools', items: [
      { name: 'Git', learning: false }, { name: 'GitHub', learning: false },
      { name: 'VS Code', learning: false }, { name: 'Jupyter Notebook', learning: false },
      { name: 'Google Colab', learning: false },
    ]},
    { title: 'Core CS', items: [
      { name: 'Data Structures & Algorithms', learning: false },
      { name: 'Object-Oriented Programming', learning: false },
      { name: 'Problem Solving', learning: false },
    ]},
  ];

  const PROJECTS = [
    {
      name: 'Iris Flower Classification',
      desc: 'Classified Iris flower species using a Random Forest Classifier, with exploratory data analysis, visualization, and feature importance ranking to explain what actually drives the model\u2019s predictions.',
      problem: 'A clean, end-to-end classification workflow — from raw measurements to an interpretable model — as a foundation for tackling larger classification problems.',
      tags: ['Python', 'Scikit-learn', 'Pandas', 'EDA'],
      link: 'https://github.com/Shreyanshg11/CodeAlpha_IrIsClassification',
    },
    {
      name: 'Car Price Prediction',
      desc: 'Built a machine learning model to predict used car prices from historical vehicle data. Performed feature engineering and preprocessing, then trained a Random Forest Regressor to estimate selling prices.',
      problem: 'Helping estimate the fair market value of a used car based on multiple real-world features.',
      tags: ['Python', 'Scikit-learn', 'Pandas', 'NumPy'],
      link: 'https://github.com/Shreyanshg11/CodeAlpha_CarPricePrediction',
    },
    {
      name: 'Unemployment Analysis in India',
      desc: 'Explored unemployment trends across India, including the impact of COVID-19, with visualizations that surface regional and temporal patterns in the data.',
      problem: 'Understanding how a national crisis reshaped employment differently across regions and time.',
      tags: ['Python', 'Pandas', 'Matplotlib', 'Seaborn'],
      link: 'https://github.com/Shreyanshg11/CodeAlpha_UnemploymentAnalysis',
    },
    {
      name: 'Sales Prediction',
      desc: 'Predicted sales outcomes using Linear Regression and Random Forest, analyzing how different advertising channels impact revenue.',
      problem: 'Turning ad-spend data into a forecast that shows which channels actually move sales.',
      tags: ['Python', 'Linear Regression', 'Random Forest'],
      link: 'https://github.com/Shreyanshg11/CodeAlpha_SalesPrediction',
    },
    {
      name: 'Tata iQ — AI-Powered Collections Strategy',
      desc: 'A virtual experience program (Tata iQ / Forage) focused on reducing customer delinquency for Geldium using data analytics, predictive modeling, business reporting, and responsible AI principles — including a logistic regression model and an executive-ready presentation.',
      problem: 'Designing a collections strategy that reduces credit delinquency while staying fair and explainable.',
      tags: ['EDA', 'Logistic Regression', 'Responsible AI', 'Business Reporting'],
      link: 'https://github.com/Shreyanshg11/Tata-iQ-Geldium-AI-Collections',
    },
  ];

  const TIMELINE = [
    { date: '2024', title: 'Started the CS + Data Science journey', desc: 'Began B.Tech in Computer Science Engineering, specializing in Data Science, at Galgotias College of Engineering & Technology.' },
    { date: '2024', title: 'Learned C', desc: 'First programming language — built the core logic and problem-solving foundations everything else sits on.' },
    { date: '2024 — 2025', title: 'Picked up Python, Git & GitHub', desc: 'Moved from language fundamentals into real tooling — Python became the daily driver, with Git/GitHub for version control from day one.' },
    { date: '2025 — Present', title: 'Shipped first ML projects', desc: 'Iris classification, car price prediction, unemployment analysis, sales prediction — moved from theory into working, end-to-end models using Pandas, NumPy, and Scikit-learn.' },
    { date: 'In Progress', title: 'Tata iQ Forage Virtual Experience', desc: 'AI-powered collections strategy: EDA, predictive modeling, responsible AI, executive reporting.' },
    { date: 'Continuous', title: 'Building SG-OS', desc: 'Shipping this portfolio as a living product — versioned and improved over time, like real software.' },
  ];

  const EDUCATION = {
    degree: 'B.Tech — Computer Science Engineering (Data Science)',
    institution: 'Galgotias College of Engineering & Technology',
    location: 'Greater Noida, India',
    year: '3rd Year',
    status: 'In Progress',
    graduation: 'Expected 2028',
  };

  const CERTIFICATIONS = [
    { name: 'Tata iQ Forage — AI-Powered Collections Strategy', issuer: 'Forage × Tata iQ', status: 'In Progress' },
    { name: 'Python', issuer: 'Certification in progress', status: 'In Progress' },
    { name: 'SQL', issuer: 'Certification in progress', status: 'In Progress' },
    { name: 'Power BI', issuer: 'Certification in progress', status: 'In Progress' },
    { name: 'Data Analytics', issuer: 'Certification in progress', status: 'In Progress' },
  ];

  const GITHUB_USERNAME = 'Shreyanshg11';

  /* Notebook.exe seed entries (v4.0) — starter reflections on building SG-OS itself,
     since that's the one thing already true and documentable. Meant to be replaced /
     added to with real learning notes over time — not a finished blog. */
  const NOTEBOOK_ENTRIES = [
    {
      id: 'why-sgos',
      filename: 'entry-01-why-an-os.md',
      version: 'v1.0',
      title: 'Why a portfolio should feel like an OS, not a scroll',
      body: `# Why a portfolio should feel like an OS, not a scroll

Most portfolios are the same scrolling page with a different color scheme.
I wanted SG-OS to actually feel like software someone opens, not a page
someone scrolls past.

That meant treating it like a real product: a boot sequence, a window
manager, a taskbar — built in vanilla HTML/CSS/JS with no framework and
no build step, versioned like real software (v1.0, v2.0, v2.5...) instead
of shipped once and forgotten.

The constraint turned out to be the interesting part. No React, no
build tooling — just the DOM, and the discipline to keep one source of
truth for every skill, project, and timeline entry so the whole OS
renders from the same data.`,
    },
    {
      id: 'local-ai-constraints',
      filename: 'entry-02-local-first-ai.md',
      version: 'v3.0',
      title: 'What a fully local AI assistant taught me about constraints',
      body: `# What a fully local AI assistant taught me about constraints

SG-OS has no backend. So when v3.0 called for an "AI Assistant," a real
LLM API was off the table — no server to hide a key on, and I didn't
want to expose one in client-side JS.

The answer was a local Q&A engine: keyword + word-boundary matching
against the site's own real data (skills, projects, timeline), with
rotating response variants so it doesn't repeat itself. It's not a
language model. It's honest about that. But it only ever answers from
real content, which is arguably a more useful property for a portfolio
than sounding clever.

Constraints didn't limit the feature — they defined what "done" should
actually mean here.`,
    },
  ];

  /* ============================================================
     2. REUSABLE RENDER FUNCTIONS
     ============================================================ */
  function processesRowsHTML() {
    return PROCESSES.map(p => `
      <tr>
        <td>${p.pid}</td>
        <td>${p.name}</td>
        <td><span class="proc-status">${p.status}</span></td>
      </tr>
    `).join('');
  }

  function skillsHTML() {
    return SKILLS.map(cat => `
      <div class="skill-card reveal">
        <div class="skill-card-title">${cat.title}</div>
        <div class="skill-tags">
          ${cat.items.map(it => `
            <span class="skill-tag ${it.learning ? 'learning' : ''}">
              <span class="tag-dot"></span>${it.name}
            </span>
          `).join('')}
        </div>
      </div>
    `).join('');
  }

  function educationRowsHTML() {
    const rows = [
      ['degree', EDUCATION.degree], ['institution', EDUCATION.institution],
      ['location', EDUCATION.location], ['year', EDUCATION.year],
      ['status', EDUCATION.status], ['graduation', EDUCATION.graduation],
    ];
    return rows.map(([label, value]) => `
      <div class="spec-row">
        <span class="spec-label">${label}</span>
        <span class="spec-value">${value}</span>
      </div>
    `).join('');
  }

  function certInitials(name) {
    const words = name.replace(/[—–-].*$/, '').trim().split(/\s+/).filter(Boolean);
    return words.slice(0, 2).map(w => w[0]).join('').toUpperCase();
  }

  function certsHTML() {
    return CERTIFICATIONS.map(c => `
      <div class="cert-card reveal">
        <div class="cert-icon">${certInitials(c.name)}</div>
        <div class="cert-name">${c.name}</div>
        <div class="cert-issuer">${c.issuer}</div>
        <span class="cert-status">${c.status}</span>
      </div>
    `).join('');
  }

  function projectsHTML() {
    return PROJECTS.map((p) => `
      <div class="project-card reveal">
        <div class="window-bar">
          <span class="dot dot-red"></span><span class="dot dot-yellow"></span><span class="dot dot-green"></span>
          <span class="window-title">${p.name.toLowerCase().replace(/[^a-z0-9]+/g,'_')}.py</span>
        </div>
        <div class="project-body">
          <div class="project-name">${p.name}</div>
          <p class="project-desc">${p.desc}</p>
          <p class="project-problem">${p.problem}</p>
          <div class="project-tags">
            ${p.tags.map(t => `<span class="project-tag">${t}</span>`).join('')}
          </div>
          <div class="project-footer">
            ${p.link
              ? `<a href="${p.link}" target="_blank" rel="noopener" class="project-link" onclick="event.stopPropagation()">view on GitHub →</a>`
              : `<span class="project-link disabled">repository coming soon</span>`}
            <span class="project-expand-hint">click to expand</span>
          </div>
        </div>
      </div>
    `).join('');
  }

  function bindProjectExpand(container) {
    container.querySelectorAll('.project-card').forEach(card => {
      card.addEventListener('click', () => card.classList.toggle('expanded'));
    });
  }

  function timelineHTML() {
    return TIMELINE.map(t => `
      <div class="timeline-item reveal">
        <span class="timeline-date">${t.date}</span>
        <div class="timeline-title">${t.title}</div>
        <div class="timeline-desc">${t.desc}</div>
      </div>
    `).join('');
  }

  function aboutHTML() {
    return `
      <div class="window-body">
        <p>I'm a third-year B.Tech student in Computer Science Engineering, specializing in Data Science, at Galgotias College of Engineering &amp; Technology, Greater Noida.</p>
        <p>I enjoy solving problems using data and continuously learning new technologies. My goal is to become a Data Analyst and grow into a Data Scientist — because understanding the story behind the data matters as much as building the model.</p>
        <p>Rather than collecting certificates, I focus on building projects that reflect real learning and technical growth.</p>
      </div>
      <div class="window-body" style="padding-top:0;">
        <span class="stat-label">career_objective</span>
        <p>Build intelligent, data-driven solutions that create measurable impact — combining analytical thinking, programming, and visualization to turn raw data into meaningful business insight.</p>
        <span class="stat-label" style="margin-top:16px;display:block;">currently_open_to</span>
        <div class="open-grid" style="margin-top:10px;">
          <div class="open-chip">Data Analyst Internship</div>
          <div class="open-chip">Data Science Internship</div>
          <div class="open-chip">Business Analyst Internship</div>
        </div>
      </div>
    `;
  }

  function contactHTML(prefix) {
    return `
      <div class="window-body mono">
        <p class="terminal-line"><span class="prompt">$</span> ./send_message --to shreyansh</p>
        <form id="${prefix}contact-form" class="contact-form">
          <label for="${prefix}cf-name">name</label>
          <input type="text" id="${prefix}cf-name" placeholder="your_name" required>
          <label for="${prefix}cf-email">email</label>
          <input type="email" id="${prefix}cf-email" placeholder="your_email@domain.com" required>
          <label for="${prefix}cf-message">message</label>
          <textarea id="${prefix}cf-message" placeholder="type your message..." rows="4" required></textarea>
          <button type="submit" class="btn btn-primary">./send</button>
        </form>
        <p class="terminal-line output-line" id="${prefix}form-output"></p>
        <div class="contact-links" style="margin-top:18px;">
          <a href="${GITHUB_URL}" target="_blank" rel="noopener" class="link-card">
            <span class="link-label">github</span><span class="link-value">Shreyanshg11</span>
          </a>
          <a href="mailto:${EMAIL}" class="link-card">
            <span class="link-label">email</span><span class="link-value">${EMAIL}</span>
          </a>
          <a href="${LINKEDIN_URL}" target="_blank" rel="noopener" class="link-card">
            <span class="link-label">linkedin</span><span class="link-value">shreyansh-gupta</span>
          </a>
        </div>
        <div class="resume-generate">
          <button class="btn btn-ghost" id="${prefix}generate-resume">\ud83d\udcc4 Download Resume (PDF)</button>
          <p class="resume-note" id="${prefix}resume-status" aria-live="polite">No resume file is uploaded \u2014 this one is generated live from this site's real data, so it's always current.</p>
        </div>
      </div>
    `;
  }

  function bindContactForm(container, prefix) {
    const form = container.querySelector(`#${prefix}contact-form`);
    const output = container.querySelector(`#${prefix}form-output`);
    if (!form) return;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = container.querySelector(`#${prefix}cf-name`).value.trim();
      const email = container.querySelector(`#${prefix}cf-email`).value.trim();
      const message = container.querySelector(`#${prefix}cf-message`).value.trim();
      const fullMessage = `${message}\n\n\u2014 ${name} (${email})`;
      const subject = encodeURIComponent(`Portfolio contact from ${name}`);
      const body = encodeURIComponent(fullMessage);
      window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;

      output.innerHTML = `
        > opening your mail client...<br>
        <span class="form-output-note">No mail app pop up? SG-OS is fully static — nothing sends unless your email client actually opens. Copy the message below and send it directly instead:</span><br>
        <button type="button" class="chip-btn" id="${prefix}cf-copy" style="margin-top:8px;">Copy message</button>
      `;
      const copyBtn = output.querySelector(`#${prefix}cf-copy`);
      copyBtn.addEventListener('click', () => {
        const plain = `To: ${EMAIL}\nSubject: Portfolio contact from ${name}\n\n${fullMessage}`;
        navigator.clipboard.writeText(plain)
          .then(() => { copyBtn.textContent = 'Copied \u2713'; setTimeout(() => { copyBtn.textContent = 'Copy message'; }, 1800); })
          .catch(() => { copyBtn.textContent = 'Copy failed \u2014 select manually'; });
      });
    });

    const resumeBtn = container.querySelector(`#${prefix}generate-resume`);
    const resumeStatus = container.querySelector(`#${prefix}resume-status`);
    if (resumeBtn) {
      resumeBtn.addEventListener('click', () => generateResumePDF(resumeStatus));
    }
  }

  /* ---------- Resume generator (v5.0 prep — built live from real data) ---------- */
  function loadScriptOnce(src) {
    return new Promise((resolve, reject) => {
      if (document.querySelector(`script[src="${src}"]`)) { resolve(); return; }
      const s = document.createElement('script');
      s.src = src;
      s.onload = resolve;
      s.onerror = () => reject(new Error('Failed to load ' + src));
      document.head.appendChild(s);
    });
  }

  async function generateResumePDF(statusEl) {
    if (statusEl) statusEl.textContent = 'Generating \u2014 pulling straight from the live site data...';
    try {
      if (!window.jspdf) {
        await loadScriptOnce('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js');
      }
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF({ unit: 'pt', format: 'a4' });
      const marginX = 48;
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      let y = 56;

      function ensureSpace(next) {
        if (y + next > pageHeight - 48) { doc.addPage(); y = 56; }
      }
      function heading(text) {
        ensureSpace(28);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(12);
        doc.setTextColor(20, 20, 20);
        doc.text(text.toUpperCase(), marginX, y);
        y += 6;
        doc.setDrawColor(180, 180, 180);
        doc.line(marginX, y, pageWidth - marginX, y);
        y += 16;
      }
      function body(text, opts = {}) {
        doc.setFont('helvetica', opts.bold ? 'bold' : 'normal');
        doc.setFontSize(opts.size || 10);
        doc.setTextColor(40, 40, 40);
        const lines = doc.splitTextToSize(text, pageWidth - marginX * 2);
        lines.forEach(line => {
          ensureSpace(14);
          doc.text(line, marginX, y);
          y += 14;
        });
      }

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(20);
      doc.setTextColor(10, 10, 10);
      doc.text('Shreyansh Gupta', marginX, y);
      y += 22;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10.5);
      doc.setTextColor(70, 70, 70);
      doc.text(`${EDUCATION.degree}`, marginX, y);
      y += 14;
      doc.text(`${EMAIL}  \u00b7  ${GITHUB_URL.replace('https://', '')}  \u00b7  ${LINKEDIN_URL.replace('https://', '')}`, marginX, y);
      y += 24;

      heading('Education');
      body(EDUCATION.degree, { bold: true });
      body(`${EDUCATION.institution}, ${EDUCATION.location} \u2014 ${EDUCATION.year}, ${EDUCATION.graduation}`);
      y += 6;

      heading('Skills');
      SKILLS.forEach(cat => {
        body(`${cat.title}: ${cat.items.map(i => i.name + (i.learning ? ' (learning)' : '')).join(', ')}`);
      });
      y += 6;

      heading('Projects');
      PROJECTS.forEach(p => {
        body(p.name, { bold: true });
        body(p.problem);
        body(`Tech: ${p.tags.join(', ')}${p.link ? '  \u2014  ' + p.link : '  \u2014  repository not public yet'}`);
        y += 6;
      });

      heading('Certifications (In Progress)');
      CERTIFICATIONS.forEach(c => {
        body(`${c.name} \u2014 ${c.issuer} (${c.status})`);
      });

      doc.save('Shreyansh_Gupta_Resume.pdf');
      if (statusEl) statusEl.textContent = 'Downloaded \u2014 built live from this site\u2019s real data, same as everything else here.';
    } catch (err) {
      if (statusEl) statusEl.textContent = 'Could not generate the resume right now \u2014 check your connection and try again.';
    }
  }

  /* ---------- Analytics.exe (v2.5 — real, derived numbers only) ---------- */
  function chartRowHTML(label, segments, maxValue, valueText) {
    // segments: [{ value, cls }] — rendered as a stacked bar out of maxValue
    const bars = segments.map(s => {
      const pct = maxValue > 0 ? Math.max(0, Math.min(100, (s.value / maxValue) * 100)) : 0;
      return `<span class="chart-bar-fill ${s.cls || ''}" style="width:${pct}%"></span>`;
    }).join('');
    return `
      <div class="chart-row">
        <span class="chart-row-label">${label}</span>
        <span class="chart-bar-track">${bars}</span>
        <span class="chart-row-value">${valueText}</span>
      </div>
    `;
  }

  function skillChartHTML() {
    const maxTotal = Math.max(...SKILLS.map(cat => cat.items.length));
    return SKILLS.map(cat => {
      const known = cat.items.filter(i => !i.learning).length;
      const learning = cat.items.filter(i => i.learning).length;
      const valueText = learning > 0 ? `${cat.items.length} (${learning} learning)` : `${cat.items.length}`;
      return chartRowHTML(cat.title, [
        { value: known, cls: '' },
        { value: learning, cls: 'learning-fill' },
      ], maxTotal, valueText);
    }).join('');
  }

  function careerMetrics() {
    const totalSkills = SKILLS.reduce((sum, cat) => sum + cat.items.length, 0);
    const learningNow = SKILLS.reduce((sum, cat) => sum + cat.items.filter(i => i.learning).length, 0);
    return [
      { value: PROJECTS.length, label: 'Projects Shipped' },
      { value: totalSkills, label: 'Skills Tracked' },
      { value: learningNow, label: 'Currently Learning' },
      { value: CERTIFICATIONS.length, label: 'Certifications In Progress' },
      { value: TIMELINE.length, label: 'Journey Milestones' },
    ];
  }

  function metricCardsHTML() {
    return careerMetrics().map(m => `
      <div class="metric-card reveal">
        <div class="metric-value">${m.value}</div>
        <div class="metric-label">${m.label}</div>
      </div>
    `).join('');
  }

  function chartLegendHTML() {
    return `
      <div class="chart-legend">
        <span class="legend-item"><span class="tag-dot"></span>known</span>
        <span class="legend-item"><span class="tag-dot learning"></span>learning</span>
      </div>
    `;
  }

  function analyticsHTML() {
    return `
      <div class="window-body analytics-app">
        <div class="analytics-section">
          <span class="stat-label">career_metrics</span>
          <div class="metrics-grid">${metricCardsHTML()}</div>
        </div>
        <div class="analytics-section">
          <span class="stat-label">skill_distribution — items per category</span>
          ${chartLegendHTML()}
          <div class="chart-list">${skillChartHTML()}</div>
        </div>
        <div class="analytics-section">
          <span class="stat-label">github_live_stats</span>
          <div class="github-stats" id="github-stats" aria-live="polite">
            <div class="gh-loading"><span class="loader-dot"></span>fetching live data from github...</div>
          </div>
        </div>
      </div>
    `;
  }

  const GH_CACHE_KEY = 'sgos_gh_stats_cache';
  const GH_CACHE_TTL = 60 * 60 * 1000; // 1 hour — keeps requests well under GitHub's unauthenticated rate limit

  function relativeTime(iso) {
    const diffMin = Math.max(1, Math.round((Date.now() - new Date(iso).getTime()) / 60000));
    if (diffMin < 60) return `${diffMin}m ago`;
    const diffHr = Math.round(diffMin / 60);
    if (diffHr < 24) return `${diffHr}h ago`;
    return `${Math.round(diffHr / 24)}d ago`;
  }

  function renderGithubStats(target, data, fromCache) {
    const maxLang = data.languages.length ? Math.max(...data.languages.map(l => l.count)) : 0;
    const langHTML = data.languages.length
      ? data.languages.map(l => chartRowHTML(l.name, [{ value: l.count, cls: '' }], maxLang, `${l.count} repo${l.count === 1 ? '' : 's'}`)).join('')
      : `<p class="gh-note">No public language data available yet.</p>`;

    target.innerHTML = `
      <div class="metrics-grid">
        <div class="metric-card">
          <div class="metric-value">${data.publicRepos}</div>
          <div class="metric-label">Public Repos</div>
        </div>
        <div class="metric-card">
          <div class="metric-value">${data.followers}</div>
          <div class="metric-label">Followers</div>
        </div>
      </div>
      <div class="chart-list" style="margin-top:16px;">${langHTML}</div>
      <p class="gh-note ${fromCache ? 'warn' : ''}">
        ${fromCache ? `⚠ showing cached snapshot from ${relativeTime(data.fetchedAt)} — live fetch unavailable` : `● live from GitHub API — updated ${relativeTime(data.fetchedAt)}`}
      </p>
    `;
  }

  function githubErrorHTML() {
    return `
      <div class="gh-error">
        <p>Live GitHub stats couldn't be loaded right now (rate limit or network).</p>
        <p><a href="${GITHUB_URL}" target="_blank" rel="noopener">View the GitHub profile directly →</a></p>
      </div>
    `;
  }

  async function fetchGithubStats(containerEl) {
    const target = containerEl.querySelector('#github-stats');
    if (!target) return;

    let cached = null;
    try { cached = JSON.parse(localStorage.getItem(GH_CACHE_KEY)); } catch (e) { cached = null; }
    if (cached && (Date.now() - cached.ts) < GH_CACHE_TTL) {
      renderGithubStats(target, cached.data, false);
      return;
    }

    try {
      const [userRes, reposRes] = await Promise.all([
        fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
        fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`),
      ]);
      if (!userRes.ok || !reposRes.ok) throw new Error('GitHub API request failed');
      const user = await userRes.json();
      const repos = await reposRes.json();

      const langCounts = {};
      repos.forEach(r => {
        if (r.fork || !r.language) return;
        langCounts[r.language] = (langCounts[r.language] || 0) + 1;
      });
      const languages = Object.entries(langCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 6)
        .map(([name, count]) => ({ name, count }));

      const data = {
        publicRepos: user.public_repos,
        followers: user.followers,
        languages,
        fetchedAt: new Date().toISOString(),
      };
      localStorage.setItem(GH_CACHE_KEY, JSON.stringify({ ts: Date.now(), data }));
      renderGithubStats(target, data, false);
    } catch (err) {
      if (cached) renderGithubStats(target, cached.data, true);
      else target.innerHTML = githubErrorHTML();
    }
  }

  function bindAnalytics(container) {
    fetchGithubStats(container);
  }

  /* ---------- Assistant.exe (v3.0 — local Q&A engine, no external API) ---------- */
  const assistantVariantCursor = {};
  function pickVariant(id, variants) {
    const i = assistantVariantCursor[id] || 0;
    assistantVariantCursor[id] = (i + 1) % variants.length;
    return variants[i];
  }

  function escapeRegex(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

  function findProjectMatch(text) {
    return PROJECTS.find(p => {
      const words = p.name.toLowerCase().split(/[^a-z0-9]+/).filter(w => w.length > 3);
      return words.some(w => new RegExp(`\\b${escapeRegex(w)}\\b`).test(text));
    });
  }

  function findSkillMatch(text) {
    for (const cat of SKILLS) {
      for (const item of cat.items) {
        const pattern = new RegExp(`\\b${escapeRegex(item.name.toLowerCase())}\\b`);
        if (pattern.test(text)) return { item, cat };
      }
    }
    return null;
  }

  const ASSISTANT_INTENTS = [
    { id: 'about', keywords: ['who is', 'about shreyansh', 'about him', 'introduce', 'tell me about', 'bio'],
      respond: () => pickVariant('about', [
        `Shreyansh Gupta is a ${EDUCATION.year} student at ${EDUCATION.institution}, studying ${EDUCATION.degree} (${EDUCATION.graduation}).`,
        `He's building a career in data science — ${PROJECTS.length} real projects shipped so far, plus this entire OS-styled portfolio built from scratch in vanilla JS.`,
        `In short: a Data Science undergrad at ${EDUCATION.institution} who prefers shipping real projects over just reading theory — see the Projects or Lab app for proof.`,
      ]) },
    { id: 'skills', keywords: ['skill', 'know', 'tech stack', 'technologies', 'stack', 'good at'],
      respond: () => pickVariant('skills', [
        `He works across ${SKILLS.length} skill areas: ${SKILLS.map(c => c.title).join(', ')}. Ask about a specific one — like "does he know Python?"`,
        `Strongest areas are Programming and Machine Learning, with Data Analysis and Visualization close behind. Check the Analytics app for the actual breakdown by category.`,
        `He's not just listing tags — every skill traces back to a real project. Ask about any specific tool and I'll tell you if it's a known skill or something he's currently learning.`,
      ]) },
    { id: 'projects', keywords: ['project', 'built', 'shipped', 'portfolio work'],
      respond: () => pickVariant('projects', [
        `He's shipped ${PROJECTS.length} projects: ${PROJECTS.map(p => p.name).join(', ')}. Ask about any one by name for details.`,
        `Favorites to dig into: Iris Classification (with a live interactive demo in the Lab app) and the Tata iQ Collections Strategy, which is his most business-facing work.`,
        `Every project links to a real GitHub repo except one still pending — ask me about a specific project name and I'll pull up what it does and what it's built with.`,
      ]) },
    { id: 'education', keywords: ['education', 'college', 'degree', 'study', 'university', 'school'],
      respond: () => pickVariant('education', [
        `${EDUCATION.degree} at ${EDUCATION.institution}, ${EDUCATION.location} — currently in his ${EDUCATION.year} (${EDUCATION.graduation}).`,
        `Studying Computer Science with a Data Science specialization, ${EDUCATION.graduation}, at ${EDUCATION.institution} in ${EDUCATION.location}.`,
      ]) },
    { id: 'certifications', keywords: ['certification', 'certificate', 'course'],
      respond: () => pickVariant('certifications', [
        `Currently working on: ${CERTIFICATIONS.map(c => c.name).join(', ')} — all marked honestly as in progress, nothing inflated.`,
        `${CERTIFICATIONS.length} certifications in the pipeline right now, none padded with fake completion dates. Check the Vault app to see exactly what's locked vs. unlocked.`,
      ]) },
    { id: 'contact', keywords: ['contact', 'email', 'reach', 'connect', 'linkedin'],
      respond: () => pickVariant('contact', [
        `Best ways to reach him: email at ${EMAIL}, or connect via LinkedIn / GitHub — all linked in the Contact app.`,
        `Email is the fastest way in: ${EMAIL}. LinkedIn and GitHub links are both in the Contact app if you'd rather connect there.`,
      ]) },
    { id: 'journey', keywords: ['journey', 'timeline', 'history', 'story so far'],
      respond: () => pickVariant('journey', [
        TIMELINE.map(t => `${t.date}: ${t.title}`).join(' \u00b7 '),
        `The short version: started the CS + Data Science degree in 2024, learned C then Python, started shipping real ML projects in 2025, and has been building SG-OS itself continuously since. Full timeline is in the Journey section.`,
      ]) },
    { id: 'github', keywords: ['github', 'repo', 'source code'],
      respond: () => pickVariant('github', [
        `GitHub: ${GITHUB_URL}`,
        `Everything's public on GitHub at ${GITHUB_URL} — every project card links straight to its repo.`,
      ]) },
    { id: 'resume', keywords: ['resume', 'cv'],
      respond: () => `No resume uploaded yet — that'll show up here honestly once it exists.` },
    { id: 'internship', keywords: ['hire', 'internship', 'open to work', 'looking for', 'available for'],
      respond: () => pickVariant('internship', [
        `He's currently open to Data Analyst, Data Science, and Business Analyst internships.`,
        `Yes — actively looking for Data Analyst / Data Science / Business Analyst internship roles. Email's the best way to follow up: ${EMAIL}.`,
      ]) },
    { id: 'help', keywords: ['help', 'what can you do', 'commands'],
      respond: () => `Ask about his skills, projects, education, certifications, journey, or how to reach him — I only answer from his real portfolio content, nothing made up.` },
  ];

  function scoreIntent(text, intent) {
    return intent.keywords.reduce((score, kw) => text.includes(kw) ? score + kw.split(' ').length : score, 0);
  }

  function answerAssistantQuery(raw) {
    const text = raw.toLowerCase().trim();
    if (!text) return `Ask me something about Shreyansh — his skills, projects, education, or how to reach him.`;
    if (/^(hi|hey|hello|yo|sup)\b/.test(text)) {
      return pickVariant('greeting', [
        `Hey! I'm the SG-OS Assistant. Ask me about Shreyansh's skills, projects, education, or how to get in touch.`,
        `Hi there — happy to answer anything about Shreyansh's real work. Try asking about a specific project or skill.`,
      ]);
    }

    const project = findProjectMatch(text);
    if (project) {
      return pickVariant(`project-${project.name}`, [
        `${project.name} — ${project.desc} Built with: ${project.tags.join(', ')}. ${project.link ? `Code: ${project.link}` : 'Repository not public yet.'}`,
        `${project.name} tackles this: ${project.problem} Tech used: ${project.tags.join(', ')}. ${project.link ? `Full notebook: ${project.link}` : 'Repo isn\u2019t public yet.'}`,
      ]);
    }
    const skillMatch = findSkillMatch(text);
    if (skillMatch) {
      const { item, cat } = skillMatch;
      const key = `skill-${item.name}`;
      return item.learning
        ? pickVariant(key, [
            `Yes — ${item.name} is currently being learned, under ${cat.title}.`,
            `${item.name} is a work in progress for him right now, filed under ${cat.title}. Honest label, no shortcuts.`,
          ])
        : pickVariant(key, [
            `Yes — ${item.name} is one of his skills, under ${cat.title}.`,
            `${item.name} is a confirmed skill, part of his ${cat.title} toolkit.`,
          ]);
    }

    let best = null, bestScore = 0;
    ASSISTANT_INTENTS.forEach(intent => {
      const score = scoreIntent(text, intent);
      if (score > bestScore) { best = intent; bestScore = score; }
    });
    if (best) return best.respond();

    return pickVariant('fallback', [
      `I don't have a real answer for that yet — try asking about his skills, projects, education, certifications, journey, or contact info.`,
      `That one's outside what I can honestly answer from his real content. Try skills, projects, education, or how to reach him.`,
      `Not something I can ground in his actual data — ask about a specific project or skill by name and I'll do better.`,
    ]);
  }

  function assistantHTML() {
    return `
      <div class="assistant-app">
        <div class="assistant-output" id="assistant-output" aria-live="polite">
          <div class="chat-bubble bot">Hey, I'm the SG-OS Assistant. I only answer from Shreyansh's real portfolio content — ask about his skills, projects, education, or how to reach him.</div>
        </div>
        <div class="assistant-suggestions" id="assistant-suggestions">
          ${['Skills', 'Projects', 'Education', 'Contact'].map(s => `<button class="chip-btn" data-q="${s}">${s}</button>`).join('')}
        </div>
        <div class="assistant-input-row">
          <input type="text" class="assistant-input" id="assistant-input" placeholder="Ask about skills, projects, education..." autocomplete="off" spellcheck="false" aria-label="Ask the assistant">
          <button class="btn btn-primary assistant-send" id="assistant-send">Ask</button>
        </div>
      </div>
    `;
  }

  function bindAssistant(container) {
    const output = container.querySelector('#assistant-output');
    const input = container.querySelector('#assistant-input');
    const sendBtn = container.querySelector('#assistant-send');
    const suggestions = container.querySelector('#assistant-suggestions');
    if (!output || !input) return;

    function addBubble(text, cls) {
      const div = document.createElement('div');
      div.className = 'chat-bubble ' + cls;
      div.textContent = text;
      output.appendChild(div);
      output.scrollTop = output.scrollHeight;
    }

    function ask(raw) {
      const text = raw.trim();
      if (!text) return;
      addBubble(text, 'user');
      const reply = answerAssistantQuery(text);
      setTimeout(() => addBubble(reply, 'bot'), 260);
    }

    sendBtn.addEventListener('click', () => { ask(input.value); input.value = ''; input.focus(); });
    input.addEventListener('keydown', (e) => { if (e.key === 'Enter') { ask(input.value); input.value = ''; } });
    suggestions.addEventListener('click', (e) => {
      const btn = e.target.closest('.chip-btn');
      if (!btn) return;
      ask(btn.dataset.q);
    });
    setTimeout(() => input.focus(), 60);
  }

  /* ---------- Graph.exe (v3.0 — knowledge graph: tools <-> projects) ---------- */
  function buildGraphModel() {
    const W = 640, H = 460, cx = W / 2, cy = H / 2 - 6;
    const projectRadius = 175, tagRadius = 95;

    const tagCounts = {};
    PROJECTS.forEach(p => p.tags.forEach(t => { tagCounts[t] = (tagCounts[t] || 0) + 1; }));
    const tags = Object.keys(tagCounts);

    const projectNodes = PROJECTS.map((p, i) => {
      const angle = (i / PROJECTS.length) * Math.PI * 2 - Math.PI / 2;
      return {
        id: `p-${i}`, type: 'project', label: p.name, name: p.name, tags: p.tags,
        x: +(cx + Math.cos(angle) * projectRadius).toFixed(1),
        y: +(cy + Math.sin(angle) * projectRadius).toFixed(1),
      };
    });
    const tagNodes = tags.map((t, i) => {
      const angle = (i / tags.length) * Math.PI * 2 - Math.PI / 2;
      const count = tagCounts[t];
      return {
        id: `s-${i}`, type: 'tag', label: t, count,
        x: +(cx + Math.cos(angle) * tagRadius).toFixed(1),
        y: +(cy + Math.sin(angle) * tagRadius).toFixed(1),
        r: 8 + count * 3,
      };
    });
    const edges = [];
    projectNodes.forEach(pn => pn.tags.forEach(tag => {
      const tn = tagNodes.find(t => t.label === tag);
      if (tn) edges.push({ from: tn, to: pn });
    }));

    return { W, H, projectNodes, tagNodes, edges };
  }

  function knowledgeGraphSVG() {
    const { W, H, projectNodes, tagNodes, edges } = buildGraphModel();
    const edgesSVG = edges.map(e =>
      `<line class="graph-edge" data-from="${e.from.id}" data-to="${e.to.id}" x1="${e.from.x}" y1="${e.from.y}" x2="${e.to.x}" y2="${e.to.y}"></line>`
    ).join('');
    const projectNodesSVG = projectNodes.map(n => `
      <g class="graph-node graph-node-project" data-id="${n.id}" tabindex="0">
        <circle cx="${n.x}" cy="${n.y}" r="22"></circle>
        <text x="${n.x}" y="${n.y + 36}" text-anchor="middle" class="graph-label">${n.label.length > 20 ? n.label.slice(0, 18) + '\u2026' : n.label}</text>
      </g>
    `).join('');
    const tagNodesSVG = tagNodes.map(n => `
      <g class="graph-node graph-node-tag" data-id="${n.id}" tabindex="0">
        <circle cx="${n.x}" cy="${n.y}" r="${n.r}"></circle>
        <text x="${n.x}" y="${n.y - n.r - 7}" text-anchor="middle" class="graph-label graph-label-tag">${n.label}</text>
      </g>
    `).join('');
    return `
      <svg class="graph-svg" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Diagram connecting tools and skills to the projects that use them">
        <g class="graph-edges">${edgesSVG}</g>
        <g class="graph-nodes">${projectNodesSVG}${tagNodesSVG}</g>
      </svg>
    `;
  }

  function graphHTML() {
    return `
      <div class="window-body graph-app">
        <div class="graph-legend">
          <span class="legend-item"><span class="legend-dot legend-dot-tag"></span>tool / skill</span>
          <span class="legend-item"><span class="legend-dot legend-dot-project"></span>project</span>
          <span class="graph-hint">click a node to trace its connections</span>
        </div>
        <div class="graph-canvas">${knowledgeGraphSVG()}</div>
        <div class="graph-detail" id="graph-detail">
          <p class="graph-detail-empty">Select a skill or project above to see its connections.</p>
        </div>
      </div>
    `;
  }

  function bindKnowledgeGraph(container) {
    const model = buildGraphModel();
    const svg = container.querySelector('.graph-svg');
    const detail = container.querySelector('#graph-detail');
    if (!svg || !detail) return;

    function clearHighlight() {
      svg.querySelectorAll('.graph-node').forEach(n => n.classList.remove('active', 'dim'));
      svg.querySelectorAll('.graph-edge').forEach(e => e.classList.remove('active', 'dim'));
    }

    function showDetail(node) {
      if (node.type === 'tag') {
        const connected = model.projectNodes.filter(p => p.tags.includes(node.label));
        detail.innerHTML = `
          <div class="graph-detail-title">${node.label}</div>
          <p class="graph-detail-sub">Used in ${connected.length} project${connected.length === 1 ? '' : 's'}:</p>
          <div class="graph-detail-list">${connected.map(p => `<button class="chip-btn graph-detail-link" data-project="${p.name}">${p.name}</button>`).join('')}</div>
        `;
      } else {
        detail.innerHTML = `
          <div class="graph-detail-title">${node.label}</div>
          <p class="graph-detail-sub">Built with:</p>
          <div class="graph-detail-list">${node.tags.map(t => `<span class="chip-btn chip-static">${t}</span>`).join('')}</div>
          <button class="chip-btn graph-detail-link" data-project="${node.name}" style="margin-top:10px;">Open in Projects \u2192</button>
        `;
      }
      detail.querySelectorAll('[data-project]').forEach(btn => {
        btn.addEventListener('click', () => openAndHighlight('projects', '.project-name', btn.dataset.project));
      });
    }

    function selectNode(id) {
      const allNodes = [...model.tagNodes, ...model.projectNodes];
      const node = allNodes.find(n => n.id === id);
      if (!node) return;
      clearHighlight();
      const connectedIds = new Set([id]);
      model.edges.forEach(e => {
        if (e.from.id === id) connectedIds.add(e.to.id);
        if (e.to.id === id) connectedIds.add(e.from.id);
      });
      svg.querySelectorAll('.graph-node').forEach(n => n.classList.add(connectedIds.has(n.dataset.id) ? 'active' : 'dim'));
      svg.querySelectorAll('.graph-edge').forEach(e => {
        const active = e.dataset.from === id || e.dataset.to === id;
        e.classList.add(active ? 'active' : 'dim');
      });
      showDetail(node);
    }

    svg.querySelectorAll('.graph-node').forEach(el => {
      el.addEventListener('click', () => selectNode(el.dataset.id));
      el.addEventListener('keydown', (e) => { if (e.key === 'Enter') selectNode(el.dataset.id); });
    });
  }

  /* ---------- Vault.exe (v3.0 — achievement vault, honest unlock states) ---------- */
  function vaultUnlockedCerts() { return CERTIFICATIONS.filter(c => c.status && c.status.toLowerCase() !== 'in progress'); }
  function vaultLockedCerts() { return CERTIFICATIONS.filter(c => !c.status || c.status.toLowerCase() === 'in progress'); }
  function vaultMilestones() { return TIMELINE.filter(t => t.date.toLowerCase() !== 'in progress'); }

  function vaultCardHTML(c) {
    const isLocked = !c.status || c.status.toLowerCase() === 'in progress';
    return `
      <div class="vault-card ${isLocked ? 'locked' : 'unlocked'} reveal">
        <div class="vault-card-icon">${isLocked ? '\u{1F512}' : '\u{1F3C6}'}</div>
        <div class="vault-card-name">${c.name}</div>
        <div class="vault-card-issuer">${c.issuer}</div>
        <span class="vault-card-status ${isLocked ? '' : 'status-unlocked'}">${c.status || 'In Progress'}</span>
      </div>
    `;
  }

  function vaultMilestoneCardHTML(t) {
    return `
      <div class="vault-card unlocked milestone reveal">
        <div class="vault-card-icon">\u{1F6A9}</div>
        <div class="vault-card-name">${t.title}</div>
        <div class="vault-card-issuer">${t.date}</div>
      </div>
    `;
  }

  function vaultHTML() {
    const unlocked = vaultUnlockedCerts();
    const locked = vaultLockedCerts();
    const milestones = vaultMilestones();
    return `
      <div class="window-body vault-app">
        <div class="analytics-section">
          <span class="stat-label">unlocked_certifications</span>
          ${unlocked.length
            ? `<div class="vault-grid">${unlocked.map(vaultCardHTML).join('')}</div>`
            : `<p class="vault-empty">Nothing unlocked yet — the certifications below are honestly still in progress. This vault fills in as each one is actually finished, no shortcuts.</p>`}
        </div>
        <div class="analytics-section">
          <span class="stat-label">in_progress</span>
          <div class="vault-grid">${locked.map(vaultCardHTML).join('')}</div>
        </div>
        <div class="analytics-section">
          <span class="stat-label">milestones_achieved</span>
          <div class="vault-grid">${milestones.map(vaultMilestoneCardHTML).join('')}</div>
        </div>
      </div>
    `;
  }

  /* ---------- Lab.exe (v3.0 — results explorer + one real interactive demo) ---------- */
  const IRIS_CENTROIDS = [
    { species: 'Setosa', sepalLength: 5.0, sepalWidth: 3.4, petalLength: 1.5, petalWidth: 0.2 },
    { species: 'Versicolor', sepalLength: 5.9, sepalWidth: 2.8, petalLength: 4.3, petalWidth: 1.3 },
    { species: 'Virginica', sepalLength: 6.6, sepalWidth: 3.0, petalLength: 5.6, petalWidth: 2.0 },
  ];

  function classifyIris(input) {
    return IRIS_CENTROIDS.map(c => ({
      species: c.species,
      distance: Math.sqrt(
        Math.pow(input.sepalLength - c.sepalLength, 2) +
        Math.pow(input.sepalWidth - c.sepalWidth, 2) +
        Math.pow(input.petalLength - c.petalLength, 2) +
        Math.pow(input.petalWidth - c.petalWidth, 2)
      ),
    })).sort((a, b) => a.distance - b.distance);
  }

  function irisDemoHTML() {
    return `
      <div class="lab-demo">
        <p class="lab-demo-note">A simplified nearest-centroid classifier, re-implemented in plain JS for this in-browser demo — using the real published Iris dataset class averages. The full trained Random Forest model lives in the actual notebook on GitHub.</p>
        <div class="lab-sliders">
          <label class="lab-slider-row">Sepal length (cm)<input type="range" min="4" max="8" step="0.1" value="5.8" id="iris-sl"><span class="lab-slider-value" id="iris-sl-v">5.8</span></label>
          <label class="lab-slider-row">Sepal width (cm)<input type="range" min="2" max="4.5" step="0.1" value="3.0" id="iris-sw"><span class="lab-slider-value" id="iris-sw-v">3.0</span></label>
          <label class="lab-slider-row">Petal length (cm)<input type="range" min="1" max="7" step="0.1" value="3.8" id="iris-pl"><span class="lab-slider-value" id="iris-pl-v">3.8</span></label>
          <label class="lab-slider-row">Petal width (cm)<input type="range" min="0.1" max="2.5" step="0.1" value="1.2" id="iris-pw"><span class="lab-slider-value" id="iris-pw-v">1.2</span></label>
        </div>
        <div class="lab-result" id="iris-result"></div>
      </div>
    `;
  }

  function bindIrisDemo(container) {
    const sl = container.querySelector('#iris-sl'), sw = container.querySelector('#iris-sw');
    const pl = container.querySelector('#iris-pl'), pw = container.querySelector('#iris-pw');
    const slV = container.querySelector('#iris-sl-v'), swV = container.querySelector('#iris-sw-v');
    const plV = container.querySelector('#iris-pl-v'), pwV = container.querySelector('#iris-pw-v');
    const result = container.querySelector('#iris-result');
    if (!sl || !result) return;

    function update() {
      const input = { sepalLength: +sl.value, sepalWidth: +sw.value, petalLength: +pl.value, petalWidth: +pw.value };
      slV.textContent = sl.value; swV.textContent = sw.value;
      plV.textContent = pl.value; pwV.textContent = pw.value;
      const ranked = classifyIris(input);
      const maxDist = Math.max(...ranked.map(r => r.distance)) || 1;
      result.innerHTML = `
        <div class="lab-result-title">Closest match: <span class="lab-result-species">${ranked[0].species}</span></div>
        <div class="chart-list">
          ${ranked.map(r => chartRowHTML(r.species, [{ value: maxDist - r.distance, cls: r.species === ranked[0].species ? '' : 'learning-fill' }], maxDist, r.distance.toFixed(2))).join('')}
        </div>
      `;
    }
    [sl, sw, pl, pw].forEach(el => el.addEventListener('input', update));
    update();
  }

  /* ---- Car Price Prediction demo ---- */
  function carPriceEstimate({ presentPrice, kms, age, fuel, transmission }) {
    // Illustrative depreciation formula written for this demo — not the trained
    // Random Forest Regressor. Real model + metrics are in the notebook.
    const depreciation = Math.max(0.35, 1 - age * 0.08);
    const mileageFactor = Math.max(0.7, 1 - (kms / 100000) * 0.15);
    const fuelMultiplier = fuel === 'Diesel' ? 1.05 : fuel === 'CNG' ? 0.9 : 1.0;
    const transmissionMultiplier = transmission === 'Automatic' ? 1.08 : 1.0;
    return presentPrice * depreciation * mileageFactor * fuelMultiplier * transmissionMultiplier;
  }

  function carDemoHTML() {
    return `
      <div class="lab-demo">
        <p class="lab-demo-note">An illustrative depreciation formula written for this demo — not the actual trained Random Forest Regressor. The real model and its evaluation metrics are in the notebook on GitHub.</p>
        <div class="lab-sliders">
          <label class="lab-slider-row">Present price (\u20b9 lakh)<input type="range" min="2" max="30" step="0.5" value="8" id="car-price"><span class="lab-slider-value" id="car-price-v">8.0</span></label>
          <label class="lab-slider-row">Kms driven<input type="range" min="0" max="150000" step="1000" value="40000" id="car-kms"><span class="lab-slider-value" id="car-kms-v">40000</span></label>
          <label class="lab-slider-row">Age (years)<input type="range" min="0" max="15" step="1" value="4" id="car-age"><span class="lab-slider-value" id="car-age-v">4</span></label>
        </div>
        <div class="lab-toggle-group" id="car-fuel-group">
          ${['Petrol', 'Diesel', 'CNG'].map((f, i) => `<button class="lab-toggle-btn ${i === 0 ? 'active' : ''}" data-fuel="${f}">${f}</button>`).join('')}
        </div>
        <div class="lab-toggle-group" id="car-trans-group">
          ${['Manual', 'Automatic'].map((t, i) => `<button class="lab-toggle-btn ${i === 0 ? 'active' : ''}" data-trans="${t}">${t}</button>`).join('')}
        </div>
        <div class="lab-result" id="car-result"></div>
      </div>
    `;
  }

  function bindCarDemo(container) {
    const price = container.querySelector('#car-price'), kms = container.querySelector('#car-kms'), age = container.querySelector('#car-age');
    const priceV = container.querySelector('#car-price-v'), kmsV = container.querySelector('#car-kms-v'), ageV = container.querySelector('#car-age-v');
    const fuelGroup = container.querySelector('#car-fuel-group'), transGroup = container.querySelector('#car-trans-group');
    const result = container.querySelector('#car-result');
    if (!price || !result) return;

    let fuel = 'Petrol', transmission = 'Manual';

    function update() {
      priceV.textContent = (+price.value).toFixed(1);
      kmsV.textContent = kms.value;
      ageV.textContent = age.value;
      const estimate = carPriceEstimate({ presentPrice: +price.value, kms: +kms.value, age: +age.value, fuel, transmission });
      result.innerHTML = `
        <div class="lab-result-title">Estimated resale price: <span class="lab-result-species">\u20b9${estimate.toFixed(2)} lakh</span></div>
        <p class="lab-demo-note" style="margin:10px 0 0;">Depreciated from a \u20b9${(+price.value).toFixed(1)} lakh present price, adjusted for age, mileage, fuel type, and transmission.</p>
      `;
    }
    [price, kms, age].forEach(el => el.addEventListener('input', update));
    fuelGroup.addEventListener('click', (e) => {
      const btn = e.target.closest('.lab-toggle-btn'); if (!btn) return;
      fuel = btn.dataset.fuel;
      fuelGroup.querySelectorAll('.lab-toggle-btn').forEach(b => b.classList.toggle('active', b === btn));
      update();
    });
    transGroup.addEventListener('click', (e) => {
      const btn = e.target.closest('.lab-toggle-btn'); if (!btn) return;
      transmission = btn.dataset.trans;
      transGroup.querySelectorAll('.lab-toggle-btn').forEach(b => b.classList.toggle('active', b === btn));
      update();
    });
    update();
  }

  /* ---- Sales Prediction demo ---- */
  function predictSales({ tv, radio, newspaper }) {
    // Coefficients from the well-known public "Advertising" dataset multiple linear
    // regression example (ISLR) — illustrative reference, not fitted on this project's
    // own data. Full model + evaluation is in the notebook.
    return 2.94 + 0.046 * tv + 0.189 * radio - 0.001 * newspaper;
  }

  function salesDemoHTML() {
    return `
      <div class="lab-demo">
        <p class="lab-demo-note">Coefficients from the well-known public Advertising dataset regression example (used across countless ML tutorials) — illustrative reference, not fitted on this project's own data. The full model and evaluation are in the notebook.</p>
        <div class="lab-sliders">
          <label class="lab-slider-row">TV spend ($k)<input type="range" min="0" max="300" step="5" value="150" id="sales-tv"><span class="lab-slider-value" id="sales-tv-v">150</span></label>
          <label class="lab-slider-row">Radio spend ($k)<input type="range" min="0" max="50" step="1" value="25" id="sales-radio"><span class="lab-slider-value" id="sales-radio-v">25</span></label>
          <label class="lab-slider-row">Newspaper spend ($k)<input type="range" min="0" max="100" step="2" value="30" id="sales-news"><span class="lab-slider-value" id="sales-news-v">30</span></label>
        </div>
        <div class="lab-result" id="sales-result"></div>
      </div>
    `;
  }

  function bindSalesDemo(container) {
    const tv = container.querySelector('#sales-tv'), radio = container.querySelector('#sales-radio'), news = container.querySelector('#sales-news');
    const tvV = container.querySelector('#sales-tv-v'), radioV = container.querySelector('#sales-radio-v'), newsV = container.querySelector('#sales-news-v');
    const result = container.querySelector('#sales-result');
    if (!tv || !result) return;

    function update() {
      tvV.textContent = tv.value; radioV.textContent = radio.value; newsV.textContent = news.value;
      const predicted = predictSales({ tv: +tv.value, radio: +radio.value, newspaper: +news.value });
      const maxContribution = Math.max(0.046 * 300, 0.189 * 50, 0.001 * 100);
      result.innerHTML = `
        <div class="lab-result-title">Predicted sales: <span class="lab-result-species">${predicted.toFixed(1)} units</span></div>
        <div class="chart-list">
          ${chartRowHTML('TV contribution', [{ value: 0.046 * (+tv.value) }], maxContribution, (0.046 * (+tv.value)).toFixed(2))}
          ${chartRowHTML('Radio contribution', [{ value: 0.189 * (+radio.value) }], maxContribution, (0.189 * (+radio.value)).toFixed(2))}
          ${chartRowHTML('Newspaper contribution', [{ value: 0.001 * (+news.value), cls: 'learning-fill' }], maxContribution, (-0.001 * (+news.value)).toFixed(2))}
        </div>
      `;
    }
    [tv, radio, news].forEach(el => el.addEventListener('input', update));
    update();
  }

  /* ---- Unemployment Analysis demo ---- */
  function unemploymentIndex(monthOffset, region) {
    // Illustrative index (baseline = 100), shaped to mirror the widely reported
    // COVID-era spike-and-recovery pattern — not the exact published dataset figures.
    const regionMultiplier = region === 'Urban' ? 1.15 : region === 'Rural' ? 0.9 : 1.0;
    const spike = 130 * Math.exp(-Math.pow((monthOffset - 4) / 2.2, 2));
    return Math.round((100 + spike) * regionMultiplier);
  }

  function unemploymentDemoHTML() {
    return `
      <div class="lab-demo">
        <p class="lab-demo-note">An illustrative index (baseline = 100), shaped to mirror the widely reported COVID-era spike-and-recovery pattern — not the exact published dataset figures. The real regional/temporal numbers are in the notebook's visualizations.</p>
        <div class="lab-toggle-group" id="unemp-region-group">
          ${['National', 'Urban', 'Rural'].map((r, i) => `<button class="lab-toggle-btn ${i === 0 ? 'active' : ''}" data-region="${r}">${r}</button>`).join('')}
        </div>
        <div class="lab-sliders">
          <label class="lab-slider-row">Month (Jan 2020 + n)<input type="range" min="0" max="24" step="1" value="4" id="unemp-month"><span class="lab-slider-value" id="unemp-month-v">4</span></label>
        </div>
        <div class="lab-result" id="unemp-result"></div>
      </div>
    `;
  }

  function bindUnemploymentDemo(container) {
    const month = container.querySelector('#unemp-month');
    const monthV = container.querySelector('#unemp-month-v');
    const regionGroup = container.querySelector('#unemp-region-group');
    const result = container.querySelector('#unemp-result');
    if (!month || !result) return;

    let region = 'National';

    function update() {
      monthV.textContent = month.value;
      const idx = unemploymentIndex(+month.value, region);
      result.innerHTML = `
        <div class="lab-result-title">${region} illustrative index: <span class="lab-result-species">${idx}</span> <span style="color:var(--text-muted); font-size:11px;">(baseline 100)</span></div>
        <div class="chart-list">${chartRowHTML('Relative index', [{ value: idx }], 270, idx)}</div>
      `;
    }
    month.addEventListener('input', update);
    regionGroup.addEventListener('click', (e) => {
      const btn = e.target.closest('.lab-toggle-btn'); if (!btn) return;
      region = btn.dataset.region;
      regionGroup.querySelectorAll('.lab-toggle-btn').forEach(b => b.classList.toggle('active', b === btn));
      update();
    });
    update();
  }

  /* ---- Tata iQ Collections Strategy demo ---- */
  function collectionsRiskScore({ missedPayments, utilization, incomeStable, accountAge }) {
    // Illustrative rule-based scoring for this demo only — not the trained logistic
    // regression coefficients from the actual Forage notebook, which used Geldium's
    // real (non-public) customer data.
    const z = -2 + missedPayments * 0.9 + (utilization / 100) * 2.2 - accountAge * 0.05 + (incomeStable ? -1 : 1);
    return 1 / (1 + Math.exp(-z));
  }

  function collectionsDemoHTML() {
    return `
      <div class="lab-demo">
        <p class="lab-demo-note">An illustrative rule-based risk score for this demo — not the trained logistic regression coefficients from the actual Forage notebook, which used Geldium's real (non-public) customer data.</p>
        <div class="lab-sliders">
          <label class="lab-slider-row">Missed payments (last yr)<input type="range" min="0" max="6" step="1" value="1" id="col-missed"><span class="lab-slider-value" id="col-missed-v">1</span></label>
          <label class="lab-slider-row">Credit utilization (%)<input type="range" min="0" max="100" step="5" value="35" id="col-util"><span class="lab-slider-value" id="col-util-v">35</span></label>
          <label class="lab-slider-row">Account age (yrs)<input type="range" min="0" max="20" step="1" value="5" id="col-age"><span class="lab-slider-value" id="col-age-v">5</span></label>
        </div>
        <div class="lab-toggle-group" id="col-income-group">
          ${['Stable income', 'Unstable income'].map((l, i) => `<button class="lab-toggle-btn ${i === 0 ? 'active' : ''}" data-stable="${i === 0}">${l}</button>`).join('')}
        </div>
        <div class="lab-result" id="col-result"></div>
      </div>
    `;
  }

  function bindCollectionsDemo(container) {
    const missed = container.querySelector('#col-missed'), util = container.querySelector('#col-util'), age = container.querySelector('#col-age');
    const missedV = container.querySelector('#col-missed-v'), utilV = container.querySelector('#col-util-v'), ageV = container.querySelector('#col-age-v');
    const incomeGroup = container.querySelector('#col-income-group');
    const result = container.querySelector('#col-result');
    if (!missed || !result) return;

    let incomeStable = true;

    function update() {
      missedV.textContent = missed.value; utilV.textContent = util.value; ageV.textContent = age.value;
      const probability = collectionsRiskScore({ missedPayments: +missed.value, utilization: +util.value, incomeStable, accountAge: +age.value });
      const pct = Math.round(probability * 100);
      const level = pct < 33 ? 'Low' : pct < 66 ? 'Medium' : 'High';
      result.innerHTML = `
        <div class="lab-result-title">Illustrative delinquency risk: <span class="lab-result-species">${level} (${pct}%)</span></div>
        <div class="chart-list">${chartRowHTML('Risk score', [{ value: pct, cls: level === 'Low' ? '' : 'learning-fill' }], 100, `${pct}%`)}</div>
      `;
    }
    [missed, util, age].forEach(el => el.addEventListener('input', update));
    incomeGroup.addEventListener('click', (e) => {
      const btn = e.target.closest('.lab-toggle-btn'); if (!btn) return;
      incomeStable = btn.dataset.stable === 'true';
      incomeGroup.querySelectorAll('.lab-toggle-btn').forEach(b => b.classList.toggle('active', b === btn));
      update();
    });
    update();
  }

  const LAB_DEMOS = {
    'Iris Flower Classification': { html: irisDemoHTML, bind: bindIrisDemo },
    'Car Price Prediction': { html: carDemoHTML, bind: bindCarDemo },
    'Sales Prediction': { html: salesDemoHTML, bind: bindSalesDemo },
    'Unemployment Analysis in India': { html: unemploymentDemoHTML, bind: bindUnemploymentDemo },
    'Tata iQ — AI-Powered Collections Strategy': { html: collectionsDemoHTML, bind: bindCollectionsDemo },
  };

  function labProjectCardHTML(p) {
    const demo = LAB_DEMOS[p.name];
    return `
      <div class="lab-card reveal">
        <div class="lab-card-header">
          <span class="lab-card-name">${p.name}</span>
          ${demo ? '<span class="lab-card-badge">live demo</span>' : ''}
        </div>
        <p class="lab-card-desc">${p.problem}</p>
        <div class="project-tags">${p.tags.map(t => `<span class="project-tag">${t}</span>`).join('')}</div>
        ${demo ? demo.html() : ''}
        <div class="project-footer" style="margin-top:14px;">
          ${p.link ? `<a href="${p.link}" target="_blank" rel="noopener" class="project-link">view full notebook on GitHub \u2192</a>` : `<span class="project-link disabled">repository not public yet</span>`}
        </div>
      </div>
    `;
  }

  function labHTML() {
    return `
      <div class="window-body lab-app">
        <p class="lab-intro">A results explorer for each shipped project — real problem statements and tech stacks pulled straight from the Projects data, plus a fully interactive, simplified re-implementation for every single one. Adjust the sliders and toggles below to see how live values change the output.</p>
        <div class="lab-list">${PROJECTS.map(labProjectCardHTML).join('')}</div>
      </div>
    `;
  }

  function bindLab(container) {
    Object.values(LAB_DEMOS).forEach(d => d.bind(container));
  }

  /* ---------- Notes.exe (v4.0 — private sticky notes, localStorage only) ---------- */
  const NOTES_STORAGE_KEY = 'sgos_sticky_notes';
  const NOTE_COLORS = [
    { id: 'green', bg: 'rgba(57,255,136,0.14)', border: 'rgba(57,255,136,0.4)' },
    { id: 'blue', bg: 'rgba(79,209,255,0.14)', border: 'rgba(79,209,255,0.4)' },
    { id: 'amber', bg: 'rgba(255,184,77,0.14)', border: 'rgba(255,184,77,0.4)' },
    { id: 'rose', bg: 'rgba(255,107,157,0.14)', border: 'rgba(255,107,157,0.4)' },
  ];

  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }

  function loadStickyNotes() {
    try {
      const saved = JSON.parse(localStorage.getItem(NOTES_STORAGE_KEY));
      if (Array.isArray(saved)) return saved;
    } catch (e) { /* ignore malformed storage */ }
    return [];
  }
  function saveStickyNotes(notes) {
    try { localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(notes)); } catch (e) { /* storage unavailable */ }
  }

  function notesHTML() {
    return `
      <div class="window-body notes-app">
        <div class="notes-toolbar">
          <button class="btn btn-primary notes-add-btn" id="notes-add">+ New Note</button>
          <span class="notes-hint">Private to your browser — nobody else, including Shreyansh, can see these.</span>
        </div>
        <div class="notes-board" id="notes-board"></div>
      </div>
    `;
  }

  function bindNotes(container) {
    const board = container.querySelector('#notes-board');
    const addBtn = container.querySelector('#notes-add');
    if (!board || !addBtn) return;

    let notes = loadStickyNotes();

    function persist() { saveStickyNotes(notes); }

    function renderNotes() {
      board.innerHTML = notes.length
        ? notes.map(noteCardHTML).join('')
        : `<p class="notes-empty">No notes yet — add one and it'll stay right here, just for you, next time you visit.</p>`;
      board.querySelectorAll('.sticky-note').forEach(bindNoteCard);
    }

    function noteCardHTML(note) {
      const color = NOTE_COLORS.find(c => c.id === note.color) || NOTE_COLORS[0];
      return `
        <div class="sticky-note" data-id="${note.id}" style="left:${note.x}px; top:${note.y}px; background:${color.bg}; border-color:${color.border};">
          <div class="sticky-note-handle">
            <span class="sticky-note-colors">${NOTE_COLORS.map(c => `<button class="sticky-color-dot" data-color="${c.id}" style="background:${c.border}" aria-label="${c.id}"></button>`).join('')}</span>
            <button class="sticky-note-close" aria-label="Delete note">\u2715</button>
          </div>
          <textarea class="sticky-note-text" placeholder="Type a note...">${escapeHtml(note.text || '')}</textarea>
        </div>
      `;
    }

    function bindNoteCard(el) {
      const id = el.dataset.id;
      const note = notes.find(n => n.id === id);
      if (!note) return;
      const textarea = el.querySelector('.sticky-note-text');
      const closeBtn = el.querySelector('.sticky-note-close');
      const handle = el.querySelector('.sticky-note-handle');

      textarea.addEventListener('input', () => { note.text = textarea.value; persist(); });
      closeBtn.addEventListener('click', () => {
        notes = notes.filter(n => n.id !== id);
        persist();
        renderNotes();
      });
      el.querySelectorAll('.sticky-color-dot').forEach(dot => {
        dot.addEventListener('click', () => {
          note.color = dot.dataset.color;
          persist();
          renderNotes();
        });
      });

      let dragging = false, startX = 0, startY = 0, startLeft = 0, startTop = 0;
      function onMove(e) {
        if (!dragging) return;
        const dx = e.clientX - startX, dy = e.clientY - startY;
        const maxX = Math.max(0, board.clientWidth - el.offsetWidth);
        const maxY = Math.max(0, board.clientHeight - el.offsetHeight);
        note.x = Math.max(0, Math.min(maxX, startLeft + dx));
        note.y = Math.max(0, Math.min(maxY, startTop + dy));
        el.style.left = note.x + 'px';
        el.style.top = note.y + 'px';
      }
      function onUp() {
        if (!dragging) return;
        dragging = false;
        el.classList.remove('dragging');
        persist();
        window.removeEventListener('mousemove', onMove);
        window.removeEventListener('mouseup', onUp);
      }
      handle.addEventListener('mousedown', (e) => {
        if (e.target.closest('.sticky-color-dot') || e.target.closest('.sticky-note-close')) return;
        dragging = true;
        el.classList.add('dragging');
        startX = e.clientX; startY = e.clientY;
        startLeft = note.x; startTop = note.y;
        window.addEventListener('mousemove', onMove);
        window.addEventListener('mouseup', onUp);
      });
    }

    addBtn.addEventListener('click', () => {
      const offset = (notes.length % 6) * 22;
      notes.push({
        id: 'note-' + Date.now(),
        text: '',
        color: NOTE_COLORS[notes.length % NOTE_COLORS.length].id,
        x: 20 + offset,
        y: 20 + offset,
      });
      persist();
      renderNotes();
    });

    renderNotes();
  }

  /* ---------- Notebook.exe (v4.0 — code-editor styled learning notes) ---------- */
  function formatNotebookBody(body) {
    return body.split('\n').map(line => {
      if (line.startsWith('# ')) return `<span class="nb-heading">${line}</span>`;
      return line || '&nbsp;';
    }).join('\n');
  }

  function notebookHTML() {
    const entries = NOTEBOOK_ENTRIES;
    return `
      <div class="window-body notebook-app">
        <div class="notebook-tabs" id="notebook-tabs">
          ${entries.map((e, i) => `<button class="notebook-tab ${i === 0 ? 'active' : ''}" data-id="${e.id}">${e.filename}</button>`).join('')}
        </div>
        <div class="notebook-pane" id="notebook-pane"></div>
        <p class="notebook-footnote">Seed entries — more get added here as there's something real worth writing about.</p>
      </div>
    `;
  }

  function bindNotebook(container) {
    const tabs = container.querySelector('#notebook-tabs');
    const pane = container.querySelector('#notebook-pane');
    if (!tabs || !pane) return;

    function renderEntry(id) {
      const entry = NOTEBOOK_ENTRIES.find(e => e.id === id) || NOTEBOOK_ENTRIES[0];
      const lines = formatNotebookBody(entry.body).split('\n');
      pane.innerHTML = `
        <div class="notebook-meta">${entry.filename} <span class="notebook-version">${entry.version}</span></div>
        <div class="notebook-code">
          <div class="notebook-gutter">${lines.map((_, i) => `<span>${i + 1}</span>`).join('')}</div>
          <pre class="notebook-content">${lines.join('\n')}</pre>
        </div>
      `;
      tabs.querySelectorAll('.notebook-tab').forEach(t => t.classList.toggle('active', t.dataset.id === entry.id));
    }

    tabs.addEventListener('click', (e) => {
      const btn = e.target.closest('.notebook-tab');
      if (!btn) return;
      renderEntry(btn.dataset.id);
    });

    renderEntry(NOTEBOOK_ENTRIES[0].id);
  }

  function terminalHTML() {
    return `
      <div class="terminal-app">
        <div class="terminal-output" id="term-output" aria-live="polite">
          <div class="t-line">SG-OS Terminal — type 'help' to see available commands.</div>
        </div>
        <div class="terminal-input-row">
          <span class="prompt">guest@sg-os:~$</span>
          <input type="text" class="terminal-input" id="term-input" autocomplete="off" spellcheck="false" autocapitalize="off" aria-label="Terminal input">
        </div>
      </div>
    `;
  }

  /* ============================================================
     2.5. AMBIENT FIELD (v3.5 — Immersion Update)
     A restrained canvas-based background: a slow-drifting particle
     network blended with faint vertical data-flow streams. Reused
     for both the boot sequence and the desktop background. Plain
     Canvas 2D — no Three.js, since it adds nothing a lightweight
     2D loop can't already do for an effect this subtle.
     ============================================================ */
  function createAmbientField(canvas) {
    if (!canvas) return { start: () => {}, stop: () => {} };
    const ctx = canvas.getContext('2d');
    let width = 0, height = 0, dpr = 1;
    let particles = [], streams = [];
    let rafId = null;
    let running = false;

    const LINK_DISTANCE = 130;
    const MAX_PARTICLES = 60;
    const STREAM_COUNT = 10;

    function prefersReducedMotion() {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seedParticles();
      seedStreams();
    }

    function seedParticles() {
      const count = Math.min(MAX_PARTICLES, Math.max(18, Math.floor((width * height) / 26000)));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.16,
        vy: (Math.random() - 0.5) * 0.16,
        r: 1 + Math.random() * 1.1,
      }));
    }

    function seedStreams() {
      streams = Array.from({ length: STREAM_COUNT }, () => ({
        x: Math.random() * width,
        y: Math.random() * height - height,
        len: 50 + Math.random() * 90,
        speed: 0.35 + Math.random() * 0.55,
        alpha: 0.10 + Math.random() * 0.14,
      }));
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);

      streams.forEach(s => {
        const grad = ctx.createLinearGradient(s.x, s.y, s.x, s.y + s.len);
        grad.addColorStop(0, 'rgba(79,209,255,0)');
        grad.addColorStop(1, `rgba(79,209,255,${s.alpha})`);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x, s.y + s.len);
        ctx.stroke();
        s.y += s.speed;
        if (s.y > height) { s.y = -s.len; s.x = Math.random() * width; }
      });

      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
      });
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < LINK_DISTANCE) {
            const alpha = (1 - dist / LINK_DISTANCE) * 0.14;
            ctx.strokeStyle = `rgba(57,255,136,${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      particles.forEach(p => {
        ctx.fillStyle = 'rgba(57,255,136,0.32)';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });

      rafId = requestAnimationFrame(draw);
    }

    let resizeTimer = null;
    function onResize() {
      if (!running) return;
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 150);
    }
    function onVisibility() {
      if (!running) return;
      if (document.hidden) { if (rafId) cancelAnimationFrame(rafId); rafId = null; }
      else if (!rafId) draw();
    }

    function start() {
      if (running || prefersReducedMotion()) return;
      running = true;
      resize();
      draw();
      window.addEventListener('resize', onResize);
      document.addEventListener('visibilitychange', onVisibility);
    }
    function stop() {
      running = false;
      if (rafId) cancelAnimationFrame(rafId);
      rafId = null;
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibility);
      ctx.clearRect(0, 0, width, height);
    }

    return { start, stop };
  }

  const bootAmbient = createAmbientField(document.getElementById('boot-ambient-canvas'));
  const desktopAmbient = createAmbientField(document.getElementById('desktop-ambient-canvas'));
  bootAmbient.start();

  /* ============================================================
     3. BOOT SEQUENCE
     ============================================================ */
  const bootLines = [
    { text: '[SG-OS] BIOS v2.0 — initializing hardware...', cls: 'dim' },
    { text: '[OK] CPU: curiosity-core detected', cls: '' },
    { text: '[OK] Mounting /home/shreyansh...', cls: '' },
    { text: '[OK] Loading Python interpreter...', cls: '' },
    { text: '[OK] Initializing Data Science module...', cls: 'accent' },
    { text: '[OK] Mounting /skills...', cls: '' },
    { text: '[OK] Mounting /projects...', cls: '' },
    { text: '[OK] Starting career_objective.service...', cls: 'accent' },
    { text: '[ OK ] All systems nominal.', cls: '' },
    { text: 'SG-OS v2.0', cls: 'banner' },
  ];

  const bootLog = document.getElementById('boot-log');
  const bootScreen = document.getElementById('boot-screen');
  const skipBootBtn = document.getElementById('skip-boot');
  let bootFinished = false;

  function finishBoot() {
    if (bootFinished) return;
    bootFinished = true;
    bootScreen.classList.add('hidden');
    bootAmbient.stop();
    const restored = restoreWindowsState();
    if (!restored) showMissionBrief();
    else document.body.style.overflow = 'hidden';
  }

  function runBoot() {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.body.style.overflow = 'hidden';

    if (reduce) { finishBoot(); return; }

    let delay = 0;
    bootLines.forEach((line) => {
      const stepDelay = line.cls === 'banner' ? 260 : 190;
      delay += stepDelay;
      setTimeout(() => {
        const div = document.createElement('div');
        div.className = 'line' + (line.cls ? ' ' + line.cls : '');
        div.textContent = line.text;
        bootLog.appendChild(div);
      }, delay);
    });

    setTimeout(finishBoot, delay + 700);
  }

  skipBootBtn.addEventListener('click', finishBoot);

  /* ============================================================
     4. MISSION BRIEF
     ============================================================ */
  const missionBrief = document.getElementById('mission-brief');

  function showMissionBrief() {
    missionBrief.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  function hideMissionBrief() {
    missionBrief.classList.remove('active');
  }

  document.getElementById('initialize-mission').addEventListener('click', () => {
    hideMissionBrief();
    enterDesktop();
  });
  document.getElementById('skip-mission').addEventListener('click', () => {
    hideMissionBrief();
    document.body.style.overflow = '';
  });

  /* ============================================================
     5 + 6 + 7. DESKTOP, WINDOW MANAGER, TASKBAR, START MENU
     ============================================================ */
  const desktopEl = document.getElementById('desktop');
  const windowsLayer = document.getElementById('windows-layer');
  const desktopIconsEl = document.getElementById('desktop-icons');
  const contextMenuEl = document.getElementById('context-menu');

  const APPS = [
    { id: 'about', icon: '\u{1F9D1}\u200d\u{1F4BB}', label: 'About', title: 'about.md', render: aboutHTML },
    { id: 'skills', icon: '\u{1F9E0}', label: 'Skills', title: 'pkg_list', render: () => `<div class="skills-grid window-inner-grid">${skillsHTML()}</div>` },
    { id: 'education', icon: '\u{1F393}', label: 'Education', title: 'education.json', render: () => `<div class="window-body"><div class="spec-grid">${educationRowsHTML()}</div></div>` },
    { id: 'certifications', icon: '\u{1F3C5}', label: 'Certs', title: 'achievements', render: () => `<div class="cert-grid window-inner-grid">${certsHTML()}</div>` },
    { id: 'projects', icon: '\u{1F4C1}', label: 'Projects', title: 'projects/', render: () => `<div class="projects-grid window-inner-grid">${projectsHTML()}</div>`, afterRender: bindProjectExpand },
    { id: 'analytics', icon: '\u{1F4CA}', label: 'Analytics', title: 'analytics.exe', render: analyticsHTML, afterRender: bindAnalytics },
    { id: 'assistant', icon: '\u{1F916}', label: 'Assistant', title: 'assistant.exe', render: assistantHTML, afterRender: bindAssistant },
    { id: 'graph', icon: '\u{1F578}', label: 'Knowledge Graph', title: 'graph.exe', render: graphHTML, afterRender: bindKnowledgeGraph },
    { id: 'vault', icon: '\u{1F3C6}', label: 'Vault', title: 'vault.exe', render: vaultHTML },
    { id: 'lab', icon: '\u{1F52C}', label: 'Research Lab', title: 'lab.exe', render: labHTML, afterRender: bindLab },
    { id: 'notes', icon: '\u{1F4DD}', label: 'Sticky Notes', title: 'notes.exe', render: notesHTML, afterRender: bindNotes },
    { id: 'notebook', icon: '\u{1F4D3}', label: 'Notebook', title: 'notebook.exe', render: notebookHTML, afterRender: bindNotebook },
    { id: 'journey', icon: '\u{1F553}', label: 'Journey', title: 'boot_history', render: () => `<div class="window-body"><div class="timeline">${timelineHTML()}</div></div>` },
    { id: 'terminal', icon: '\u{1F5A5}\uFE0F', label: 'Terminal', title: 'terminal.sh', render: terminalHTML, afterRender: bindTerminal },
    { id: 'contact', icon: '\u2709\uFE0F', label: 'Contact', title: 'connect.sh', render: () => contactHTML('dw-'), afterRender: (el) => bindContactForm(el, 'dw-') },
  ];

  /* ---------- desktop icons: order persisted + drag-to-reorder ---------- */
  function loadIconOrder() {
    try {
      const saved = JSON.parse(localStorage.getItem('sgos_icon_order'));
      if (Array.isArray(saved) && saved.length) return saved;
    } catch (e) { /* ignore malformed storage */ }
    return APPS.map(a => a.id);
  }
  let iconOrder = loadIconOrder();
  function saveIconOrder() { localStorage.setItem('sgos_icon_order', JSON.stringify(iconOrder)); }

  function renderDesktopIcons() {
    const ordered = iconOrder.map(id => APPS.find(a => a.id === id)).filter(Boolean);
    APPS.forEach(a => { if (!ordered.includes(a)) ordered.push(a); });
    desktopIconsEl.innerHTML = ordered.map(app => `
      <button class="desktop-icon" data-app="${app.id}" draggable="true" aria-label="Open ${app.label}">
        <span class="desktop-icon-glyph">${app.icon}</span>
        <span class="desktop-icon-label">${app.label}</span>
      </button>
    `).join('');
    bindDesktopIconEvents();
  }

  function selectIcon(btn) {
    desktopIconsEl.querySelectorAll('.desktop-icon').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
  }

  function bindDesktopIconEvents() {
    desktopIconsEl.querySelectorAll('.desktop-icon').forEach(btn => {
      btn.addEventListener('click', () => selectIcon(btn));
      btn.addEventListener('dblclick', () => openWindow(btn.dataset.app));
      btn.addEventListener('keydown', (e) => { if (e.key === 'Enter') openWindow(btn.dataset.app); });
      btn.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', btn.dataset.app);
        btn.classList.add('dragging-icon');
      });
      btn.addEventListener('dragend', () => btn.classList.remove('dragging-icon'));
      btn.addEventListener('dragover', (e) => e.preventDefault());
      btn.addEventListener('drop', (e) => {
        e.preventDefault();
        const draggedId = e.dataTransfer.getData('text/plain');
        const targetId = btn.dataset.app;
        if (draggedId === targetId) return;
        const from = iconOrder.indexOf(draggedId);
        const to = iconOrder.indexOf(targetId);
        if (from === -1 || to === -1) return;
        iconOrder.splice(from, 1);
        iconOrder.splice(to, 0, draggedId);
        saveIconOrder();
        renderDesktopIcons();
      });
    });
  }

  function sortIconsAlphabetically() {
    iconOrder = APPS.map(a => a.id).sort((a, b) => {
      const la = APPS.find(x => x.id === a).label, lb = APPS.find(x => x.id === b).label;
      return la.localeCompare(lb);
    });
    saveIconOrder();
    renderDesktopIcons();
  }

  desktopIconsEl.addEventListener('click', (e) => {
    if (e.target === desktopIconsEl) desktopIconsEl.querySelectorAll('.desktop-icon').forEach(b => b.classList.remove('selected'));
  });

  /* ---------- context menu ---------- */
  function showContextMenu(x, y, items) {
    contextMenuEl.innerHTML = items.map((it, i) => it.sep
      ? `<div class="context-menu-sep"></div>`
      : `<div class="context-menu-item" data-idx="${i}">${it.label}</div>`
    ).join('');
    const menuW = 220, menuH = items.length * 34 + 12;
    contextMenuEl.style.left = Math.min(x, window.innerWidth - menuW - 8) + 'px';
    contextMenuEl.style.top = Math.min(y, window.innerHeight - menuH - 8) + 'px';
    contextMenuEl.classList.add('active');
    contextMenuEl.querySelectorAll('.context-menu-item').forEach(el => {
      el.addEventListener('click', () => {
        const it = items[+el.dataset.idx];
        if (it && it.action) it.action();
        hideContextMenu();
      });
    });
  }
  function hideContextMenu() { contextMenuEl.classList.remove('active'); }
  document.addEventListener('click', (e) => { if (!contextMenuEl.contains(e.target)) hideContextMenu(); });
  window.addEventListener('scroll', hideContextMenu, true);

  desktopEl.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    const iconBtn = e.target.closest('.desktop-icon');
    if (iconBtn) {
      const label = iconBtn.querySelector('.desktop-icon-label').textContent;
      showContextMenu(e.clientX, e.clientY, [
        { label: `Open ${label}`, action: () => openWindow(iconBtn.dataset.app) },
      ]);
      return;
    }
    showContextMenu(e.clientX, e.clientY, [
      { label: '⟳ Refresh Desktop', action: () => location.reload() },
      { label: '⇅ Sort Icons A–Z', action: sortIconsAlphabetically },
      { sep: true },
      { label: document.body.classList.contains('theme-amber') ? '◐ Switch to Phosphor Theme' : '◐ Switch to Amber Theme', action: toggleTheme },
      { sep: true },
      { label: 'ℹ About SG-OS', action: () => openWindow('about') },
    ]);
  });

  /* ---------- window manager ---------- */
  let zCounter = 600;
  let cascadeCount = 0;
  const openWindows = {};
  const prevRects = {}; // stores pre-maximize geometry per appId, for restore

  function focusWindow(win) {
    zCounter += 1;
    win.style.zIndex = zCounter;
    document.querySelectorAll('.os-window').forEach(w => w.classList.remove('focused'));
    win.classList.add('focused');
    updateTaskbar();
  }

  function closeWindow(appId) {
    const win = openWindows[appId];
    if (!win) return;
    delete openWindows[appId];
    delete prevRects[appId];
    win.classList.add('closing');
    setTimeout(() => win.remove(), 180);
    updateTaskbar();
    saveWindowsState();
  }

  function minimizeWindow(appId) {
    const win = openWindows[appId];
    if (!win) return;
    win.classList.add('minimized');
    updateTaskbar();
    saveWindowsState();
  }

  function restoreWindow(appId) {
    const win = openWindows[appId];
    if (!win) return;
    win.classList.remove('minimized');
    focusWindow(win);
    saveWindowsState();
  }

  function toggleMaximize(appId) {
    const win = openWindows[appId];
    if (!win) return;
    if (win.classList.contains('maximized')) {
      const prev = prevRects[appId];
      if (prev) {
        win.style.left = prev.left; win.style.top = prev.top;
        win.style.width = prev.width; win.style.height = prev.height;
      }
      win.classList.remove('maximized');
    } else {
      prevRects[appId] = {
        left: win.style.left, top: win.style.top,
        width: win.style.width, height: win.style.height,
      };
      win.classList.add('maximized');
    }
    focusWindow(win);
    saveWindowsState();
  }

  function makeDraggable(win, handle) {
    let dragging = false, startX = 0, startY = 0, startLeft = 0, startTop = 0;

    function start(clientX, clientY) {
      if (win.classList.contains('maximized')) return;
      dragging = true;
      focusWindow(win);
      const rect = win.getBoundingClientRect();
      startX = clientX; startY = clientY;
      startLeft = rect.left; startTop = rect.top;
      win.style.left = startLeft + 'px';
      win.style.top = startTop + 'px';
      win.classList.add('dragging');
    }
    function move(clientX, clientY) {
      if (!dragging) return;
      const dx = clientX - startX, dy = clientY - startY;
      win.style.left = Math.max(4, Math.min(window.innerWidth - 80, startLeft + dx)) + 'px';
      win.style.top = Math.max(4, Math.min(window.innerHeight - 40, startTop + dy)) + 'px';
    }
    function end() {
      if (dragging) { dragging = false; win.classList.remove('dragging'); saveWindowsState(); }
    }

    handle.addEventListener('mousedown', (e) => {
      if (e.target.closest('.dot')) return;
      start(e.clientX, e.clientY);
    });
    window.addEventListener('mousemove', (e) => move(e.clientX, e.clientY));
    window.addEventListener('mouseup', end);

    handle.addEventListener('touchstart', (e) => {
      if (e.target.closest('.dot')) return;
      const t = e.touches[0]; start(t.clientX, t.clientY);
    }, { passive: true });
    window.addEventListener('touchmove', (e) => { if (dragging) { const t = e.touches[0]; move(t.clientX, t.clientY); } }, { passive: true });
    window.addEventListener('touchend', end);
  }

  function makeResizable(win, handle) {
    let resizing = false, startX = 0, startY = 0, startW = 0, startH = 0;
    handle.addEventListener('mousedown', (e) => {
      e.stopPropagation();
      if (win.classList.contains('maximized')) return;
      resizing = true;
      focusWindow(win);
      const rect = win.getBoundingClientRect();
      startX = e.clientX; startY = e.clientY; startW = rect.width; startH = rect.height;
    });
    window.addEventListener('mousemove', (e) => {
      if (!resizing) return;
      const dw = e.clientX - startX, dh = e.clientY - startY;
      win.style.width = Math.max(320, Math.min(window.innerWidth * 0.94, startW + dw)) + 'px';
      win.style.height = Math.max(220, Math.min(window.innerHeight * 0.86, startH + dh)) + 'px';
    });
    window.addEventListener('mouseup', () => { if (resizing) { resizing = false; saveWindowsState(); } });
  }

  function openWindow(appId) {
    if (!desktopEl.classList.contains('active')) enterDesktop();
    const app = APPS.find(a => a.id === appId);
    if (!app) return;
    if (openWindows[appId]) { restoreWindow(appId); return; }

    const win = document.createElement('div');
    win.className = 'os-window';
    const mobile = window.innerWidth < 720;
    const offset = mobile ? 0 : (cascadeCount % 6) * 26;
    win.style.left = mobile ? '4vw' : `calc(50% - 270px + ${offset}px)`;
    win.style.top = `${72 + offset}px`;
    cascadeCount++;

    win.innerHTML = `
      <div class="window-bar os-window-bar">
        <span class="dot dot-red win-close" role="button" tabindex="0" aria-label="Close window"></span>
        <span class="dot dot-yellow win-minimize" role="button" tabindex="0" aria-label="Minimize window"></span>
        <span class="dot dot-green win-maximize" role="button" tabindex="0" aria-label="Maximize window"></span>
        <span class="window-title">${app.title}</span>
      </div>
      <div class="os-window-content">${app.render()}</div>
      <div class="resize-handle" aria-hidden="true"></div>
    `;
    function bindDotActivation(selector, action) {
      const el = win.querySelector(selector);
      el.addEventListener('click', (e) => { e.stopPropagation(); action(); });
      el.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); e.stopPropagation(); action(); }
      });
    }
    bindDotActivation('.win-close', () => closeWindow(appId));
    bindDotActivation('.win-minimize', () => minimizeWindow(appId));
    bindDotActivation('.win-maximize', () => toggleMaximize(appId));
    win.querySelector('.os-window-bar').addEventListener('dblclick', (e) => { if (!e.target.closest('.dot')) toggleMaximize(appId); });
    win.addEventListener('mousedown', () => focusWindow(win));

    makeDraggable(win, win.querySelector('.os-window-bar'));
    makeResizable(win, win.querySelector('.resize-handle'));

    windowsLayer.appendChild(win);
    openWindows[appId] = win;
    focusWindow(win);
    if (app.afterRender) app.afterRender(win);
    saveWindowsState();
  }

  /** Opens (or focuses) a window, then scrolls to and briefly highlights
      an element inside it matching `matchText` — used by the upgraded
      Command Palette to jump straight to a specific project/skill/entry. */
  function openAndHighlight(appId, selector, matchText) {
    openWindow(appId);
    setTimeout(() => {
      const win = openWindows[appId];
      if (!win) return;
      const els = win.querySelectorAll(selector);
      const target = Array.from(els).find(el => el.textContent.toLowerCase().includes(matchText.toLowerCase()));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        target.classList.add('palette-highlight');
        setTimeout(() => target.classList.remove('palette-highlight'), 1600);
      }
    }, 220);
  }

  function closeTopWindow() {
    const wins = Array.from(document.querySelectorAll('.os-window:not(.minimized):not(.closing)'));
    if (!wins.length) return false;
    const top = wins.reduce((a, b) => (+b.style.zIndex > +a.style.zIndex ? b : a));
    const appId = Object.keys(openWindows).find(k => openWindows[k] === top);
    if (appId) closeWindow(appId);
    return true;
  }

  /* ---------- taskbar ---------- */
  const taskbarWindowsEl = document.getElementById('taskbar-windows');
  function updateTaskbar() {
    const ids = Object.keys(openWindows);
    taskbarWindowsEl.innerHTML = ids.map(id => {
      const app = APPS.find(a => a.id === id);
      const win = openWindows[id];
      const active = win.classList.contains('focused') && !win.classList.contains('minimized');
      return `
        <div class="taskbar-pill ${active ? 'active' : ''}" data-app="${id}">
          <button class="taskbar-pill-main" data-app="${id}">${app.icon} ${app.label}</button>
          <button class="taskbar-pill-close" data-app="${id}" aria-label="Close ${app.label}" title="Close">✕</button>
        </div>
      `;
    }).join('');
    taskbarWindowsEl.querySelectorAll('.taskbar-pill-main').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.app;
        const win = openWindows[id];
        if (!win) return;
        if (win.classList.contains('minimized')) restoreWindow(id);
        else if (win.classList.contains('focused')) minimizeWindow(id);
        else focusWindow(win);
      });
    });
    taskbarWindowsEl.querySelectorAll('.taskbar-pill-close').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeWindow(btn.dataset.app);
      });
    });
  }

  /* ---------- start menu ---------- */
  const startBtn = document.getElementById('start-btn');
  const startMenu = document.getElementById('start-menu');
  startMenu.innerHTML = APPS.map(app => `
    <button class="start-menu-item" data-app="${app.id}">
      <span class="start-menu-icon">${app.icon}</span> ${app.label}
    </button>
  `).join('') + `
    <div class="start-menu-divider"></div>
    <button class="start-menu-item" id="start-menu-tour">
      <span class="start-menu-icon">\u{1F3AF}</span> Recruiter Tour
    </button>
  `;
  startMenu.querySelectorAll('.start-menu-item[data-app]').forEach(btn => {
    btn.addEventListener('click', () => { openWindow(btn.dataset.app); startMenu.classList.remove('open'); });
  });
  document.getElementById('start-menu-tour').addEventListener('click', () => {
    startMenu.classList.remove('open');
    startTour();
  });
  startBtn.addEventListener('click', (e) => { e.stopPropagation(); startMenu.classList.toggle('open'); });
  document.addEventListener('click', (e) => {
    if (!startMenu.contains(e.target) && e.target !== startBtn) startMenu.classList.remove('open');
  });

  function enterDesktop() {
    hideMissionBrief();
    desktopEl.classList.add('active');
    document.body.style.overflow = 'hidden';
    desktopAmbient.start();
    saveWindowsState();
  }
  function exitDesktop() {
    desktopEl.classList.remove('active');
    document.body.style.overflow = '';
    startMenu.classList.remove('open');
    desktopAmbient.stop();
    saveWindowsState();
  }
  document.getElementById('exit-desktop').addEventListener('click', exitDesktop);
  document.getElementById('enter-desktop-btn').addEventListener('click', enterDesktop);
  document.getElementById('theme-toggle').addEventListener('click', toggleTheme);

  function initCalendarWidget() {
    const el = document.getElementById('widget-calendar');
    if (!el) return;
    const startEntry = TIMELINE.find(t => /^\d{4}$/.test(t.date));
    const startYear = startEntry ? parseInt(startEntry.date, 10) : null;
    const yearsIn = startYear ? (new Date().getFullYear() - startYear) : null;
    const gradMatch = EDUCATION.graduation.match(/\d{4}/);
    const gradYear = gradMatch ? gradMatch[0] : null;

    el.innerHTML = `
      ${gradYear ? `<div class="widget-status-row">\u{1F393} Graduating: ${gradYear}</div>` : ''}
      ${yearsIn !== null ? `<div class="widget-status-row">\u{1F4CD} ${yearsIn} yr${yearsIn === 1 ? '' : 's'} into the journey (since ${startYear})</div>` : ''}
    `;
  }
  initCalendarWidget();

  /* live clock — powers both the taskbar clock and the desktop widget */
  function startClock() {
    const dockDateEl = document.getElementById('dock-clock-date');
    const dockTimeEl = document.getElementById('dock-clock-time');
    const widgetTimeEl = document.getElementById('widget-clock-time');
    const widgetDateEl = document.getElementById('widget-clock-date');
    function tick() {
      const now = new Date();
      const time = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
      const date = now.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' });
      if (dockDateEl) dockDateEl.textContent = date;
      if (dockTimeEl) dockTimeEl.textContent = time;
      if (widgetTimeEl) widgetTimeEl.textContent = time;
      if (widgetDateEl) widgetDateEl.textContent = date;
    }
    tick();
    setInterval(tick, 1000);
  }
  startClock();

  /* ============================================================
     8. TERMINAL APPLICATION — modular command registry
     Add a new command anywhere by adding a key to TERMINAL_COMMANDS.
     ============================================================ */
  const TERMINAL_COMMANDS = {
    help: { desc: 'List all available commands', run: () =>
      Object.keys(TERMINAL_COMMANDS).sort().map(c => `  ${c.padEnd(11)} — ${TERMINAL_COMMANDS[c].desc}`).join('\n') },
    about: { desc: 'Print a short bio', run: () =>
      'Shreyansh Gupta — B.Tech CSE (Data Science), Galgotias College of Engineering & Technology.\nTurning data into insights, curiosity into solutions, and ideas into impactful experiences.' },
    whoami: { desc: 'Print the current user', run: () => 'guest@sg-os — visitor session (viewing shreyansh\'s portfolio)' },
    pwd: { desc: 'Print working directory', run: () => '/home/shreyansh' },
    date: { desc: 'Print current date and time', run: () => new Date().toString() },
    ls: { desc: 'List available modules', run: () =>
      ['about', 'skills', 'education', 'certifications', 'projects', 'analytics', 'assistant', 'graph', 'vault', 'lab', 'notes', 'notebook', 'journey', 'contact'].join('   ') },
    skills: { desc: 'List skill categories', run: () =>
      SKILLS.map(c => `${c.title}: ${c.items.map(i => i.name).join(', ')}`).join('\n') },
    projects: { desc: 'List all projects', run: () =>
      PROJECTS.map(p => `- ${p.name}${p.link ? ' → ' + p.link : ' (repo coming soon)'}`).join('\n') },
    github: { desc: 'Open GitHub profile', run: () => { window.open(GITHUB_URL, '_blank'); return `Opening ${GITHUB_URL} ...`; } },
    resume: { desc: 'View resume', run: () => 'Resume not uploaded yet — check back soon.' },
    open: { desc: "Open an app window — usage: open <app>", run: (args) => {
      const id = args[0];
      const app = APPS.find(a => a.id === id);
      if (!app) return `open: app '${id || ''}' not found. Try: ${APPS.map(a => a.id).join(', ')}`;
      openWindow(id);
      return `Opening ${app.label}...`;
    } },
    clear: { desc: 'Clear the terminal screen', run: () => '__CLEAR__' },
  };

  let terminalHistory = [];
  let terminalHistoryIndex = -1;

  function bindTerminal(container) {
    const output = container.querySelector('#term-output');
    const input = container.querySelector('#term-input');

    function printLine(text, cls) {
      const div = document.createElement('div');
      div.className = 't-line' + (cls ? ' ' + cls : '');
      div.textContent = text;
      output.appendChild(div);
      output.scrollTop = output.scrollHeight;
    }

    function runCommand(raw) {
      const trimmed = raw.trim();
      if (!trimmed) return;
      printLine(`guest@sg-os:~$ ${trimmed}`, 't-cmd');
      terminalHistory.push(trimmed);
      terminalHistoryIndex = terminalHistory.length;

      const [cmd, ...args] = trimmed.split(/\s+/);
      const command = TERMINAL_COMMANDS[cmd.toLowerCase()];
      if (!command) {
        printLine(`command not found: ${cmd} — type 'help' for a list of commands`, 't-error');
        return;
      }
      const result = command.run(args);
      if (result === '__CLEAR__') { output.innerHTML = ''; return; }
      if (result) result.split('\n').forEach(line => printLine(line));
    }

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        runCommand(input.value);
        input.value = '';
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (terminalHistoryIndex > 0) { terminalHistoryIndex--; input.value = terminalHistory[terminalHistoryIndex] || ''; }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (terminalHistoryIndex < terminalHistory.length - 1) { terminalHistoryIndex++; input.value = terminalHistory[terminalHistoryIndex] || ''; }
        else { terminalHistoryIndex = terminalHistory.length; input.value = ''; }
      }
    });
    container.addEventListener('mousedown', (e) => { if (!e.target.closest('.dot')) setTimeout(() => input.focus(), 0); });
    setTimeout(() => input.focus(), 60);
  }

  /* ============================================================
     9. COMMAND PALETTE (Ctrl+K / Cmd+K)
     Searches: apps, projects, skills, journey entries — all open
     the relevant window and (for content items) scroll + highlight.
     ============================================================ */
  const paletteEl = document.getElementById('command-palette');
  const paletteInput = document.getElementById('palette-input');
  const paletteListEl = document.getElementById('palette-list');

  const appCommands = APPS.map(app => ({ label: `Open ${app.label}`, hint: 'app', action: () => openWindow(app.id) }));
  const projectCommands = PROJECTS.map(p => ({ label: p.name, hint: 'project', action: () => openAndHighlight('projects', '.project-name', p.name) }));
  const skillCommands = [];
  SKILLS.forEach(cat => cat.items.forEach(it => {
    skillCommands.push({ label: it.name, hint: 'skill', action: () => openAndHighlight('skills', '.skill-tag', it.name) });
  }));
  const journeyCommands = TIMELINE.map(t => ({ label: t.title, hint: 'journey', action: () => openAndHighlight('journey', '.timeline-title', t.title) }));

  const systemCommands = [
    { label: 'Enter Desktop Mode', hint: 'system', action: () => enterDesktop() },
    { label: 'Exit to Classic Site', hint: 'system', action: () => exitDesktop() },
    { label: 'Start Recruiter Tour', hint: 'system', action: () => startTour() },
    { label: 'Toggle Theme (Phosphor ↔ Amber)', hint: 'system', action: () => toggleTheme() },
    { label: 'Open GitHub Profile', hint: 'link', action: () => window.open(GITHUB_URL, '_blank') },
    { label: 'Open LinkedIn Profile', hint: 'link', action: () => window.open(LINKEDIN_URL, '_blank') },
    { label: 'Email Shreyansh', hint: 'link', action: () => { window.location.href = `mailto:${EMAIL}`; } },
  ];

  const COMMANDS = [...appCommands, ...systemCommands, ...projectCommands, ...skillCommands, ...journeyCommands];

  /* ============================================================
     10. RECRUITER TOUR — guided walkthrough of the highlights
     ============================================================ */
  const TOUR_STEPS = [
    { id: 'projects', title: 'Real, Shipped Projects', text: '5 real ML/data projects, each linked to its own GitHub repo \u2014 not just descriptions.' },
    { id: 'lab', title: 'Live, Interactive Demos', text: 'Every project has a working re-implementation you can play with \u2014 try dragging the sliders.' },
    { id: 'analytics', title: 'Real, Live Metrics', text: 'GitHub stats and skill breakdowns pulled live from real data \u2014 nothing hardcoded.' },
    { id: 'assistant', title: 'Local AI Assistant', text: 'Ask it anything \u2014 it only answers from real portfolio content, no external API involved.' },
    { id: 'graph', title: 'Knowledge Graph', text: 'Click any tool to see exactly which projects actually used it.' },
  ];

  const tourBar = document.getElementById('tour-bar');
  const tourStepCount = document.getElementById('tour-step-count');
  const tourStepTitle = document.getElementById('tour-step-title');
  const tourStepDesc = document.getElementById('tour-step-desc');
  const tourNextBtn = document.getElementById('tour-next');
  const tourSkipBtn = document.getElementById('tour-skip');
  let tourIndex = -1;

  function renderTourStep() {
    const step = TOUR_STEPS[tourIndex];
    tourStepCount.textContent = `${tourIndex + 1}/${TOUR_STEPS.length}`;
    tourStepTitle.textContent = step.title;
    tourStepDesc.textContent = step.text;
    tourNextBtn.textContent = tourIndex === TOUR_STEPS.length - 1 ? 'Finish Tour' : 'Next \u2192';
    openWindow(step.id);
  }

  function startTour() {
    if (!desktopEl.classList.contains('active')) enterDesktop();
    tourIndex = 0;
    tourBar.hidden = false;
    renderTourStep();
  }

  function endTour() {
    tourIndex = -1;
    tourBar.hidden = true;
  }

  tourNextBtn.addEventListener('click', () => {
    tourIndex++;
    if (tourIndex >= TOUR_STEPS.length) { endTour(); return; }
    renderTourStep();
  });
  tourSkipBtn.addEventListener('click', endTour);

  document.getElementById('mission-tour-btn').addEventListener('click', () => {
    hideMissionBrief();
    startTour();
  });

  let currentFiltered = COMMANDS;
  let paletteIndex = 0;

  function updatePaletteDOM() {
    paletteListEl.innerHTML = currentFiltered.length
      ? currentFiltered.map((c, i) => `<li class="palette-item ${i === paletteIndex ? 'active' : ''}" data-idx="${i}"><span>${c.label}</span><span class="palette-item-hint">${c.hint || ''}</span></li>`).join('')
      : '<li class="palette-empty">No matching commands</li>';
  }
  function renderPalette(filter) {
    const f = filter.toLowerCase();
    currentFiltered = COMMANDS.filter(c => c.label.toLowerCase().includes(f));
    paletteIndex = 0;
    updatePaletteDOM();
  }
  function openPalette() {
    paletteEl.classList.add('active');
    paletteInput.value = '';
    renderPalette('');
    setTimeout(() => paletteInput.focus(), 30);
  }
  function closePalette() { paletteEl.classList.remove('active'); }

  document.getElementById('palette-trigger').addEventListener('click', openPalette);
  document.querySelectorAll('.palette-trigger-inline').forEach(btn => btn.addEventListener('click', openPalette));

  paletteEl.addEventListener('mousedown', (e) => { if (e.target === paletteEl) closePalette(); });
  paletteInput.addEventListener('input', (e) => renderPalette(e.target.value));
  paletteListEl.addEventListener('click', (e) => {
    const li = e.target.closest('.palette-item');
    if (!li) return;
    const cmd = currentFiltered[+li.dataset.idx];
    if (cmd) { cmd.action(); closePalette(); }
  });

  document.addEventListener('keydown', (e) => {
    const meta = e.ctrlKey || e.metaKey;
    if (meta && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      paletteEl.classList.contains('active') ? closePalette() : openPalette();
      return;
    }
    if (paletteEl.classList.contains('active')) {
      if (e.key === 'Escape') { closePalette(); return; }
      if (e.key === 'ArrowDown') { e.preventDefault(); paletteIndex = Math.min(paletteIndex + 1, currentFiltered.length - 1); updatePaletteDOM(); return; }
      if (e.key === 'ArrowUp') { e.preventDefault(); paletteIndex = Math.max(paletteIndex - 1, 0); updatePaletteDOM(); return; }
      if (e.key === 'Enter') { e.preventDefault(); const cmd = currentFiltered[paletteIndex]; if (cmd) { cmd.action(); closePalette(); } return; }
      return;
    }
    if (e.key === 'Escape') { if (!hideContextMenuIfOpen()) closeTopWindow(); }
  });
  function hideContextMenuIfOpen() {
    if (contextMenuEl.classList.contains('active')) { hideContextMenu(); return true; }
    return false;
  }

  /* ============================================================
     10. STATE PERSISTENCE (localStorage)
     Remembers open windows (position/size/minimized/maximized) and
     whether Desktop Mode was active, so a refresh picks up where
     you left off.
     ============================================================ */
  function saveWindowsState() {
    const state = Object.keys(openWindows).map(id => {
      const win = openWindows[id];
      const maximized = win.classList.contains('maximized');
      const rect = (maximized && prevRects[id]) ? prevRects[id] : {
        left: win.style.left, top: win.style.top, width: win.style.width, height: win.style.height,
      };
      return {
        id, maximized,
        minimized: win.classList.contains('minimized'),
        left: rect.left, top: rect.top, width: rect.width, height: rect.height,
      };
    });
    localStorage.setItem('sgos_windows', JSON.stringify(state));
    localStorage.setItem('sgos_desktop_active', desktopEl.classList.contains('active') ? 'true' : 'false');
  }

  function restoreWindowsState() {
    let state = [];
    try { state = JSON.parse(localStorage.getItem('sgos_windows')) || []; } catch (e) { state = []; }
    const wasActive = localStorage.getItem('sgos_desktop_active') === 'true';
    if (!wasActive || !state.length) return false;

    enterDesktop();
    state.forEach(s => {
      const app = APPS.find(a => a.id === s.id);
      if (!app) return; // app no longer exists — skip gracefully
      openWindow(s.id);
      const win = openWindows[s.id];
      if (!win) return;
      if (s.left) win.style.left = s.left;
      if (s.top) win.style.top = s.top;
      if (s.width) win.style.width = s.width;
      if (s.height) win.style.height = s.height;
      if (s.maximized) {
        prevRects[s.id] = { left: s.left, top: s.top, width: s.width, height: s.height };
        win.classList.add('maximized');
      }
      if (s.minimized) win.classList.add('minimized');
    });
    updateTaskbar();
    return true;
  }

  /* now that all window-manager functions exist, render the icons */
  renderDesktopIcons();
  runBoot();

  /* ============================================================
     11. CLASSIC PAGE WIRING
     ============================================================ */
  const heroLines = [
    { text: '$ cat status.txt', cls: '' },
    { text: 'role: Data Science Student', cls: 'dim' },
    { text: 'college: Galgotias College of Engineering & Technology', cls: 'dim' },
    { text: 'focus: Python, SQL, ML, Power BI', cls: 'dim' },
    { text: 'status: open_to_internships = true', cls: 'blue' },
    { text: '$ _', cls: '' },
  ];
  const heroBody = document.getElementById('hero-terminal-body');
  function typeHero() {
    let i = 0;
    function next() {
      if (i >= heroLines.length) return;
      const line = heroLines[i];
      const div = document.createElement('div');
      div.className = line.cls;
      heroBody.appendChild(div);
      let c = 0;
      const interval = setInterval(() => {
        div.textContent = line.text.slice(0, c + 1);
        c++;
        if (c >= line.text.length) {
          clearInterval(interval);
          i++;
          setTimeout(next, 220);
        }
      }, 18);
    }
    next();
  }
  setTimeout(typeHero, bootFinished ? 300 : 2400);

  document.getElementById('process-table-body').innerHTML = processesRowsHTML();
  document.getElementById('skills-grid').innerHTML = skillsHTML();
  document.getElementById('education-spec').innerHTML = educationRowsHTML();
  document.getElementById('cert-grid').innerHTML = certsHTML();
  document.getElementById('projects-grid').innerHTML = projectsHTML();
  bindProjectExpand(document.getElementById('projects-grid'));
  document.getElementById('timeline').innerHTML = timelineHTML();
  bindContactForm(document, '');

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  const progressFill = document.getElementById('progress-fill');
  const navLinks = document.querySelectorAll('.sysbar-nav a');
  const navSections = Array.from(navLinks).map(a => document.querySelector(a.getAttribute('href')));

  function onScroll() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0;
    progressFill.style.width = pct + '%';

    let activeIdx = 0;
    navSections.forEach((sec, i) => {
      if (sec && sec.getBoundingClientRect().top <= 120) activeIdx = i;
    });
    navLinks.forEach((a, i) => a.classList.toggle('active', i === activeIdx));
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const navToggle = document.getElementById('nav-toggle');
  const sysbarNav = document.getElementById('sysbar-nav');
  navToggle.addEventListener('click', () => sysbarNav.classList.toggle('open'));
  navLinks.forEach(a => a.addEventListener('click', () => sysbarNav.classList.remove('open')));

});
