/* nav.js — the navigation and footer are written once, in nav.html and
   footer.html, and put into every page here. No page carries its own copy. */
(function () {
  'use strict';

  function injectFragment(file, targetId) {
    var target = document.getElementById(targetId);
    if (!target) {
      return Promise.resolve();
    }

    return fetch(file)
      .then(function (response) {
        if (!response.ok) {
          throw new Error(file + ': ' + response.status);
        }
        return response.text();
      })
      .then(function (html) {
        target.innerHTML = html;
      })
      .catch(function () {
        target.innerHTML =
          '<p class="fragment-error">The shared navigation could not load. Open the site over http:// (for example with Live Server), not from a local file.</p>';
      });
  }

  function markCurrentPage() {
    var here = window.location.pathname.replace(/index\.html$/, '');

    document.querySelectorAll('.nav-links a').forEach(function (link) {
      var path = new URL(link.href, window.location.href).pathname.replace(/index\.html$/, '');
      if (path === here) {
        link.setAttribute('aria-current', 'page');
      }
    });
  }

  function setupMenu() {
    var toggle = document.querySelector('.nav-toggle');
    var links = document.getElementById('nav-links');
    if (!toggle || !links) {
      return;
    }

    function closeMenu() {
      toggle.setAttribute('aria-expanded', 'false');
      links.classList.remove('is-open');
    }

    toggle.addEventListener('click', function () {
      var isOpen = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!isOpen));
      links.classList.toggle('is-open', !isOpen);
    });

    links.addEventListener('click', function (event) {
      if (event.target.closest('a')) {
        closeMenu();
      }
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        closeMenu();
        toggle.focus();
      }
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 736) {
        closeMenu();
      }
    });
  }

  Promise.all([
    injectFragment('nav.html', 'site-header'),
    injectFragment('footer.html', 'site-footer')
  ]).then(function () {
    if (document.querySelector('.site-nav')) {
      markCurrentPage();
      setupMenu();
    }
  });
})();
