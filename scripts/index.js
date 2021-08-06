let dina, dina_bold;

let grid = [];

let grid_width = 0;
let grid_height = 0;

let boid_x = 0;
let boid_y = 0;

let vel_x = 0;
let vel_y = 0;

let target_x = 0;
let target_y = 0;

function preload() {
  dina = loadFont("assets/dina.ttf");
  dina_bold = loadFont("assets/dina_bold.ttf");
}

function setup() {
  grid_width = floor(windowWidth / 32);
  grid_height = floor(windowHeight / 32);

  for (let i = 0; i < grid_height; i++) {
    let row = [];

    for (let j = 0; j < grid_width; j++) {
      row.push(0);
    }

    grid.push(row);
  }

  // noSmooth();
  createCanvas(windowWidth, windowHeight);

  boid_x = grid_width / 2;
  boid_y = grid_height / 2;


}

function draw() {
  background(0, 0, 0);
  noStroke();

  let mx = mouseX / 32;
  let my = mouseY / 32;

  if (mx < 0) mx = 0;
  if (my < 0) my = 0;

  if (mx >= grid_width - 0.001) mx = grid_width - 0.001;
  if (my >= grid_height - 0.001) my = grid_height - 0.001;

  for (let i = 0; i < grid_height; i++) {
    for (let j = 0; j < grid_width; j++) {
      let value = grid[i][j];

      let dist_1 = (my - i) * (my - i) + (mx - j) * (mx - j) + 30;
      let dist_2 = (boid_y - i) * (boid_y - i) + (boid_x - j) * (boid_x - j);

      let dist = dist_1 < dist_2 ? dist_1 : dist_2;

      fill(map(value, 0.5, 1, 0, 127), map(value, 0.5, 1, 0, 127), map(value, 0, 0.75, 0, 255));
      rect(j * 32, i * 32, 32, 32);

      grid[i][j] *= 0.98;

      if (dist < 36) {
        grid[i][j] += map(dist, 0, 36, 0.05, 0);
      }
    }
  }

  let dist = sqrt((target_x - boid_x) * (target_x - boid_x) + (target_y - boid_y) * (target_y - boid_y));

  vel_x += ((target_x - boid_x) / dist) * 0.05;
  vel_y += ((target_y - boid_y) / dist) * 0.05;

  boid_x += vel_x;
  boid_y += vel_y;

  vel_x *= 0.98;
  vel_y *= 0.98;

  if (dist < 1) {
    for (let i = 0; i < 10; i++) {
      let x = random(4, grid_width - 4);
      let y = random(4, grid_height - 4);

      let temp_dist = sqrt((x - boid_x) * (x - boid_x) + (y - boid_y) * (y - boid_y));

      if (temp_dist > dist) {
        target_x = x;
        target_y = y;
        dist = temp_dist;
      }
    }
  }

  if (boid_x < -12) {
    boid_x = -12;
    vel_x = 0;
  }

  if (boid_y < -12) {
    boid_y = -12;
    vel_y = 0;
  }

  if (boid_x > grid_width + 12) {
    boid_x = grid_width + 12;
    vel_x = 0;
  }

  if (boid_y > grid_height + 12) {
    boid_y = grid_height + 12;
    vel_y = 0;
  }
}