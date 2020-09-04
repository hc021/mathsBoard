//get one or some random number in array
export const getRandomNumbeArry = (count = 1, start = 0, end = 0) => {
    let arry = [];
    for (let index = 0; index < count; index++) {
        const number = Math.floor(Math.random() * 10);
        if (arry.length <= count) {
            if (number >= start && number < end) arry.push(number);
            else count++;
        }
        else return;
    }
    return arry;
}