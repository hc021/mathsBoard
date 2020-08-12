const Home = {
    nav() {
       return document.getElementById('move-up');
    },
    addScrollListener() {
        let start = 0;
        window.addEventListener("scroll", function () {
            console.log("object")
            const scroll = Math.ceil(window.scrollY);
            if (scroll > start) {
                Home.nav().classList.add("nav-moveUp");
                start = scroll;
            }
            else if (scroll < start) {
                Home.nav().classList.remove("nav-moveUp");
                start = scroll;
            }
        })
    },
    addClickEvent(){
        document.getElementById("bottom-btn").addEventListener('click'
        ,()=>(window.open('./pages/start.html', '_blank')))
    },
    init(){
        Home.addScrollListener();
        Home.addClickEvent();
    }
}


window.addEventListener("DOMContentLoaded", Home.init)