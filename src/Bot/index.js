class Bot {
  pickBestMove() {
    return Math.floor(Math.random() * 7) + 1;
  }
}

export default new Bot();
