

export const opacityAnimation = async () => {
    //let second = 0;
    // const timer = setInterval(() => {
    //     second++
    //     console.log(second)
    //     switch (second) {

    //         case 5:
    //             console.log("5")
    //             break;
    //         case 7:
    //             console.log('7')
    //         case 9:
    //             console.log("9")
    //         case 12:
    //             clearInterval(timer)
    //         default:
    //             break;
    //     }
    // }, 1000)
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