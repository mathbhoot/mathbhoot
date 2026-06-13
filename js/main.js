

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
        createSpark(e.clientX, e.clientY);
    });
}

function createSpark(x, y) {
    const spark = document.createElement("div");
    spark.classList.add("spark");

    const colors = [
        "#8b5cf6",
        "#60a5fa",
        "#22d3ee",
        "#fbbf24"
    ];

    spark.style.background = colors[Math.floor(Math.random() * colors.length)];
    spark.style.left = (x + (Math.random() * 20 - 10)) + "px";
    spark.style.top = (y + (Math.random() * 20 - 10)) + "px";

    document.body.appendChild(spark);

    setTimeout(() => {
        spark.remove();
    }, 1000);
}
