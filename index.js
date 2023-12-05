// to toggle navigation menu
const navToggleBtn = document.querySelector('#navToggleBtn');
const navSmallScreen = document.querySelector('#navSmallScreen');

function toggleNavMenu() {
    if(!navToggleBtn.classList.contains('animated')){
        navToggleBtn.classList.add('animated');
    }
    navToggleBtn.classList.toggle('active');
    navSmallScreen.classList.toggle('active');
    navToggleBtn.ariaLabel = 'close navigation menu';
}

navToggleBtn.addEventListener('click', toggleNavMenu);


// to manage animation on elements' intersection with user screen
const header = document.querySelector('.header');
const main = document.querySelector('.foreground--main');
const sections = document.querySelectorAll('.section');

const scrollOptions = {
    rootMargin: "-32px",
};

const scrollMainCallback = (entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            header.classList.add('active');
        } else {
            entry.target.classList.remove('active');
            header.classList.remove('active');
        }
    })
}
const scrollCallback = (entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            entry.target.style.setProperty('--scroll', entry.intersectionRatio);
        } else {
            entry.target.classList.remove('active');
        }
    })
}

const scrollMainObserver = new IntersectionObserver(scrollMainCallback, scrollOptions);
const scrollSectionObserver = new IntersectionObserver(scrollCallback, scrollOptions);

scrollMainObserver.observe(main);
sections.forEach(elem => {
    scrollSectionObserver.observe(elem)
})