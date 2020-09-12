import {
    getSymbol,
    questionNumber,
    getParmas,
    createEle,
    insertELe,
    firstNumber,
    contentParent,
} from './vars.js'
import {ErrorMsg} from '../data/messages.js'
import {getRandomNumbeArry} from './basicAlgorithm.js'
import {addErrorMsg} from './message-animation.js'


const appendQuestion = (item, parentEle) => {
    let question =
        `
    <div class="question error" data-errormsg="" id=${item.containerId}>
              <span class=""></span>
              <h3 id=${item.firstId} class="first-number">${item.firstNumber}</h3>
              <h4 id="question-symbol" class="symbol">${item.symbol}</h4>
              <h3 id=${item.secondId} class="second-number">${item.secondNumber}</h3>
              <h4 id="equal-symbol" class="equal">=</h4>
              <input autofocus type="number" min="0" maxlength="4" id="ans${item.id}" class="answear"/>
          </div>
    `
    parentEle.innerHTML = question;
    questionNumber().innerText = `Question ${item.id + 1}/ ${getParmas()}`
    const btn = createEle('button');
    const validationMsg = createEle('h2');
    btn.id = `btn-${item.id}`;
    btn.innerText = `next`;
    btn.className = 'next-btn';
    validationMsg.className = 'valiation-msg';
    validationMsg.id = `valiation-msg-${item.id}`
    insertELe(contentParent, btn);
    insertELe(contentParent, validationMsg)
}
//create math question raw data
const dataCreator = (quatity) => {
    let arr = [];
    for (let index = 0; index < quatity; index++) {
        let number1 = Math.ceil((Math.random() * 100))
        let number2 = Math.ceil((Math.random() * 100))
        if (number1 > number2) {
            const symbol = getSymbol()
            let correct = 0;
            if (symbol === "+") correct = number1 + number2;
            else {
                correct = number1 - number2;
            }
            arr.push({
                id: index,
                containerId: `question${index}`,
                firstId: `first${index}`,
                firstNumber: number1,
                symbol,
                secondId: `second${index}`,
                secondNumber: number2,
                correct,
            })
        } else {
            const symbol = getSymbol()
            let correct = 0;
            if (symbol === "+") {
                correct = number2 + number1;
            }
            else {
                correct = number2 - number1;
            }
            arr.push({
                id: index,
                containerId: `question${index}`,
                firstId: `first${index}`,
                firstNumber: number2,
                symbol,
                secondId: `second${index}`,
                secondNumber: number1,
                correct
            })
        }
    }
    // console.log(arr)
    return arr;
}
//add assist as user preferance
const addone = (index) => {
    firstNumber(index).addEventListener("click", function () {
        this.previousElementSibling.classList.toggle("addone");
    })
}
const vaildResult = (itemValue, inputedValue) => (parseInt(itemValue) === parseInt(inputedValue)) ? true : false;
const entryValidLogicForMessageDisplaying = (errorElement, tempAnswearArry, tempValueArry) => {
    let count = 0;
    const copyArry = tempAnswearArry;
    tempValueArry.forEach(item => {
        const index = copyArry.indexOf(item);
        if (index != -1) {
            copyArry.splice(index, 1);
            // console.log(copyArry)
            count++;
        }
    })
    if (count == tempValueArry.length) messageDisplayer(errorElement, ErrorMsg.partiallyRight.length, ErrorMsg.partiallyRight, 100);
    else messageDisplayer(errorElement, ErrorMsg.partiallyWrong.length, ErrorMsg.partiallyWrong, 100);
};
//message display module
const messageDisplayer = (errorElement, arryLength, messageType, delay) => {
    const tempNum = getRandomNumbeArry(1, 0, arryLength);
    setTimeout(() => addErrorMsg(errorElement, messageType[tempNum[0]].message), delay);
};
const lastQuestionChecker = () => {
    const temp1 = document.querySelector(".finishScreen");
    const congMsg = document.querySelector("#congration-text-h2");
    temp1.classList.add("finishScreen-appear");
    const tempRandomIndex = getRandomNumbeArry(1, 0, ErrorMsg.congrat.length);
    congMsg.innerText = ErrorMsg.congrat[tempRandomIndex].message;
    setTimeout(function () {
        temp1.classList.remove("finishScreen-appear");
        window.close();
        window.open('./start.html', '_blank');
    }, 5000)
};
export {lastQuestionChecker, appendQuestion, dataCreator, addone, vaildResult, entryValidLogicForMessageDisplaying, messageDisplayer };