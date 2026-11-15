(function () {
  'use strict';
  const { UI, Art } = window, c = UI.c, $ = (id) => document.getElementById(id);
  const store = {
    get: (k) => { try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return null; } },
    raw: (k) => { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: (k, v) => { try { localStorage.setItem(k, v); } catch (e) { /* storage unavailable */ } },
    del: (k) => { try { localStorage.removeItem(k); } catch (e) { /* storage unavailable */ } }
  };
  const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
  const nameOf = (email) => email.split('@')[0].replace(/[._-]+/g, ' ').trim().split(' ').map(cap).join(' ') || 'Patient';

  UI.mount('#auth-pattern', Art.pattern('pointer-events-none absolute inset-0 h-full w-full text-white/10'));
  UI.mount('#auth-photo', UI.photo('cutout', 'h-full w-full object-cover'));

  const field = (id, label, type, o = {}) => {
    const attrs = `id="${id}" type="${type}" autocomplete="${o.ac || 'off'}" placeholder="${o.ph || ''}" ${o.mode ? `inputmode="${o.mode}"` : ''}`;
    const input = o.pass
      ? `<div class="relative"><input ${attrs} class="${c.input} pr-12"><button type="button" data-toggle="${id}" aria-label="Show password" aria-pressed="false" class="absolute right-0 top-0 inline-flex h-[46px] w-11 items-center justify-center text-slate-600 transition hover:text-navy focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-teal/40">${UI.icon('eye', 'h-5 w-5')}</button></div>`
      : `<input ${attrs} class="${c.input}">`;
    return `<div class="mb-4"><label for="${id}" class="${c.label}">${label}</label>${input}${o.after || ''}</div>`;
  };
  const submit = (label) => `<button type="submit" class="${c.btnPrimary} mt-2 w-full disabled:cursor-not-allowed disabled:opacity-70"><span data-spin class="hidden h-4 w-4 animate-spin rounded-full border-2 border-navy border-t-transparent" aria-hidden="true"></span><span>${label}</span></button>`;
  const link = 'min-h-[44px] text-sm font-bold text-teal-dark underline decoration-2 underline-offset-4 transition hover:text-navy focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-teal/40';
  const check = (id, body) => `<label for="${id}" class="flex min-h-[44px] items-center gap-3 text-sm"><input id="${id}" type="checkbox" class="h-5 w-5 shrink-0 accent-teal">${body}</label>`;

  UI.mount('#panel-signin', `<form id="signin-form" novalidate>
    ${field('si-id', 'Email or mobile number', 'text', { ac: 'username', ph: 'name@email.com or 01XXX-XXXXXX' })}
    ${field('si-pass', 'Password', 'password', { ac: 'current-password', ph: 'Your password', pass: true })}
    <div class="mb-4 flex flex-wrap items-center justify-between gap-x-4">${check('si-remember', 'Remember me')}<button type="button" id="forgot" class="${link}">Forgot password?</button></div>
    ${submit('Sign in')}</form>`);
  UI.mount('#panel-signup', `<form id="signup-form" novalidate>
    ${field('su-name', 'Full name', 'text', { ac: 'name', ph: 'Your full name' })}
    ${field('su-phone', 'Mobile number', 'tel', { ac: 'tel', ph: '01XXX-XXXXXX', mode: 'tel' })}
    ${field('su-email', 'Email address', 'email', { ac: 'email', ph: 'name@email.com' })}
    ${field('su-pass', 'Password', 'password', { ac: 'new-password', ph: 'At least 8 characters', pass: true, after: `<div id="meter" class="mt-2 grid grid-cols-4 gap-1" aria-hidden="true">${'<span class="h-1.5 bg-ice-2 transition duration-300"></span>'.repeat(4)}</div><p id="meter-text" class="mt-1 text-xs font-semibold text-slate-600" aria-live="polite">Use letters, numbers and a symbol</p>` })}
    ${field('su-confirm', 'Confirm password', 'password', { ac: 'new-password', ph: 'Repeat your password', pass: true })}
    <div class="mb-4">${check('su-terms', '<span>I agree to the <a href="terms.html" class="font-bold text-teal-dark underline underline-offset-2 hover:text-navy">Terms</a> and <a href="privacy.html" class="font-bold text-teal-dark underline underline-offset-2 hover:text-navy">Privacy Policy</a></span>')}<p id="terms-error" class="${c.error}" role="alert"></p></div>
    ${submit('Create account')}</form>`);
  UI.mount('#panel-reset', `<h2 class="font-heading text-2xl font-extrabold text-navy">Reset your password</h2><p class="mb-6 mt-1 text-sm">Enter your email and we will send a reset link.</p>
    <form id="reset-form" novalidate>${field('rs-email', 'Email address', 'email', { ac: 'email', ph: 'name@email.com' })}${submit('Send reset link')}</form>
    <button type="button" id="back" class="${link} mt-4 inline-flex items-center gap-2">${UI.icon('arrow-left', 'h-4 w-4')}Back to sign in</button>`);

  /* Tabs and views */
  const tabs = [$('tab-signin'), $('tab-signup')], panels = [$('panel-signin'), $('panel-signup')];
  const copy = [['Welcome back', 'Sign in to manage your appointments.'], ['Create your account', 'Save your details for faster booking.']];
  function setTab(i) {
    $('tabs-wrap').hidden = false; $('panel-reset').hidden = true;
    tabs.forEach((t, n) => {
      const on = n === i;
      t.setAttribute('aria-selected', on); t.tabIndex = on ? 0 : -1;
      t.classList.toggle('text-navy', on); t.classList.toggle('text-slate-600', !on);
      panels[n].hidden = !on;
    });
    $('tab-slider').classList.toggle('translate-x-full', i === 1);
    $('auth-heading').textContent = copy[i][0]; $('auth-sub').textContent = copy[i][1];
  }
  tabs.forEach((t, i) => {
    t.addEventListener('click', () => setTab(i));
    t.addEventListener('keydown', (e) => {
      const k = { ArrowRight: 1, ArrowLeft: 0, Home: 0, End: 1 }[e.key];
      if (k === undefined) return;
      e.preventDefault(); setTab(k); tabs[k].focus();
    });
  });
  $('forgot').addEventListener('click', () => { $('tabs-wrap').hidden = true; panels.forEach((p) => { p.hidden = true; }); $('panel-reset').hidden = false; $('rs-email').focus(); });
  $('back').addEventListener('click', () => { setTab(0); $('forgot').focus(); });
  setTab(UI.url.param('mode') === 'signup' ? 1 : 0);
  const saved = store.raw('sh_auth_id');
  if (saved) { $('si-id').value = saved; $('si-remember').checked = true; }

  /* Password toggle, live validation reset, strength meter */
  document.addEventListener('click', (e) => {
    const b = e.target.closest('[data-toggle]');
    if (!b) return;
    const i = $(b.dataset.toggle), show = i.type === 'password';
    i.type = show ? 'text' : 'password';
    b.innerHTML = UI.icon(show ? 'eye-off' : 'eye', 'h-5 w-5');
    b.setAttribute('aria-pressed', show); b.setAttribute('aria-label', show ? 'Hide password' : 'Show password');
  });
  document.addEventListener('input', (e) => { if (e.target.matches('input:not([type=checkbox])')) UI.setError(e.target, ''); });
  $('su-terms').addEventListener('change', () => { $('terms-error').textContent = ''; });
  const tones = ['bg-rose-500', 'bg-amber-500', 'bg-teal', 'bg-teal-dark'], words = ['Too short', 'Weak', 'Fair', 'Good', 'Strong'];
  const score = (p) => (p.length >= 8) + (/[a-z]/.test(p) && /[A-Z]/.test(p)) + /\d/.test(p) + /[^A-Za-z0-9]/.test(p);
  $('su-pass').addEventListener('input', (e) => {
    const p = e.target.value, s = p ? score(p) : 0;
    [...$('meter').children].forEach((seg, i) => { seg.classList.remove(...tones, 'bg-ice-2'); seg.classList.add(i < s ? tones[s - 1] : 'bg-ice-2'); });
    $('meter-text').textContent = p ? 'Strength: ' + words[s] : 'Use letters, numbers and a symbol';
  });

  /* Submit handling */
  const busy = (f, on) => { const b = f.querySelector('[type=submit]'); b.disabled = on; b.querySelector('[data-spin]').classList.toggle('hidden', !on); };
  const check1 = (rules) => { let first = null; rules.forEach(([i, bad, m]) => { UI.setError(i, bad ? m : ''); if (bad && !first) first = i; }); if (first) first.focus(); return !first; };
  const finish = (f, user, msg) => {
    busy(f, true);
    setTimeout(() => {
      store.set('sh_user', JSON.stringify(user));
      UI.toast(msg, 'success');
      setTimeout(() => { location.href = 'index.html'; }, 1200);
    }, 700);
  };

  $('signin-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const id = $('si-id').value.trim(), pw = $('si-pass').value, isMail = UI.validate.email(id);
    if (!check1([[$('si-id'), !isMail && !UI.validate.phone(id), 'Enter a valid email or mobile number'], [$('si-pass'), pw.length < 6, 'Password must be at least 6 characters']])) return;
    $('si-remember').checked ? store.set('sh_auth_id', id) : store.del('sh_auth_id');
    const old = store.get('sh_user'), same = old && old.email && old.email.toLowerCase() === id.toLowerCase();
    const user = same ? old : { name: isMail ? nameOf(id) : (old && old.name) || 'Patient', email: isMail ? id : (old && old.email) || '' };
    finish(e.target, user, 'Welcome back, ' + user.name.split(' ')[0]);
  });

  $('signup-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = $('su-name').value.trim(), email = $('su-email').value.trim(), pw = $('su-pass').value;
    const ok = check1([
      [$('su-name'), name.length < 2, 'Enter your full name'],
      [$('su-phone'), !UI.validate.phone($('su-phone').value.trim()), 'Enter a valid Bangladesh mobile number'],
      [$('su-email'), !UI.validate.email(email), 'Enter a valid email address'],
      [$('su-pass'), pw.length < 8 || score(pw) < 2, 'Use 8+ characters with letters and numbers'],
      [$('su-confirm'), $('su-confirm').value !== pw || !pw, 'Passwords do not match']
    ]);
    const agreed = $('su-terms').checked;
    $('terms-error').textContent = agreed ? '' : 'Please accept the terms to continue';
    if (!ok || !agreed) { if (ok) $('su-terms').focus(); return; }
    finish(e.target, { name, email }, 'Account created. Welcome, ' + name.split(' ')[0]);
  });

  $('reset-form').addEventListener('submit', (e) => {
    e.preventDefault();
    if (!check1([[$('rs-email'), !UI.validate.email($('rs-email').value.trim()), 'Enter a valid email address']])) return;
    UI.toast('Reset link sent to your email', 'success');
    e.target.reset(); setTab(0);
  });
})();
