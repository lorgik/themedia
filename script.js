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

const mainForm = document.querySelector(".main-form")
mainForm.addEventListener("submit", (event) => {
    const mainFormInput = mainForm.querySelector(".phone-input")

    if (!validatePhoneNumber(mainFormInput.value)) {
        event.preventDefault()
    }
})

function validatePhoneNumber(input) {
    const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
    return regex.test(input)
}

window.addEventListener(
    "scroll",
    () => {
        document.body.style.setProperty("--scroll", window.scrollY / (document.body.offsetHeight - window.innerHeight))
    },
    false
)

const signs = document.querySelectorAll(".sign")

signs.forEach((sign) => {
    sign.style.setProperty("--speed", `${(0.5 * sign.getAttribute("data-speed")) / 2}`)
})
