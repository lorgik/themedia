document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

    // Инициализация с оптимизированными параметрами
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
        y: -100,
        duration: 0.15,
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
                    // console.log(`FPS: ${currentFPS}`)
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

// casesTabs.forEach((tab) => {
//     casesTabs.forEach((tab) => tab.classList.remove("active"))
// })
