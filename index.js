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
let optionMargin = `0px 0px ${Math.round(-windowHeight/2)-100}px 0px`;

let scrollMainOptions = {
    rootMargin: optionMargin,
};
const scrollOptions = {
    threshold: buildThresholdList()
};

const scrollMainCallback = (entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            body.classList.add('main');
            body.classList.remove('home');
            header.classList.add('active');
        } else {
            body.classList.add('home');
            body.classList.remove('main');
            header.classList.remove('active');
        }
    })
}
let isAbout = false;
const scrollCallback = (entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const ratio = Math.round(entry.intersectionRatio*100)/100;
            if(0.5<ratio){
                entry.target.classList.add('active');
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
    optionMargin = `0px 0px ${Math.round(-windowHeight/2)-100}px 0px`;
    scrollMainOptions = {
        rootMargin: optionMargin,
        threshold: buildThresholdList()
    };
    scrollMainObserver = new IntersectionObserver(scrollMainCallback, scrollMainOptions);
    scrollMainObserver.observe(main);
})