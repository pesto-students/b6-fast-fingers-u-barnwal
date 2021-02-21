const getScoreAsDuration = (score) => {
  let minutes = Math.floor(score / 60);
  let seconds = Math.floor(score % 60);

  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  return minutes + " : " + seconds;
};

export { getScoreAsDuration };
