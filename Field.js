class Field {
  constructor(grid) {
    this.grid = grid;
    this.playerPosition = { x: 0, y: 0 };
    this.fieldWidth = grid[0].length;
    this.fieldHeight = grid.length;
    this.isGameOver = false;
    this.fieldCharacter = "░";
    this.hole = "O";
    this.hat = "^";
    this.pathCharacter = "*";
  }

  print() {
    console.log(this.grid.map((row) => row.join("")).join("\n"));
  }

  move(direction) {
    if (this.isGameOver) return false;
    let { x, y } = this.playerPosition;

    switch (direction) {
      case "N":
        y--;
        break;
      case "S":
        y++;
        break;
      case "E":
        x++;
        break;
      case "W":
        x--;
        break;
      default:
        console.log("Invalid move. Please use N, S, E, or W.");
        return true;
    }

    if (x < 0 || x >= this.fieldWidth || y < 0 || y >= this.fieldHeight) {
      console.log("Out of bounds. Game Over!");
      this.isGameOver = true;
      return false;
    }

    this.playerPosition = { x, y };
    if (this.grid[y][x] === this.hat) {
      console.log("Congratulations! You found your hat!");
      this.isGameOver = true;
      return false;
    }

    if (this.grid[y][x] === this.hole) {
      console.log("Oops! You fell into a hole. Game Over!");
      this.isGameOver = true;
      return false;
    }

    this.grid[this.playerPosition.y][this.playerPosition.x] =
      this.pathCharacter;
    return true;
  }

  static generateField(height, width, holePercentage = 0.2) {
    const field = Array.from({ length: height }, () => Array(width).fill("░"));
    const hatPosition = {
      x: Math.floor(Math.random() * width),
      y: Math.floor(Math.random() * height),
    };
    field[hatPosition.y][hatPosition.x] = "^";

    let holesToPlace = Math.floor(height * width * holePercentage);
    while (holesToPlace > 0) {
      const holeX = Math.floor(Math.random() * width);
      const holeY = Math.floor(Math.random() * height);
      if (field[holeY][holeX] === "░") {
        field[holeY][holeX] = "O";
        holesToPlace--;
      }
    }

    return field;
  }
}

module.exports = Field;
