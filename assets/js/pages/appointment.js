(function () {
  'use strict';
  const { c } = UI, S = SITE.services, C = SITE.chambers;
  const $ = (s) => document.querySelector(s), pad = (n) => String(n).padStart(2, '0');
  const iso = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const parseIso = (s) => {
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s || '');
    if (!m) return null;
    const d = new Date(+m[1], +m[2] - 1, +m[3]);
    return iso(d) === s ? d : null;
  };
  const toMin = (v) => { const [h, m = 0] = String(v).split(':').map(Number); return h * 60 + m; };
  const esc = (s) => String(s).replace(/[&<>"]/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch]));

  const today = new Date(); today.setHours(0, 0, 0, 0);
  const maxDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 90);
  const monthIdx = (d) => d.getFullYear() * 12 + d.getMonth();
  const VISIT = { new: 'New patient', followup: 'Follow-up (within 30 days)' };
  const BADGE = 'inline-flex h-10 w-10 shrink-0 items-center justify-center font-heading text-sm font-extrabold';
  const RC = 'block min-h-[44px] rounded border-2 border-ice-2 bg-white p-4 pr-10 transition duration-300 hover:border-teal peer-checked:border-teal peer-checked:bg-teal-soft peer-focus-visible:ring-4 peer-focus-visible:ring-teal/40';
  const TICK = 'absolute right-2 top-2 hidden h-6 w-6 items-center justify-center bg-navy text-white peer-checked:flex';
  const DAY = 'h-11 rounded text-sm font-semibold transition duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-teal/40 ';
  const SLOT = 'min-h-[44px] rounded border-2 px-2 text-sm font-semibold transition duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-teal/40 ';

  const st = { service: '', chamber: '', date: '', time: '', visit: 'new' };
  let view = { y: today.getFullYear(), m: today.getMonth() };
  const chamber = () => (st.chamber ? UI.find.chamber(st.chamber) : null);
  const fee = () => { const ch = chamber(); return ch ? ch.fee[st.visit === 'new' ? 'new' : 'followup'] : null; };
  const dateOk = (s, ch) => { const d = parseIso(s); return !!(d && ch && ch.weekdays.includes(d.getDay()) && d >= today && d <= maxDate); };
  const clearErr = (k) => { $('#err-' + k).textContent = ''; };

  /* Prefill from query string and saved user */
  const q = { service: UI.url.param('service'), chamber: UI.url.param('chamber'), date: UI.url.param('date') };
  if (q.service && UI.find.service(q.service)) st.service = q.service;
  if (q.chamber && UI.find.chamber(q.chamber)) st.chamber = q.chamber;
  if (dateOk(q.date, chamber())) { st.date = q.date; const d = parseIso(q.date); view = { y: d.getFullYear(), m: d.getMonth() }; }
  let user = {};
  try { user = JSON.parse(localStorage.getItem('sh_user')) || {}; } catch (err) { user = {}; }
  $('#f-name').value = UI.url.param('name') || user.name || '';
  $('#f-phone').value = UI.url.param('phone') || '';

  UI.mount('#page-head', UI.pageHeader({
    eyebrow: 'Appointment',
    title: 'Book your <span class="text-teal">consultation</span>',
    text: 'Choose a service, chamber, date and time. Your ticket updates as you go and an SMS confirms the booking.',
    photo: 'listening'
  }));
  UI.mount('#cal-prev', UI.icon('chevron-left', 'h-5 w-5'));
  UI.mount('#cal-next', UI.icon('chevron-right', 'h-5 w-5'));

  UI.mount('#service-list', S.map((s) => `<label class="relative block"><input type="radio" name="service" value="${s.slug}" class="peer sr-only"${st.service === s.slug ? ' checked' : ''}>
    <span class="${RC} flex items-start gap-3"><span class="inline-flex h-10 w-10 shrink-0 items-center justify-center bg-teal text-navy">${UI.icon(s.icon, 'h-5 w-5')}</span>
    <span class="min-w-0"><span class="block font-heading text-sm font-bold text-navy">${s.title}</span><span class="mt-0.5 block text-xs text-body">${s.duration}, ${s.fee}</span></span></span>
    <span class="${TICK}" aria-hidden="true">${UI.icon('check', 'h-4 w-4')}</span></label>`).join(''));

  UI.mount('#chamber-list', C.map((ch) => `<label class="relative block"><input type="radio" name="chamber" value="${ch.id}" class="peer sr-only"${st.chamber === ch.id ? ' checked' : ''}>
    <span class="${RC}"><span class="flex flex-wrap items-baseline justify-between gap-x-4"><span class="font-heading text-sm font-bold text-navy">${ch.name}</span><span class="text-sm font-extrabold text-teal-dark">New ${UI.money(ch.fee.new)}</span></span>
    <span class="mt-1 block text-xs text-body">${ch.area}, ${ch.city}</span>
    <span class="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs font-semibold text-navy"><span>${ch.days.join(', ')}</span><span>${ch.time}</span><span>Follow-up ${UI.money(ch.fee.followup)}</span></span></span>
    <span class="${TICK}" aria-hidden="true">${UI.icon('check', 'h-4 w-4')}</span></label>`).join(''));

  /* Calendar */
  function renderCal(focusDate) {
    const { y, m } = view, ch = chamber(), n = new Date(y, m + 1, 0).getDate();
    const cells = Array(new Date(y, m, 1).getDay()).fill('<span></span>');
    for (let d = 1; d <= n; d++) {
      const dt = new Date(y, m, d), s = iso(dt), ok = dateOk(s, ch), sel = s === st.date;
      const label = dt.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) + (ok ? '' : ', unavailable');
      cells.push(`<button type="button" data-date="${s}" aria-label="${label}" aria-pressed="${sel}"${ok ? '' : ' disabled'} class="${DAY}${sel ? 'bg-teal text-navy' : ok ? 'border-2 border-ice-2 bg-white text-navy hover:border-teal' : 'cursor-not-allowed bg-ice text-slate-400'}">${d}</button>`);
    }
    $('#cal-label').textContent = new Date(y, m, 1).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
    $('#cal-prev').disabled = y * 12 + m <= monthIdx(today);
    $('#cal-next').disabled = y * 12 + m >= monthIdx(maxDate);
    $('#cal-hint').textContent = ch ? `${ch.name} sees patients on ${ch.days.join(', ')}.` : 'Choose a chamber to see its clinic days.';
    UI.mount('#cal-grid', cells.join(''));
    if (focusDate) { const b = $(`#cal-grid [data-date="${focusDate}"]`); if (b) b.focus(); }
  }

  /* Time slots: booked slots are derived from the date, chamber and slot index */
  function renderSlots(focusTime) {
    const ch = chamber(), msg = (t) => UI.mount('#slots', `<p class="col-span-full text-sm text-body">${t}</p>`);
    if (!ch) return msg('Choose a chamber first.');
    if (!st.date) return msg('Pick a date to see available times.');
    const now = new Date(), isToday = st.date === iso(now), nowMin = now.getHours() * 60 + now.getMinutes();
    const seed = +st.date.replace(/-/g, '') + ch.id.length * 97, end = toMin(ch.end);
    let html = '', i = 0;
    for (let mm = toMin(ch.start); mm + ch.slotMin <= end; mm += ch.slotMin, i++) {
      if (isToday && mm <= nowMin) continue;
      const t = `${pad(Math.floor(mm / 60))}:${pad(mm % 60)}`, booked = (Math.imul(seed ^ (i * 40503), 2654435761) >>> 0) % 100 < 28, sel = t === st.time;
      html += `<button type="button" data-time="${t}" aria-pressed="${sel}" aria-label="${UI.time12(t)}${booked ? ', booked' : ''}"${booked ? ' disabled' : ''} class="${SLOT}${sel ? 'border-teal bg-teal text-navy' : booked ? 'cursor-not-allowed border-ice-2 bg-ice text-slate-400 line-through' : 'border-slate-300 bg-white text-navy hover:border-teal'}">${UI.time12(t)}</button>`;
    }
    if (!html) return msg('No slots are left today. Please choose another date.');
    UI.mount('#slots', html);
    if (focusTime) { const b = $(`#slots [data-time="${focusTime}"]`); if (b) b.focus(); }
  }

  /* Ticket, badges and progressive dimming */
  const detailsOk = () => { const a = +$('#f-age').value; return $('#f-name').value.trim().length >= 3 && !!UI.validate.phone($('#f-phone').value.trim()) && Number.isInteger(a) && a >= 1 && a <= 100; };
  function sync() {
    const s = st.service ? UI.find.service(st.service) : null, ch = chamber();
    const set = (id, v) => { const el = $('#t-' + id); el.textContent = v || 'Not selected'; el.classList.toggle('text-white', !!v); el.classList.toggle('text-slate-300', !v); };
    set('service', s && s.title); set('chamber', ch && ch.name); set('date', st.date && UI.formatDate(st.date)); set('time', st.time && UI.time12(st.time)); set('visit', VISIT[st.visit]);
    $('#t-fee').textContent = ch ? UI.money(fee()) : '\u09F3 --';
    const ok = [st.service, st.chamber, st.date, st.time, detailsOk()];
    ['service', 'chamber', 'date', 'time', 'details'].forEach((k, i) => {
      $('#panel-' + k).classList.toggle('opacity-60', i > 0 && !ok[i - 1]);
      $('#b-' + k).className = BADGE + (ok[i] ? ' bg-teal text-navy' : ' bg-navy text-white');
      UI.mount('#b-' + k, ok[i] ? UI.icon('check', 'h-5 w-5') : String(i + 1));
    });
  }

  const form = $('#booking-form');
  form.addEventListener('change', (e) => {
    const t = e.target;
    if (t.name === 'service') { st.service = t.value; clearErr('service'); }
    else if (t.name === 'chamber') {
      st.chamber = t.value; st.time = '';
      if (!dateOk(st.date, chamber())) st.date = '';
      clearErr('chamber'); renderCal(); renderSlots();
    } else if (t.name === 'visit') st.visit = t.value;
    sync();
  });
  form.addEventListener('input', (e) => {
    if (e.target.matches('#f-name,#f-phone,#f-age')) { UI.setError(e.target, ''); sync(); }
  });
  $('#cal').addEventListener('click', (e) => {
    const b = e.target.closest('button');
    if (!b || b.disabled) return;
    if (b.dataset.nav) {
      const d = new Date(view.y, view.m + +b.dataset.nav, 1);
      view = { y: d.getFullYear(), m: d.getMonth() }; renderCal();
    } else if (b.dataset.date) {
      st.date = b.dataset.date; st.time = ''; clearErr('date');
      renderCal(st.date); renderSlots(); sync();
    }
  });
  $('#slots').addEventListener('click', (e) => {
    const b = e.target.closest('[data-time]');
    if (!b || b.disabled) return;
    st.time = b.dataset.time; clearErr('time'); renderSlots(st.time); sync();
  });

  /* Validation */
  function validate() {
    const bad = [];
    const group = (k, msg, fail) => { $('#err-' + k).textContent = fail ? msg : ''; if (fail) bad.push($('#panel-' + k)); };
    const field = (el, fail, msg) => { UI.setError(el, fail ? msg : ''); if (fail) bad.push(el); };
    group('service', 'Choose a service.', !st.service);
    group('chamber', 'Choose a chamber.', !st.chamber);
    group('date', 'Pick an available date.', !st.date);
    group('time', 'Select a time slot.', !st.time);
    const age = +$('#f-age').value;
    field($('#f-name'), $('#f-name').value.trim().length < 3, 'Enter your full name.');
    field($('#f-phone'), !UI.validate.phone($('#f-phone').value.trim()), 'Enter a valid Bangladesh mobile number, for example 01712 345678.');
    field($('#f-age'), !(Number.isInteger(age) && age >= 1 && age <= 100), 'Enter an age between 1 and 100.');
    group('visit', 'Choose a visit type.', !VISIT[st.visit]);
    return bad[0];
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const bad = validate();
    if (bad) {
      if (bad.matches('input,textarea')) { bad.scrollIntoView({ behavior: 'smooth', block: 'center' }); bad.focus({ preventScroll: true }); }
      else bad.scrollIntoView({ behavior: 'smooth', block: 'start' });
      UI.toast('Please complete the highlighted steps.', 'error');
      return;
    }
    confirmBooking();
  });

  /* Confirmation */
  function confirmBooking() {
    const s = UI.find.service(st.service), ch = chamber(), now = new Date();
    const b = {
      ref: `SH-${String(now.getFullYear()).slice(2)}${pad(now.getMonth() + 1)}-${1000 + Math.floor(Math.random() * 9000)}`,
      service: s.slug, serviceTitle: s.title, chamber: ch.id, chamberName: ch.name, address: ch.address,
      date: st.date, time: st.time, slotMin: ch.slotMin, visit: st.visit, fee: fee(),
      name: $('#f-name').value.trim(), phone: $('#f-phone').value.trim(), age: +$('#f-age').value, note: $('#f-note').value.trim(), createdAt: now.toISOString()
    };
    try { localStorage.setItem('sh_last_booking', JSON.stringify(b)); } catch (err) { /* storage unavailable */ }
    const rows = [['Service', b.serviceTitle], ['Chamber', `${b.chamberName}, ${b.address}`], ['Date', UI.formatDate(b.date)], ['Time', UI.time12(b.time)], ['Visit', VISIT[b.visit]], ['Patient', `${b.name}, age ${b.age}`], ['Consultation fee', UI.money(b.fee)]];
    $('#booking-wrap').classList.add('hidden');
    $('#success').classList.remove('hidden');
    UI.mount('#success', `<div class="mx-auto max-w-2xl rounded-md border border-ice-2 border-t-4 border-t-teal bg-white p-6 shadow-card sm:p-10" role="status">
      <span class="inline-flex h-16 w-16 animate-wipe items-center justify-center bg-teal text-navy">${UI.icon('check', 'h-8 w-8')}</span>
      <h2 id="success-title" tabindex="-1" class="${c.h2} mt-6 focus:outline-none">Appointment confirmed</h2>
      <p class="${c.lead} mt-3">Thank you, ${esc(b.name.split(' ')[0])}. A confirmation SMS will reach you within 2 hours.</p>
      <div class="${c.panelIce} mt-6"><p class="text-xs font-bold uppercase tracking-wider text-teal-dark">Booking reference</p><p class="mt-1 font-heading text-3xl font-extrabold text-navy">${b.ref}</p></div>
      <dl class="mt-6 divide-y divide-ice-2">${rows.map((r) => `<div class="flex flex-col gap-1 py-3 sm:flex-row sm:justify-between sm:gap-6"><dt class="shrink-0 text-xs font-bold uppercase tracking-wider text-teal-dark">${r[0]}</dt><dd class="text-sm font-semibold text-navy sm:text-right">${esc(r[1])}</dd></div>`).join('')}</dl>
      <div class="mt-8 flex flex-wrap gap-3"><button type="button" id="ics" class="${c.btnPrimary}">${UI.icon('calendar-check', 'h-4 w-4')} Add to calendar</button><a href="appointment.html" class="${c.btnOutline}">Book another</a></div></div>`);
    $('#ics').addEventListener('click', () => downloadIcs(b));
    const h = $('#success-title');
    h.scrollIntoView({ behavior: 'smooth', block: 'center' });
    h.focus({ preventScroll: true });
    UI.toast('Appointment confirmed.', 'success');
  }

  function downloadIcs(b) {
    const start = toMin(b.time), stamp = (m) => `${b.date.replace(/-/g, '')}T${pad(Math.floor(m / 60))}${pad(m % 60)}00`;
    const t = (v) => String(v).replace(/[,;]/g, '\\$&');
    const lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Dr. Rukhsana Alam//Appointments//EN', 'BEGIN:VEVENT', `UID:${b.ref}@drrukhsanaalam.com`,
      `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`, `DTSTART:${stamp(start)}`, `DTEND:${stamp(start + b.slotMin)}`,
      `SUMMARY:${t('Appointment with Dr. Rukhsana Alam')}`, `LOCATION:${t(b.chamberName + ', ' + b.address)}`,
      `DESCRIPTION:${t(`${b.serviceTitle}. ${VISIT[b.visit]}. Reference ${b.ref}. Fee ${UI.money(b.fee)}.`)}`, 'END:VEVENT', 'END:VCALENDAR'];
    const url = URL.createObjectURL(new Blob([lines.join('\r\n')], { type: 'text/calendar;charset=utf-8' }));
    const a = document.createElement('a');
    a.href = url; a.download = `appointment-${b.ref}.ics`;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  renderCal(); renderSlots(); sync();
})();
