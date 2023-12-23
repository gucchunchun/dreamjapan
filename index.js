// To toggle navigation menu
const body = document.querySelector('body');
const navToggleBtn = document.getElementById('navToggleBtn');
const navSmallCtr = document.getElementById('navSmallCtr');
const navSmallLists = document.querySelectorAll('.nav-list--small');

function openNavMenu() {
    navToggleBtn.classList.add('animated');
    navToggleBtn.classList.add('active');
    navSmallCtr.classList.add('active');
    body.classList.add('nav');
    navToggleBtn.setAttribute('aria-label', 'close navigation menu');
    navToggleBtn.removeEventListener('click', openNavMenu);
    navToggleBtn.addEventListener('click', closeNavMenu);
    navSmallLists.forEach(list => list.addEventListener('click', closeNavMenu));
}
function closeNavMenu() {
    navToggleBtn.classList.remove('active');
    navSmallCtr.classList.remove('active');
    body.classList.remove('nav');
    navToggleBtn.setAttribute('aria-label', 'open navigation menu');
    navToggleBtn.removeEventListener('click', closeNavMenu);
    navToggleBtn.addEventListener('click', openNavMenu);
    navSmallLists.forEach(list => list.removeEventListener('click', closeNavMenu));
}
navToggleBtn.addEventListener('click', openNavMenu);

