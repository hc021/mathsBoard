
import { familyMessagesdisplaying, addErrorMsg, appendLetter } from '../modules/message-animation.js'
import { ErrorMsg, Mum } from '../data/messages.js'
import { opacityAnimation } from '../modules/image-animation.js'

const contentParent = document.querySelector('.content');

const btnSubmit = document.getElementById('submit');
let dataIndex = 0;
let tempData = [];


const getEleById = name => (document.getElementById(name));
const inputValue = index => document.getElementById(`ans${index}`);
const firstNumber = index => document.getElementById(`first${index}`);
const questionNumber = () => document.getElementsByClassName(`question-number`)[0];
const createEle = ele => document.createElement(ele);
const insertELe = (parentEle, child) => parentEle.appendChild(child);
const getParmas = () => window.location.search.split("?")[1].split("=")[1];
const getSymbol = () => Math.random() * 10 <= 5 ? "+" : "-";
//get one or some random number in array
const getRandomNumbeArry = (count = 1, start = 0, end = 0) => {
    let arry = [];
    for (let index = 0; index < count; index++) {
        const number = Math.floor(Math.random() * 10);
        if (arry.length <= count) {
            if (number >= start && number < end) {
                arry.push(number)
            } else {
                count++;
            }
        }
        else {
            return;
        }
    }
    return arry;
}
//append question
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
            if (symbol === "+") {
                correct = number1 + number2;
            }
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
    console.log(arr)
    return arr;
}
//add assist as user preferance
const addone = (index) => {
    firstNumber(index).addEventListener("click", function () {
        this.previousElementSibling.classList.toggle("addone");
    })
}
//check entries return boolean
const vaildResult = (itemValue, inputedValue) => (parseInt(itemValue) === parseInt(inputedValue)) ? true : false;
//shock screen effect
const shockScreenEffect = () => {
    const body = document.getElementsByTagName('body');
    body[0].classList.add("screen-shock")
    setTimeout(() => {
        body[0].classList.remove("screen-shock")
    }, 1000)
}
//monitor movement input element 
const handleKeyUp = event => {
    const tempValue = event.target.value;
    const tempAnswear = tempData[dataIndex].correct;
    let tempValueArry = (tempValue + "").split("");
    let tempAnswearArry = (tempAnswear + '').split("");
    let errorElement = getEleById(tempData[dataIndex].containerId)
    const btn = getEleById(`btn-${tempData[dataIndex].id}`)
    if (tempValueArry.length == 1) {
        //entered one number 
        if (tempValue == tempAnswear) {
            // console.log("1")
            btn.disabled = true;
            messageDisplayer(errorElement, ErrorMsg.correctAnswear.length, ErrorMsg.correctAnswear, 100);
            setTimeout(() => (correctAnswearProcceedToNextQuestion()), 3000);
        } else {
            a(errorElement, tempAnswearArry, tempValueArry)
        }
    } else if (tempValueArry.length == 2) {
        // console.log("length2")
        if (tempValue == tempAnswear) {
            btn.disabled = true;
            messageDisplayer(errorElement, ErrorMsg.correctAnswear.length, ErrorMsg.correctAnswear, 100);
            setTimeout(() => (correctAnswearProcceedToNextQuestion()), 3000)
        } else {
            a(errorElement, tempAnswearArry, tempValueArry)
        }
    } else if (tempValueArry.length == 3) {
        if (tempValue == tempAnswear) {
            btn.disabled = true;


            setTimeout(() => (correctAnswearProcceedToNextQuestion()), 3000)
        } else {
            // tempValueArry.forEach((ele, i) => {
            //     switch (ele) {
            //         case tempAnswearArry[i]:
            //             // console.log("5")
            //             messageDisplayer(errorElement, ErrorMsg.partiallyRight.length, ErrorMsg.partiallyRight, 100)
            //             break;
            //         default:
            //             messageDisplayer(errorElement, ErrorMsg.partiallyWrong.length, ErrorMsg.partiallyWrong, 100)
            //             break;
            //     }
            // })
            // entryValidLogicForMessageDisplaying(false, errorElement, tempAnswearArry, tempValueArry)
            a(errorElement, tempAnswearArry, tempValueArry);
        }
    } else if (tempValueArry == 0) {
        messageDisplayer(errorElement, ErrorMsg.emptyvalue.length, ErrorMsg.emptyvalue, 100)
    }
    else {
        messageDisplayer(errorElement, ErrorMsg.overDigis.length, ErrorMsg.overDigis, 100)
    }
}
const entryValidLogicForMessageDisplaying = (single, errorElement, tempAnswearArry, tempValueArry) => {
    if (single) {
        for (let index = 0; index < tempAnswearArry.length; index++) {
            const element = tempAnswearArry[index];
            if (element === tempValueArry[0]) {
                messageDisplayer(errorElement, ErrorMsg.partiallyRight.length, ErrorMsg.partiallyRight, 100);
                break;
            } else messageDisplayer(errorElement, ErrorMsg.partiallyWrong.length, ErrorMsg.partiallyWrong, 100);
        }
    }
    else if (tempValueArry.length === 2 && tempAnswearArry.length === 3) {
        console.log("object")
        const ele = tempAnswearArry[++index]
        if (ele === tempValueArry[index]) {
            messageDisplayer(errorElement, ErrorMsg.partiallyRight.length, ErrorMsg.partiallyRight, 100);

        } else messageDisplayer(errorElement, ErrorMsg.partiallyWrong.length, ErrorMsg.partiallyWrong, 100);
    }
    else if (tempValueArry.length === 3 && tempAnswearArry.length === 3) {
        const ele = tempAnswearArry[index]
        if (ele === tempValueArry[index]) {
            messageDisplayer(errorElement, ErrorMsg.partiallyRight.length, ErrorMsg.partiallyRight, 100);

        } else messageDisplayer(errorElement, ErrorMsg.partiallyWrong.length, ErrorMsg.partiallyWrong, 100);
    }
    else messageDisplayer(errorElement, ErrorMsg.partiallyWrong.length, ErrorMsg.partiallyWrong, 100);
}
const a = (errorElement, tempAnswearArry, tempValueArry) => {
    let count = 0;
    tempValueArry.forEach(item => {
        const index = tempAnswearArry.indexOf(item);
        if (index != -1) count++;
    })
    console.log(count)
    console.log(tempValueArry.length)
    if (count == tempValueArry.length) messageDisplayer(errorElement, ErrorMsg.partiallyRight.length, ErrorMsg.partiallyRight, 100);
    else messageDisplayer(errorElement, ErrorMsg.partiallyWrong.length, ErrorMsg.partiallyWrong, 100);
};
//message display module
const messageDisplayer = (errorElement, arryLength, messageType, delay) => {
    const tempNum = getRandomNumbeArry(1, 0, arryLength);
    setTimeout(() => addErrorMsg(errorElement, messageType[tempNum[0]].message), delay);
};
//button click event-check answear
//  -append new question
//  -shock screen if answear wrong
const handleClick = event => {
    console.log(tempData[dataIndex].id)
    console.log(tempData[dataIndex].correct)
    let errorElement = getEleById(tempData[dataIndex].containerId)
    if (vaildResult(tempData[dataIndex].correct,
        inputValue(tempData[dataIndex].id).value)
        && dataIndex < tempData.length - 1) {
        correctAnswearProcceedToNextQuestion();
    } else {
        shockScreenEffect()
        //shock effect
        messageDisplayer(errorElement, ErrorMsg.wrongAnswear.length, ErrorMsg.wrongAnswear, 100)
    }
}
//add question action depend on the vaildation 
const correctAnswearProcceedToNextQuestion = () => {
    getEleById(`btn-${dataIndex}`).removeEventListener('click', handleClick);
    inputValue(tempData[dataIndex++].id).removeEventListener('keyup', handleKeyUp);
    appendQuestion(tempData[dataIndex], contentParent);
    addone(dataIndex);
    getEleById(`btn-${dataIndex}`).addEventListener('click', handleClick);
    inputValue(tempData[dataIndex].id).addEventListener('keyup', handleKeyUp)
}
//load up function
const lastQuestionChecker = () => {

};
const liveMessagesController = () => {
    const mumMsgNo = getRandomNumbeArry(1, 0, Mum.encouerage.length,)[0]
    familyMessagesdisplaying(Mum, "encouerage", mumMsgNo, ".dialog-mum-message", 1000);
}
export const init = () => {
    liveMessagesController();
    opacityAnimation()
    const parameter = getParmas()
    tempData = dataCreator(parameter);
    appendQuestion(tempData[dataIndex], contentParent);
    addone(dataIndex)
    getEleById(`btn-${tempData[dataIndex].id}`).addEventListener('click', handleClick);
    inputValue(tempData[dataIndex].id).addEventListener('keyup', handleKeyUp)
}
const displayMsg = (vaildResult) => {
}
export { contentParent, btnSubmit };