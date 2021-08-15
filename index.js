// ELEMENTS constants
const CANVAS = document.getElementById("canvas");
const CANVAS_CONTEXT = CANVAS.getContext("2d");
const CLEAN_BUTTON = document.getElementById("clean-button");
const DRAW_BUTTON = document.getElementById("draw-button");
const SELECT_MODE = document.getElementById("draw-mode-select");

// NORMAL vars
let actualDrawMode = "one";
let idLastTimeout = 0;
let idLastRequestAnimationFrame = 0;

function _Init() {
  cancelAnimationFrame(idLastRequestAnimationFrame);
  clearTimeout(idLastTimeout);

  idLastTimeout = setTimeout(() => {
    _InitializeCanvas(actualDrawMode, 0, Math.PI);
  }, 100);
}

function _InitializeCanvas(mode, angle, PI) {
  const modes = { one: _MODE_1, two: _MODE_2 };

  CANVAS.width = window.innerWidth;
  CANVAS.height = window.innerHeight;

  _CleanCanvas();
  const radio = _DrawCircle({ filled: false });

  _DrawCircle({
    x: CANVAS.width / 2 - (radio) * Math.cos(PI / angle),
    y: CANVAS.height / 2 - (radio) * Math.sin(PI / angle),
    filled: true,
    radio: 10,
    strokeStyle: "red",
    fillStyle: "red",
  });

  angle += 0.0005;

  function _MODE_1() {
    (function _XAxis() {
      _DrawLine({
        xFrom: CANVAS.width / 2 + radio,
        yFrom: CANVAS.height / 2,
        xTo: CANVAS.width / 2 - radio,
        yTo: CANVAS.height / 2,
        strokeStyle: "white",
      });
    })();

    (function _YAxis() {
      _DrawLine({
        xFrom: CANVAS.width / 2,
        yFrom: CANVAS.height / 2 - radio,
        xTo: CANVAS.width / 2,
        yTo: CANVAS.height / 2 + radio,
        strokeStyle: "white",
      });
    })();

    (function _DrawSine() {
      _DrawLine({
        xFrom: CANVAS.width / 2 - (radio) * Math.cos(PI / angle),
        yFrom: CANVAS.height / 2 - (radio) * Math.sin(PI / angle),
        xTo: CANVAS.width / 2 - (radio) * Math.cos(PI / angle),
        yTo: CANVAS.height / 2,
        strokeStyle: "pink",
      });
    })();

    (function _DrawCosine() {
      _DrawLine({
        xFrom: CANVAS.width / 2 - (radio) * Math.cos(PI / angle),
        yFrom: CANVAS.height / 2 - (radio) * Math.sin(PI / angle),
        xTo: CANVAS.width / 2,
        yTo: CANVAS.height / 2 - (radio) * Math.sin(PI / angle),
        strokeStyle: "purple",
      });
    })();

    _DrawLine({
      xFrom: CANVAS.width / 2,
      yFrom: CANVAS.height / 2,
      xTo: CANVAS.width / 2 - (radio) * Math.cos(PI / angle),
      yTo: CANVAS.height / 2 - (radio) * Math.sin(PI / angle),
    });
  }

  function _MODE_2() {
    _DrawLine({
      xFrom: CANVAS.width / 2,
      yFrom: CANVAS.height / 2,
      xTo: CANVAS.width / 2 - (radio - 10) * Math.cos(PI / angle),
      yTo: radio,
      strokeStyle: "purple",
    });

    _DrawLine({
      xFrom: CANVAS.width / 2,
      yFrom: CANVAS.height / 2,
      xTo: radio,
      yTo: CANVAS.height / 2 - (radio - 10) * Math.sin(PI / angle),
      strokeStyle: "pink",
    });
  }

  modes[actualDrawMode]();

  idLastRequestAnimationFrame =  requestAnimationFrame(() => {
    _InitializeCanvas(mode, angle, PI);
  });
}

function _CleanCanvas() {
  cancelAnimationFrame(idLastRequestAnimationFrame);
  CANVAS_CONTEXT.clearRect(0, 0, CANVAS.width, CANVAS.height);
}

function _DrawLine(props) {
  const { xTo, yTo, xFrom, yFrom, strokeStyle = "green" } = props;

  CANVAS_CONTEXT.beginPath();
  CANVAS_CONTEXT.moveTo(xFrom, yFrom);
  CANVAS_CONTEXT.lineTo(xTo, yTo);
  CANVAS_CONTEXT.strokeStyle = strokeStyle;
  CANVAS_CONTEXT.stroke();
}

function _DrawCircle(props) {
  const {
    x = CANVAS.width / 2,
    y = CANVAS.height / 2,
    filled = true,
    radio = CANVAS.width / 5,
    strokeStyle = "white",
    fillStyle = "white",
  } = props;

  CANVAS_CONTEXT.beginPath();
  CANVAS_CONTEXT.arc(x, y, radio, 0, Math.PI * 2, true);
  CANVAS_CONTEXT.strokeStyle = strokeStyle;
  CANVAS_CONTEXT.lineWidth = 3;
  if (filled) {
    CANVAS_CONTEXT.fillStyle = fillStyle;
    CANVAS_CONTEXT.fill();
  }
  CANVAS_CONTEXT.stroke();

  return radio;
}

DRAW_BUTTON.addEventListener("click", _Init);
CLEAN_BUTTON.addEventListener("click", _CleanCanvas);
SELECT_MODE.addEventListener("change", (ev) => {
  actualDrawMode = ev.target.value;
  _Init();
});
window.addEventListener("DOMContentLoaded", _Init);
window.addEventListener("resize", _Init);
