const Home = {
    observer: function () {
        const options = {
            root:null,
            threshold:0,
            rootMargin:"0px"
        }
        const callback = function (entries, obser) {
            console.log(entries[0])
            const left = document.getElementById('moveleft');
            const appear = document.getElementById('appear')
            left.classList.add("a");
            appear.classList.add('b');

        }
        const obser = new IntersectionObserver(callback,options);
        return obser;
    },
    nav() {
        return document.getElementById('move-up');
    },
    charImg() {
        return document.getElementById('char-picture');
    },
    addScrollListener() {
        let start = 0;
        window.addEventListener("scroll", function () {
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
    addClickEvent() {
        document.getElementById("bottom-btn").addEventListener('click'
            , () => (window.open('./pages/start.html', '_blank')))
    },
    init() {
        Home.addScrollListener();
        Home.addClickEvent();
        const obser = Home.observer();
        obser.observe(Home.charImg());
    }
}


window.addEventListener("DOMContentLoaded", Home.init)