document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText)

    const textBlock = document.querySelector(".main__title")
    const splitText = new SplitText(textBlock, { type: "lines", linesClass: "line" })

    // Скрываем все строки перед анимацией
    gsap.set(splitText.lines, { y: 50, opacity: 0 })

    // Создаем анимацию
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: textBlock,
            start: "top 80%",
            toggleActions: "play none none none",
        },
    })

    // Анимация для каждой строки с задержкой
    tl.to(textBlock, { opacity: 1, duration: 0.2 }).to(splitText.lines, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
    })

    let smoother

    if (window.innerWidth > 1280) {
        const smoother = ScrollSmoother.create({
            smooth: 1,
            effects: true,
            smoothTouch: true, // Отключаем для мобильных устройств
            normalizeScroll: true, // Оптимизация для тач-устройств
        })
    }

    let isServicesShow = false

    const header = document.querySelector(".header")
    let lastScroll = 0
    let isAnimating = false

    // Создаем анимацию заранее
    const headerAnimation = gsap.to(header, {
        y: -100,
        duration: 0.3,
        paused: true,
    })

    // Функция для мониторинга FPS (запускается один раз)
    function startFPSMonitoring() {
        let lastTime = performance.now()
        let frames = 0
        let currentFPS = 0

        function checkFPS() {
            const now = performance.now()
            frames++

            if (now >= lastTime + 1000) {
                currentFPS = Math.round((frames * 1000) / (now - lastTime))
                frames = 0
                lastTime = now

                if (currentFPS < 30) {
                    smoother?.effects(false) // Опциональная проверка на существование smoother
                }
            }

            requestAnimationFrame(checkFPS)
        }

        checkFPS()
    }

    // Запускаем мониторинг FPS
    startFPSMonitoring()

    ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
            const scrollY = self.scroll()

            if (isAnimating) return

            isAnimating = true

            requestAnimationFrame(() => {
                if (scrollY <= 0) {
                    // В самом верху страницы - показываем хэдер
                    headerAnimation.reverse()
                } else {
                    if (scrollY > lastScroll && !isServicesShow) {
                        // Скролл вниз - скрываем хэдер
                        headerAnimation.play()
                    } else {
                        // Скролл вверх - показываем хэдер
                        headerAnimation.reverse()
                    }
                }

                lastScroll = scrollY
                isAnimating = false
            })
        },
    })

    // const smoother = ScrollSmoother.create({
    //     smooth: 1,
    //     effects: true,
    //     smoothTouch: false, // Отключаем для мобильных устройств
    //     normalizeScroll: true, // Оптимизация для тач-устройств
    // })

    // const header = document.querySelector(".header")
    // let lastScroll = 0
    // let isAnimating = false
    // let headerAnimation = gsap.to(header, {
    //     y: -100,
    //     duration: 0.3,
    //     paused: true, // Создаем анимацию заранее, но не запускаем
    // })

    // ScrollTrigger.create({
    //     start: 0,
    //     end: "max",
    //     onUpdate: (self) => {
    //         let lastTime = performance.now()
    //         let frames = 0
    //         let currentFPS = 0

    //         function checkFPS() {
    //             const now = performance.now()
    //             frames++

    //             if (now >= lastTime + 1000) {
    //                 // Проверяем каждую секунду
    //                 currentFPS = Math.round((frames * 1000) / (now - lastTime))
    //                 frames = 0
    //                 lastTime = now

    //                 // Пример использования для отключения эффектов
    //                 if (currentFPS < 30) {
    //                     smoother.effects(false)
    //                 }
    //             }

    //             requestAnimationFrame(checkFPS)
    //         }

    //         checkFPS() // Запускаем отслеживание

    //         const scrollY = self.scroll()

    //         // Если анимация уже выполняется - пропускаем кадр
    //         if (isAnimating) return

    //         isAnimating = true

    //         requestAnimationFrame(() => {
    //             if (scrollY <= 0) {
    //                 headerAnimation.reverse()
    //             } else {
    //                 if (scrollY > lastScroll && !isServicesShow) {
    //                     headerAnimation.play()
    //                 } else {
    //                     headerAnimation.reverse()
    //                 }
    //             }

    //             lastScroll = scrollY
    //             isAnimating = false
    //         })
    //     },
    // })

    // // Анимация для каждого блока статьи
    // gsap.utils.toArray(".blog__item").forEach((article, index) => {
    //     gsap.from(article, {
    //       opacity: 0,
    //       y: 50,
    //       duration: 0.8,
    //       ease: "power2.out",
    //       scrollTrigger: {
    //         trigger: article,
    //         start: "top 80%", // Анимация начнется, когда верх блока будет на 80% от верха viewport
    //         toggleActions: "play none none none", // play - при входе в viewport
    //         // Маркеры для отладки (можно удалить в продакшене)
    //         markers: false
    //       },
    //       delay: index * 0.1 // Небольшая задержка между анимациями
    //     });

    const servicesMenu = document.querySelector(".services__menu")
    const servicesMenuBtn = document.querySelector(".menu__item--services")

    servicesMenuBtn.addEventListener("mouseenter", () => {
        servicesMenu.classList.add("active")
        servicesMenuBtn.classList.add("active")
        isServicesShow = true
    })

    servicesMenuBtn.addEventListener("mouseleave", () => {
        setTimeout(() => {
            if (!servicesMenu.matches(":hover")) {
                servicesMenu.classList.remove("active")
                servicesMenuBtn.classList.remove("active")
                isServicesShow = false
            }
        }, 100)
    })
    servicesMenu.querySelector(".container").addEventListener("mouseleave", () => {
        setTimeout(() => {
            if (!servicesMenu.querySelector(".container").matches(":hover")) {
                servicesMenu.classList.remove("active")
                servicesMenuBtn.classList.remove("active")
                isServicesShow = false
            }
        }, 100)
    })

    const hash = window.location.hash || "#all"
    const hashTab = document.querySelectorAll(`[href="${hash}"]`)
    hashTab.forEach((tab) => {
        tab.classList.add("active")
    })

    const casesTabs = document.querySelectorAll(".cases__tab")
    const blogTabs = document.querySelectorAll(".blog__tab")

    casesTabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            casesTabs.forEach((tab) => tab.classList.remove("active"))
            tab.classList.add("active")
        })
    })
    blogTabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            blogTabs.forEach((tab) => tab.classList.remove("active"))
            tab.classList.add("active")
        })
    })

    const blogContainer = document.querySelector(".blog .container")
    const blogSlider = document.querySelector(".blog__slider")
    let containerOffset =
        +getComputedStyle(blogContainer).marginLeft.slice(0, -2) +
        +getComputedStyle(blogContainer).paddingLeft.slice(0, -2)

    console.log(containerOffset)

    blogSlider.style.paddingLeft = `${containerOffset}px`
    blogSlider.style.paddingRight = `${containerOffset}px`

    // const links = document.querySelectorAll(".menu__item")

    // links.forEach((link) => {
    //     const text = link.querySelector("span") ? link.querySelector("span") : link.querySelector("a")
    //     let isAnimating = false

    //     // Сохраняем оригинальный текст в дата-атрибут
    //     if (!text.dataset.text) {
    //         text.dataset.text = text.textContent
    //     }

    //     link.addEventListener("mouseenter", () => {
    //         if (isAnimating) return
    //         isAnimating = true

    //         // Анимация исчезновения
    //         gsap.to(text, {
    //             y: -20,
    //             opacity: 0,
    //             duration: 0.15,
    //             ease: "power2.out",
    //             onComplete: () => {
    //                 text.textContent = text.dataset.text

    //                 // Анимация появления нового текста
    //                 gsap.fromTo(
    //                     text,
    //                     { y: 20, opacity: 0 },
    //                     {
    //                         y: 0,
    //                         opacity: 1,
    //                         duration: 0.15,
    //                         ease: "power2.out",
    //                         onComplete: () => (isAnimating = false),
    //                     }
    //                 )
    //             },
    //         })
    //     })

    //     link.addEventListener("mouseleave", () => {
    //         if (isAnimating) return
    //         isAnimating = true

    //         // Анимация исчезновения hover-текста
    //         gsap.to(text, {
    //             y: 20,
    //             opacity: 0,
    //             duration: 0.15,
    //             ease: "power2.out",
    //             onComplete: () => {
    //                 text.textContent = text.dataset.text

    //                 // Анимация появления оригинального текста
    //                 gsap.fromTo(
    //                     text,
    //                     { y: -20, opacity: 0 },
    //                     {
    //                         y: 0,
    //                         opacity: 1,
    //                         duration: 0.15,
    //                         ease: "power2.out",
    //                         onComplete: () => (isAnimating = false),
    //                     }
    //                 )
    //             },
    //         })
    //     })
    // })
})

window.addEventListener("load", function () {
    const slider = document.querySelector(".clients__items-1")
    const slider2 = document.querySelector(".clients__items-2")
    const slider3 = document.querySelector(".industry__slider")
    const slider4 = document.querySelector(".blog__slider")

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
        slidesPerView: 4, //Количество карточек на экране
        spaceBetween: 40, //Отступ между карточками, если меняем здесь, то меняем и в переменных root
        slidesPerGroup: 1, //Пролистывание слайдов за раз
        // breakpoints: {
        //     320: {
        //         slidesPerView: 3,
        //         slidesPerGroup: 1,
        //         spaceBetween: 10,
        //     },
        //     480: {
        //         slidesPerView: 3,
        //         slidesPerGroup: 1,
        //         spaceBetween: 10,
        //     },
        //     640: {
        //         slidesPerView: 4,
        //         slidesPerGroup: 1,
        //     },
        //     768: {
        //         slidesPerView: 4,
        //         slidesPerGroup: 1,
        //     },
        //     1000: {
        //         slidesPerView: 4,
        //         slidesPerGroup: 1,
        //     },
        //     1360: {
        //         slidesPerView: 5,
        //         slidesPerGroup: 1,
        //     },
        //     1920: {
        //         slidesPerView: 6,
        //         slidesPerGroup: 1,
        //     },
        // },
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
        slidesPerView: "auto", //Количество карточек на экране
        spaceBetween: 40, //Отступ между карточками, если меняем здесь, то меняем и в переменных root
        slidesPerGroup: 1, //Пролистывание слайдов за раз
        // breakpoints: {
        //     320: {
        //         slidesPerView: 3,
        //         slidesPerGroup: 1,
        //         spaceBetween: 10,
        //     },
        //     480: {
        //         slidesPerView: 3,
        //         slidesPerGroup: 1,
        //         spaceBetween: 10,
        //     },
        //     640: {
        //         slidesPerView: 4,
        //         slidesPerGroup: 1,
        //     },
        //     768: {
        //         slidesPerView: 4,
        //         slidesPerGroup: 1,
        //     },
        //     1000: {
        //         slidesPerView: 4,
        //         slidesPerGroup: 1,
        //     },
        //     1360: {
        //         slidesPerView: 5,
        //         slidesPerGroup: 1,
        //     },
        //     1920: {
        //         slidesPerView: 6,
        //         slidesPerGroup: 1,
        //     },
        // },
    }
    const swiperConfigRun3 = {
        loop: true,
        allowTouchMove: true,
        autoplay: {
            delay: 0,
            disableOnInteraction: false,
            // pauseOnMouseEnter: true,
            reverseDirection: true, // значение true меняет направление движения
        },
        effect: "slide",
        speed: 5000, //Скорость пролистывания слайдов, чем больше значение, тем медленнее двигаются слайды
        slidesPerView: "auto", //Количество карточек на экране
        spaceBetween: 40, //Отступ между карточками, если меняем здесь, то меняем и в переменных root
        slidesPerGroup: 1, //Пролистывание слайдов за раз
        // breakpoints: {
        //     320: {
        //         slidesPerView: 3,
        //         slidesPerGroup: 1,
        //         spaceBetween: 10,
        //     },
        //     480: {
        //         slidesPerView: 3,
        //         slidesPerGroup: 1,
        //         spaceBetween: 10,
        //     },
        //     640: {
        //         slidesPerView: 4,
        //         slidesPerGroup: 1,
        //     },
        //     768: {
        //         slidesPerView: 4,
        //         slidesPerGroup: 1,
        //     },
        //     1000: {
        //         slidesPerView: 4,
        //         slidesPerGroup: 1,
        //     },
        //     1360: {
        //         slidesPerView: 5,
        //         slidesPerGroup: 1,
        //     },
        //     1920: {
        //         slidesPerView: 3,
        //         slidesPerGroup: 1,
        //     },
        // },
    }
    const swiperConfigRun4 = {
        loop: false,
        allowTouchMove: true,
        autoplay: false,
        // draggable: true,
        centeredSlides: false,
        effect: "slide",
        speed: 300, //Скорость пролистывания слайдов, чем больше значение, тем медленнее двигаются слайды
        slidesPerView: "auto", //Количество карточек на экране
        spaceBetween: 40, //Отступ между карточками, если меняем здесь, то меняем и в переменных root
        slidesPerGroup: 1, //Пролистывание слайдов за раз
        breakpoints: {
            // При ширине экрана меньше 768px отключаем Swiper
            640: {
                enabled: false,
            },
        },
        // breakpoints: {
        //     320: {
        //         slidesPerView: 3,
        //         slidesPerGroup: 1,
        //         spaceBetween: 10,
        //     },
        //     480: {
        //         slidesPerView: 3,
        //         slidesPerGroup: 1,
        //         spaceBetween: 10,
        //     },
        //     640: {
        //         slidesPerView: 4,
        //         slidesPerGroup: 1,
        //     },
        //     768: {
        //         slidesPerView: 4,
        //         slidesPerGroup: 1,
        //     },
        //     1000: {
        //         slidesPerView: 4,
        //         slidesPerGroup: 1,
        //     },
        //     1360: {
        //         slidesPerView: 5,
        //         slidesPerGroup: 1,
        //     },
        //     1920: {
        //         slidesPerView: 6,
        //         slidesPerGroup: 1,
        //     },
        // },
    }

    const swiperRun = new Swiper(slider, swiperConfigRun)
    const swiperRun2 = new Swiper(slider2, swiperConfigRun2)
    const swiperRun3 = new Swiper(slider3, swiperConfigRun3)
    let swiperRun4

    if (window.innerWidth > 640) {
        swiperRun4 = new Swiper(slider4, swiperConfigRun4)

        window.addEventListener("resize", () => {
            swiperRun4.update()
        })
    }

    window.addEventListener("resize", () => {
        swiperRun.update()
        swiperRun2.update()
        swiperRun3.update()
    })
})
