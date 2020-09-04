//shock screen effect
export const shockScreenEffect = () => {
    const body = document.getElementsByTagName('body');
    body[0].classList.add("screen-shock")
    setTimeout(() => {
        body[0].classList.remove("screen-shock")
    }, 1000)
}