

const title = document.querySelector('.hero-content h1');

if (title) {

title.addEventListener('mouseover', () => {

    title.style.textShadow =
    "0 0 10px #fff, 0 0 20px #caa24f";

});

title.addEventListener('mouseout', () => {

    title.style.textShadow = "none";

});

}

const cursor = document.querySelector(".cursor");
const typewriterSound = new Audio("assets/sounds/typewriter.mp3");

typewriterSound.preload = "auto";
typewriterSound.volume = 0.18;
typewriterSound.loop = true;
let typewriterSoundUnlocked = false;
let typewriterSoundEnabled = false;
let replayIntroWithSound = null;

["pointerdown", "keydown", "touchstart"].forEach((eventName) => {

    document.addEventListener(eventName, unlockTypewriterSound, {
        once:true,
        passive:true
    });

});

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

    if (!hero) {
        return;
    }

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

if(ambience && soundToggle){

    ambience.volume = 0.15;

    let playing = false;

    soundToggle.addEventListener("click", (e)=>{

        e.preventDefault();

        if(!playing){

            typewriterSoundEnabled = true;
            unlockTypewriterSound();

            if(replayIntroWithSound){
                replayIntroWithSound();
            }

            ambience.play().catch(() => {

                playing = false;
                soundToggle.textContent = "🔊";

            });

            soundToggle.textContent = "🔇";

            playing = true;

        }else{

            ambience.pause();
            stopTypewriterSound();

            soundToggle.textContent = "🔊";

            playing = false;
            typewriterSoundEnabled = false;

        }

    });

}
const h2 = document.querySelector(".hero-content h2");
const h1 = document.querySelector(".hero-content h1");
const p = document.querySelector(".hero-content p");
const btn = document.querySelector(".hero-content button");

if (h2 && h1 && p && btn) {

const originalH2 = h2.textContent;
const originalH1 = h1.textContent;
let introComplete = false;

h2.textContent = "";
h1.textContent = "";

window.addEventListener("load",()=>{

    playIntroSequence(3000);

});

function playIntroSequence(delay){

    introComplete = false;

    h2.classList.remove("fade-in");
    h1.classList.remove("fade-in", "mystic-glow");
    p.classList.remove("blue-reveal");
    btn.classList.remove("slide-up");

    h2.textContent = "";
    h1.textContent = "";

    setTimeout(()=>{

        h2.classList.add("fade-in");

        typeText(h2,originalH2,95,()=>{

            setTimeout(()=>{

                h1.classList.add("fade-in");

                typeText(h1,originalH1,110,()=>{

                    h1.classList.add("mystic-glow");

                    setTimeout(()=>{

                        p.classList.add("blue-reveal");

                    },500);

                    setTimeout(()=>{

                        btn.classList.add("slide-up");
                        introComplete = true;

                    },1000);

                });

            },400);

        });

    },delay);

}

replayIntroWithSound = () => {

    if(introComplete){
        playIntroSequence(500);
    }

};

}

function typeText(element,text,speed,callback){

    let i=0;
    const letters = Array.from(text);

    startTypewriterSound(speed);

    const interval=setInterval(()=>{

        if(i>=letters.length){

            clearInterval(interval);

            stopTypewriterSound();

            if(callback) callback();

            return;

        }

        element.textContent += letters[i];

        i++;

    },speed);

}

function startTypewriterSound(speed){

    if(!typewriterSoundEnabled || !typewriterSoundUnlocked){
        return;
    }

    typewriterSound.pause();
    typewriterSound.currentTime = 0;
    typewriterSound.playbackRate = speed <= 100 ? 1.08 : 0.95;

    typewriterSound.play().catch(() => {
        // Some browsers block sound until the visitor interacts with the page.
    });

}

function stopTypewriterSound(){

    typewriterSound.pause();
    typewriterSound.currentTime = 0;

}

function unlockTypewriterSound(){

    typewriterSoundEnabled = true;

    if(typewriterSoundUnlocked){
        return;
    }

    typewriterSound.play().then(() => {

        typewriterSound.pause();
        typewriterSound.currentTime = 0;
        typewriterSoundUnlocked = true;

    }).catch(() => {
        typewriterSoundUnlocked = false;
    });

}
