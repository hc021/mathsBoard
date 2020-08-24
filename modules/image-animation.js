

export const opacityAnimation = () => {
    const img = document.querySelector('.dialog-img');
    img.classList.add("hideImg");
   
    setTimeout(() => {
        img.src = "../img/index-imgs/author-batman.png";  
    }, 1000)
    img.classList.add("showImg");

}