// Pillar accordion — multiple may open at once
document.querySelectorAll('.pillar-head').forEach((btn) => {
  btn.addEventListener('click', () => {
    const pillar = btn.closest('.pillar');
    const open = pillar.getAttribute('data-open') === 'true';
    pillar.setAttribute('data-open', open ? 'false' : 'true');
    btn.setAttribute('aria-expanded', open ? 'false' : 'true');
  });
});

// Anliegen chip group — single-select radio
document.querySelectorAll('.chip-group').forEach((group) => {
  const chips = group.querySelectorAll('.chip');
  const hidden = document.getElementById('f-anliegen');
  chips.forEach((c) => {
    c.addEventListener('click', () => {
      chips.forEach((x) => {
        x.classList.remove('is-selected');
        x.setAttribute('aria-checked', 'false');
      });
      c.classList.add('is-selected');
      c.setAttribute('aria-checked', 'true');
      if (hidden) hidden.value = c.textContent.trim();
    });
  });
});

// Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const menu = document.querySelector('#mobile-menu');
if (toggle && menu) {
  toggle.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  menu.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => {
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}
