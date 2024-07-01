let currentQuestionIndex = 0;
let selectedQuestions = [];
let timer;
let timeLeft = 15;
let respuestasCorrectas = 0;
let examenFinalizado = false;

function startExam() {
  selectedQuestions = shuffleArray(questions).slice(0, 10);
  showQuestion(currentQuestionIndex);
  document.getElementById('btn-finalizar').style.visibility = 'hidden';
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function showQuestion(index) {
  clearTimer();
  const questionContainer = document.getElementById('contenedor-preguntas');
  questionContainer.innerHTML = '';

  const question = selectedQuestions[index];
  const questionElement = document.createElement('div');
  questionElement.className = 'pregunta';

  const questionTitle = document.createElement('h3');
  questionTitle.textContent = question.question;
  questionElement.appendChild(questionTitle);

  question.options.forEach(option => {
    const optionElement = document.createElement('div');
    optionElement.className = 'opcion';
    optionElement.textContent = option;
    optionElement.onclick = () => validateAnswer(option, question.answer, optionElement);
    questionElement.appendChild(optionElement);
  });

  questionContainer.appendChild(questionElement);
  document.getElementById('pregunta-actual').textContent = `Pregunta ${index + 1} de ${selectedQuestions.length}`;

  if (index < selectedQuestions.length - 1) {
    document.getElementById('btn-siguiente').style.display = 'none';
    document.getElementById('btn-finalizar').style.visibility = 'hidden';
  } else {
    document.getElementById('btn-siguiente').style.display = 'none';
    document.getElementById('btn-finalizar').style.visibility = 'visible';
  }

  startTimer();
}

function validateAnswer(selected, correct, element) {
  if (examenFinalizado) return;

  clearTimer();
  if (selected === correct) {
    element.style.backgroundColor = 'green';
    respuestasCorrectas++;
  } else {
    element.style.backgroundColor = 'red';
    const options = element.parentNode.childNodes;
    options.forEach(option => {
      if (option.textContent === correct) {
        option.style.backgroundColor = 'green';
      }
    });
  }

  if (currentQuestionIndex < selectedQuestions.length - 1) {
    document.getElementById('btn-siguiente').style.display = 'block';
    document.getElementById('btn-finalizar').style.visibility = 'hidden';
  } else {
    document.getElementById('btn-siguiente').style.display = 'none';
    document.getElementById('btn-finalizar').style.visibility = 'visible';
  }
}

function siguientePregunta() {
  currentQuestionIndex++;
  if (currentQuestionIndex < selectedQuestions.length) {
    showQuestion(currentQuestionIndex);
  }
}

function finalizarExamen() {
  examenFinalizado = true;
  clearTimer();
  document.getElementById('contenedor-preguntas').innerHTML = '';
  document.getElementById('btn-siguiente').style.display = 'none';
  document.getElementById('btn-finalizar').style.visibility = 'hidden';
  document.getElementById('resultado-examen').style.display = 'block';
  document.getElementById('respuestas-correctas').textContent = respuestasCorrectas;
  document.getElementById('temporizador').style.display = 'none';
}

function startTimer() {
  timeLeft = 15;
  document.getElementById('tiempo-restante').textContent = timeLeft;
  timer = setInterval(() => {
    timeLeft--;
    document.getElementById('tiempo-restante').textContent = timeLeft;
    if (timeLeft <= 0 || examenFinalizado) {
      clearInterval(timer);
      if (!examenFinalizado) {
        alert('¡Tiempo agotado! El examen se ha finalizado automáticamente.');
        siguientePregunta();
      }
    }
  }, 1000);
}

function clearTimer() {
  clearInterval(timer);
}

startExam();
