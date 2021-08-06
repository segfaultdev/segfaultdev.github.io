let grid_width = 0;
let grid_height = 0;

let cells = [];

function setup() {
  grid_width = ceil(windowWidth / 32);
  grid_height = ceil(windowHeight / 32);

  for (let i = 0; i < 1000; i++) {
    for (let tries = 0; tries < 100; tries++) {
      let pos = [random(0, grid_width), random(0, grid_height)];
      let valid = true;

      for (let cell of cells) {
        if ((cell[0] - pos[0]) * (cell[0] - pos[0]) + (cell[1] - pos[1]) * (cell[1] - pos[1]) < 16) {
          valid = false;
        }
      }

      if (valid) {
        cells.push(pos);
        break;
      }
    }
  }

  noSmooth();
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);
  noStroke();

  for (let i = 0; i < grid_height; i++) {
    for (let j = 0; j < grid_width; j++) {
      let pos = [j, i];

      let best_dist = 1000000;
      let best_cell;

      for (let cell of cells) {
        let dist = (cell[0] - pos[0]) * (cell[0] - pos[0]) + (cell[1] - pos[1]) * (cell[1] - pos[1]);

        if (dist < best_dist) {
          best_cell = cell;
          best_dist = dist;
        }
      }

      pos = [mouseX / 32, mouseY / 32];
      let dist = (best_cell[0] - pos[0]) * (best_cell[0] - pos[0]) + (best_cell[1] - pos[1]) * (best_cell[1] - pos[1]);

      let value = sin(noise(best_cell[0] / 10, best_cell[1] / 10, millis() / 4000)) * 64;
      if (value < 0) value = 0;

      if (dist < 128) {
        value += map(dist, 0, 128, 63, 0);
      }

      fill(0, 0, value);
      rect(j * 32, i * 32, 32, 32);
    }
  }
}