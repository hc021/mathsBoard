const select = document.getElementById('question-count');
const startBtn = document.getElementById('s-btn');


const levels = [
    { level: 0, msg: "Choose Your Level" },
    { level: 5, msg: "Easy (5 question)" },
    { level: 10, msg: "Normal (10 question)" },
    { level: 15, msg: "Hard (15 question)" },
    { level: 20, msg: "Very Hard (20 question)" },
    { level: 30, msg: "Daddy&Mummy HappyTime(30 question)" }
]

export const optionsCreator = () => {
    for (let index = 0; index < levels.length; index++) {
        select.appendChild(document.createElement("option"));    
        select.children[index].textContent = levels[index].msg;
        select.children[index].value = levels[index].level;
    }
}

export { select , startBtn};