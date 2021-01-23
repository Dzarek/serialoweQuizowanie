const username = document.querySelector("#username");
const saveScoreBtn = document.querySelector("#saveScoreBtn");
const finalScore = document.querySelector("#finalScore");
const mostRecentScore = localStorage.getItem("mostRecentScore2");

const highScores2 = JSON.parse(localStorage.getItem("highScores2")) || [];

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

  highScores2.push(score);

  highScores2.sort((a, b) => {
    return b.score - a.score;
  });

  highScores2.splice(5);

  localStorage.setItem("highScores2", JSON.stringify(highScores2));
  window.location.assign("index.html");
};
