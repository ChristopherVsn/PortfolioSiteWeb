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
