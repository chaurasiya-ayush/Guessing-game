// GSAP Animation
gsap.from("#mainTitle", { duration: 1, y: -50, opacity: 0, ease: "bounce" });
gsap.from("#startBtn", { duration: 1.5, scale: 0, opacity: 0, delay: 0.5, ease: "elastic.out(1, 0.5)" });

const difficultySelect = document.getElementById("difficulty");
const difficultyMessage = document.getElementById("difficultyMessage");

difficultySelect.addEventListener("change", () => {
  const value = difficultySelect.value;
  if (value === "easy") difficultyMessage.textContent = "Darpok insaan 😅";
  else if (value === "medium") difficultyMessage.textContent = "Thik thak hi hai 😐";
  else if (value === "hard") difficultyMessage.textContent = "Abh aya maja 😈";
});

function saveDifficulty() {
  const selected = difficultySelect.value;
  if (!selected) {
    alert("Please choose a difficulty!");
  } else {
    alert("Difficulty saved: " + selected.toUpperCase());
  }
}

function validateAndPlay() {
  const p1 = document.getElementById("player1").value.trim();
  const p2 = document.getElementById("player2").value.trim();
  const p3 = document.getElementById("player3").value.trim();
  const difficulty = difficultySelect.value;

  if (!p1 || !p2 || !p3 || !difficulty) {
    alert("Please fill in all fields and select a difficulty!");
    return;
  }

  localStorage.setItem("player1", p1);
  localStorage.setItem("player2", p2);
  localStorage.setItem("player3", p3);
  localStorage.setItem("difficulty", difficulty);

  bootstrap.Modal.getInstance(document.getElementById('gameSetupModal')).hide();
  setTimeout(() => openPlayerModal(0), 500);
}

let currentPlayerIndex = 0;
const guesses = [];
const gnum = Math.floor(Math.random() * 10) + 1;
console.log(gnum)
function openPlayerModal(index) {
  currentPlayerIndex = index;
  const names = [
    localStorage.getItem("player1"),
    localStorage.getItem("player2"),
    localStorage.getItem("player3")
  ];
  document.getElementById("playerInputTitle").textContent = `${names[index]}'s Turn`;
  document.getElementById("playerGuess").value = "";
  new bootstrap.Modal(document.getElementById("playerInputModal")).show();
}

function submitGuess() {
  const guess = parseInt(document.getElementById("playerGuess").value);
  if (isNaN(guess) || guess < 1 || guess > 10) {
    alert("Enter a number between 1 and 10.");
    return;
  }

  guesses[currentPlayerIndex] = guess;
  bootstrap.Modal.getInstance(document.getElementById("playerInputModal")).hide();

  if (currentPlayerIndex < 2) {
    openPlayerModal(currentPlayerIndex + 1);
  } else {
    checkWinner();
  }
}
function checkWinner() {
    const names = [
      localStorage.getItem("player1"),
      localStorage.getItem("player2"),
      localStorage.getItem("player3")
    ];
  
    let winner = "No one";
    if (guesses[0] === gnum) winner = names[0];
    else if (guesses[1] === gnum) winner = names[1];
    else if (guesses[2] === gnum) winner = names[2];
  
    document.getElementById("winnerMessage").textContent = winner === "No one" 
      ? "😢 No one guessed correctly!" 
      : `🎉 ${winner} won the game!`;
    document.getElementById("correctNumber").textContent = gnum;
  
    const winnerModal = new bootstrap.Modal(document.getElementById("winnerModal"));
    winnerModal.show();
  
    if (winner !== "No one") {
      // Trigger confetti 🎊
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  }
  

  // Generate random floating shapes
for (let i = 0; i < 30; i++) {
    const shape = document.createElement("div");
    shape.classList.add("shape");
    shape.style.left = `${Math.random() * 100}%`;
    shape.style.top = `${100 + Math.random() * 20}%`;
    shape.style.opacity = Math.random();
    shape.style.transform = `scale(${Math.random()})`;
  
    document.getElementById("floatingShapes").appendChild(shape);
  
    // Animate upward floating
    gsap.to(shape, {
      y: `-${window.innerHeight + 100}`,
      duration: 10 + Math.random() * 10,
      ease: "linear",
      repeat: -1,
      delay: Math.random() * 5
    });
  }
  
  const title = document.querySelector("#mainTitle");
const text = title.textContent;
title.textContent = "";

text.split("").forEach((char, i) => {
  const span = document.createElement("span");
  span.textContent = char;
  span.style.opacity = 0;
  title.appendChild(span);

  gsap.to(span, {
    opacity: 1,
    y: 0,
    delay: i * 0.05,
    duration: 2,
    ease: "back.out(1.7)"
  });
});


const startBtn = document.getElementById("startBtn");

startBtn.addEventListener("mouseenter", () => {
  gsap.to(startBtn, { scale: 1.1, duration: 0.3, ease: "bounce.out" });
});
startBtn.addEventListener("mouseleave", () => {
  gsap.to(startBtn, { scale: 1, duration: 0.3 });
});
gsap.to("#landing", {
    y: 10,
    duration: 2,
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true
  });
  