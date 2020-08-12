
import * as start from './startPages-vars.js'

start.optionsCreator();
const init = function () {
    start.select.addEventListener('change', (event) => {
        let count = event.target.value;
        start.startBtn.name = count;
    })
    start.startBtn.addEventListener('click', function () {
        
        (this.name==="") ? alert("please choose your level") 
        : window.open(`./maths-main.html?name=${start.startBtn.name}`,'_blank') ;
    })
}
document.addEventListener("DOMContentLoaded", init)