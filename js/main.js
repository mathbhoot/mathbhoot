document.body.classList.remove("no-js");

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const hasFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
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
let lastSparkTime = 0;
const typewriterSounds = Array.from({ length:6 }, () => new Audio("assets/sounds/typewriter.mp3"));

typewriterSounds.forEach((sound) => {
    sound.preload = "auto";
    sound.volume = 0.2;
});

let typewriterSoundUnlocked = false;
let typewriterSoundEnabled = true;
let replayIntroWithSound = null;
let typewriterSoundIndex = 0;

["pointerdown", "keydown", "touchstart"].forEach((eventName) => {

    document.addEventListener(eventName, unlockTypewriterSound, {
        once:true,
        passive:true
    });

});

window.addEventListener("load", () => {
    unlockTypewriterSound();
});

// Check if cursor element exists before using it
if (cursor && hasFinePointer && !prefersReducedMotion) {

    document.addEventListener("mousemove", (e) => {

        cursor.style.left = e.clientX + "px";
        cursor.style.top = e.clientY + "px";

        if(Date.now() - lastSparkTime < 45){
            return;
        }

        lastSparkTime = Date.now();

        for(let i = 0; i < 2; i++){
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
let tickingScroll = false;

window.addEventListener("scroll", () => {

    if(prefersReducedMotion || tickingScroll){
        return;
    }

    tickingScroll = true;

    requestAnimationFrame(() => {

    const hero = document.querySelector(".hero");

    if (!hero) {
        tickingScroll = false;
        return;
    }

    const offset = window.pageYOffset;

    hero.style.backgroundPositionY =
        offset * 0.3 + "px";

        tickingScroll = false;

    });

}, { passive:true });
/* MOBILE GHOST TOUCH EFFECT */

document.addEventListener("touchstart", (e) => {

    if(prefersReducedMotion){
        return;
    }

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

    soundToggle.addEventListener("click", async (e)=>{

        e.preventDefault();

        if(!playing){

            typewriterSoundEnabled = true;
            await unlockTypewriterSound();

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

    if(prefersReducedMotion){
        h2.textContent = originalH2;
        h1.textContent = originalH1;
        h2.classList.add("fade-in");
        h1.classList.add("fade-in");
        p.classList.add("blue-reveal");
        btn.classList.add("slide-up");
        introComplete = true;
        return;
    }

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

btn.addEventListener("click", async () => {

    await unlockTypewriterSound();
    replayIntroWithSound();

});

}

function typeText(element,text,speed,callback){

    let i=0;
    const letters = Array.from(text);

    const interval=setInterval(()=>{

        if(i>=letters.length){

            clearInterval(interval);

            stopTypewriterSound();

            if(callback) callback();

            return;

        }

        element.textContent += letters[i];

        if(letters[i].trim()){
            playTypewriterKey(speed);
        }

        i++;

    },speed);

}

function playTypewriterKey(speed){

    if(!typewriterSoundEnabled || prefersReducedMotion){
        return;
    }

    const sound = typewriterSounds[typewriterSoundIndex];
    typewriterSoundIndex = (typewriterSoundIndex + 1) % typewriterSounds.length;

    sound.pause();
    sound.currentTime = 0;
    sound.playbackRate = speed <= 100 ? 1.08 : 0.95;

    sound.play().then(() => {
        typewriterSoundUnlocked = true;
    }).catch(() => {
        // Some browsers block sound until the visitor interacts with the page.
    });

}

function stopTypewriterSound(){

    typewriterSounds.forEach((sound) => {
        sound.pause();
        sound.currentTime = 0;
    });

}

function unlockTypewriterSound(){

    typewriterSoundEnabled = true;

    if(typewriterSoundUnlocked){
        return Promise.resolve();
    }

    const sound = typewriterSounds[0];

    return sound.play().then(() => {

        sound.pause();
        sound.currentTime = 0;
        typewriterSoundUnlocked = true;

    }).catch(() => {
        typewriterSoundUnlocked = false;
    });

}
