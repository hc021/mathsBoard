

export const familyMessagesdisplaying = (who,type,order,element, delay) => {
    const mumMsg = document.querySelector(element);
    const msg = who[type][order].message.split("");
    const speed = 50;
    setTimeout(() => appendLetter(mumMsg, msg, speed), delay);
}
//display sentence in letters
export const appendLetter = (speakerEle, messageArry, speedMilliSecond) => {
    let index = 0;
    speakerEle.timer = null;
    speakerEle.innerText = "";
    clearInterval(speakerEle.timer);
    speakerEle.timer = setInterval(() => {
        if (index < messageArry.length) {
            const letter = document.createElement("span");
            letter.innerText = messageArry[index++]
            speakerEle.appendChild(letter);
        } else {
            clearInterval(speakerEle.timer);
            index = 0;
        }
    }, speedMilliSecond)
}
export const addErrorMsg = (ele, msg) => {
    ele.classList.remove("error");
    ele.dataset.errormsg = msg;
    setTimeout(() => {
        ele.dataset.errormsg = msg;
        ele.classList.add("error")
    }, 600);
}
