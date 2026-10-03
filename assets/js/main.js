document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Add active class to nav links on scroll
    window.addEventListener('scroll', function() {
        let scrollPosition = window.scrollY;
        document.querySelectorAll('section').forEach(section => {
            if (scrollPosition >= section.offsetTop - 100) {
                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href').substring(1) === section.id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // Give the pigeon a natural, irregular blink.
    const pigeonEye = document.querySelector('.pigeon-eye');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let blinkTimer;

    function randomBlinkDelay() {
        return 2600 + Math.random() * 4800;
    }

    function blinkOnce() {
        if (!pigeonEye || reduceMotion.matches || document.hidden) return;

        pigeonEye.classList.remove('is-opening');
        pigeonEye.classList.add('is-blinking');

        window.setTimeout(() => {
            pigeonEye.classList.add('is-opening');
            pigeonEye.classList.remove('is-blinking');

            window.setTimeout(() => {
                pigeonEye.classList.remove('is-opening');
            }, 130);
        }, 145);
    }

    function scheduleBlink() {
        window.clearTimeout(blinkTimer);

        if (!pigeonEye || reduceMotion.matches || document.hidden) return;

        blinkTimer = window.setTimeout(() => {
            blinkOnce();

            // A small chance of a quick second blink keeps it from feeling mechanical.
            if (Math.random() < 0.16) {
                window.setTimeout(blinkOnce, 240 + Math.random() * 160);
            }

            scheduleBlink();
        }, randomBlinkDelay());
    }

    if (pigeonEye && !reduceMotion.matches) {
        const firstBlinkTimer = window.setTimeout(() => {
            blinkOnce();
        }, 900);

        scheduleBlink();

        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                window.clearTimeout(blinkTimer);
            } else {
                scheduleBlink();
            }
        });

        reduceMotion.addEventListener?.('change', scheduleBlink);
    }

});