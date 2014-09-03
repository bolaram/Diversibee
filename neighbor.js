// function to determine count of neighboring forests to a cell
// inputs:
//   field: field 2d array
//   row: row of the cell
//   column: column number of the cell
// return:
//   info on the neighboring cells
//   population: sum of bee population in neighboring cells & current cell
//   capacity: carrying capacity for the current cell
var neighbor = function(field, row, col) {

  var forest = 0, // count all the forests found
    population = 0,
    crop = 0,
    capacity = 0,
    // begin counting one row up, unless already in topmost row
    i = row > 0 ? row - 1 : row,
    // begin counting one column left, unless already in leftmost column
    min_j = col > 0 ? col - 1 : col,
    // finish counting one row down, unless already in bottommost row
    max_i = (row >= field.length - 1) ? row : row + 1,
    // finish counting one column right, unless already in rightmost column
    max_j = (col >= field[0].length - 1) ? col : col + 1;

  for (; i <= max_i; i++) {
    for (var j = min_j; j <= max_j; j++) {

      // Don't add the block you're on!
      if (i == row && j == col) continue;

      // Increase count when you find a forest
      (field[i][j].type == "forest") ? forest++ : crop++;
      population += field[i][j].bees.population;

    }
  }

  // If we're currently on a forest, increase capacity and add bee pop'n
  if(field[row][col].type == "forest"){
    capacity = 1000;
    population += field[row][col].bees.population;
  }

  // Return info on the neighboring cells.
  // Number of forests/crops, bee population
  return {
    population: population,
    capacity: capacity + (forest*10)
  };
}

module.exports.neighbor = neighbor;