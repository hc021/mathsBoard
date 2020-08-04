import * as app from './modules/vars.js'
const data = app.dataCreator(15);
document.addEventListener("DOMContentLoaded", () => {
app.appendQuestions(data, app.contentParent);
app.addone(15)
})
app.btnSubmit.addEventListener('click',()=>{
    const msgs = app.vaildResult(data);
    app.displayMsg(msgs);
})








