let animationInProgress = false;

document.querySelector('.slider_nav_button_prev').addEventListener('click', previous);
document.querySelector('.slider_nav_button_next').addEventListener('click', next);

function previous() {
    if (animationInProgress) return;

    animationInProgress = true;

    const widthSlider = document.querySelector('.slider').offsetWidth;
    const sliderContent = document.querySelector('.slider_content');
    sliderContent.scrollLeft -= widthSlider;

    const scrollLeft = sliderContent.scrollLeft;
    const itemSlider = sliderContent.querySelectorAll('.slider_content_item');

    if (scrollLeft === 0) {
        sliderContent.scrollLeft = widthSlider * (itemSlider.length - 1);
    }

    setTimeout(() => {
        animationInProgress = false;
    }, 500);
}

function next() {
    if (animationInProgress) return;

    animationInProgress = true;

    const widthSlider = document.querySelector('.slider').offsetWidth;
    const sliderContent = document.querySelector('.slider_content');
    const itemSlider = sliderContent.querySelectorAll('.slider_content_item');

    sliderContent.scrollLeft += widthSlider;
    const scrollLeft = sliderContent.scrollLeft;

    if (scrollLeft >= widthSlider * (itemSlider.length - 1)) {
        sliderContent.scrollLeft = 0;
    }

    setTimeout(() => {
        animationInProgress = false;
    }, 500);
}
