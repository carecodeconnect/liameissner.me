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

// Aktuelles carousel — infinite loop via cloned tiles at both ends.
// We clone all originals once before and once after, then silently jump
// scrollLeft by one "cycle" (n × tile-step) whenever the user scrolls
// into the clone zone. Because clones are visually identical to the
// originals, the jump is imperceptible — feels like an endless loop.
document.querySelectorAll('#aktuell .carousel-track').forEach((track) => {
  const originals = Array.from(track.children);
  const n = originals.length;
  if (n < 2) return;

  const cloneTile = (src) => {
    const c = src.cloneNode(true);
    c.setAttribute('aria-hidden', 'true');
    c.dataset.clone = 'true';
    // Keep clones out of the tab order
    c.querySelectorAll('a, button, [tabindex]').forEach((el) => {
      el.setAttribute('tabindex', '-1');
    });
    return c;
  };

  // Prepend clones in reverse order so the sequence is preserved
  for (let i = n - 1; i >= 0; i--) {
    track.insertBefore(cloneTile(originals[i]), track.firstChild);
  }
  // Append clones in forward order
  for (let i = 0; i < n; i++) {
    track.appendChild(cloneTile(originals[i]));
  }

  let step = 0;
  let cycle = 0;

  const measure = () => {
    const styles = getComputedStyle(track);
    const gap = parseInt(styles.columnGap || styles.gap || '0', 10) || 0;
    step = originals[0].getBoundingClientRect().width + gap;
    cycle = step * n;
  };

  const jumpTo = (left) => {
    const prev = track.style.scrollBehavior;
    track.style.scrollBehavior = 'auto';
    track.scrollLeft = left;
    // Force reflow so the next smooth scroll starts from the new position
    void track.offsetWidth;
    track.style.scrollBehavior = prev || '';
  };

  // Land on the first original after layout settles
  const recenter = () => {
    measure();
    if (cycle > 0) jumpTo(cycle);
  };
  requestAnimationFrame(recenter);
  window.addEventListener('load', () => requestAnimationFrame(recenter));

  // Re-center on resize (debounced; user loses position but state stays sane)
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(recenter, 150);
  });

  // After any scroll settles, wrap if we've crossed into the clone zone
  let wrapping = false;
  const onSettled = () => {
    if (wrapping) return;
    measure();
    if (cycle === 0) return;
    const sl = track.scrollLeft;
    const eps = 2;
    if (sl >= 2 * cycle - eps) {
      wrapping = true;
      jumpTo(sl - cycle);
      requestAnimationFrame(() => { wrapping = false; });
    } else if (sl <= cycle - step + eps) {
      wrapping = true;
      jumpTo(sl + cycle);
      requestAnimationFrame(() => { wrapping = false; });
    }
  };

  if ('onscrollend' in window) {
    track.addEventListener('scrollend', onSettled);
  } else {
    // Fallback for older browsers: debounce scroll events
    let scrollDebounce;
    track.addEventListener('scroll', () => {
      clearTimeout(scrollDebounce);
      scrollDebounce = setTimeout(onSettled, 150);
    });
  }
});

// Prev/next buttons — scroll by one tile-step; wrap handler above closes the loop
document.querySelectorAll('.carousel-nav .carousel-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    const section = btn.closest('section');
    const track = section?.querySelector('.carousel-track');
    if (!track) return;
    // Prefer a real (non-clone) tile for measurement
    const tile = track.querySelector('.tile:not([data-clone])') || track.querySelector('.tile');
    if (!tile) return;
    const styles = getComputedStyle(track);
    const gap = parseInt(styles.columnGap || styles.gap || '0', 10) || 0;
    const step = tile.getBoundingClientRect().width + gap;
    const dir = btn.dataset.dir === 'prev' ? -1 : 1;
    track.scrollBy({ left: step * dir, behavior: 'smooth' });
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
