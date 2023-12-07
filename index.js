// To toggle navigation menu
const navToggleBtn = document.querySelector('#navToggleBtn');
const navSmallScreen = document.querySelector('#navSmallScreen');
const navSmallLists = document.querySelectorAll('.nav-list--small');

function openNavMenu() {
    navToggleBtn.classList.add('animated');
    navToggleBtn.classList.add('active');
    navSmallScreen.classList.add('active');
    navToggleBtn.ariaLabel = 'close navigation menu';
    navToggleBtn.removeEventListener('click', openNavMenu);
    navToggleBtn.addEventListener('click', closeNavMenu);
    navSmallLists.forEach(list => list.addEventListener('click', closeNavMenu));
}
function closeNavMenu() {
    navToggleBtn.classList.remove('animated');
    navToggleBtn.classList.remove('active');
    navSmallScreen.classList.remove('active');
    navToggleBtn.ariaLabel = 'open navigation menu';
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
const header = document.querySelector('.header');
const home = document.querySelector('.foreground--home');
const main = document.querySelector('.foreground--main');
const sections = document.querySelectorAll('.section');

// set number of times
const NUM_STEPS = 100;
function buildThresholdList() {
    let thresholds = [];
   
    for (let i = 0; i < NUM_STEPS; i++) {
      let ratio = i / NUM_STEPS;
      thresholds.push(ratio);
    }
    return thresholds;
}

// set timing of header appearance & home disappearance
let windowHeight = window.innerHeight;
// -100 = to handle the difference of intersections timing of those observers below
let optionMargin = `0px 0px ${Math.round(-windowHeight/2)}px 0px`;

let scrollMainOptions = {
    rootMargin: optionMargin,
};
const scrollOptions = {
    threshold: buildThresholdList()
};

const scrollMainCallback = (entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            header.classList.add('active');
        } else {
            body.classList.add('home');
            header.classList.remove('active');
        }
    })
}
let isAbout = false;
const scrollCallback = (entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const ratio = Math.round(entry.intersectionRatio*100)/100;
            if(entry.target.id == 'about') {
                if(entry.intersectionRect.bottom < windowHeight) {
                    body.classList.add('logo-meaning');
                }else {
                    body.classList.remove('logo-meaning');
                }
            }
            if(0.5<ratio){
                entry.target.classList.add('active');
                body.classList.remove('home');
                body.classList.add(entry.target.id);
                body.style.setProperty('--scroll', ratio);
            }else {
                entry.target.classList.remove('active');
                body.classList.remove(entry.target.id);
            }
            entry.target.style.setProperty('--scroll', ratio);
        } else {
            entry.target.classList.remove('active');
        }
    })
}

let scrollMainObserver = new IntersectionObserver(scrollMainCallback, scrollMainOptions);
const scrollSectionObserver = new IntersectionObserver(scrollCallback, scrollOptions);

// scrollMainObserver.root.style.border = "2px solid #44aa44";
scrollMainObserver.observe(main);
sections.forEach(elem => {
    scrollSectionObserver.observe(elem)
})

window.addEventListener('resize', ()=>{
    windowHeight = window.innerHeight;
    optionMargin = `0px 0px ${Math.round(-windowHeight/2)}px 0px`;
    scrollMainOptions = {
        rootMargin: optionMargin,
        threshold: buildThresholdList()
    };
    scrollMainObserver = new IntersectionObserver(scrollMainCallback, scrollMainOptions);
    scrollMainObserver.observe(main);
})