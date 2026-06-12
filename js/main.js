

const title = document.querySelector('.hero-content h1');

title.addEventListener('mouseover', () => {

    title.style.textShadow =
    "0 0 10px #fff, 0 0 20px #caa24f";

});

title.addEventListener('mouseout', () => {

    title.style.textShadow = "none";

});