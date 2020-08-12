import {Author, Charlotte, Mum} from '../data/messages.js'

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

const appendQuestion = (item, parentEle) => {
    let question =
        `
    <div class="question error" data-errormsg="" id=${item.containerId}>
              <span class=""></span>
              <h3 id=${item.firstId} class="first-number">${item.firstNumber}</h3>
              <h4 id="question-symbol" class="symbol">${item.symbol}</h4>
              <h3 id=${item.secondId} class="second-number">${item.secondNumber}</h3>
              <h4 id="equal-symbol" class="equal">=</h4>
              <input type="number" min="0" maxlength="4" id="ans${item.id}" class="answear"/>
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
const addone = (index) => {
    firstNumber(index).addEventListener("click", function () {
        this.previousElementSibling.classList.toggle("addone");
    })
}
const vaildResult = (itemValue, inputedValue) => (parseInt(itemValue) === parseInt(inputedValue)) ? true : false;

const shockScreenEffect = () => {
    const body = document.getElementsByTagName('body');
    body[0].classList.add("screen-shock")
    setTimeout(() => {
        body[0].classList.remove("screen-shock")
    }, 1000)
}
const mumMessages=()=>{
    setInterval(()=>{
        const a = document.getElementsByClassName('dialog-mum-message')[0];
    a.innerText=Mum.angry[0].message;
    

    },2000)
}
const handleChange = event => {
    console.log(event.target.value)
}
const handleClick = event => {
    console.log(inputValue(tempData[dataIndex].id).value)
    console.log(tempData[dataIndex].correct)
    if (vaildResult(tempData[dataIndex].correct,
        inputValue(tempData[dataIndex].id).value)
        && dataIndex < tempData.length - 1) {
        dataIndex++;
        appendQuestion(tempData[dataIndex], contentParent);
        addone(dataIndex);
        getEleById(`btn-${dataIndex}`)
            .addEventListener('click', handleClick);
        // getEleById(`valiation-msg-${dataIndex}`).innerText = 'valiation-msg';
    } else {
        shockScreenEffect()

       
        console.log("object")
        //    dataIndex=tempData.length;
    }
}
export const init = () => {
    console.log('dataindex', dataIndex)
    mumMessages();
    const parameter = getParmas()
    tempData = dataCreator(parameter);
    appendQuestion(tempData[dataIndex], contentParent);
    addone(dataIndex)
    getEleById(`btn-${tempData[dataIndex].id}`).addEventListener('click', handleClick);
    inputValue(tempData[dataIndex].id).addEventListener('change', handleChange)
}
const displayMsg = (vaildResult) => {
    // if (vaildResult.arrAnswears.length === 0 && vaildResult.arrVaildation.length === 0) {
    //     document.location.reload();
    // }
    // if (vaildResult.arrVaildation.length !== 0) {
    //     vaildResult.arrVaildation.forEach(item => {
    //         const ele = document.getElementById(item.input);
    //         ele.classList.add("error");
    //         ele.dataset.errormsg = item.msg;
    //         ele.lastElementChild.addEventListener('focus', () => {
    //             ele.dataset.errormsg = "";
    //         })
    //     })
    // }
    // if (vaildResult.arrAnswears.length !== 0) {
    //     vaildResult.arrAnswears.forEach(item => {
    //         const ele = document.getElementById(item.input);
    //         ele.classList.add("error");
    //         ele.dataset.errormsg = item.msg;
    //         ele.lastElementChild.classList.add('red')
    //         ele.lastElementChild.addEventListener('focus', () => {
    //             ele.dataset.errormsg = "";
    //             ele.lastElementChild.classList.remove('red');
    //             ele.lastElementChild.addEventListener('change', function () {
    //                 if (parseInt(this.value) === item.correct) {
    //                     this.classList.add("green");
    //                 }
    //                 else {
    //                     this.classList.replace('green', "red")
    //                 }
    //             })
    //         })
    //     })
    // }
}
export { contentParent, btnSubmit };