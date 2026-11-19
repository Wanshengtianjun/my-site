/* machine.js — the useless machine and the switch-catching game.
   No libraries, no storage: everything lives in this page while it is open. */
(function () {
  'use strict';

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* ------------------------------------------------ the useless machine */

  var machine = document.getElementById('machine');
  var switchButton = document.getElementById('machine-switch');
  var status = document.getElementById('machine-status');

  if (machine && switchButton && status) {
    var busy = false;

    function setState(state) {
      machine.dataset.state = state;
    }

    switchButton.addEventListener('click', function () {
      if (busy || machine.dataset.state !== 'off') {
        return;
      }

      busy = true;
      switchButton.setAttribute('aria-checked', 'true');
      setState('on');
      status.textContent = 'On. Wait for it\u2026';

      var step = reducedMotion.matches ? 120 : 1;
      var out = 520 * step;
      var press = 1150 * step;
      var back = 1520 * step;
      var done = 2050 * step;

      window.setTimeout(function () {
        setState('reaching');
        status.textContent = 'The arm is coming out.';
      }, out);

      window.setTimeout(function () {
        setState('pressed');
        status.textContent = 'It switched itself off.';
      }, press);

      window.setTimeout(function () {
        setState('retracting');
      }, back);

      window.setTimeout(function () {
        setState('off');
        switchButton.setAttribute('aria-checked', 'false');
        status.textContent = 'Off again. Press it if you like.';
        busy = false;
      }, done);
    });
  }

  /* ------------------------------------------------ the game */

  var field = document.getElementById('game-field');
  var target = document.getElementById('game-target');
  var hint = document.getElementById('game-hint');
  var startButton = document.getElementById('game-start');
  var scoreEl = document.getElementById('game-score');
  var timeEl = document.getElementById('game-time');
  var hitsEl = document.getElementById('game-hits');
  var bestEl = document.getElementById('game-best');
  var announce = document.getElementById('game-announce');

  if (!field || !target || !hint || !startButton || !scoreEl || !timeEl || !hitsEl || !bestEl) {
    return;
  }

  var DURATION = 20;
  var hits = 0;
  var best = 0;
  var secondsLeft = DURATION;
  var timer = null;
  var running = false;

  function placeTarget() {
    var box = 3.4 * 16;
    var maxX = Math.max(0, field.clientWidth - box);
    var maxY = Math.max(0, field.clientHeight - box);
    target.style.left = Math.round(Math.random() * maxX) + 'px';
    target.style.top = Math.round(Math.random() * maxY) + 'px';
  }

  function showTarget() {
    target.hidden = false;
    hint.hidden = true;
    placeTarget();
  }

  function hideTarget() {
    target.hidden = true;
  }

  function updateScore() {
    hitsEl.textContent = String(hits);
    scoreEl.textContent = String(hits);
  }

  function stop() {
    running = false;
    window.clearInterval(timer);
    timer = null;
    hideTarget();
    startButton.textContent = 'Again';
    hint.hidden = false;
    hint.textContent = 'Time. You caught ' + hits + (hits === 1 ? ' switch.' : ' switches.');

    if (hits > best) {
      best = hits;
      bestEl.textContent = 'Best ' + best;
    }

    if (announce) {
      announce.textContent = 'Game over. You caught ' + hits + ' switches.';
    }
  }

  function start() {
    running = true;
    hits = 0;
    secondsLeft = DURATION;
    updateScore();
    timeEl.textContent = String(secondsLeft);
    startButton.textContent = 'Stop';
    showTarget();
    target.focus({ preventScroll: true });

    timer = window.setInterval(function () {
      secondsLeft -= 1;
      timeEl.textContent = String(secondsLeft);

      if (secondsLeft <= 0) {
        stop();
      }
    }, 1000);

    if (announce) {
      announce.textContent = 'Go. Twenty seconds.';
    }
  }

  startButton.addEventListener('click', function () {
    if (running) {
      stop();
      return;
    }
    start();
  });

  target.addEventListener('click', function () {
    if (!running) {
      return;
    }

    hits += 1;
    updateScore();
    showTarget();
    target.focus({ preventScroll: true });

    if (announce && hits % 5 === 0) {
      announce.textContent = hits + ' caught.';
    }
  });

  window.addEventListener('resize', function () {
    if (running) {
      placeTarget();
    }
  });

  hint.textContent = 'Press start, then catch the red switch.';
})();
