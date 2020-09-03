const Mum = {
    encouerage: [{
        id: 1,
        message: "Hi Charlotte, Mummy think you can do it!!!"
    },
    {
        id: 2,
        message: "Yes, Charlotte! You can do it.I am counting on you!!!"
    }],
    happy: [{
        id: 1,
        message: "Well done Charlotte, you are the best, Here is your lolipop"
    }],
    angry: [{
        id: 1,
        message: "don't watch televion when are doing maths"
    }]

}

const Author = {
    happy: [{
        id: 1,
        message: "Gi Gi gii... sister can do it"
    }],
    cry: [{
        id: 1,
        message: "So hard... Wa....."
    }]
}

const Charlotte = {
    normal:
        [{
            id: 1,
            message: "Daddy Daddy..."
        },
        {
            id: 2,
            message: " I want watch pj masks..."
        }
        ]
}

const ErrorMsg = {
    partiallyRight: [
        { message: "Good start, keep it up" },
        { message: "Nice, good one" }
    ],
    correctAnswear: [
        { message: "Yah, Good job" },
        { message: "Wonderful! try another one!" },
    ],
    partiallyWrong: [
        { message: "not quite right..." },
        { message: "...mmm, not really" },
        { message: "no...check it carefully" }
    ],
    takeTooLong: [
        { message: "what are you waitting for!" },
        { message: "Hit the number, Come on" },
        { message: "are you reading the question???" },
        { message: "why you are take so long..." },
        { message: "I am sleepy....zzzzzzzz" },
    ],
    wrongAnswear: [
        { message: "Wrong,check it again." }
    ],
    emptyvalue: [
        { message: "alright, start again" },
        { message: "are you ready?" },
        { message: "think...think..." }
    ],
    overDigis: [
        { message: "too many numbers" },
    ],
    congrat: [
        { message: "Well done Charlotte!!!" },
        { message: "Good on you Charlotte!!!" },
        { message: "You are the best my dear" },
    ]
}
export { Mum, Author, Charlotte, ErrorMsg }