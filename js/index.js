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



// Generate bubble on aboutMe BackGround
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
        yPos = 300;
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
    document.getElementById('aboutMe').appendChild(bubble);
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
        yDirection ="350px";
    } else{
        yDirection ="-400px";
    }

    bubble.animate(
        [
            { transform: 'translate(0, 0)' },
            { transform: `translate(${xDirection}px, ${yDirection})` },
        ],
        {
            duration: Math.random() * 7000 + 5000,
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

for (let i = 0; i < 6; i++) {
    setTimeout(createBubble, i * 1500);
}
