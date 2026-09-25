(function () {
  var progress = document.querySelector('.scroll-progress');
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.greedy-nav a[href*="#"]'));
  var sections = Array.prototype.slice.call(document.querySelectorAll('section[id]'));

  function updateProgress() {
    if (!progress) return;
    var scrollable = document.documentElement.scrollHeight - window.innerHeight;
    var percentage = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
    progress.style.width = percentage + '%';
  }

  function updateActiveLink() {
    var current = sections.length ? sections[0].id : '';
    var activationLine = Math.min(240, window.innerHeight * 0.36);
    sections.forEach(function (section) {
      if (section.getBoundingClientRect().top <= activationLine) current = section.id;
    });
    navLinks.forEach(function (link) {
      var target = link.getAttribute('href').split('#')[1];
      link.classList.toggle('is-active', target === current);
    });
  }

  navLinks.forEach(function (link) {
    link.addEventListener('click', function (event) {
      var id = link.getAttribute('href').split('#')[1];
      var target = document.getElementById(id);
      if (!target) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (window.history && window.history.replaceState) {
        window.history.replaceState(null, '', '#' + id);
      }
    }, true);
  });

  updateProgress();
  updateActiveLink();
  window.addEventListener('scroll', function () {
    updateProgress();
    updateActiveLink();
  }, { passive: true });
  window.addEventListener('resize', updateProgress);
}());
