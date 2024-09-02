const prompt = require("prompt-sync")({ sigint: true });
const Field = require("./Field");

const field = new Field([
  ["*", "░", "O"],
  ["░", "O", "░"],
  ["░", "^", "░"],
]);

function gameLoop() {
  while (true) {
    field.print();
    const move = prompt("Which direction? (N/S/E/W): ").toUpperCase();
    if (!field.move(move)) {
      break;
    }
  }
}

gameLoop();
