document.addEventListener("DOMContentLoaded", (event) => {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

    ScrollSmoother.create({
        smooth: 1,
        effects: true,
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
