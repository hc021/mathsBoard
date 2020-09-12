

export const opacityAnimation = async () => {
    const img = document.querySelector('.dialog-img');
    img.classList.add("hideImg");

    await setTimeout(() => {
        img.src = "../img/index-imgs/author-batman.png";
    }, 1000)

    await setTimeout(() => {
        img.classList.remove("hideImg");
        img.classList.add("showImg");
    }, 2000)
}