

const title = document.querySelector('.hero-content h1');

title.addEventListener('mouseover', () => {

    title.style.textShadow =
    "0 0 10px #fff, 0 0 20px #caa24f";

});

title.addEventListener('mouseout', () => {

    title.style.textShadow = "none";

});

const cursor = document.querySelector(".cursor");

// Check if cursor element exists before using it
if (cursor) {

    document.addEventListener("mousemove", (e) => {

        cursor.style.left = e.clientX + "px";
        cursor.style.top = e.clientY + "px";

        for(let i = 0; i < 4; i++){
            createSpark(e.clientX, e.clientY);
        }

    });

}

function createSpark(x, y) {

    const spark = document.createElement("div");

    spark.classList.add("spark");

    const symbols = ["✦","✧","✶","✹"];

    spark.innerHTML =
        symbols[Math.floor(Math.random()*symbols.length)];

    const colors = [
        "#8b5cf6",
        "#c084fc",
        "#60a5fa",
        "#22d3ee",
        "#facc15"
    ];

    spark.style.color =
        colors[Math.floor(Math.random()*colors.length)];

    spark.style.left =
        (x + (Math.random()*40-20)) + "px";

    spark.style.top =
        (y + (Math.random()*40-20)) + "px";

    document.body.appendChild(spark);

    setTimeout(() => {
        spark.remove();
    },1200);
}
window.addEventListener("scroll", () => {

    const hero = document.querySelector(".hero");

    const offset = window.pageYOffset;

    hero.style.backgroundPositionY =
        offset * 0.3 + "px";

});