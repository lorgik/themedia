const servicesMenu = document.querySelector(".services__menu")
const servicesMenuBtn = document.querySelector(".menu__item--services")

servicesMenuBtn.addEventListener("click", () => {
    servicesMenu.classList.toggle("active")
    servicesMenuBtn.classList.toggle("active")
})

const mainForm = document.querySelector(".main-form")
mainForm.addEventListener("submit", (event) => {
    const mainFormInput = mainForm.querySelector(".phone-input")

    console.log(mainFormInput.value)

    if (!validatePhoneNumber(mainFormInput.value)) {
        event.preventDefault()
    }
})

function validatePhoneNumber(input) {
    const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
    return regex.test(input)
}
