const enterBtn =
document.getElementById("enterBtn");

const ambience =
document.getElementById("ambience");

const scene1 =
document.getElementById("scene1");

const corridor =
document.querySelector(".corridor-bg");

enterBtn.addEventListener("click", () => {

    ambience.volume = 0.15;

    ambience.play();

    scene1.classList.add("fadeOut");

    setTimeout(() => {

        scene1.style.display = "none";

        document.getElementById("scene2").style.display="block";
        document.body.style.overflowY="auto";
        window.scrollTo({
            top: 0
        });

    }, 2000);

});

window.addEventListener("scroll", () => {

    const scrollY = window.scrollY;

    const zoom =
    1 + (scrollY * 0.0004);

    corridor.style.transform =
    `scale(${zoom})`;

});