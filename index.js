function toggleNavMenu() {
    navToggleBtn.classList.toggle('active');
    navSmallScreen.classList.toggle('active');
}

const navToggleBtn = document.querySelector('#navToggleBtn');
const navSmallScreen = document.querySelector('#navSmallScreen');

navToggleBtn.addEventListener('click', toggleNavMenu);