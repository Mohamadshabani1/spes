// Define quiz questions
const quizData = [
    {
      question: "What is the capital of France?",
      a: "Berlin",
      b: "London",
      c: "Paris",
      d: "Madrid",
      correct: "c",
    },
    {
      question: "What is the largest planet in our solar system?",
      a: "Earth",
      b: "Jupiter",
      c: "Saturn",
      d: "Mars",
      correct: "b",
    },
    {
      question: "What is the largest country in the world?",
      a: "Canada",
      b: "China",
      c: "Russia",
      d: "United States",
      correct: "c",
    },
  ];
  
  // Get elements from HTML
  const quiz = document.getElementById("quiz");
  const questionEl = document.getElementById("question");
  const options = document.querySelectorAll(".option");
  const a_text = document.getElementById("a_text");
  const b_text = document.getElementById("b_text");
  const c_text = document.getElementById("c_text");
  const d_text = document.getElementById("d_text");
  const submitBtn = document.getElementById("submit");
  
  let currentQuestion = 0;
  let score = 0;
  
  // Load question
  loadQuiz();
  
  // Load next question or submit results
  function loadQuiz() {
    deselectOptions();
  
    const currentQuizData = quizData[currentQuestion];
  
    questionEl.innerText = currentQuizData.question;
    a_text.innerText = currentQuizData.a;
    b_text.innerText = currentQuizData.b;
    c_text.innerText = currentQuizData.c;
    d_text.innerText = currentQuizData.d;
  }
  
  // Clear selected option
  function deselectOptions() {
    options.forEach((option) => {
      option.checked = false;
    });
  }
  
  // Get selected option
  function getSelected() {
    let answer = undefined;
  
    options.forEach((option) => {
      if (option.checked) {
        answer = option.id;
      }
    });
  
    return answer;
  }
  
  // Submit answer and load next question
  submitBtn.addEventListener("click", () => {
    const answer = getSelected();
  
    if (answer) {
      if (answer === quizData[currentQuestion].correct) {
        score++;
      }
  
      currentQuestion++;
      if (currentQuestion < quizData.length) {
        loadQuiz();
      } else {
        quiz.innerHTML = `
          <h2>You answered correctly at ${score}/${quizData.length} questions.</h2>
          <button onclick="location.reload()">Reload</button>
        `;
      }
    }
  });
  