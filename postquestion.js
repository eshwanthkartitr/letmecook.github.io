document.addEventListener("DOMContentLoaded", function() {
    const themeToggleBtn = document.getElementById("theme-toggle");
    const body = document.body;
    const terminalInput = document.getElementById("terminal-input");
    const outputDiv = document.getElementById("output");
    const cursor = document.getElementById("cursor");
    const response = document.createElement("div");
    response.textContent = "> " + "help";
    outputDiv.appendChild(response);
    displayResponse("Available commands: help, clear, start");
  
    const questions = [
      {
        question: "How many DOF's are redundant in the given manipulator?",
        options: ["a) 4", "b) 6", "c) 2", "d) 1"],
        answer: "c",
      },
      {
        question:
          "What will be initial point of end effector to be multiplied with transformation matrix?",
        options: ["a) O", "b) [1,2,3]", "c) Any Vector", "d) None of The above"],
        answer: "a",
      },
      {
        question: "No of hidden layers in the neural network?",
        options: ["a) 6", "b) 5", "c) 7", "d) 4"],
        answer: "b",
      },
      {
        question: "No of DH parameter for each joint in MDH system is?",
        options: ["a) 4", "b) 5", "c) 3", "d) 2"],
        answer: "a",
      },
    ];
    let currentQuestionIndex = 0;
    let correctAnswers = 0;
  
    // Toggle dark mode
    themeToggleBtn.addEventListener("click", function() {
      body.classList.toggle("dark-mode");
    });
  
    terminalInput.addEventListener("focus", function() {
      cursor.classList.add("blink");
    });
  
    terminalInput.addEventListener("blur", function() {
      cursor.classList.remove("blink");
    });
  
    terminalInput.addEventListener("keydown", function(event) {
      if (event.key === "Enter") {
        const inputValue = terminalInput.value.trim().toLowerCase();
        handleCommand(inputValue);
        terminalInput.value = "";
      }
    });
  
    function handleCommand(command) {
      const response = document.createElement("div");
      response.textContent = "> " + command;
      outputDiv.appendChild(response);
  
      if (command === "help") {
        displayResponse("Available commands: help, clear, start");
      } else if (command === "clear") {
        outputDiv.innerHTML = "";
      } else if (command === "start") {
        currentQuestionIndex = 0;
        correctAnswers = 0;
        displayQuestion();
      } else {
        checkAnswer(command);
      }
  
      outputDiv.scrollTop = outputDiv.scrollHeight;
    }
  
    function displayQuestion() {
      if (currentQuestionIndex < questions.length) {
        const question = questions[currentQuestionIndex].question.replace(/\\n/g, '\n');
        displayResponse(question);
        for (const option of questions[currentQuestionIndex].options) {
          displayResponse(option);
        }
      } else {
        displayResults();
      }
    }
    
    function checkAnswer(answer) {
      if (currentQuestionIndex < questions.length && answer === questions[currentQuestionIndex].answer) {
        correctAnswers++;
        displayResponse("Correct!");
      } else {
        displayResponse("Incorrect!");
      }
      currentQuestionIndex++;
      displayQuestion();
    }
  
    function displayResults() {
      displayResponse(`Quiz completed! You got ${correctAnswers} out of ${questions.length} correct.`);
      if (correctAnswers > 0) {
        triggerConfetti();
      }
    }
  
    function displayResponse(responseText) {
      const response = document.createElement("div");
      response.textContent = responseText;
      outputDiv.appendChild(response);
    }
  
    function triggerConfetti() {
      const duration = 15 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
  
      function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
      }
  
      const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();
  
        if (timeLeft <= 0) {
          return clearInterval(interval);
        }
  
        const particleCount = 50 * (timeLeft / duration);
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
      }, 250);
    }
  });
  