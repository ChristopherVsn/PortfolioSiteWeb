//Header & nav bar
const header = document.getElementById('header');
let lastScrollTop = 0;

window.addEventListener("scroll", () => {
    let st = window.scrollY;
    if (st > lastScrollTop) {
        header.style.top = "-100px";
    } else {
        header.style.top = "0";
    }
    lastScrollTop = st <= 0 ? 0 : st;
}); 

// Pupup on language logos
class tooltip {
    static bind(selector) {
        document.querySelectorAll(selector).forEach(element => new tooltip(element))
    }

    constructor(element) {
        this.element = element;
        let tooltipTarget = this.element.getAttribute('data-tooltip');
        if (this.element.getAttribute('data-tooltip')) {
            this.title = document.querySelector(tooltipTarget).innerHTML;
        }
        this.element.addEventListener('mouseover', this.mouseOver.bind(this));
        this.element.addEventListener('mouseout', this.mouseOut.bind(this));
        this.tooltip = null;
    }
    mouseOver() {
        let tooltip = this.createTooltip();
        if (tooltip) {
            let width = tooltip.offsetWidth;
            let height = tooltip.offsetHeight;
            let left=this.element.offsetWidth/2-width/2+this.element.getBoundingClientRect().left;
            let top = this.element.getBoundingClientRect().top - height - 15+document.documentElement.scrollTop;
     
            tooltip.style.left = left + 'px';
            tooltip.style.top = top + 'px';
            tooltip.classList.add('visible');
        }
    }

    mouseOut() {
        if (this.tooltip !== null) {
            this.tooltip.classList.remove('visible');
            setTimeout(() => {
                if (this.tooltip !== null) {
                    document.body.removeChild(this.tooltip);
                    this.tooltip = null;
                }
            }, 300);
        }
    }
    
    
    createTooltip() {
        if (this.tooltip===null) {
            let tooltip = document.createElement('div');
            tooltip.classList.add('tooltip');
            tooltip.innerHTML = this.title; 
            document.body.appendChild(tooltip);
            this.tooltip = tooltip;
        }
        return this.tooltip;

    }
    
}

tooltip.bind('.moreInfo');

 
    





// TimeLine
const allLeftBlock= document.querySelectorAll('.timeline-block-left')
const allRightBlock= document.querySelectorAll('.timeline-block-right')

function isElementInViewport(e) {
    let rect = e.getBoundingClientRect();
    let elementHeight = rect.bottom - rect.top;
    let offset = elementHeight / 2;
    return (
        rect.bottom-offset <= (window.innerHeight) &&
        rect.top+offset >=0
    );
}
window.addEventListener('scroll', () => {
    allLeftBlock.forEach(leftBlock => {
        if (isElementInViewport(leftBlock)) {
            leftBlock.classList.add('timeline-left-block-show');
        } else{
            leftBlock.classList.remove('timeline-left-block-show');
        }
    }); 
    allRightBlock.forEach(rightBlock => {
        if (isElementInViewport(rightBlock)) {
            rightBlock.classList.add('timeline-right-block-show');
        } else {
            rightBlock.classList.remove('timeline-right-block-show');
        }
    });
});



// Generate bubble on Timeline BackGround
let nbClicked=0;

function createBubble() {
    let rect= document.getElementById('aboutMe').getBoundingClientRect();
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    let topOrBot = Math.round(Math.random());
    let xPos, yPos;

    if (topOrBot==0){
        xPos = Math.random() * window.innerWidth;
        yPos = -30;
    } else {
        xPos = Math.random() * window.innerWidth;
        yPos = 700;
    }
    bubble.style.left = xPos+"px";
    bubble.style.top = yPos+"px";

    const size = Math.random() * 50 + 15;
    bubble.style.width = size+"px";
    bubble.style.height = size+"px";

    const color = getRandomColor();
    bubble.style.backgroundColor = color;

    animateBubble(bubble, topOrBot);
    addOnClickBubble(bubble);
    document.getElementById('timeline').appendChild(bubble);
}


function addOnClickBubble(bubble) {
    bubble.addEventListener('click', () => {
        bubble.remove();
        nbClicked++;
        if (nbClicked==50){
            alert("Vous avez éclaté 50 bulles");
        }
    });
}


function animateBubble(bubble, topOrBot) {
    let rect= document.getElementById('aboutMe').getBoundingClientRect();
    let xDirection = (Math.random() - 0.5) * 2 * rect.width;
    let yDirection;

    if (topOrBot==0){
        yDirection ="950px";
    } else{
        yDirection ="-750px";
    }

    bubble.animate(
        [
            { transform: 'translate(0, 0)' },
            { transform: `translate(${xDirection}px, ${yDirection})` },
        ],
        {
            duration: Math.random() * 5000 + 5000,
            iterations: 1,
        }
    ).onfinish = function () {
        bubble.remove();
        createBubble();
    };
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

for (let i = 0; i < 30; i++) {
    setTimeout(createBubble, i *300);
}
