/* Ali & Alina Travel & Tours — shared scripts */
(function () {
  // Sticky header shade
  var header = document.getElementById('site-header');
  if (header) {
    var onScroll = function () { header.classList.toggle('scrolled', window.scrollY > 30); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // Mobile menu
  var menuBtn = document.getElementById('menuBtn');
  var navlinks = document.getElementById('navlinks');
  if (menuBtn && navlinks) {
    menuBtn.addEventListener('click', function () {
      var open = navlinks.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', open);
    });
    navlinks.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        navlinks.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Reveal on scroll
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  // Enquiry form -> hand off to WhatsApp with a prefilled message
  var form = document.getElementById('enquiryForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      var get = function (id) { var el = document.getElementById(id); return el ? el.value.trim() : ''; };
      var lines = [
        'New enquiry — Ali & Alina Travel',
        'Name: ' + get('f-name'),
        'Phone: ' + get('f-phone'),
        'Email: ' + get('f-email'),
        'Service: ' + get('f-service'),
        'Destination: ' + get('f-destination'),
        'Travel date: ' + get('f-date'),
        'Travellers: ' + get('f-people'),
        'Details: ' + get('f-msg')
      ];
      var text = encodeURIComponent(lines.filter(function (l) { return !/: $/.test(l); }).join('\n'));
      var ok = document.getElementById('formOk');
      if (ok) ok.style.display = 'block';
      window.open('https://wa.me/96892121497?text=' + text, '_blank', 'noopener');
    });
  }

  // Home search bar -> WhatsApp
  var searchForm = document.getElementById('searchForm');
  if (searchForm) {
    searchForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var v = function (id) { var el = document.getElementById(id); return el ? el.value : ''; };
      var text = encodeURIComponent('Hi Ali & Alina Travel! I would like a quote.\nService: ' + v('s-service') + '\nDestination: ' + v('s-dest') + '\nTravel date: ' + v('s-date') + '\nTravellers: ' + v('s-people'));
      window.open('https://wa.me/96892121497?text=' + text, '_blank', 'noopener');
    });
  }

  // Year
  var yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();
})();
