class Bot {
  constructor() {
    this.name = 'Bot';
  }

  #minmax(grid, depth, isMaximizing) {}

  #evaluate(grid, player) {}

  sayHello() {
    return `Hello, I'm ${this.name}`;
  }
}

export default Bot;
