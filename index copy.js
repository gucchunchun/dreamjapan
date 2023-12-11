class TxtRotate {
    constructor(el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
        this.isDeleting = false;
    }
    rotate() {
        var i = this.loopNum % this.toRotate.length;
        var fullTxt = this.toRotate[i];
        fullTxt = fullTxt.replace(/\s/g, '<br>');
        
        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }
    
        // Check if the last character is '<', and adjust the displayed content accordingly
        this.el.innerHTML = this.txt.endsWith('<') ? this.txt.slice(0, -1) : this.txt;
    
        var that = this;
        var delta = 300;
    
        //while deleting (deleting speed value is set to twice as fast as showing text speed)
        if (this.isDeleting) { delta /= 2; }
    
        // after showing full text
        if (!this.isDeleting && this.txt === fullTxt) {
          delta = this.period;
          this.isDeleting = true;
        } 
        // after deleting
        else if (this.isDeleting && this.txt === '') {
          this.isDeleting = false;
          this.loopNum++;
          delta = 500;
        }
    
        setTimeout(function() {
          that.rotate();
        }, delta);
    };
    
}

addEventListener('load', () => {
    const RotateText = document.querySelector('.txt-rotate');
    const toRotate = RotateText.getAttribute('data-rotate').split(',');
    const period = RotateText.getAttribute('data-period');
    if (toRotate) {
        const Rotate = new TxtRotate(RotateText, toRotate, period);
        Rotate.rotate();
    }
});

