import { ErrorMsg } from '../data/messages.js'
import { opacityAnimation } from '../modules/image-animation.js'
import { liveMessagesControll } from './liveMsgControl.js'
import {
    lastQuestionChecker,
    appendQuestion,
    dataCreator,
    addone,
    vaildResult,
    entryValidLogicForMessageDisplaying,
    messageDisplayer,
} from './production.js';
import { shockScreenEffect } from './screenAnimation.js'

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


//check entries return boolean
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
            if (tempData[dataIndex].id >= tempData.length - 1) setTimeout(()=>lastQuestionChecker(),2000);
            else setTimeout(() => (correctAnswearProcceedToNextQuestion()), 3000);
        } else entryValidLogicForMessageDisplaying(errorElement, tempAnswearArry, tempValueArry)
    } else if (tempValueArry.length == 2) {
        // console.log("length2")
        if (tempValue == tempAnswear) {
            btn.disabled = true;
            messageDisplayer(errorElement, ErrorMsg.correctAnswear.length, ErrorMsg.correctAnswear, 100);
            if (tempData[dataIndex].id >= tempData.length - 1) setTimeout(()=>lastQuestionChecker(),2000);
            else setTimeout(() => (correctAnswearProcceedToNextQuestion()), 3000)
        } else entryValidLogicForMessageDisplaying(errorElement, tempAnswearArry, tempValueArry)
    } else if (tempValueArry.length == 3) {
        if (tempValue == tempAnswear) {
            btn.disabled = true;
            if (tempData[dataIndex].id >= tempData.length - 1) setTimeout(()=>lastQuestionChecker(),2000) ;
            else setTimeout(() => (correctAnswearProcceedToNextQuestion()), 3000);
        } else entryValidLogicForMessageDisplaying(errorElement, tempAnswearArry, tempValueArry);
    } else if (tempValueArry == 0) messageDisplayer(errorElement, ErrorMsg.emptyvalue.length, ErrorMsg.emptyvalue, 100)
    else messageDisplayer(errorElement, ErrorMsg.overDigis.length, ErrorMsg.overDigis, 100)
}
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
export const init = () => {
    liveMessagesControll();
    opacityAnimation()
    const parameter = getParmas()
    tempData = dataCreator(parameter);
    //append question
    appendQuestion(tempData[dataIndex], contentParent);
    addone(dataIndex)
    getEleById(`btn-${tempData[dataIndex].id}`).addEventListener('click', handleClick);
    inputValue(tempData[dataIndex].id).addEventListener('keyup', handleKeyUp)
}
export { contentParent, btnSubmit, getSymbol, questionNumber, getParmas, createEle, insertELe, firstNumber, };