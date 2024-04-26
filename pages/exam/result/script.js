const questionDataURL = "../../../resources/data/question.json";

const containerLeft = document.getElementById("container-left");
const questionTitle = document.getElementById("question-title");
const choiceA = document.getElementById("choice-a");
const choiceB = document.getElementById("choice-b");
const choiceC = document.getElementById("choice-c");
const choiceD = document.getElementById("choice-d");
const questionTable = document.getElementById("question-table");

const containerRight = document.getElementById("container-right");
const cardBody = document.getElementById("card-body");

let currentIndex = 0;
let testLength = 0;
let score = 0;
let selectedAnswers = [];
let flaggedQuestions = [];
let questionData = [];

function startTest() {
  currentIndex = 0;
  score = 0;
  selectedAnswers = [];
  questionData = [];
  showQuestion();
}

function showQuestion() {
  getQuestionData().then((data) => {
    containerLeft.innerHTML = "";
    cardBody.innerHTML = "";

    questionData = data.slice(0, 50);
    testLength = questionData.length;
    // const currentQuestion = questionData[currentIndex];

    questionData.forEach((question, index) => {
      const testContainer = document.createElement("div");
      testContainer.setAttribute("class", "test-container");
      testContainer.innerHTML = `
      <p id="question-title" class="">Question ${index + 1}:
      </br>
      ${question.question}</p>
      <div class="row">
        <div class="p-2 g-col-6 d-flex flex-column">
          <button id="a" type="button" class="answer text-start btn btn-outline-danger">A. ${
            question.A
          }</button>
        </div>
        <div class="p-2 g-col-6 d-flex flex-column">
          <button id="b" type="button" class="answer text-start btn btn-outline-danger">B. ${
            question.B
          }</button>
        </div>
        <div class="p-2 g-col-6 d-flex flex-column">
          <button id="c" type="button" class="answer text-start btn btn-outline-danger">C. ${
            question.C
          }</button>
        </div>
        <div class="p-2 g-col-6 d-flex flex-column">
          <button id="d" type="button" class="answer text-start btn btn-outline-danger">D. ${
            question.D
          }</button>
        </div>
      </div>
    `;

      containerLeft.appendChild(testContainer);
    });

    const questionTable = document.createElement("div");
    questionTable.setAttribute("id", "question-table");
    questionTable.innerHTML = `
      ${questionData
        .map((question, index) => {
          return `<button type="button" class="btn btn-outline-danger jump-to-question ${
            index === currentIndex ? "text-white btn-danger" : ""
          } ${
            selectedAnswers[index] ? "text-white btn-danger" : ""
          }" data-index=${index}">${index + 1}</button>`;
        })
        .join("")}
    `;

    cardBody.appendChild(questionTable);
  });
}

async function getQuestionData() {
  try {
    const response = await fetch(questionDataURL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching question data:", error);
    return [];
  }
}

startTest();
