function KnightBoard(size) {
  // Possible moves for the knight
  const knightMoves = [
    [1, 2],
    [1, -2],
    [-1, 2],
    [-1, -2],
    [2, 1],
    [2, -1],
    [-2, 1],
    [-2, -1],
  ];

  class Cell {
    constructor(cell) {
      this.cell = cell;
      this.moves = knightMoves
        // Filters out invalid moves
        .map((move) => {
          return [cell[0] + move[0], cell[1] + move[1]];
        })
        .filter((move) => {
          return (
            move[0] >= 0 && move[0] < size && move[1] >= 0 && move[1] < size
          );
        });
    }
  }

  // Board creation
  const board = {};
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      board[[i, j]] = new Cell([i, j]);
    }
  }

  // Once the whole board is created
  // Every possible move now points to a node in the board
  for (let cell in board) {
    board[cell].moves = board[cell].moves.map((move) => {
      return board[move];
    });
  }

  function knightPath(a, b) {
    // Error handling
    if (!a || !b) throw new Error('Please include both coordinates');
    if (!board.hasOwnProperty(a))
      throw new Error(`The board doesn't include the cell [${a}]`);
    if (!board.hasOwnProperty(b))
      throw new Error(`The board doesn't include the cell [${b}]`);

    const root = board[a];
    const target = board[b];

    const queue = [root];
    // Keeps track of visited nodes
    const visited = [];
    // An object to track from which parent they were coming and later track
    const predecessor = {};

    // While there's still elements on the queue
    while (queue.length > 0) {
      // Take out the first element
      const visiting = queue.shift();
      // Marked as visited
      visited.push(visiting);

      // If the current visited note is the target, we break out of the loop
      if (visiting === target) break;

      // For each possible move from that cell
      visiting.moves.forEach((node) => {
        // If we haven't visited the cell, or queued it already
        if (!visited.includes(node) && !queue.includes(node)) {
          // Add it to the predecessor object to keep track
          predecessor[node.cell] = visiting.cell;
          // We add it to the queue
          queue.push(node);
        }
      });
    }

    // Path creation to return
    const path = [];
    let step = target.cell;
    while (step !== undefined) {
      // We push the step to the path
      path.push(step);
      // We mark its predecessor
      step = predecessor[step];
    }

    path.reverse();

    printPath(path);
  }

  function printPath(path) {
    console.log(`You made it in ${path.length} moves! Here's your path:`);
    path.forEach((elm) => console.log(elm));
  }

  return knightPath;
}

const knightMoves = KnightBoard(8);
