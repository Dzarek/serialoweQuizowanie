const username = document.querySelector("#username");
const saveScoreBtn = document.querySelector("#saveScoreBtn");
const finalScore = document.querySelector("#finalScore");
const mostRecentScore = localStorage.getItem("mostRecentScore4");

const highScores4 = JSON.parse(localStorage.getItem("highScores4")) || [];

const MAX_HIGH_SCORES = 5;

finalScore.innerText = `Gratulacje! Uzyskano ${mostRecentScore} punktów`;

username.addEventListener("keyup", () => {
  saveScoreBtn.disabled = !username.value;
});

saveHighScore = (e) => {
  e.preventDefault();

  const score = {
    score: mostRecentScore,
    name: username.value,
  };

  highScores4.push(score);

  highScores4.sort((a, b) => {
    return b.score - a.score;
  });

  highScores4.splice(5);

  localStorage.setItem("highScores4", JSON.stringify(highScores4));
  window.location.assign("index.html");
};
