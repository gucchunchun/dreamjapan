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
const home = document.querySelector('.foreground--home');
const main = document.querySelector('.foreground--main');
const sections = document.querySelectorAll('.section');

const NUM_STEPS = 100;
let windowHeight = window.innerHeight;
let optionMargin = `0px 0px ${Math.round(-windowHeight/2)}px 0px`;
console.log(optionMargin);

window.addEventListener('resize', ()=>{
    windowHeight = window.innerHeight;
    optionMargin = `0px 0px ${Math.round(-windowHeight/2)}px 0px`;
})

function buildThresholdList() {
    let thresholds = [];
   
    for (let i = 0; i < NUM_STEPS; i++) {
      let ratio = i / NUM_STEPS;
      thresholds.push(ratio);
    }
    return thresholds;
}


const scrollMainOptions = {
    rootMargin: optionMargin,
    threshold: buildThresholdList()
};
const scrollOptions = {
    threshold: buildThresholdList()
};

const scrollMainCallback = (entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            home.classList.add('hide');
            header.classList.add('active');
        } else {
            entry.target.classList.remove('active');
            home.classList.remove('hide');
            header.classList.remove('active');
        }
    })
}

const scrollCallback = (entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            const ratio = Math.round(entry.intersectionRatio*100)/100;
            if(entry.target.id=='about') {
                home.style.setProperty('--scroll', ratio);
            }
            entry.target.style.setProperty('-scroll', ratio);
        } else {
            entry.target.classList.remove('active');
        }
    })
}

const scrollMainObserver = new IntersectionObserver(scrollMainCallback, scrollMainOptions);
const scrollSectionObserver = new IntersectionObserver(scrollCallback, scrollOptions);

// scrollMainObserver.root.style.border = "2px solid #44aa44";
scrollMainObserver.observe(main);
sections.forEach(elem => {
    scrollSectionObserver.observe(elem)
})