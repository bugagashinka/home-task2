const usersDB = {
  Esteban: {
    password: "Trololo",
    bestScore: 1,
  },
};

module.exports = {
  getUser: (name) => usersDB[name],
  updateUserScore: (name, score) => {
    if (!usersDB[name]) return;

    const currBestScore = usersDB[name].bestScore;
    if (currBestScore < score) {
      usersDB[name].bestScore = score;
      return score;
    }
    return currBestScore;
  },
};
