const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let currentQuestionIndex = 0;
let score = 0;

function loadQuestionsFromFile() {
  try {
    const rawData = fs.readFileSync('questions.json');
    return JSON.parse(rawData);
  } catch (error) {
    console.error('Error loading questions from file:', error.message);
    process.exit(1);
  }
}

function displayQuestion(question) {
  console.log(`\nQuestion ${currentQuestionIndex + 1}: ${question.text}`);
  question.choices.forEach((choice, index) => {
    console.log(`${index + 1}. ${choice}`);
  });
}

function displayScore() {
  console.log(`\nYour final score is: ${score}/${questions.length}`);
  rl.close();
}

function askQuestion() {
  if (currentQuestionIndex < questions.length) {
    const question = questions[currentQuestionIndex];
    displayQuestion(question);

    rl.question('Enter the number of your answer: ', (answer) => {
      const selectedAnswerIndex = parseInt(answer) - 1;

      if (
        selectedAnswerIndex >= 0 &&
        selectedAnswerIndex < question.choices.length
      ) {
        const selectedAnswer = question.choices[selectedAnswerIndex];
        if (selectedAnswer === question.correctAnswer) {
          console.log('Correct!\n');
          score++;
        } else {
          console.log(`Incorrect. The correct answer is: ${question.correctAnswer}\n`);
        }

        currentQuestionIndex++;
        askQuestion();
      } else {
        console.log('Invalid answer. Please enter a valid number.');
        askQuestion();
      }
    });
  } else {
    displayScore();
  }
}

const questions = loadQuestionsFromFile();
askQuestion();
