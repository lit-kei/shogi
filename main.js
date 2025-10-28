const kinMoves = [{pos:[-1,-1],inf:false},{pos:[-1,0],inf:false},{pos:[-1,1],inf:false},{pos:[0,-1],inf:false},{pos:[0,1],inf:false},{pos:[1,0],inf:false}];
const mapping = {
    0:{display: "", move: []},
    1:{display: "歩", move: [{pos:[-1,0],inf:false}]},
    2:{display: "香", move: [{pos:[-1,0],inf:true}]},
    3:{display: "桂", move: [{pos:[-2,-1],inf:false},{pos:[-2,1],inf:false}]},
    4:{display: "銀", move: [{pos:[-1,-1],inf:false},{pos:[-1,0],inf:false},{pos:[-1,1],inf:false},{pos:[1,-1],inf:false},{pos:[1,1],inf:false}]},
    5:{display: "金", move: [...kinMoves]},
    6:{display: "角", move: [{pos:[-1,-1],inf:true},{pos:[-1,1],inf:true},{pos:[1,-1],inf:true},{pos:[1,1],inf:true}]},
    7:{display: "飛", move: [{pos:[-1,0],inf:true},{pos:[0,-1],inf:true},{pos:[0,1],inf:true},{pos:[1,0],inf:true}]},
    8:{display: "と", move: [...kinMoves]},
    9:{display: "成香", move: [...kinMoves]},
    10:{display: "成桂", move: [...kinMoves]},
    11:{display: "成銀", move: [...kinMoves]},
    12:{display: "馬", move: [{pos:[-1,-1],inf:true},{pos:[-1,1],inf:true},{pos:[1,-1],inf:true},{pos:[1,1],inf:true},{pos:[-1,0],inf:false},{pos:[0,-1],inf:false},{pos:[0,1],inf:false},{pos:[1,0],inf:false}]},
    13:{display: "龍", move: [{pos:[-1,0],inf:true},{pos:[0,-1],inf:true},{pos:[0,1],inf:true},{pos:[1,0],inf:true},{pos:[-1,-1],inf:false},{pos:[-1,1],inf:false},{pos:[1,-1],inf:false},{pos:[1,1],inf:false}]},
    14:{display: "王", move: [{pos:[-1,-1],inf:false},{pos:[-1,0],inf:false},{pos:[-1,1],inf:false},{pos:[0,-1],inf:false},{pos:[0,1],inf:false},{pos:[1,-1],inf:false},{pos:[1,0],inf:false},{pos:[1,1],inf:false}]},
    15:{display: "玉", move: [{pos:[-1,-1],inf:false},{pos:[-1,0],inf:false},{pos:[-1,1],inf:false},{pos:[0,-1],inf:false},{pos:[0,1],inf:false},{pos:[1,-1],inf:false},{pos:[1,0],inf:false},{pos:[1,1],inf:false}]}
}
const players = {white: -1, black: 1};
const initialSetup = [
[ {t:2,p:'white'},{t:3,p:'white'},{t:4,p:'white'},{t:5,p:'white'},{t:15,p:'white'},{t:5,p:'white'},{t:4,p:'white'},{t:3,p:'white'},{t:2,p:'white'} ],
[ null,{t:7,p:'white'},null,null,null,null,null,{t:6,p:'white'},null ],
[ {t:1,p:'white'},{t:1,p:'white'},{t:1,p:'white'},{t:1,p:'white'},{t:1,p:'white'},{t:1,p:'white'},{t:1,p:'white'},{t:1,p:'white'},{t:1,p:'white'} ],
[ null,null,null,null,null,null,null,null,null ],
[ null,null,null,null,null,null,null,null,null ],
[ null,null,null,null,null,null,null,null,null ],
[ {t:1,p:'black'},{t:1,p:'black'},{t:1,p:'black'},{t:1,p:'black'},{t:1,p:'black'},{t:1,p:'black'},{t:1,p:'black'},{t:1,p:'black'},{t:1,p:'black'} ],
[ null,{t:6,p:'black'},null,null,null,null,null,{t:7,p:'black'},null ],
[ {t:2,p:'black'},{t:3,p:'black'},{t:4,p:'black'},{t:5,p:'black'},{t:14,p:'black'},{t:5,p:'black'},{t:4,p:'black'},{t:3,p:'black'},{t:2,p:'black'} ],
];
const promotable = [{from:1,to:8},{from:2,to:9},{from:3,to:10},{from:4,to:11},{from:6,to:12},{from:7,to:13}];
let boardState = [];
let currentPlayer = "white";
let selected = null;
let count = 0;
let history = [];
let possibleMoves = [];
const komadai = { black: {}, white: {} };
const boardEl = document.getElementById("board");
const turnEl = document.getElementById("turn");
const historyEl = document.getElementById("history");
const komadaiBlackEl = document.getElementById("komadai-black");
const komadaiWhiteEl = document.getElementById("komadai-white");
const modal = document.getElementById('modal');
function deepCopySetup() {
  return initialSetup.map((row) =>
    row.map((cell) => (cell ? { ...cell } : null))
  );
}
function init() {
  boardState = deepCopySetup();
  currentPlayer = "white";
  selected = null;
  count = 0;
  history = [];
  komadai.black = {};
  komadai.white = {};
  possibleMoves = [];
  renderBoard();
  renderKomadai();
  renderHistory();
  updateTurnUI();
}
function renderBoard() {
  boardEl.innerHTML = "";
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      const sq = document.createElement("div");
      sq.className = "square";
      sq.dataset.r = r;
      sq.dataset.c = c;
      const piece = boardState[r][c];
      if (piece) {
        const p = document.createElement("div");
        p.className = "piece";
        p.textContent = mapping[piece.t].display;
        p.draggable = false;
        p.dataset.player = piece.p;
        p.dataset.r = r;
        p.dataset.c = c;
        sq.appendChild(p);
      }
      sq.addEventListener("click", onSquareClick);
      boardEl.appendChild(sq);
    }
  }
}
function onSquareClick(e) {
  const sq = e.currentTarget;
  const r = Number(sq.dataset.r);
  const c = Number(sq.dataset.c);
  const cell = boardState[r][c];
  if (cell && cell.p === currentPlayer) {
    clearHighlights();
    if (selected && r == selected.r && c == selected.c) {
        selected = null;
        return;
    }
    selected = { r, c };
    sq.classList.add("selected");
    highlightPossibleMoves(r, c);
    return;
  }
  if (selected && possibleMoves.some(move => move[0] === r && move[1] === c)) {
    const from = { ...selected };
    const to = { r, c };
    makeMove(from, to);
    selected = null;
    clearHighlights();
  }
}
function clearHighlights() {
  document.querySelectorAll(".square").forEach((s) => {
    s.classList.remove("highlight");
    s.classList.remove("selected");
  });
}
function rangeCheck(n) {
    return 0 <= n && n <= 8 ? true : false;
}
function highlightPossibleMoves(r, c) {
    possibleMoves = [];
    const e = boardState[r][c];
    const s = players[e.p]; 
    const moves = mapping[e.t].move;
    moves.forEach(move => {
        if (move.inf == false) {
            const newR = move.pos[0] * s + r;
            const newC = move.pos[1] + c;
            if (rangeCheck(newR) && rangeCheck(newC)) {
                possibleMoves.push([newR, newC]);
                const el = document.querySelector(
                    `.square[data-r='${newR}'][data-c='${newC}']`
                );
                const cell = boardState[newR][newC];
                if (!cell || cell.p !== e.p) {
                    el.classList.add("highlight");
                }
            }
        } else {
            let newR = move.pos[0] * s + r;
            let newC = move.pos[1] + c;
            while (rangeCheck(newR) && rangeCheck(newC) && (!boardState[newR][newC] || boardState[newR][newC].p !== e.p)) {
                possibleMoves.push([newR, newC]);
                const el = document.querySelector(
                    `.square[data-r='${newR}'][data-c='${newC}']`
                );
                el.classList.add("highlight");
                if (boardState[newR][newC] && boardState[newR][newC].p !== e.p) {
                    break;
                }
                newR += move.pos[0] * s;
                newC += move.pos[1];
            }
        }
    });
}
function makeMove(from, to) {
  const piece = boardState[from.r][from.c];
  const dest = boardState[to.r][to.c];
  if (!piece) return;
  if (dest) {
    const captured = { ...dest };
    const base = demote(captured.t);
    const owner = piece.p;
    if (!komadai[owner][base]) komadai[owner][base] = 0;
    komadai[owner][base]++;
  }
  boardState[to.r][to.c] = { ...piece };
  boardState[from.r][from.c] = null;
  const moveStr = `${piece.p === "black" ? "▲" : "△"} ${posToSfen(
    from
  )} → ${posToSfen(to)} ${dest ? "x" + dest.t : ""}`;
  history.push(moveStr);
  currentPlayer = currentPlayer === "black" ? "white" : "black";
  renderBoard();
  renderKomadai();
  renderHistory();
  updateTurnUI();
}
function demote(t) {
    switch (t) {
    case "龍":
        return "飛";
    case "馬":
        return "角";
    case "と":
        return "歩";
    case "成銀":
        return "銀";
    case "成桂":
        return "桂";
    case "成香":
        return "香";
    default:
        return t;
    }
}
function posToSfen(pos) {
  const file = 9 - pos.c;
  const rank = pos.r + 1;
  return `${file}${rank}`;
}
function renderHistory() {
  historyEl.textContent = history.join("\n");
}
function renderKomadai() {
  komadaiBlackEl.innerHTML = "";
  komadaiWhiteEl.innerHTML = "";
  for (const [ownerEl, ownerKey] of [
    [komadaiBlackEl, "black"],
    [komadaiWhiteEl, "white"],
  ]) {
    const map = komadai[ownerKey];
    Object.keys(map).forEach((k) => {
      const span = document.createElement("div");
      span.className = "cap";
      span.textContent = `${k} x${map[k]}`;
      ownerEl.appendChild(span);
    });
  }
}
function updateTurnUI() {
  turnEl.textContent = currentPlayer === "black" ? "先手 (▲)" : "後手 (△)";
}
function go(b) {
    modal.style.display = 'none';
}
function reverse(r, p) {
    return p === 'black' ? r : 8 - r;
}
document.getElementById("btn-reset").addEventListener("click", () => init());
init();
window.getBoardState = () => boardState;
window.getCurrentPlayer = () => currentPlayer;
window.doMove = (from, to) => {
  makeMove(from, to);
};
window.getHistory = () => history;
window.getKomadai = () => komadai;
window.go = go;
console.log(
  "将棋GUIロード完了。window.getBoardState(), window.doMove({r,c},{r,c}) などを使えます。"
);
