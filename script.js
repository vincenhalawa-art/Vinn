/* =========================================
   INTRO LOADING
========================================= */

const intro = document.getElementById("intro");
const site = document.getElementById("site");
const percent = document.getElementById("percent");

let value = 0;

const counter = setInterval(() => {

    value += Math.floor(Math.random() * 5) + 1;

    if (value >= 100) {
        value = 100;
        clearInterval(counter);
    }

    percent.textContent =
        String(value).padStart(2, "0") + "%";

}, 60);


window.addEventListener("load", () => {

    setTimeout(() => {

        intro.classList.add("hidden");
        site.classList.add("show");

    }, 4200);

});


/* =========================================
   PARTICLES
========================================= */

const particleContainer =
    document.getElementById("particles");

for (let i = 0; i < 65; i++) {

    const p = document.createElement("span");

    p.className = "particle";

    p.style.left =
        Math.random() * 100 + "vw";

    p.style.animation =
        `particleUp ${5 + Math.random() * 10}s linear infinite`;

    p.style.animationDelay =
        Math.random() * 8 + "s";

    p.style.opacity =
        Math.random() * .8;

    particleContainer.appendChild(p);
}


/* =========================================
   CURSOR GLOW
========================================= */

const glow =
    document.querySelector(".cursor-glow");

document.addEventListener("mousemove", (e) => {

    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";

});


/* =========================================
   TYPING EFFECT
========================================= */

const text =
    "TKJ STUDENT // PROGRAMMER // NETWORK ENTHUSIAST";

const typing =
    document.getElementById("typing");

let index = 0;

function typeText() {

    if (index < text.length) {

        typing.textContent += text[index];

        index++;

        setTimeout(typeText, 55);

    }

}

setTimeout(typeText, 4600);


/* =========================================
   SCROLL REVEAL
========================================= */

const reveals =
    document.querySelectorAll(".reveal");

const observer =
    new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                }

            });

        },
        {
            threshold: .12
        }
    );


reveals.forEach((element) => {
    observer.observe(element);
});


/* =========================================
   3D CARD TILT
========================================= */

const cards =
    document.querySelectorAll(
        ".skill, .project, .mini-card"
    );

cards.forEach((card) => {

    card.addEventListener("mousemove", (e) => {

        const rect =
            card.getBoundingClientRect();

        const x =
            e.clientX - rect.left;

        const y =
            e.clientY - rect.top;

        const centerX =
            rect.width / 2;

        const centerY =
            rect.height / 2;

        const rotateX =
            ((y - centerY) / centerY) * -4;

        const rotateY =
            ((x - centerX) / centerX) * 4;

        card.style.transform =
            `perspective(800px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-6px)`;

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = "";

    });

});


/* =========================================
   NAV ACTIVE LINK
========================================= */

const sections =
    document.querySelectorAll("section");

const navLinks =
    document.querySelectorAll(".nav nav a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach((section) => {

        const sectionTop =
            section.offsetTop - 200;

        if (
            window.scrollY >= sectionTop
        ) {
            current =
                section.getAttribute("id");
        }

    });

    navLinks.forEach((link) => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            "#" + current
        ) {
            link.classList.add("active");
        }

    });

});


/* =========================================
   RANDOM SCREEN FLASH
========================================= */

setInterval(() => {

    if (
        intro.classList.contains("hidden")
    ) {

        const flash =
            document.createElement("div");

        flash.style.position = "fixed";
        flash.style.inset = "0";
        flash.style.pointerEvents = "none";
        flash.style.zIndex = "999";

        flash.style.background =
            "rgba(120,220,255,.035)";

        document.body.appendChild(flash);

        setTimeout(() => {
            flash.remove();
        }, 70);

    }

}, 6000);