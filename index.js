// FUNCTIONS
function toggleNavMenu() {
    if(!navToggleBtn.classList.contains('animated')){
        navToggleBtn.classList.add('animated');
    }
    navToggleBtn.classList.toggle('active');
    navSmallScreen.classList.toggle('active');
}

// GET DOM ELEMENT
const body = document.querySelector('body');
const navToggleBtn = document.querySelector('#navToggleBtn');
const navSmallScreen = document.querySelector('#navSmallScreen');

// to toggle navigation menu
navToggleBtn.addEventListener('click', toggleNavMenu);
