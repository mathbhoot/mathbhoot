

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
/* MOBILE GHOST TOUCH EFFECT */

document.addEventListener("touchstart", (e) => {

    const touch = e.touches[0];

    createTouchOrb(
        touch.clientX,
        touch.clientY
    );

});

function createTouchOrb(x, y){

    const orb = document.createElement("div");

    orb.classList.add("touch-orb");

    orb.style.left = x + "px";
    orb.style.top = y + "px";

    document.body.appendChild(orb);

    setTimeout(() => {
        orb.remove();
    }, 1200);

}
const ambience = document.getElementById("ambience");
const soundToggle = document.getElementById("sound-toggle");

if(ambience){

    ambience.volume = 0.15;

    let playing = false;

    soundToggle.addEventListener("click", (e)=>{

        e.preventDefault();

        if(!playing){

            ambience.play();

            soundToggle.textContent = "🔇";

            playing = true;

        }else{

            ambience.pause();

            soundToggle.textContent = "🔊";

            playing = false;

        }

    });

}
const h2 = document.querySelector(".hero-content h2");
const h1 = document.querySelector(".hero-content h1");
const p = document.querySelector(".hero-content p");
const btn = document.querySelector(".hero-content button");

const originalH2 = h2.textContent;
const originalH1 = h1.textContent;

h2.textContent = "";
h1.textContent = "";

window.addEventListener("load",()=>{

    setTimeout(()=>{

        h2.classList.add("fade-in");

        typeText(h2,originalH2,100,()=>{

            setTimeout(()=>{

                h1.classList.add("fade-in");

                typeText(h1,originalH1,120,()=>{

                    h1.classList.add("mystic-glow");

                    setTimeout(()=>{

                        p.classList.add("slide-up");

                    },500);

                    setTimeout(()=>{

                        btn.classList.add("slide-up");

                    },1000);

                });

            },400);

        });

    },1000);

});

function typeText(element,text,speed,callback){

    let i=0;

    const interval=setInterval(()=>{

        element.textContent += text.charAt(i);

        i++;

        if(i>=text.length){

            clearInterval(interval);

            if(callback) callback();

        }

    },speed);

}
