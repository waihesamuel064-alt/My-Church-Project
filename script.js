const $ = (selector, parent = document) =>
    parent.querySelector(selector);

const $$ = (selector, parent = document) =>
    [...parent.querySelectorAll(selector)];


document.addEventListener("DOMContentLoaded", () => {


    /* =========================
       MOBILE MENU
    ========================= */

    const menuToggle = $("#menuToggle");
    const nav = $("#navLinks");

    menuToggle?.addEventListener("click", () => {

        nav.classList.toggle("open");

    });


    $$("#navLinks a").forEach(link => {

        link.addEventListener("click", () => {

            nav.classList.remove("open");

        });

    });



    /* =========================
       DARK MODE
    ========================= */

    const savedTheme =
        localStorage.getItem("agape-theme");

    if (savedTheme) {

        document.documentElement.dataset.theme =
            savedTheme;

    }


    const themeButton =
        $("#themeToggle");


    themeButton?.addEventListener("click", () => {

        const isDark =
            document.documentElement.dataset.theme === "dark";


        document.documentElement.dataset.theme =
            isDark ? "light" : "dark";


        localStorage.setItem(
            "agape-theme",
            isDark ? "light" : "dark"
        );


        themeButton.textContent =
            isDark ? "☾" : "☀";

    });



    /* =========================
       ACTIVE NAVIGATION
    ========================= */

    let page =
        location.pathname
        .split("/")
        .pop();


    if (!page) {

        page = "home.html";

    }


    $$("#navLinks a").forEach(link => {

        if (
            link.getAttribute("href") === page
        ) {

            link.classList.add("active");

        }

    });



    /* =========================
       SCROLL PROGRESS
    ========================= */

    const progress =
        $("#progress");


    window.addEventListener("scroll", () => {

        if (!progress) return;


        const pageHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;


        const percentage =
            (window.scrollY /
            Math.max(pageHeight, 1)) * 100;


        progress.style.width =
            `${percentage}%`;

    });



    /* =========================
       SCROLL REVEAL
    ========================= */

    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target
                            .classList
                            .add("visible");

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: .12
            }
        );


    $$(".reveal").forEach(element => {

        observer.observe(element);

    });



    /* =========================
       CURRENT YEAR
    ========================= */

    $$("#year").forEach(element => {

        element.textContent =
            new Date().getFullYear();

    });



    /* =========================
       GALLERY MODAL
    ========================= */

    const modal =
        $("#galleryModal");


    if (modal) {

        const modalImage =
            $("#modalImage");

        const modalCaption =
            $("#modalCaption");


        $$(".gallery-item").forEach(item => {

            item.addEventListener("click", () => {

                modalImage.src =
                    item.dataset.image;

                modalCaption.textContent =
                    item.dataset.caption || "";

                modal.classList.add("open");

                document.body.style.overflow =
                    "hidden";

            });

        });


        const closeModal = () => {

            modal.classList.remove("open");

            document.body.style.overflow =
                "";

        };


        $("#modalClose")?.addEventListener(
            "click",
            closeModal
        );


        modal.addEventListener("click", event => {

            if (
                event.target === modal
            ) {

                closeModal();

            }

        });


        document.addEventListener(
            "keydown",
            event => {

                if (
                    event.key === "Escape"
                ) {

                    closeModal();

                }

            }
        );

    }



    /* =========================
       GALLERY FILTERS
    ========================= */

    $$(".filter").forEach(button => {

        button.addEventListener("click", () => {

            $$(".filter").forEach(btn => {

                btn.classList.remove("active");

            });


            button.classList.add("active");


            const type =
                button.dataset.filter;


            $$(".gallery-item").forEach(item => {

                if (
                    type === "all" ||
                    item.dataset.type === type
                ) {

                    item.style.display = "";

                } else {

                    item.style.display = "none";

                }

            });

        });

    });



    /* =========================
       CONTACT FORM
    ========================= */

    $$(".interactive-form").forEach(form => {

        form.addEventListener("submit", event => {

            event.preventDefault();


            const toast =
                $("#toast");


            if (toast) {

                toast.textContent =
                    form.dataset.message ||
                    "Thank you for contacting Agape Community Church.";


                toast.classList.add("show");


                setTimeout(() => {

                    toast.classList.remove(
                        "show"
                    );

                }, 4200);

            }


            form.reset();

        });

    });



    /* =========================
       ANIMATED COUNTERS
    ========================= */

    $$(".counter").forEach(counter => {

        const target =
            Number(
                counter.dataset.target || 0
            );


        const counterObserver =
            new IntersectionObserver(entries => {

                if (
                    entries[0].isIntersecting
                ) {

                    let start = 0;

                    const duration =
                        1200;

                    let startTime;


                    const animate = time => {

                        if (!startTime) {

                            startTime = time;

                        }


                        const progress =
                            Math.min(
                                (time - startTime) /
                                duration,
                                1
                            );


                        counter.textContent =
                            Math.floor(
                                progress * target
                            );


                        if (
                            progress < 1
                        ) {

                            requestAnimationFrame(
                                animate
                            );

                        }

                    };


                    requestAnimationFrame(
                        animate
                    );


                    counterObserver.disconnect();

                }

            });


        counterObserver.observe(counter);

    });



    /* =========================
       HOME HERO IMAGE SLIDESHOW
    ========================= */

    const hero =
        $("#heroImage");


    if (hero) {

        const slides =
            hero.dataset.slides
                ?.split("|")
                .filter(Boolean) || [];


        let index = 0;


        setInterval(() => {

            if (!slides.length) return;


            index =
                (index + 1) %
                slides.length;


            hero.style.opacity = "0";


            setTimeout(() => {

                hero.src =
                    slides[index];

                hero.style.opacity =
                    ".55";

            }, 280);


        }, 5500);

    }


});
