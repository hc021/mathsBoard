const contentParent = document.querySelector('.content');
const btnSubmit = document.getElementById('submit');


export const inputValue = index => document.getElementById(`ans${index}`)
export const firstNumber = (index) => document.getElementById(`first${index}`);
export const getSymbol = () => {
    const num = Math.random() * 10;
    return num <= 5 ? "+" : "-";
}
export const appendQuestions = (data, parentEle) => {
    let results = '';
    data.forEach(item => {
        results +=
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
    })
    return parentEle.innerHTML = results;
}
export const dataCreator = (quatity) => {
    let arr = [];
    for (let index = 0; index < quatity; index++) {
        const obj = {
            id: 0,
            containerId: "question0",
            firstId: "first0",
            firstNumber: 12,
            symbol: "+",
            secondId: "second0",
            secondNumber: 12,
            correct: 24
        }
        let number1 = Math.ceil((Math.random() * 100))
        let number2 = Math.ceil((Math.random() * 100))
        let { id, containerId, firstId, firstNumber, symbol, secondId, secondNumber, correct } = obj;
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
    return arr;
}
export const addone = (dataLength) => {
    for (let index = 0; index < dataLength; index++) {
        firstNumber(index).addEventListener("click", function () {
            this.previousElementSibling.classList.toggle("addone");
        })
    }
}
export const vaildResult = (data) => {
    let arrAnswears = [];
    let arrVaildation = [];
    data.forEach((item, index) => {
        if (parseInt(item.correct) !== parseInt(inputValue(index).value)
            && inputValue(index).value !== "") {
            arrAnswears.push({ input: item.containerId, msg: "Wrong", correct: item.correct })
        }
        else if (inputValue(index).value === "") {
            arrVaildation.push({ input: item.containerId, msg: "You forget this" })
        }
    })
    let messages = { arrAnswears, arrVaildation }
    return messages;
}
export const displayMsg = (vaildResult) => {
    if (vaildResult.arrAnswears.length === 0 && vaildResult.arrVaildation.length === 0) {
        document.location.reload();
    }
    if (vaildResult.arrVaildation.length !== 0) {
        vaildResult.arrVaildation.forEach(item => {
            const ele = document.getElementById(item.input);
            ele.classList.add("error");
            ele.dataset.errormsg = item.msg;
            ele.lastElementChild.addEventListener('focus', () => {
                ele.dataset.errormsg = "";
            })
        })
    }
    if (vaildResult.arrAnswears.length !== 0) {
        vaildResult.arrAnswears.forEach(item => {
            const ele = document.getElementById(item.input);
            ele.classList.add("error");
            ele.dataset.errormsg = item.msg;
            ele.lastElementChild.classList.add('red')
            ele.lastElementChild.addEventListener('focus', () => {
                ele.dataset.errormsg = "";
                ele.lastElementChild.classList.remove('red');
                ele.lastElementChild.addEventListener('change', function () {
                    if (parseInt(this.value) === item.correct) {
                        this.classList.add("green");
                    }
                })
            })
        })
    }
}
export { contentParent, btnSubmit };