document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

    const smoother = ScrollSmoother.create({
        smooth: 1,
        effects: true,
        smoothTouch: false, // Отключаем для мобильных устройств
        normalizeScroll: true, // Оптимизация для тач-устройств
    })

    const header = document.querySelector(".header")
    let lastScroll = 0
    let isAnimating = false
    let headerAnimation = gsap.to(header, {
        y: -80,
        duration: 0.3,
        paused: true, // Создаем анимацию заранее, но не запускаем
    })

    ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
            let lastTime = performance.now()
            let frames = 0
            let currentFPS = 0

            function checkFPS() {
                const now = performance.now()
                frames++

                if (now >= lastTime + 1000) {
                    // Проверяем каждую секунду
                    currentFPS = Math.round((frames * 1000) / (now - lastTime))
                    frames = 0
                    lastTime = now

                    // Пример использования для отключения эффектов
                    if (currentFPS < 30) {
                        smoother.effects(false)
                    }
                }

                requestAnimationFrame(checkFPS)
            }

            checkFPS() // Запускаем отслеживание

            const scrollY = self.scroll()

            // Если анимация уже выполняется - пропускаем кадр
            if (isAnimating) return

            isAnimating = true

            requestAnimationFrame(() => {
                if (scrollY <= 0) {
                    headerAnimation.reverse()
                } else {
                    if (scrollY > lastScroll) {
                        headerAnimation.play()
                    } else {
                        headerAnimation.reverse()
                    }
                }

                lastScroll = scrollY
                isAnimating = false
            })
        },
    })

    const servicesMenu = document.querySelector(".services__menu")
    const servicesMenuBtn = document.querySelector(".menu__item--services")

    servicesMenuBtn.addEventListener("mouseenter", () => {
        servicesMenu.classList.add("active")
        servicesMenuBtn.classList.add("active")
    })

    servicesMenuBtn.addEventListener("mouseleave", () => {
        setTimeout(() => {
            if (!servicesMenu.matches(":hover")) {
                servicesMenu.classList.remove("active")
                servicesMenuBtn.classList.remove("active")
            }
        }, 100)
    })
    servicesMenu.querySelector(".container").addEventListener("mouseleave", () => {
        setTimeout(() => {
            if (!servicesMenu.querySelector(".container").matches(":hover")) {
                servicesMenu.classList.remove("active")
                servicesMenuBtn.classList.remove("active")
            }
        }, 100)
    })

    const hash = window.location.hash || "#all"
    const hashTab = document.querySelector(`[href="${hash}"]`)
    hashTab.classList.add("active")

    const casesTabs = document.querySelectorAll(".cases__tab")

    casesTabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            casesTabs.forEach((tab) => tab.classList.remove("active"))
            tab.classList.add("active")
        })
    })
})

window.addEventListener("load", function () {
    const slider = document.querySelector(".clients__items-1")
    const slider2 = document.querySelector(".clients__items-2")
    const swiperConfigRun = {
        loop: true,
        allowTouchMove: true,
        autoplay: {
            delay: 0,
            disableOnInteraction: false,
            reverseDirection: false, // значение true меняет направление движения
        },
        effect: "slide",
        speed: 5000, //Скорость пролистывания слайдов, чем больше значение, тем медленнее двигаются слайды
        slidesPerView: 6, //Количество карточек на экране
        spaceBetween: 0, //Отступ между карточками, если меняем здесь, то меняем и в переменных root
        slidesPerGroup: 1, //Пролистывание слайдов за раз
        breakpoints: {
            320: {
                slidesPerView: 3,
                slidesPerGroup: 1,
                spaceBetween: 10,
            },
            480: {
                slidesPerView: 3,
                slidesPerGroup: 1,
                spaceBetween: 10,
            },
            640: {
                slidesPerView: 4,
                slidesPerGroup: 1,
            },
            768: {
                slidesPerView: 4,
                slidesPerGroup: 1,
            },
            1000: {
                slidesPerView: 4,
                slidesPerGroup: 1,
            },
            1360: {
                slidesPerView: 5,
                slidesPerGroup: 1,
            },
            1920: {
                slidesPerView: 6,
                slidesPerGroup: 1,
            },
        },
    }
    const swiperConfigRun2 = {
        loop: true,
        allowTouchMove: true,
        autoplay: {
            delay: 0,
            disableOnInteraction: false,
            reverseDirection: true, // значение true меняет направление движения
        },
        effect: "slide",
        speed: 5000, //Скорость пролистывания слайдов, чем больше значение, тем медленнее двигаются слайды
        slidesPerView: 6, //Количество карточек на экране
        spaceBetween: 0, //Отступ между карточками, если меняем здесь, то меняем и в переменных root
        slidesPerGroup: 1, //Пролистывание слайдов за раз
        breakpoints: {
            320: {
                slidesPerView: 3,
                slidesPerGroup: 1,
                spaceBetween: 10,
            },
            480: {
                slidesPerView: 3,
                slidesPerGroup: 1,
                spaceBetween: 10,
            },
            640: {
                slidesPerView: 4,
                slidesPerGroup: 1,
            },
            768: {
                slidesPerView: 4,
                slidesPerGroup: 1,
            },
            1000: {
                slidesPerView: 4,
                slidesPerGroup: 1,
            },
            1360: {
                slidesPerView: 5,
                slidesPerGroup: 1,
            },
            1920: {
                slidesPerView: 6,
                slidesPerGroup: 1,
            },
        },
    }
    const swiperRun = new Swiper(slider, swiperConfigRun)
    const swiperRun2 = new Swiper(slider2, swiperConfigRun2)
    window.addEventListener("resize", () => {
        swiperRun.update()
        swiperRun2.update()
    })
})
