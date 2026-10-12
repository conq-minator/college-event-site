'use strict';

const EVENTS = [
  { id: 'innovate-ignite-2026', name: 'INNOVATE & IGNITE 2026 – Mini Project Expo', date: '2026-10-18T09:30:00+05:30', venue: 'Room 201 & 202, Gurukul Campus, Kolkata', category: 'technical', tag: 'PROJECT EXPO', price: '₹200', city: 'Kolkata', state: 'WEST BENGAL', image: 'images/event-innovate.png', description: 'Student ideas for a brighter tomorrow. Showcase hardware & software prototypes with industry judging.' },
  { id: 'hackitsnova-2026', name: 'HacKITSnova 2026', date: '2026-10-24T09:00:00+05:30', venue: 'Division of ECE, IEM Gurukul Campus', category: 'technical', tag: 'HACKATHON', price: '₹750', city: 'Kolkata', state: 'WEST BENGAL', image: 'images/event-hackitsnova.png', description: 'International level hackathon presenting 36 hours of continuous engineering and rapid prototyping.' },
  { id: 'ieee-hackitsnova', name: "IEEE Sponsored International Hackathon - HacKITSnova'26", date: '2026-10-25T10:00:00+05:30', venue: 'IEEE Student Branch, IEM Kolkata', category: 'technical', tag: 'HACKATHON', price: '₹750', city: 'Kolkata', state: 'WEST BENGAL', image: 'images/event-ieee.png', description: 'Flagship IEEE international hackathon exploring AI robotics, smart IoT, and scalable cloud solutions.' },
  { id: 'tech-arena-2026', name: 'TECH ARENA 2026', date: '2026-11-06T14:00:00+05:30', venue: 'National Online Code Arena', category: 'technical', tag: 'CODING CONTEST', price: 'FREE', city: 'Online', state: 'ONLINE', image: 'images/hackathon.jpg', description: 'Compete today, build tomorrow. National-level coding contest testing algorithmic problem solving.' },
  { id: 'ecothon-2026', name: 'EcoThon & CADathon 2026', date: '2026-11-15T09:00:00+05:30', venue: 'IoT & Design Studios, Gurukul Campus, Kolkata', category: 'workshop', tag: 'HACKATHON', price: '₹250', city: 'Kolkata', state: 'WEST BENGAL', image: 'images/workshop.jpg', description: '12-hour open innovation sprint delivering green tech solutions, 3D CAD models, and smart hardware.' },
  { id: 'babys-first-website', name: "Baby's First Website", date: '2026-11-22T11:00:00+05:30', venue: 'AIML Computing Lab, IEM Kolkata', category: 'workshop', tag: 'WORKSHOP', price: 'FREE', city: 'Kolkata', state: 'WEST BENGAL', image: 'images/tech-fest.jpg', description: 'Friendly, hands-on workshop tailored for beginners to build and launch their first personal website.' },
  { id: 'sharod-sandhya', name: 'Sharod Sandhya – Cultural Night', date: '2026-12-04T17:00:00+05:30', venue: 'Main Institute Auditorium, Kolkata', category: 'cultural', tag: 'CULTURAL', price: 'FREE', city: 'Kolkata', state: 'WEST BENGAL', image: 'images/cultural-night.jpg', description: 'Pre-fest cultural evening featuring musical performances, dance ensembles, and student drama.' },
  { id: 'ai-summit-2026', name: 'Industry AI & LLM Systems Summit', date: '2026-12-11T14:30:00+05:30', venue: 'Seminar Hall, 2nd Floor, Gurukul Campus, Kolkata', category: 'lecture', tag: 'LECTURE', price: 'FREE', city: 'Kolkata', state: 'WEST BENGAL', image: 'images/guest-lecture.jpg', description: 'Leading researchers discuss deployment strategies for open-weight language models on edge devices.' }
];

const eventList = document.getElementById('eventList');
const eventEmpty = document.getElementById('eventEmpty');
const eventSelect = document.getElementById('eventSelect');
const eventFilters = document.getElementById('eventFilters');
let activeCategory = 'all';
let searchQuery = '';

function formatDate(iso) {
  const d = new Date(iso);
  return {
    day: d.toLocaleDateString('en-IN', { day: '2-digit' }),
    month: d.toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }),
    full: d.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }),
    time: d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
  };
}

function renderEvents() {
  const sorted = [...EVENTS].sort((a, b) => new Date(a.date) - new Date(b.date));
  eventList.innerHTML = sorted.map(ev => {
    const dt = formatDate(ev.date);
    const isFree = ev.price.toUpperCase() === 'FREE';
    return `<li class="event-card" data-category="${ev.category}" data-id="${ev.id}">
      <div class="event-card-media">
        <img src="${ev.image}" alt="${ev.name}" loading="lazy">
        <span class="badge-tag">${ev.tag}</span>
        <span class="badge-price ${isFree ? 'is-free' : ''}">${ev.price}</span>
      </div>
      <div class="event-card-body">
        <h3 class="event-card-title">${ev.name}</h3>
        <div class="event-card-loc">
          <svg class="loc-pin" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
          <div class="loc-text"><span class="loc-city">${ev.city}</span><span class="loc-state">${ev.state}</span></div>
        </div>
        <p class="event-card-desc">${ev.description}</p>
        <div class="event-card-date">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="2"></line><line x1="8" y1="2" x2="8" y2="2"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
          <span>${dt.full} · ${dt.time}</span>
        </div>
        <button type="button" class="btn-card-action" data-event-target="${ev.id}">View details ↗</button>
      </div>
    </li>`;
  }).join('');

  eventSelect.innerHTML = '<option value="">Select an event</option>';
  sorted.forEach(ev => {
    const opt = document.createElement('option');
    opt.value = ev.id;
    opt.textContent = `${ev.name} (${formatDate(ev.date).day} ${formatDate(ev.date).month})`;
    eventSelect.appendChild(opt);
  });
  applyFilters();
}

function applyFilters() {
  const cards = document.querySelectorAll('.event-card');
  let visibleCount = 0;
  const q = searchQuery.toLowerCase().trim();
  cards.forEach(card => {
    const cat = card.dataset.category;
    const ev = EVENTS.find(e => e.id === card.dataset.id);
    const matchesCat = activeCategory === 'all' || cat === activeCategory;
    const matchesSearch = !q || (ev && (
      ev.name.toLowerCase().includes(q) || ev.description.toLowerCase().includes(q) || ev.city.toLowerCase().includes(q) || ev.tag.toLowerCase().includes(q)
    ));
    const show = matchesCat && matchesSearch;
    card.classList.toggle('is-hidden', !show);
    if (show) visibleCount++;
  });
  eventEmpty.hidden = visibleCount > 0;
}

function initSearchAndControls() {
  if (!document.getElementById('eventSearchWrap') && eventFilters) {
    const searchWrap = document.createElement('div');
    searchWrap.id = 'eventSearchWrap';
    searchWrap.className = 'search-bar-wrap';
    searchWrap.innerHTML = `
      <div class="search-input-box">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="search-icon" aria-hidden="true"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        <input type="text" id="eventSearchInput" placeholder="Search for events, hackathons, fests..." autocomplete="off">
        <button type="button" class="btn-search-action" id="eventSearchBtn">Search ↗</button>
      </div>`;
    eventFilters.parentNode.insertBefore(searchWrap, eventFilters);

    const sortBadge = document.createElement('span');
    sortBadge.className = 'sort-indicator';
    sortBadge.textContent = 'SORTED BY DATE · ASC';
    eventFilters.appendChild(sortBadge);

    const input = document.getElementById('eventSearchInput');
    input.addEventListener('input', e => {
      searchQuery = e.target.value;
      applyFilters();
    });
    document.getElementById('eventSearchBtn').addEventListener('click', () => input.focus());
  }
}

eventFilters.addEventListener('click', e => {
  const btn = e.target.closest('.chip');
  if (!btn) return;
  document.querySelectorAll('.chip').forEach(c => c.classList.remove('is-active'));
  btn.classList.add('is-active');
  activeCategory = btn.dataset.filter;
  applyFilters();
});

eventList.addEventListener('click', e => {
  const btn = e.target.closest('[data-event-target]');
  if (!btn) return;
  eventSelect.value = btn.dataset.eventTarget;
  const regSection = document.getElementById('register');
  if (regSection) {
    regSection.scrollIntoView({ behavior: 'smooth' });
    const nameInput = document.getElementById('studentName');
    if (nameInput) setTimeout(() => nameInput.focus(), 350);
  }
});

function enhanceHero() {
  const heroH1 = document.querySelector('.hero-copy h1');
  if (heroH1) {
    heroH1.innerHTML = 'Discover <em class="hero-italic">amazing</em><br>college fests &amp; <span class="hero-highlight">events.</span>';
  }
  const heroLead = document.querySelector('.hero-lead');
  if (heroLead) {
    heroLead.innerHTML = 'Explore hackathons, workshops, coding arenas and cultural nights happening across campus — and the ones worth a train ticket.';
  }
  const heroKicker = document.querySelector('.hero-kicker');
  if (heroKicker) {
    heroKicker.innerHTML = 'IEM KOLKATA · DEPARTMENT OF CSE (AIML) · 2026–27';
  }
  const heroCopy = document.querySelector('.hero-copy');
  if (heroCopy && !document.getElementById('heroStatsRow')) {
    const statsRow = document.createElement('div');
    statsRow.id = 'heroStatsRow';
    statsRow.className = 'hero-stats';
    statsRow.innerHTML = `
      <div class="stat-cell"><strong>50K+</strong><span>STUDENTS REACHED</span></div>
      <div class="stat-divider"></div>
      <div class="stat-cell"><strong>38+</strong><span>CAMPUSES</span></div>
      <div class="stat-divider"></div>
      <div class="stat-cell"><strong>223+</strong><span>EVENTS</span></div>`;
    heroCopy.appendChild(statsRow);
  }
}

const cd = {
  title: document.getElementById('cdTitle'),
  meta: document.getElementById('cdMeta'),
  days: document.getElementById('cdDays'),
  hours: document.getElementById('cdHours'),
  mins: document.getElementById('cdMins'),
  secs: document.getElementById('cdSecs')
};

function getNextEvent() {
  const now = Date.now();
  return [...EVENTS].filter(ev => new Date(ev.date).getTime() > now).sort((a, b) => new Date(a.date) - new Date(b.date))[0] || EVENTS[0];
}

const pad = n => String(n).padStart(2, '0');

function updateCountdown() {
  const next = getNextEvent();
  if (!next) return;
  const dt = formatDate(next.date);
  cd.title.textContent = next.name;
  cd.meta.textContent = `${dt.full} · ${next.venue}`;
  let diff = Math.max(0, new Date(next.date).getTime() - Date.now());
  const days = Math.floor(diff / 86400000); diff -= days * 86400000;
  const hours = Math.floor(diff / 3600000); diff -= hours * 3600000;
  const mins = Math.floor(diff / 60000); diff -= mins * 60000;
  const secs = Math.floor(diff / 1000);
  cd.days.textContent = pad(days);
  cd.hours.textContent = pad(hours);
  cd.mins.textContent = pad(mins);
  cd.secs.textContent = pad(secs);
}

const clockEl = document.getElementById('clock');
function updateClock() {
  clockEl.textContent = new Date().toLocaleTimeString('en-IN', {
    timeZone: 'Asia/Kolkata',
    hour12: false,
    hour: '2-digit', minute: '2-digit', second: '2-digit'
  });
}

const RULES = {
  name:  { re: /^[A-Za-z][A-Za-z .'-]{1,59}$/, msg: 'Enter your full name (letters, spaces, dots only).' },
  roll:  { re: /^\d{10}$/, msg: 'Roll number must be exactly 10 digits.' },
  email: { re: /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/, msg: 'Enter a valid email address.' },
  phone: { re: /^[6-9]\d{9}$/, msg: 'Enter a valid 10-digit mobile number.' }
};

function setError(id, message) {
  const field = document.getElementById(id);
  const err = document.getElementById('err-' + id);
  if (field) field.classList.toggle('is-invalid', Boolean(message));
  if (err) err.textContent = message || '';
  return !message;
}

function validateText(id, rule) {
  const value = document.getElementById(id).value.trim();
  if (!value) return setError(id, 'This field is required.');
  if (rule && !rule.re.test(value)) return setError(id, rule.msg);
  return setError(id, '');
}

const regForm = document.getElementById('regForm');
const regStatus = document.getElementById('regStatus');

regForm.addEventListener('submit', e => {
  e.preventDefault();
  const checks = [
    validateText('studentName', RULES.name),
    validateText('rollNo', RULES.roll),
    setError('department', document.getElementById('department').value ? '' : 'Select your department.'),
    validateText('email', RULES.email),
    validateText('phone', RULES.phone),
    setError('gender', regForm.querySelector('input[name="gender"]:checked') ? '' : 'Select an option.'),
    setError('eventSelect', document.getElementById('eventSelect').value ? '' : 'Select the event.')
  ];
  if (checks.every(Boolean)) {
    const name = document.getElementById('studentName').value.trim();
    const eventName = eventSelect.options[eventSelect.selectedIndex].text;
    regStatus.className = 'form-status ok';
    regStatus.textContent = `Registered! Thanks ${name} — you're registered for ${eventName}.`;
    regForm.reset();
    regForm.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
  } else {
    regStatus.className = 'form-status bad';
    regStatus.textContent = 'Please correct the highlighted fields before submitting.';
    const firstBad = regForm.querySelector('.is-invalid');
    if (firstBad) firstBad.focus();
  }
});

regForm.addEventListener('input', e => {
  const id = e.target.id;
  if (!id || !document.getElementById('err-' + id)) return;
  if (e.target.classList.contains('is-invalid')) {
    const map = { studentName: RULES.name, rollNo: RULES.roll, email: RULES.email, phone: RULES.phone };
    if (map[id]) validateText(id, map[id]);
    else if (e.target.tagName === 'SELECT') setError(id, e.target.value ? '' : 'This field is required.');
  }
});

const fbForm = document.getElementById('feedbackForm');
const fbStatus = document.getElementById('fbStatus');

fbForm.addEventListener('submit', e => {
  e.preventDefault();
  const msg = document.getElementById('fbMessage').value.trim();
  const checks = [
    validateText('fbName', RULES.name),
    validateText('fbEmail', RULES.email),
    setError('fbMessage', !msg ? 'Write a message before sending.' : (msg.length < 15 ? 'Message must be at least 15 characters.' : ''))
  ];
  if (checks.every(Boolean)) {
    fbStatus.className = 'form-status ok';
    fbStatus.textContent = 'Thank you! Your feedback has been sent to the coordinators.';
    fbForm.reset();
  } else {
    fbStatus.className = 'form-status bad';
    fbStatus.textContent = 'Fix the highlighted fields and try again.';
  }
});

const navToggle = document.getElementById('navToggle');
const siteNav = document.getElementById('siteNav');
navToggle.addEventListener('click', () => {
  const open = siteNav.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(open));
  navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
});

siteNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  siteNav.classList.remove('is-open');
  navToggle.setAttribute('aria-expanded', 'false');
}));

const sections = document.querySelectorAll('main section[id]');
const navLinks = siteNav.querySelectorAll('a[href^="#"]');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navLinks.forEach(a => a.classList.toggle('is-current', a.getAttribute('href') === '#' + entry.target.id));
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  sections.forEach(s => observer.observe(s));
}

enhanceHero();
initSearchAndControls();
renderEvents();
updateCountdown();
updateClock();
setInterval(() => {
  updateCountdown();
  updateClock();
}, 1000);
