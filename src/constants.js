const DIFFICULTY_FACTOR_INCREMENT = 0.01;

const difficulties = {
  easy: {
    key: "easy",
    label: "Easy",
    factor: 1,
  },
  medium: {
    key: "medium",
    label: "Medium",
    factor: 1.5,
  },
  hard: {
    key: "hard",
    label: "Hard",
    factor: 2,
  },
};

export { DIFFICULTY_FACTOR_INCREMENT, difficulties };
