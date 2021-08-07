let grid_width = 0;
let grid_height = 0;

let cells = [];
let canvas;

let mouseX = 0;
let mouseY = 0;

document.addEventListener("DOMContentLoaded", function() {
  grid_width = Math.ceil(window.innerWidth / 32);
  grid_height = Math.ceil(window.innerWidth / 32);

  for (let i = 0; i < 1000; i++) {
    for (let tries = 0; tries < 100; tries++) {
      let pos = [Math.random() * grid_width, Math.random() * grid_height, Math.random() * 8 * Math.PI];
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

  canvas = document.createElement("canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  document.getElementsByTagName("main")[0].appendChild(canvas);

  document.onmousemove = update_mouse;

  setInterval(render, 16);
}, false);

function update_mouse(event) {
  event = event || window.event;

  mouseX = event.clientX;
  mouseY = event.clientY;
}

function render() {
  let ctx = canvas.getContext("2d");

  let date = new Date();
  let millis = date.getTime();

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

      let value = (Math.sin(millis / 2000 + best_cell[2]) + 1) * 32;

      if (dist < 128) {
        value += 64 - (dist / 2);
      }

      ctx.fillStyle = "rgb(0, 0, " + value + ")";
      ctx.fillRect(j * 32, i * 32, 32, 32);
    }
  }
}