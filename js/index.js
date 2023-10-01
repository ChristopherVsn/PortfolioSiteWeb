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
    console.log(rect.bottom,window.innerHeight);
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