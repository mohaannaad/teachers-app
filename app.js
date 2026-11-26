/* =========================================================
   Teachers Syndicate — Mobile App (prototype logic)
   Demo login: 501 / 123
   ========================================================= */
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const app = $('#app');
  const icon = (id, cls = 'ic') => `<svg class="${cls}"><use href="#i-${id}"/></svg>`;

  /* ---------------- Data ---------------- */
  const SERVICES = [
    { id: 'renew', cat: 'sub', icon: 'refresh', title: 'تجديد الإشتراك السنوي', desc: 'سداد اشتراك العام الجديد إلكترونياً' },
    { id: 'new-batch', cat: 'sub', icon: 'user-plus', title: 'إشتراك دفعة جديدة', desc: 'تسجيل خريجي الدفعات الجديدة بالنقابة' },
    { id: 'arrears', cat: 'sub', icon: 'alert', title: 'متأخرات الأعضاء', desc: 'استعلام وسداد المتأخرات المستحقة', soon: true },
    { id: 'certificate', cat: 'cert', icon: 'award', title: 'طلب شهادة', desc: 'شهادة قيد، عضوية، أو خطاب لجهة' },
    { id: 'verify', cat: 'cert', icon: 'shield', title: 'التحقق من الشهادات', desc: 'تأكد من صحة شهادة صادرة من النقابة', soon: true },
    { id: 'trips', cat: 'social', icon: 'sun', title: 'مصايف و رحلات', desc: 'احجز المصايف والرحلات المخصصة للأعضاء' },
    { id: 'aid', cat: 'social', icon: 'heart', title: 'طلبات الإعانات', desc: 'تقديم طلب إعانة اجتماعية أو صحية', soon: true },
    { id: 'pension', cat: 'social', icon: 'wallet', title: 'معاش الأعضاء', desc: 'متابعة واستعلام معاش العضو', soon: true },
    { id: 'heirs', cat: 'social', icon: 'users', title: 'معاش الورثة', desc: 'تقديم ومتابعة طلبات معاش الورثة', soon: true },
    { id: 'courses', cat: 'train', icon: 'book', title: 'الدورات التدريبية', desc: 'سجّل في دورات التنمية المهنية' },
    { id: 'facilities', cat: 'train', icon: 'building', title: 'تسجيل المنشآت', desc: 'تسجيل المدارس والمنشآت التعليمية', soon: true },
    { id: 'branches', cat: 'all', icon: 'pin', title: 'الفروع', desc: 'عناوين وأرقام النقابات الفرعية' },
  ];
  const CAT_NAMES = { sub: 'الاشتراكات', cert: 'الشهادات', social: 'الخدمات الاجتماعية', train: 'التدريب والمنشآت', all: 'عام' };

  const RECEIPTS = [
    { no: 'RC-11902', title: 'اشتراك سنوي 2026', date: '12 يناير 2026', amount: 220, status: ['ok', 'مسدد'] },
    { no: 'RC-10477', title: 'شهادة قيد', date: '3 سبتمبر 2025', amount: 30, status: ['ok', 'مسدد'] },
    { no: 'RC-09821', title: 'اشتراك سنوي 2025', date: '20 فبراير 2025', amount: 200, status: ['ok', 'مسدد'] },
    { no: 'RC-08113', title: 'حجز مصيف رأس البر', date: '1 يوليو 2024', amount: 1850, status: ['ok', 'مسدد'] },
  ];
  const CERTS = [
    { no: 'CR-20481', title: 'شهادة قيد', to: 'مديرية التربية والتعليم', date: '22 نوفمبر 2026', status: ['warn', 'قيد المراجعة'], progress: 45 },
    { no: 'CR-19310', title: 'شهادة عضوية', to: 'السفارة السعودية', date: '5 أكتوبر 2026', status: ['ok', 'جاهزة'], progress: 100, pdf: true },
    { no: 'CR-17702', title: 'خطاب لمن يهمه الأمر', to: 'بنك مصر', date: '14 مايو 2026', status: ['bad', 'مرفوض'], progress: 100 },
  ];
  const MY_COURSES = [
    { title: 'التعلم الرقمي وأدوات الفصل الذكي', date: 'يبدأ 1 ديسمبر', hours: '24 ساعة', status: ['ok', 'مقبول'], progress: 0 },
    { title: 'استراتيجيات التدريس الحديثة', date: 'انتهت أغسطس 2026', hours: '18 ساعة', status: ['navy', 'مكتملة'], progress: 100 },
    { title: 'إدارة الفصل الدراسي', date: 'جارية', hours: '12 ساعة', status: ['warn', 'جارية'], progress: 60 },
  ];
  const COURSES = [
    { title: 'التعلم الرقمي وأدوات الفصل الذكي', trainer: 'د. هبة عبد الرحمن', date: '1 ديسمبر', hours: '24 ساعة', seats: [28, 35], price: 0, grad: ['#2a2770', '#15124b'], icon: 'sparkle', tag: 'مجانية' },
    { title: 'إعداد المعلم للاختبارات الإلكترونية', trainer: 'أ. كريم فتحي', date: '10 ديسمبر', hours: '16 ساعة', seats: [12, 30], price: 150, grad: ['#ff8a3d', '#e4500a'], icon: 'file', tag: 'جديدة' },
    { title: 'التربية الخاصة والدمج', trainer: 'د. منى السيد', date: '5 يناير', hours: '30 ساعة', seats: [33, 40], price: 200, grad: ['#3caf85', '#1f7f5c'], icon: 'heart', tag: 'معتمدة' },
    { title: 'اللغة الإنجليزية للمعلمين', trainer: 'Mr. Adam Hany', date: '15 يناير', hours: '40 ساعة', seats: [8, 25], price: 350, grad: ['#5a68ad', '#2a2770'], icon: 'globe', tag: 'مستوى 1' },
  ];
  const TRIPS = [
    { title: 'مصيف مرسى مطروح', place: 'قرية المعلمين – مطروح', date: 'يوليو 2027', nights: '5 ليالي', price: 2400, grad: ['#2ebfbc', '#184a75'], left: 14 },
    { title: 'مصيف رأس البر', place: 'فندق النقابة – رأس البر', date: 'أغسطس 2027', nights: '4 ليالي', price: 1850, grad: ['#ffb35c', '#ff6a13'], left: 6 },
    { title: 'رحلة الأقصر وأسوان', place: 'باخرة نيلية', date: 'فبراير 2027', nights: '4 ليالي', price: 4200, grad: ['#854e9b', '#2a2770'], left: 20 },
    { title: 'يوم ترفيهي – العين السخنة', place: 'شاطئ خاص للأعضاء', date: 'كل جمعة', nights: 'يوم واحد', price: 350, grad: ['#3caf85', '#184a75'], left: 40 },
  ];
  const BRANCHES = [
    ['القاهرة', 'شارع قصر العيني – وسط البلد', '02-27943166'],
    ['الجيزة', 'شارع الهرم – الطالبية', '02-35861200'],
    ['الإسكندرية', 'طريق الحرية – الشاطبي', '03-4865210'],
    ['القليوبية', 'بنها – شارع فريد ندا', '013-3227410'],
    ['الشرقية', 'الزقازيق – ميدان المحافظة', '055-2361045'],
    ['الدقهلية', 'المنصورة – شارع الجمهورية', '050-2245780'],
    ['المنيا', 'كورنيش النيل – المنيا', '086-2364512'],
    ['أسيوط', 'شارع الجمهورية – أسيوط', '088-2312077'],
    ['سوهاج', 'شارع أحمد عرابي – سوهاج', '093-2324560'],
    ['أسوان', 'كورنيش النيل – أسوان', '097-2303310'],
  ];

  /* ---------------- Logo fallback ---------------- */
  $$('img.logo-img').forEach(img => {
    const fallback = () => {
      const f = document.createElement('div');
      f.className = img.className + ' logo-fallback';
      f.textContent = 'ن.م';
      img.replaceWith(f);
    };
    if (img.complete && !img.naturalWidth) fallback();
    else img.addEventListener('error', fallback, { once: true });
  });

  /* ---------------- Screen navigation ---------------- */
  const stack = [];          // pushed detail screens
  let current = 'splash';

  function setTopTone(name) {
    const dark = ['splash', 'login'].includes(name) || (name === 'shell' && activeTab === 'profile');
    app.classList.toggle('dark-top', dark);
  }

  function showRoot(name) {
    $$('.screen').forEach(s => s.classList.remove('is-active', 'is-behind'));
    const el = $(`[data-screen="${name}"]`);
    el.classList.add('is-active');
    stack.length = 0;
    current = name;
    setTopTone(name);
  }

  function push(name) {
    const el = $(`[data-screen="${name}"]`);
    if (!el) return;
    const prev = stack.length ? $(`[data-screen="${stack.at(-1)}"]`) : $('[data-screen="shell"]');
    prev.classList.add('is-behind');
    // restart reveal animations
    $$('.reveal', el).forEach(r => { r.style.animation = 'none'; r.offsetHeight; r.style.animation = ''; });
    el.querySelector('.d-body')?.scrollTo(0, 0);
    requestAnimationFrame(() => el.classList.add('is-active'));
    stack.push(name);
    app.classList.remove('dark-top');
    onEnter(name, el);
  }

  function back() {
    const name = stack.pop();
    if (!name) return;
    $(`[data-screen="${name}"]`).classList.remove('is-active');
    const prev = stack.length ? $(`[data-screen="${stack.at(-1)}"]`) : $('[data-screen="shell"]');
    prev.classList.remove('is-behind');
    prev.classList.add('is-active');
    if (!stack.length) setTopTone('shell');
  }

  function popAll() {
    while (stack.length) back();
  }

  /* ---------------- Tabs ---------------- */
  let activeTab = 'home';
  function goTab(name, opts = {}) {
    popAll();
    activeTab = name;
    $$('.tab').forEach(t => t.classList.toggle('is-active', t.dataset.tab === name));
    $$('.bnav-item').forEach(b => b.classList.toggle('is-on', b.dataset.tabGo === name));
    moveNavIndicator();
    const tab = $(`.tab[data-tab="${name}"]`);
    $$('.reveal', tab).forEach(r => { r.style.animation = 'none'; r.offsetHeight; r.style.animation = ''; });
    if (name === 'services') renderServices();
    if (name === 'requests') setSeg(opts.seg || currentSeg);
    if (name === 'home') runCounters();
    setTopTone('shell');
  }

  function moveNavIndicator() {
    const on = $('.bnav-item.is-on');
    const ind = $('#bnavInd');
    if (!on || !ind) return;
    const nav = $('#bnav').getBoundingClientRect();
    const r = on.getBoundingClientRect();
    ind.style.transform = `translateX(${r.left - nav.left + r.width / 2 - 9}px)`;
  }
  window.addEventListener('resize', moveNavIndicator);

  /* ---------------- Splash → Login ---------------- */
  setTopTone('splash');
  setTimeout(() => {
    const login = $('[data-screen="login"]');
    showRoot('login');
    login.classList.add('fade-in');
  }, 2700);

  /* ---------------- Login ---------------- */
  $('#loginForm').addEventListener('submit', e => {
    e.preventDefault();
    const f = e.target;
    const btn = $('#loginBtn');
    const err = $('#loginError');
    err.textContent = '';
    btn.classList.add('is-loading');
    setTimeout(() => {
      btn.classList.remove('is-loading');
      if (f.username.value.trim() === '501' && f.password.value === '123') {
        enterApp();
      } else {
        err.textContent = 'رقم القيد أو كلمة المرور غير صحيحة';
        f.classList.remove('shake'); f.offsetHeight; f.classList.add('shake');
      }
    }, 1100);
  });

  $('[data-toggle-pwd]').addEventListener('click', () => {
    const p = $('#pwd');
    p.type = p.type === 'password' ? 'text' : 'password';
  });

  $('[data-bio]').addEventListener('click', () => {
    toast('جارِ التحقق من البصمة...');
    setTimeout(enterApp, 1200);
  });

  function enterApp() {
    showRoot('shell');
    goTab('home');
    setTimeout(moveNavIndicator, 60);
    toast('أهلاً بك أ. محمد 👋');
  }

  /* ---------------- Greeting ---------------- */
  const h = new Date().getHours();
  $('#greeting').textContent = h < 12 ? 'صباح الخير ☀️' : h < 18 ? 'مساء النور 🌤️' : 'مساء الخير 🌙';

  /* ---------------- Counters ---------------- */
  function runCounters() {
    $$('[data-count]').forEach(el => {
      const end = +el.dataset.count;
      const t0 = performance.now();
      const dur = 900;
      const tick = t => {
        const p = Math.min(1, (t - t0) / dur);
        el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }

  /* ---------------- QR (decorative) ---------------- */
  function buildQR(el, seed = 501) {
    const N = 21;
    let s = seed;
    const rnd = () => (s = (s * 9301 + 49297) % 233280) / 233280;
    const finder = (x, y, ox, oy) => {
      const dx = x - ox, dy = y - oy;
      if (dx < 0 || dy < 0 || dx > 6 || dy > 6) return null;
      return dx === 0 || dy === 0 || dx === 6 || dy === 6 || (dx >= 2 && dx <= 4 && dy >= 2 && dy <= 4);
    };
    let html = '';
    for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
      let v = finder(x, y, 0, 0) ?? finder(x, y, N - 7, 0) ?? finder(x, y, 0, N - 7);
      if (v === null) {
        const nearFinder = (x < 8 && y < 8) || (x > N - 9 && y < 8) || (x < 8 && y > N - 9);
        v = nearFinder ? false : rnd() > .52;
      }
      html += `<i class="${v ? '' : 'o'}"></i>`;
    }
    el.innerHTML = html;
  }
  buildQR($('#qrBox'));

  $('#mcard').addEventListener('click', () => $('#mcard').classList.toggle('is-flipped'));

  /* ---------------- Services ---------------- */
  let svcCat = 'all';
  let svcView = 'list';
  try { svcView = localStorage.getItem('svcView') || 'list'; } catch (e) {}
  function setView(v) {
    svcView = v;
    try { localStorage.setItem('svcView', v); } catch (e) {}
    $('#viewToggle').classList.toggle('is-grid', v === 'grid');
    $$('#viewToggle button').forEach(b => b.classList.toggle('is-on', b.dataset.view === v));
    renderServices();
  }
  $('#viewToggle').addEventListener('click', e => { const b = e.target.closest('button'); if (b && b.dataset.view !== svcView) setView(b.dataset.view); });
  $('#viewToggle').classList.toggle('is-grid', svcView === 'grid');
  $$('#viewToggle button').forEach(b => b.classList.toggle('is-on', b.dataset.view === svcView));
  function renderServices() {
    const q = $('#svcSearch').value.trim();
    const list = SERVICES.filter(s => (svcCat === 'all' || s.cat === svcCat) && (!q || s.title.includes(q) || s.desc.includes(q)));
    if (!list.length) { $('#svcList').innerHTML = `<div class="empty">لا توجد خدمات مطابقة لبحثك</div>`; return; }
    const groups = {};
    list.forEach(s => (groups[s.cat] ||= []).push(s));
    let i = 0, html = '';
    Object.entries(groups).forEach(([cat, items]) => {
      if (svcCat === 'all') html += `<h5 class="svc-group-title">${CAT_NAMES[cat]}</h5>`;
      if (svcView === 'grid') html += '<div class="svc-grid">';
      items.forEach(s => {
        html += `<button class="svc ${s.soon ? 'is-soon' : ''}" style="--i:${i++}" ${s.soon ? `data-soon="${s.title}"` : `data-push="${s.id}"`}>
          <span class="tile">${icon(s.icon)}</span>
          <span class="rc-body"><b>${s.title}</b><small>${s.desc}</small></span>
          ${s.soon ? '<span class="pill pill-soon">قريباً</span>' : icon('chev-l', 'ic arrow')}
        </button>`;
      });
      if (svcView === 'grid') html += '</div>';
    });
    html += '<div class="tab-bottom-space"></div>';
    $('#svcList').innerHTML = html;
  }
  $('#svcSearch').addEventListener('input', renderServices);
  $('#svcChips').addEventListener('click', e => {
    const c = e.target.closest('.chip'); if (!c) return;
    $$('.chip', $('#svcChips')).forEach(x => x.classList.toggle('is-on', x === c));
    svcCat = c.dataset.cat;
    renderServices();
  });

  /* ---------------- Requests (segmented) ---------------- */
  let currentSeg = 'receipts';
  function setSeg(name) {
    currentSeg = name;
    const btns = $$('#seg button');
    const idx = btns.findIndex(b => b.dataset.seg === name);
    btns.forEach((b, i) => b.classList.toggle('is-on', i === idx));
    $('.seg-ind').style.transform = `translateX(${-idx * 100}%)`;
    renderSeg(name);
  }
  $('#seg').addEventListener('click', e => { const b = e.target.closest('button'); if (b) setSeg(b.dataset.seg); });

  function renderSeg(name) {
    let html = '';
    if (name === 'receipts') {
      RECEIPTS.forEach((r, i) => html += `
        <div class="rq" style="--i:${i}">
          <div class="rq-top"><span class="tile">${icon('receipt')}</span>
            <div class="rc-body"><b>${r.title}</b><small><bdi>${r.no}</bdi> • ${r.date}</small></div>
            <span class="pill pill-${r.status[0]}">${r.status[1]}</span></div>
          <div class="rq-meta"><b>${r.amount.toLocaleString('en-US')} ج.م</b>
            <button class="btn btn-ghost" data-toast="تم تحميل الإيصال ${r.no}">${icon('download')} تحميل</button></div>
        </div>`);
    }
    if (name === 'certs') {
      CERTS.forEach((c, i) => html += `
        <div class="rq" style="--i:${i}">
          <div class="rq-top"><span class="tile">${icon('award')}</span>
            <div class="rc-body"><b>${c.title}</b><small><bdi>${c.no}</bdi> • ${c.date}</small></div>
            <span class="pill pill-${c.status[0]}">${c.status[1]}</span></div>
          <div class="progress"><span data-w="${c.progress}"></span></div>
          <div class="rq-meta"><span>إلى: ${c.to}</span>
            ${c.pdf ? `<button class="btn btn-primary" data-toast="جارِ تحميل الشهادة PDF">${icon('download')} PDF</button>` : ''}</div>
        </div>`);
      html += `<button class="btn btn-ghost btn-block" data-push="certificate">${icon('award')} طلب شهادة جديدة</button>`;
    }
    if (name === 'courses') {
      MY_COURSES.forEach((c, i) => html += `
        <div class="rq" style="--i:${i}">
          <div class="rq-top"><span class="tile">${icon('book')}</span>
            <div class="rc-body"><b>${c.title}</b><small>${c.date} • ${c.hours}</small></div>
            <span class="pill pill-${c.status[0]}">${c.status[1]}</span></div>
          <div class="progress"><span data-w="${c.progress}"></span></div>
        </div>`);
      html += `<button class="btn btn-ghost btn-block" data-push="courses">${icon('book')} تصفح الدورات المتاحة</button>`;
    }
    html += '<div class="tab-bottom-space"></div>';
    const body = $('#segBody');
    body.innerHTML = html;
    body.scrollTo(0, 0);
    requestAnimationFrame(() => setTimeout(() => $$('[data-w]', body).forEach(p => p.style.width = p.dataset.w + '%'), 30));
  }

  /* ---------------- Detail renderers ---------------- */
  function renderCourses() {
    $('#coursesList').innerHTML = COURSES.map((c, i) => `
      <div class="course" style="--i:${i}">
        <div class="course-cover" style="background:linear-gradient(135deg,${c.grad[0]},${c.grad[1]})">
          <span class="pill pill-light">${c.tag}</span>${icon(c.icon, 'ic big-ic')}
        </div>
        <div class="course-body">
          <h4>${c.title}</h4>
          <div class="meta-row"><span>${icon('user')}${c.trainer}</span><span>${icon('calendar')}${c.date}</span><span>${icon('clock')}${c.hours}</span></div>
          <div class="seats"><span>المقاعد المحجوزة</span><span>${c.seats[0]} / ${c.seats[1]}</span></div>
          <div class="progress"><span data-w="${Math.round(c.seats[0] / c.seats[1] * 100)}"></span></div>
          <div class="card-foot">
            <div class="price">${c.price ? c.price + ' <small>ج.م</small>' : 'مجاناً'}</div>
            <button class="btn btn-navy btn-sm" data-success="course">سجّل الآن</button>
          </div>
        </div>
      </div>`).join('');
  }

  function renderTrips() {
    $('#tripsList').innerHTML = TRIPS.map((t, i) => `
      <div class="trip" style="--i:${i}">
        <div class="trip-cover" style="background:linear-gradient(135deg,${t.grad[0]},${t.grad[1]})">
          <span class="pill pill-light">${icon('bus', 'ic')} ${t.nights}</span>
          <span class="pill ${t.left < 10 ? 'pill-bad' : 'pill-light'}">متبقي ${t.left} مكان</span>
        </div>
        <div class="trip-body">
          <h4>${t.title}</h4>
          <div class="meta-row"><span>${icon('pin')}${t.place}</span><span>${icon('calendar')}${t.date}</span></div>
          <div class="card-foot">
            <div class="price">${t.price.toLocaleString('en-US')} <small>ج.م / للفرد</small></div>
            <button class="btn btn-primary btn-sm" data-success="trip">احجز</button>
          </div>
        </div>
      </div>`).join('');
    $$('.trip .pill .ic').forEach(i => { i.style.width = '14px'; i.style.height = '14px'; });
  }

  function renderBranches() {
    const q = $('#branchSearch').value.trim();
    const list = BRANCHES.filter(b => !q || b[0].includes(q));
    $('#branchList').innerHTML = list.length ? list.map((b, i) => `
      <div class="branch" style="--i:${i}">
        <span class="tile">${icon('building')}</span>
        <div class="rc-body"><b>نقابة ${b[0]}</b><small>${b[1]}</small><small dir="ltr" style="text-align:right">${b[2]}</small></div>
        <div class="branch-actions">
          <a href="tel:${b[2].replace(/-/g, '')}" aria-label="اتصال">${icon('phone')}</a>
          <a class="or" href="https://www.google.com/maps/search/${encodeURIComponent('نقابة المعلمين ' + b[0])}" target="_blank" rel="noopener" aria-label="الخريطة">${icon('pin')}</a>
        </div>
      </div>`).join('') : `<div class="empty">لا توجد فروع مطابقة</div>`;
  }
  $('#branchSearch').addEventListener('input', renderBranches);

  function onEnter(name, el) {
    if (name === 'courses') { renderCourses(); setTimeout(() => $$('[data-w]', el).forEach(p => p.style.width = p.dataset.w + '%'), 400); }
    if (name === 'trips') renderTrips();
    if (name === 'branches') { $('#branchSearch').value = ''; renderBranches(); }
    if (name === 'success') fireConfetti();
  }

  /* ---------------- Success ---------------- */
  const SUCCESS = {
    renew: ['تم الدفع بنجاح', 'تم تجديد اشتراكك لعام 2027. ستجد الإيصال في قسم "إيصالاتي".', 'RC-'],
    'new-batch': ['تم استلام الطلب', 'سيتم مراجعة بيانات الدفعة الجديدة والتواصل معك خلال 3 أيام عمل.', 'NB-'],
    certificate: ['تم إرسال طلب الشهادة', 'يمكنك متابعة حالة الطلب من "شهاداتي" وسنرسل لك إشعاراً عند الجاهزية.', 'CR-'],
    course: ['تم التسجيل في الدورة', 'سيصلك إشعار بتأكيد الحجز وموعد بدء الدورة.', 'TR-'],
    trip: ['تم حجز مكانك', 'برجاء استكمال السداد خلال 48 ساعة لتأكيد الحجز.', 'TP-'],
  };
  function showSuccess(kind) {
    const [t, p, pre] = SUCCESS[kind] || ['تم بنجاح', 'تم تنفيذ طلبك بنجاح', '#'];
    $('#successTitle').textContent = t;
    $('#successText').textContent = p;
    $('#successRef').textContent = pre + Math.floor(10000 + Math.random() * 89999);
    const s = $('[data-screen="success"]');
    s.classList.remove('is-active');
    navPush('success');
  }
  function fireConfetti() {
    const b = $('#burst');
    const colors = ['#ff6a13', '#ffb35c', '#2a2770', '#3caf85', '#8f8cd7'];
    b.innerHTML = '';
    for (let i = 0; i < 34; i++) {
      const a = (Math.PI * 2 * i) / 34 + Math.random() * .3;
      const d = 110 + Math.random() * 90;
      const el = document.createElement('i');
      el.style.background = colors[i % colors.length];
      el.style.setProperty('--x', Math.cos(a) * d + 'px');
      el.style.setProperty('--y', Math.sin(a) * d - 60 + 'px');
      el.style.setProperty('--r', (Math.random() * 720 - 360) + 'deg');
      el.style.animationDelay = (0.7 + Math.random() * .15) + 's';
      b.appendChild(el);
    }
  }

  /* ---------------- Sheets ---------------- */
  const scrim = $('#scrim'), sheet = $('#sheet');
  function openSheet(html) {
    $('#sheetContent').innerHTML = html;
    scrim.classList.add('is-on'); sheet.classList.add('is-on');
  }
  function closeSheet() { scrim.classList.remove('is-on'); sheet.classList.remove('is-on'); }
  scrim.addEventListener('click', () => navCloseSheet());

  // swipe-down to close
  let sy = null;
  sheet.addEventListener('touchstart', e => { sy = e.touches[0].clientY; }, { passive: true });
  sheet.addEventListener('touchmove', e => {
    if (sy === null) return;
    const dy = e.touches[0].clientY - sy;
    if (dy > 0 && sheet.scrollTop <= 0) { sheet.style.transition = 'none'; sheet.style.transform = `translateY(${dy}px)`; }
  }, { passive: true });
  sheet.addEventListener('touchend', e => {
    const dy = e.changedTouches[0].clientY - (sy ?? 0);
    sheet.style.transition = ''; sheet.style.transform = '';
    if (dy > 90) navCloseSheet();
    sy = null;
  });

  const SHEETS = {
    qr: () => `
      <h3>كارنيه العضوية الرقمي</h3>
      <p>اعرض الكود لموظف الفرع للتحقق من عضويتك</p>
      <div class="sheet-qr"><div class="qr lg" id="sheetQr"></div></div>
      <p><b style="color:var(--navy)">محمد أحمد علي</b> • رقم القيد 501</p>
      <span class="pill pill-ok" style="margin-top:8px"><i></i>العضوية سارية حتى 12/2026</span>
      <button class="btn btn-ghost btn-block" data-close-sheet>إغلاق</button>`,
    help: () => `
      <div class="sheet-ic">${icon('help')}</div>
      <h3>المساعدة والتواصل</h3>
      <div class="hours card" style="box-shadow:none;border:1.5px solid var(--line)">
        <div class="kv"><span>مواعيد العمل</span><b>الأحد – الخميس، 9 ص – 3 م</b></div>
        <div class="kv"><span>الخط الساخن</span><b dir="ltr">02-27943166</b></div>
        <div class="kv"><span>البريد</span><b>info@zahatechs.com</b></div>
        <div class="kv"><span>المقر الرئيسي</span><b>القاهرة</b></div>
      </div>
      <a class="btn btn-primary btn-block" href="tel:0227943166">${icon('phone')} اتصل الآن</a>`,
    soon: title => `
      <div class="sheet-ic">${icon('sparkle')}</div>
      <h3>${title}</h3>
      <p>هذه الخدمة قيد التطوير وستكون متاحة قريباً على التطبيق. سنرسل لك إشعاراً فور إطلاقها.</p>
      <button class="btn btn-primary btn-block" data-close-sheet data-toast="سيتم إشعارك عند إطلاق الخدمة">أبلغني عند الإتاحة</button>`,
    logout: () => `
      <div class="sheet-ic" style="background:var(--bad-bg);color:var(--bad)">${icon('logout')}</div>
      <h3>تسجيل الخروج</h3>
      <p>هل أنت متأكد أنك تريد تسجيل الخروج من حسابك؟</p>
      <div style="display:flex;gap:10px">
        <button class="btn btn-ghost" style="flex:1" data-close-sheet>إلغاء</button>
        <button class="btn btn-primary" style="flex:1;background:var(--bad);box-shadow:none" data-confirm-logout>خروج</button>
      </div>`,
  };

  /* ---------------- Toast ---------------- */
  let toastT;
  function toast(msg) {
    const t = $('#toast');
    t.textContent = msg;
    t.classList.add('is-on');
    clearTimeout(toastT);
    toastT = setTimeout(() => t.classList.remove('is-on'), 2200);
  }

  /* ---------------- Ripple ---------------- */
  document.addEventListener('pointerdown', e => {
    const b = e.target.closest('.btn, .svc, .qitem, .menu-item, .row-card, .alert-strip, .chip');
    if (!b) return;
    const r = b.getBoundingClientRect();
    const size = Math.max(r.width, r.height);
    const s = document.createElement('span');
    s.className = 'ripple';
    s.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - r.left - size / 2}px;top:${e.clientY - r.top - size / 2}px`;
    if (getComputedStyle(b).position === 'static') b.style.position = 'relative';
    b.style.overflow = 'hidden';
    b.appendChild(s);
    setTimeout(() => s.remove(), 650);
  });

  /* ---------------- History (phone / browser back button) ----------------
     Entries on top of the base page: [tab?][detail screens...][sheet?]
     UI actions go through nav*(); popstate performs the actual step back. */
  let tabEntry = false, sheetEntry = false, suppressPop = false, pendingTabPush = false;

  function navPush(name) {
    if (sheetEntry) { sheetEntry = false; closeSheet(); history.replaceState({ k: 'screen' }, ''); }
    else history.pushState({ k: 'screen' }, '');
    push(name);
  }
  function navBack() { history.back(); }
  function navOpenSheet(html) {
    openSheet(html);
    if (!sheetEntry) { history.pushState({ k: 'sheet' }, ''); sheetEntry = true; }
  }
  function navCloseSheet() {
    if (sheetEntry) history.back(); else closeSheet();
  }
  function navTab(name, opts) {
    let remove = stack.length + (sheetEntry ? 1 : 0);
    closeSheet(); sheetEntry = false;
    if (name === 'home' && tabEntry) { remove++; tabEntry = false; }
    const needTabEntry = name !== 'home' && !tabEntry;
    goTab(name, opts);
    if (remove > 0) {
      suppressPop = true; pendingTabPush = needTabEntry;
      history.go(-remove);
    } else if (needTabEntry) {
      history.pushState({ k: 'tab' }, ''); tabEntry = true;
    }
  }
  function navReset() {
    const remove = stack.length + (sheetEntry ? 1 : 0) + (tabEntry ? 1 : 0);
    sheetEntry = false; tabEntry = false;
    if (remove > 0) { suppressPop = true; pendingTabPush = false; history.go(-remove); }
  }
  window.addEventListener('popstate', () => {
    if (suppressPop) {
      suppressPop = false;
      if (pendingTabPush) { history.pushState({ k: 'tab' }, ''); tabEntry = true; pendingTabPush = false; }
      return;
    }
    if (sheetEntry) { sheetEntry = false; closeSheet(); return; }
    if (stack.length) { back(); return; }
    if (tabEntry) { tabEntry = false; goTab('home'); }
  });

  /* ---------------- Global click delegation ---------------- */
  document.addEventListener('click', e => {
    const t = e.target.closest('[data-push],[data-back],[data-tab-go],[data-tab-go-root],[data-sheet],[data-soon],[data-success],[data-home],[data-logout],[data-confirm-logout],[data-close-sheet],[data-toast],[data-upload],[data-step]');
    if (!t) return;
    const d = t.dataset;

    if ('toast' in d) toast(d.toast);
    if ('closeSheet' in d) navCloseSheet();
    if (d.push) { navPush(d.push); return; }
    if ('back' in d) { navBack(); return; }
    if (d.tabGo) { navTab(d.tabGo, { seg: d.seg }); return; }
    if (d.tabGoRoot) { navTab(d.tabGoRoot, { seg: 'certs' }); return; }
    if ('home' in d) { navTab('home'); return; }
    if (d.success) { showSuccess(d.success); return; }
    if (d.soon) { navOpenSheet(SHEETS.soon(d.soon)); return; }
    if (d.sheet) {
      navOpenSheet(SHEETS[d.sheet]());
      if (d.sheet === 'qr') buildQR($('#sheetQr'));
      return;
    }
    if ('logout' in d) { navOpenSheet(SHEETS.logout()); return; }
    if ('confirmLogout' in d) {
      navReset();
      closeSheet();
      $('#loginForm').reset();
      showRoot('login');
      return;
    }
    if ('upload' in d) {
      t.classList.add('is-done');
      t.querySelector('use').setAttribute('href', '#i-check');
      toast('تم رفع الملف');
    }
    if (d.step) {
      const val = t.parentElement.querySelector('[data-step-val]');
      val.textContent = Math.min(10, Math.max(1, +val.textContent + +d.step));
    }
  });

  // Escape key = hardware back (desktop preview)
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && (sheetEntry || stack.length || tabEntry)) history.back();
  });
  /* ---------------- PWA: offline + installable ---------------- */
  if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
    window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(() => {}));
  }
})();
