// Pillar accordion — multiple may open at once
document.querySelectorAll('.pillar-head').forEach((btn) => {
  btn.addEventListener('click', () => {
    const pillar = btn.closest('.pillar');
    const open = pillar.getAttribute('data-open') === 'true';
    pillar.setAttribute('data-open', open ? 'false' : 'true');
    btn.setAttribute('aria-expanded', open ? 'false' : 'true');
  });
});

// Anliegen chip group — multi-select (each chip toggles independently)
document.querySelectorAll('.chip-group').forEach((group) => {
  const chips = group.querySelectorAll('.chip');
  const hidden = document.getElementById('f-anliegen');
  const sync = () => {
    if (!hidden) return;
    hidden.value = Array.from(chips)
      .filter((c) => c.classList.contains('is-selected'))
      .map((c) => c.textContent.trim())
      .join(', ');
  };
  chips.forEach((c) => {
    c.addEventListener('click', () => {
      const on = c.classList.toggle('is-selected');
      c.setAttribute('aria-checked', on ? 'true' : 'false');
      sync();
    });
  });
});

// Contact form — submit via fetch so we can show an inline toast instead of
// redirecting to Web3Forms' default thank-you page. Falls back to a normal
// form POST if fetch is unavailable.
document.querySelectorAll('.kontakt-form').forEach((form) => {
  const toast = form.querySelector('.form-toast');
  const submit = form.querySelector('.form-submit');
  const msgs = {
    sending: form.dataset.toastSending || 'Sending …',
    success: form.dataset.toastSuccess || 'Thanks — your message has arrived.',
    error: form.dataset.toastError || 'Something went wrong. Please try again.',
  };

  const setToast = (state, html) => {
    if (!toast) return;
    toast.setAttribute('data-state', state);
    toast.innerHTML = html;
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    setToast('sending', msgs.sending);
    if (submit) submit.disabled = true;

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success !== false) {
        setToast('success', msgs.success);
        form.reset();
        // Clear chip selections + hidden anliegen value
        form.querySelectorAll('.chip.is-selected').forEach((c) => {
          c.classList.remove('is-selected');
          c.setAttribute('aria-checked', 'false');
        });
        const hidden = form.querySelector('#f-anliegen');
        if (hidden) hidden.value = '';
      } else {
        setToast('error', msgs.error);
      }
    } catch {
      setToast('error', msgs.error);
    } finally {
      if (submit) submit.disabled = false;
    }
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

// About — sync portrait dimensions to the body-text height so the image's
// top edge aligns with the subline ("Seit über zehn Jahren...") and the
// bottom edge aligns with the last paragraph. Width derived from the 4:5
// aspect ratio so the portrait framing stays unchanged.
(function syncAboutPortrait() {
  const text = document.querySelector('#uber .about-text');
  const img = document.querySelector('#uber .about-img');
  if (!text || !img) return;

  const RATIO = 4 / 5; // width / height

  function apply() {
    // Mobile (single-column layout) — clear inline overrides and let CSS take over
    if (window.matchMedia('(max-width: 880px)').matches) {
      img.style.width = '';
      img.style.height = '';
      return;
    }
    const h = text.getBoundingClientRect().height;
    if (h <= 0) return;
    img.style.height = `${h}px`;
    img.style.width = `${h * RATIO}px`;
  }

  // Run on initial load
  apply();
  // After web fonts settle (text height may change once fonts swap in)
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(apply);
  }
  // After all images/resources finish loading
  window.addEventListener('load', apply);
  // On viewport resize
  window.addEventListener('resize', apply);
  // React to any change in text content size (font loading, dynamic content)
  if ('ResizeObserver' in window) {
    new ResizeObserver(apply).observe(text);
  }
})();

// Language switcher — preserve the current section anchor when switching
// so /#kontakt → /en/#kontakt, keeping the user at the same spot.
document.querySelectorAll('[data-lang-switch]').forEach((link) => {
  link.addEventListener('click', (e) => {
    const a = e.currentTarget;
    const hash = window.location.hash;
    if (hash) {
      e.preventDefault();
      const base = a.getAttribute('href');
      window.location.href = base + hash;
    }
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
