//References
let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let scoreCount = 0;
let count = 11;
let countdown;

//Questions and Options array

const quizArray = [
    {
        id: "0",
        question: "ما هي صيغة المركب الأيوني كلوريد الصوديوم",
        options: ["ClNa", "NaCl", "MgNa", "Nacl"],
        correct: "NaCl",
    },
    {
        id: "1",
        question: " ما هي صيغة المركب الأيوني أوكسيد المغنيسيوم ",
        options: ["OMg", "mgo", "MGO", "MgO"],
        correct: "MgO",
    },
    {
        id: "2",
        question: "ما هي صيغة المركب الأيوني نيترات الخارصين",
        options: ["Zn(No3)2", "No3Zn", "ZnNo3", "ZnNo"],
        correct: "Zn(No3)2",
    },
    {
        id: "3",
        question: " CaO سمِّ المركي الأيوني ",
        options: ["أكسجين الكالسيوم", "أكسيد الكالسيوم", " كالسيوميد الأكسجين", "كالسيوم الأكسجين"],
        correct: "أكسيد الكالسيوم",
    },
    {
        id: "4",
        question: " Fe2S3 سمِّ المركب الأيوني ",
        options: ["IIIكبريتيد الحديد", "كبريتيد الحديد", "IIكبريتيد الحديد", "الحديد الكبريتيد"],
        correct: "IIIكبريتيد الحديد",
    },
    {
        id: "5",
        question: "Ba(OH)2 سمِّ المركب الأيوني",
        options: ["II هيدروكسيد الباريوم", "ثنائي الهيدروجين و الأكسجين باريوم", "هيدروكسيد البورون", "هيدروكسيد الباريوم"],
        correct: "هيدروكسيد الباريوم",
    }, {
        id: "6",
        question: "ما هي صيغة المركب الأيوني أكسيد البوتاسيوم",
        options: ["K2O", "OK2", "KO", "KO2"],
        correct: "K2O",
    },
    {
        id: "7",
        question: "ما هي صيغة المركب الأيوني فوسفات الألمنيوم",
        options: ["AlPO4", "alpo4", "AlPO3", "Al3(PO4)3"],
        correct: "AlPO4",
    },
    {
        id: "8",
        question: "IIIما هي صيغة المركب الأيوني أكسيد الحديد",
        options: ["FeO", "Fe3O2", "Fe2O3", "Fe3O"],
        correct: "Fe2O3",
    },
    {
        id: "9",
        question: "أي مما يلي صحيح بالنسبة للمركبات الأيونية",
        options: ["غير قابلة للذويان في الماء", "تكون هشة دائمًا", "لديها نقاط انصهار منخفضة", "لديها نقاط انصهار وغليان عالية نسبيًا"],
        correct: "لديها نقاط انصهار وغليان عالية نسبيًا",
    },
];

//Restart Quiz
restart.addEventListener("click", () => {
    initial();
    displayContainer.classList.remove("hide");
    scoreContainer.classList.add("hide");
});

//Next Button
nextBtn.addEventListener(
    "click",
    (displayNext = () => {
        //increment questionCount
        questionCount += 1;
        //if last question
        if (questionCount == quizArray.length) {
            //hide question container and display score
            displayContainer.classList.add("hide");
            scoreContainer.classList.remove("hide");
            //user score
            userScore.innerHTML =
                "Your score is " + scoreCount + " out of " + questionCount;
        } else {
            //display questionCount
            countOfQuestion.innerHTML =
                questionCount + 1 + " of " + quizArray.length + " Question";
            //display quiz
            quizDisplay(questionCount);
            count = 11;
            clearInterval(countdown);
            timerDisplay();
        }
    })
);

//Timer
const timerDisplay = () => {
    countdown = setInterval(() => {
        count--;
        timeLeft.innerHTML = `${count}s`;
        if (count == 0) {
            clearInterval(countdown);
            displayNext();
        }
    }, 1000);
};

//Display quiz
const quizDisplay = (questionCount) => {
    let quizCards = document.querySelectorAll(".container-mid");
    //Hide other cards
    quizCards.forEach((card) => {
        card.classList.add("hide");
    });
    //display current question card
    quizCards[questionCount].classList.remove("hide");
};

//Quiz Creation
function quizCreator() {
    //randomly sort questions
    quizArray.sort(() => Math.random() - 0.5);
    //generate quiz
    for (let i of quizArray) {
        //randomly sort options
        i.options.sort(() => Math.random() - 0.5);
        //quiz card creation
        let div = document.createElement("div");
        div.classList.add("container-mid", "hide");
        //question number
        countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";
        //question
        let question_DIV = document.createElement("p");
        question_DIV.classList.add("question");
        question_DIV.innerHTML = i.question;
        div.appendChild(question_DIV);
        //options
        div.innerHTML += `
    <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
     <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
      <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
       <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
    `;
        quizContainer.appendChild(div);
    }
}

//Checker Function to check if option is correct or not
function checker(userOption) {
    let userSolution = userOption.innerText;
    let question =
        document.getElementsByClassName("container-mid")[questionCount];
    let options = question.querySelectorAll(".option-div");

    //if user clicked answer == correct option stored in object
    if (userSolution === quizArray[questionCount].correct) {
        userOption.classList.add("correct");
        scoreCount++;
    } else {
        userOption.classList.add("incorrect");
        //For marking the correct option
        options.forEach((element) => {
            if (element.innerText == quizArray[questionCount].correct) {
                element.classList.add("correct");
            }
        });
    }

    //clear interval(stop timer)
    clearInterval(countdown);
    //disable all options
    options.forEach((element) => {
        element.disabled = true;
    });
}

//initial setup
function initial() {
    quizContainer.innerHTML = "";
    questionCount = 0;
    scoreCount = 0;
    count = 11;
    clearInterval(countdown);
    timerDisplay();
    quizCreator();
    quizDisplay(questionCount);
}

//when user click on start button
startButton.addEventListener("click", () => {
    startScreen.classList.add("hide");
    displayContainer.classList.remove("hide");
    initial();
});

//hide quiz and display start screen
window.onload = () => {
    startScreen.classList.remove("hide");
    displayContainer.classList.add("hide");
};