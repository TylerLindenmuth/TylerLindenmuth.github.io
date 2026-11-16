document.getElementById('yr').textContent = new Date().getFullYear();

var items = Array.prototype.slice.call(document.querySelectorAll('nav [data-target]'));
var panels = Array.prototype.slice.call(document.querySelectorAll('main section'));
var menu = document.querySelector('.has-sub');
var menuBtn = menu.querySelector(':scope > button');

function show(id, updateHash) {
  if (!document.getElementById(id)) id = 'about';
  items.forEach(function (b) {
    if (b.dataset.target === id) b.setAttribute('aria-current', 'page');
    else b.removeAttribute('aria-current');
  });
  panels.forEach(function (p) { p.hidden = p.id !== id; });
  menu.classList.toggle('active', !!menu.querySelector('[aria-current="page"]'));
  if (updateHash) history.replaceState(null, '', id === 'about' ? location.pathname : '#' + id);
}

function closeMenu() { menu.classList.remove('open'); menuBtn.setAttribute('aria-expanded', 'false'); }

items.forEach(function (b) {
  b.addEventListener('click', function () {
    show(b.dataset.target, true);
    closeMenu();
    if (document.activeElement) document.activeElement.blur();
    window.scrollTo(0, 0);
  });
});

// tapping or pressing Enter on the parent tab opens the submenu (hover also opens it on desktop)
menuBtn.addEventListener('click', function () {
  var open = menu.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', open);
});
document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { closeMenu(); menuBtn.focus(); } });
document.addEventListener('click', function (e) { if (!menu.contains(e.target)) closeMenu(); });

window.addEventListener('hashchange', function () { show(location.hash.slice(1), false); });
// opens on About unless the link points at a tab, e.g. yoursite.com/#resume
show(location.hash.slice(1) || 'about', false);
