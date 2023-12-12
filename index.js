// To toggle navigation menu
const navToggleBtn = document.querySelector('#navToggleBtn');
const navSmallScreen = document.querySelector('#navSmallScreen');
const navSmallLists = document.querySelectorAll('.nav-list--small');

function openNavMenu() {
    navToggleBtn.classList.add('animated');
    navToggleBtn.classList.add('active');
    navSmallScreen.classList.add('active');
    navToggleBtn.setAttribute('aria-label', 'close navigation menu');
    navToggleBtn.removeEventListener('click', openNavMenu);
    navToggleBtn.addEventListener('click', closeNavMenu);
    navSmallLists.forEach(list => list.addEventListener('click', closeNavMenu));
}
function closeNavMenu() {
    navToggleBtn.classList.remove('animated');
    navToggleBtn.classList.remove('active');
    navSmallScreen.classList.remove('active');
    navToggleBtn.setAttribute('aria-label', 'open navigation menu');
    navToggleBtn.removeEventListener('click', closeNavMenu);
    navToggleBtn.addEventListener('click', openNavMenu);
    navSmallLists.forEach(list => list.removeEventListener('click', closeNavMenu));
}

navToggleBtn.addEventListener('click', openNavMenu);

// To scroll to Home Page(fixed, scrollTo)
function ScrollToHomePage() {
    window.scrollTo(0, 0);
}

// To manage animation on elements' intersection with user screen
const body = document.querySelector('body');
const sectionTitle = document.querySelector('.section__title');
const Sections = document.querySelectorAll('.section');
const Contents = document.querySelectorAll('.content__wrapper');
const dreamersCards = document.querySelectorAll('.dreamers__card');

// get sectionTitle bottom value
const sectionTitleRect = sectionTitle.getBoundingClientRect();
const sectionTitleTop= sectionTitleRect.top;
const sectionTitleBottom = sectionTitleRect.bottom;
let windowHeight = window.innerHeight;

const scrollSectionOptions = {
    rootMargin: `0px 0px ${sectionTitleBottom - windowHeight}px 0px`,
    threshold: 0
}
let scrollOutContentOptions = {
    rootMargin: `0px 0px ${sectionTitleBottom - windowHeight}px 0px`,
    threshold: 0
}
let scrollInContentOptions = {
    rootMargin: `0px 0px ${windowHeight / -2}px 0px`,
    threshold: 0
}


const scrollSectionCallback = (entries) => {
    const currentSection = {target: null, ratio: 0};
    
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            console.log(entry.target);
            entry.target.classList.remove('active');
            console.log(entry.target);
            if (currentSection.ratio < entry.intersectionRatio) {
                currentSection.target = entry.target;
                currentSection.ratio = entry.intersectionRatio;
            }
        }else {
            entry.target.classList.remove('active');
        }
    });
    
    if (currentSection.target) {
        currentSection.target.classList.add('active');
        
        if (currentSection.target.id === 'home') {
            body.classList.add('home');
        } else {
            body.classList.remove('home');
        }
    }
};

const scrollOutContentCallback = (entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.remove('active');
        }  else {
            entry.target.classList.add('active');
        }
    })
}
const scrollInContentCallback = (entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        } else {
            entry.target.classList.remove('active');
        }
    })
}


const scrollSectionObserver = new IntersectionObserver(scrollSectionCallback, scrollSectionOptions);
let scrollOutContentObserver = new IntersectionObserver(scrollOutContentCallback, scrollOutContentOptions);
let scrollInContentObserver = new IntersectionObserver(scrollInContentCallback, scrollInContentOptions);

Sections.forEach(elem => {
    scrollSectionObserver.observe(elem);
})
Contents.forEach(elem => {
    scrollOutContentObserver.observe(elem);
    scrollInContentObserver.observe(elem);
})

window.addEventListener('resize', ()=>{
    windowHeight = window.innerHeight;
    
    scrollOutContentOptions = {
        rootMargin: `0px 0px ${sectionTitleBottom - windowHeight}px 0px`,
        threshold: 0
    }
    scrollInContentOptions = {
        rootMargin: `0px 0px ${windowHeight / -2}px 0px`,
        threshold: 0
    }
    scrollOutContentObserver = new IntersectionObserver(scrollOutContentCallback, scrollOutContentOptions);
    scrollInContentObserver = new IntersectionObserver(scrollInContentCallback, scrollInContentOptions);

    Contents.forEach(elem => {
        scrollOutContentObserver.observe(elem);
        scrollInContentObserver.observe(elem);
    })
})

// // dreamers card angle
// let angle = -5;
// for(let i = 0; i < numberOfDreamersCards; i++) {
//     dreamersCards[i].style = `--angle: ${angle + Math.floor(Math.random()* 9) -7}deg`;
// }