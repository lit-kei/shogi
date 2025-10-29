const kinMoves = [{pos:[-1,-1],inf:false},{pos:[-1,0],inf:false},{pos:[-1,1],inf:false},{pos:[0,-1],inf:false},{pos:[0,1],inf:false},{pos:[1,0],inf:false}];
const mapping = {
    0:{display: "", move: [], value: 0},
    1:{display: "歩", move: [{pos:[-1,0],inf:false}], value: 10},
    2:{display: "香", move: [{pos:[-1,0],inf:true}], value: 20},
    3:{display: "桂", move: [{pos:[-2,-1],inf:false},{pos:[-2,1],inf:false}], value: 20},
    4:{display: "銀", move: [{pos:[-1,-1],inf:false},{pos:[-1,0],inf:false},{pos:[-1,1],inf:false},{pos:[1,-1],inf:false},{pos:[1,1],inf:false}], value: 35},
    5:{display: "金", move: [...kinMoves], value: 50},
    6:{display: "角", move: [{pos:[-1,-1],inf:true},{pos:[-1,1],inf:true},{pos:[1,-1],inf:true},{pos:[1,1],inf:true}], value: 80},
    7:{display: "飛", move: [{pos:[-1,0],inf:true},{pos:[0,-1],inf:true},{pos:[0,1],inf:true},{pos:[1,0],inf:true}], value: 100},
    8:{display: "と", move: [...kinMoves], value: 12},
    9:{display: "成香", move: [...kinMoves], value: 24},
    10:{display: "成桂", move: [...kinMoves], value: 24},
    11:{display: "成銀", move: [...kinMoves], value: 42},
    12:{display: "馬", move: [{pos:[-1,-1],inf:true},{pos:[-1,1],inf:true},{pos:[1,-1],inf:true},{pos:[1,1],inf:true},{pos:[-1,0],inf:false},{pos:[0,-1],inf:false},{pos:[0,1],inf:false},{pos:[1,0],inf:false}], value: 96},
    13:{display: "龍", move: [{pos:[-1,0],inf:true},{pos:[0,-1],inf:true},{pos:[0,1],inf:true},{pos:[1,0],inf:true},{pos:[-1,-1],inf:false},{pos:[-1,1],inf:false},{pos:[1,-1],inf:false},{pos:[1,1],inf:false}], value: 120},
    14:{display: "王", move: [{pos:[-1,-1],inf:false},{pos:[-1,0],inf:false},{pos:[-1,1],inf:false},{pos:[0,-1],inf:false},{pos:[0,1],inf:false},{pos:[1,-1],inf:false},{pos:[1,0],inf:false},{pos:[1,1],inf:false}], value: 100},
    15:{display: "玉", move: [{pos:[-1,-1],inf:false},{pos:[-1,0],inf:false},{pos:[-1,1],inf:false},{pos:[0,-1],inf:false},{pos:[0,1],inf:false},{pos:[1,-1],inf:false},{pos:[1,0],inf:false},{pos:[1,1],inf:false}], value: 100}
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
const promote = [false,8,9,10,11,false,12,13,false,false,false,false,false,false,false,false];
const toJa = {1:["１","一"],2:["２","二"],3:["３","三"],4:["４","四"],5:["５","五"],6:["６","六"],7:["７","七"],8:["８","八"],9:["９","九"]};
const masuValue = [
[3,3,3,3,3,3,3,3,3],
[3,3,3,3,3,3,3,3,3],
[3,3,3,3,3,3,3,3,3],
[2,2,2,2,2,2,2,2,2],
[2,2,2,2,2,2,2,2,2],
[2,2,2,2,2,2,2,2,2],
[1,1,1,1,1,1,1,1,1],
[3,3,3,3,3,3,3,3,3],
[3,3,3,3,3,3,3,3,3]
]

let searchDepth = 3;
let maxPutWidth = 30;
let aiMode = {white: false, black: false};
let boardState = [];
let last = [-1,-1];
let currentPlayer = "white";
let selected = null;
let count = 0;
let history = [];
let put = null;
let possibleMoves = [];
const komadai = { black: {}, white: {} };
const boardEl = document.getElementById("board");
const turnEl = document.getElementById("turn");
const historyEl = document.getElementById("history");
const komadaiBlackEl = document.getElementById("komadai-black");
const komadaiWhiteEl = document.getElementById("komadai-white");
const modal = document.getElementById('modal');
const aiDiv = document.getElementById('ai');
function deepCopySetup() {
  return initialSetup.map((row) =>
    row.map((cell) => (cell ? { ...cell } : null))
  );
}
function init() {
  boardState = deepCopySetup();
  last = [-1,-1];
  currentPlayer = "white";
  selected = null;
  count = 0;
  history = [];
  put = null;
  komadai.black = {};
  komadai.white = {};
  possibleMoves = [];
  historyEl.innerHTML = '';
  renderBoard();
  renderKomadai();
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
    put = null;
    sq.classList.add("selected");
    highlightPossibleMoves(boardState, r, c);
    return;
  }
  if (selected && possibleMoves.some(move => move[0] === r && move[1] === c)) {
    const from = { put: false, ...selected };
    const to = { r, c };
    makeMove(from, to);
    selected = null;
    put = null;
    clearHighlights();
  }
  if (put && possibleMoves.some(move => move[0] === r && move[1] === c)) {
    makeMove({put: true,t: put}, {r, c});
    selected = null;
    put = null;
    clearHighlights();
  }
}
function getMoveList(board, r, c, friendFire = false) {
    const e = board[r][c];
    if (!e) return [];
    const s = players[e.p];
    const moves = mapping[e.t].move;
    const list = [];
    moves.forEach(move => {
        if (move.inf == false) {
            const newR = move.pos[0] * s + r;
            const newC = move.pos[1] + c;
            if (rangeCheck(newR) && rangeCheck(newC)) {
                const cell = board[newR][newC];
                if (!cell || cell.p !== e.p || friendFire) list.push([newR, newC]);
            }
        } else {
            let newR = move.pos[0] * s + r;
            let newC = move.pos[1] + c;
            while (rangeCheck(newR) && rangeCheck(newC) && (!board[newR][newC] || board[newR][newC].p !== e.p || friendFire)) {
                const cell = board[newR][newC];
                list.push([newR, newC]);
                if (cell) break;
                newR += move.pos[0] * s;
                newC += move.pos[1];
            }
        }
    });
    return list;
}
function getLegalMoves(koma, board,p) {
    const moves = [];
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
              if (board[r][c] && board[r][c].p == p) {
                getMoveList(board, r, c).forEach(([tr, tc]) => {
                  moves.push({from: {put: false, r, c}, to: {r: tr, c: tc}});
                });
              }
        
        }
    }
    const change = moves.length;
    for (const ko in koma[p]) {
      if (!Object.hasOwn(koma[p], ko)) continue;
      const pieceType = Number(ko);

      for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
          if (board[r][c] !== null) continue; // すでに駒あり

          // 歩の二歩チェック
          if (pieceType === 1) {
            const hasPawn = board.some(row =>
              row[c] && row[c].p === p && row[c].t === 1
            );
            if (hasPawn) continue;
          }

          // 盤端打ち禁止（歩・香・桂）
          if ((pieceType === 1 || pieceType === 2) && r === reverse(0, p)) continue;
          if (pieceType === 3 && (r === reverse(0, p) || r === reverse(1, p))) continue;

          moves.push({ from: { put: true, t: pieceType }, to: { r, c } });
        }
      }
    }
    return {moves, change};
}
function makeHistory(txt) {
    history.push({txt:txt,board:[...boardState]});
    const historyDiv = document.createElement('div');
    historyDiv.className = "history";
    const countSpan = document.createElement('span');
    countSpan.textContent = count + ".";
    countSpan.className = "count";
    const kifuSpan = document.createElement('span');
    kifuSpan.textContent = txt;
    kifuSpan.className = "kifu";
    historyDiv.appendChild(countSpan);
    historyDiv.appendChild(kifuSpan);
    historyEl.appendChild(historyDiv);
    historyEl.scrollTop = historyEl.scrollHeight;
}
function onKomadaiClick(e) {
    const sq = e.currentTarget;
    const p = sq.dataset.p;
    const t = Number(sq.dataset.t);
    if (p == currentPlayer) {
        clearHighlights();
        if (put && put == t) {
            put = null;
            return;
        }
        put = t;
        selected = null;
        sq.classList.add("selected");
        highlightPossiblePuts(boardState, t, p);
    }
}
function clearHighlights() {
  document.querySelectorAll(".square, .cap").forEach((s) => {
    s.classList.remove("highlight");
    s.classList.remove("selected");
  });
}
function rangeCheck(n) {
    return 0 <= n && n <= 8 ? true : false;
}
function highlightPossibleMoves(board, r, c) {
    possibleMoves = [];
    const e = board[r][c];
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
                const cell = board[newR][newC];
                if (!cell || cell.p !== e.p) {
                    el.classList.add("highlight");
                }
            }
        } else {
            let newR = move.pos[0] * s + r;
            let newC = move.pos[1] + c;
            while (rangeCheck(newR) && rangeCheck(newC) && (!board[newR][newC] || board[newR][newC].p !== e.p)) {
                possibleMoves.push([newR, newC]);
                const el = document.querySelector(
                    `.square[data-r='${newR}'][data-c='${newC}']`
                );
                el.classList.add("highlight");
                if (board[newR][newC] && board[newR][newC].p !== e.p) {
                    break;
                }
                newR += move.pos[0] * s;
                newC += move.pos[1];
            }
        }
    });
}
function highlightPossiblePuts(board, t, p) {
    possibleMoves = [];
    if (t == 1) {
        for (let i = 0; i < 9; i++) {
            if (!board.some(r => r[i] && r[i].p == p && r[i].t == 1)) {
                for (let j = 0; j < 9; j++) {
                    if (j != reverse(0, p) && board[j][i] === null) {
                        possibleMoves.push([j, i]);
                        document.querySelector(`.square[data-r='${j}'][data-c='${i}']`).classList.add("highlight");
                    }
                }
            }
        }
    } else {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if ((t != 2 || i != reverse(0, p)) && (t != 3 || i != reverse(0, p)) && (t != 3 || i != reverse(1, p)) && board[i][j] === null) {
                    possibleMoves.push([i, j]);
                    document.querySelector(`.square[data-r='${i}'][data-c='${j}']`).classList.add("highlight");
                }
            }
        }
    }
}
function askPromotion() {
  return new Promise((resolve) => {
    modal.style.display = 'block';
    // 成るボタン
    document.getElementById('promote-yes').onclick = () => {
      modal.style.display = 'none';
      resolve(true);
    };
    // 成らないボタン
    document.getElementById('promote-no').onclick = () => {
      modal.style.display = 'none';
      resolve(false);
    };
  });
}
async function makeMove(from, to, promotion = false) {
  let moveStr = "";
  if (from.put) {
    boardState[to.r][to.c] = {t:from.t,p:currentPlayer};
    komadai[currentPlayer][from.t]--;
    if (komadai[currentPlayer][from.t] == 0) delete komadai[currentPlayer][from.t];
    moveStr = `${posToSfen(to)}${mapping[from.t].display}打`;
  } else {
    const piece = boardState[from.r][from.c];
    const dest = boardState[to.r][to.c];
    if (!piece) return;
    let promoted = null;
    if ((piece.p == "black" && to.r <= 2 && promote[piece.t]) || (piece.p == "white" && to.r >= 6 && promote[piece.t])) {
      if (promotion) {
        promoted = true;
      } else {
        switch (piece.t) {
            case 1:
                if (to.r == reverse(0, piece.p)) {
                    promoted = true;
                } else {
                    promoted = await askPromotion();
                }
                break;
            case 2:
                if (to.r == reverse(0, piece.p)) {
                    promoted = true;
                } else {
                    promoted = await askPromotion();
                }
                break;
            case 3:
                if (to.r == reverse(0, piece.p) || to.r == reverse(1, piece.p)) {
                    promoted = true;
                } else {
                    promoted = await askPromotion();
                }
                break;
            default:
                promoted = await askPromotion();
                break;
        }
      }
    }
    count++;
    if (dest) {
      const captured = { ...dest };
      const base = demote(captured.t);
      const owner = piece.p;
      if (!komadai[owner][base]) komadai[owner][base] = 0;
      komadai[owner][base]++;
    }
    boardState[to.r][to.c] = { ...piece };
    if (promoted) boardState[to.r][to.c].t = promote[boardState[to.r][to.c].t];
    boardState[from.r][from.c] = null;
    moveStr = `${posToSfen(to)}${mapping[boardState[to.r][to.c].t].display}${promoted === null ? "" : promoted ? "成" : "不成"}`;
  }
  makeHistory(moveStr);
  currentPlayer = currentPlayer === "black" ? "white" : "black";
  renderBoard();
  renderKomadai();
  updateTurnUI();
}
function minimax(koma, board, depth, maximizingPlayer) {
    if (depth === 0) return evaluate(koma, board, maximizingPlayer ? "black" : "white");

    const {moves, change} = getLegalMoves(koma, board, maximizingPlayer ? "black" : "white");
    if (moves.length === 0) return evaluate(koma, board, maximizingPlayer ? "black" : "white");

    let bestValue = maximizingPlayer ? -Infinity : Infinity;
    const searchMoves = [...moves.slice(0,change), ...getListRandomly(moves.slice(change))];


    for (const move of searchMoves) {
        const {newBoard, newKomadai} = makeMoveSim(koma, board, move, maximizingPlayer ? "black" : "white");
        const value = minimax(newKomadai, newBoard, depth - 1, !maximizingPlayer);
        if (maximizingPlayer)
            bestValue = Math.max(bestValue, value);
        else
            bestValue = Math.min(bestValue, value);
    }

    return bestValue;
}
function getListRandomly(list) {
  if (list.length <= maxPutWidth) return list;
  const newList = [];
  for (let i = 0; i < maxPutWidth; i++) {
    newList.push(list.splice(Math.floor(Math.random() * (list.length)),1)[0]);
  }
  return newList;
}

// === 最善手を決定する ===
function findBestMove(koma, board, depth) {
    const {moves, change} = getLegalMoves(koma, board, currentPlayer);
    let values = [];
    let bestMove = null;
    let bestValue = -Infinity;
    const searchMoves = [...moves.slice(0,change), ...getListRandomly(moves.slice(change))];

    for (const move of searchMoves) {
        const { newBoard, newKomadai } = makeMoveSim(koma, board, move, currentPlayer);
        const value = minimax(newKomadai, newBoard, depth - 1, currentPlayer == "black") * (move.from.put ? 0.5 : 1);
        for (let i = 0; i < 9; i++) {
          if (i == values.length) {
            values.push({move, value});
            values.splice(10);
            break;
          }
          if (value > values[i].value) {
            values.splice(i, 0, {move, value});
            values.splice(10);
            break;
          }
        }
        if (value > bestValue) {
            bestValue = value;
            bestMove = move;
        }
        //ユーザーに表示
        aiDiv.innerHTML = '';
        for (const e of values) {
          const shotDiv = document.createElement('div');
          shotDiv.className = 'shot';
          const titleS = document.createElement('h3');
          titleS.className = 'title';
          const file = toJa[9 - e.move.to.c][0];
          const rank = toJa[e.move.to.r + 1][1];
          if(e.move.from.put) {
            titleS.textContent = `${file}${rank}${mapping[e.move.from.t].display}打`;
          } else {
            const piece = boardState[e.move.from.r][e.move.from.c];
            const promoted = (currentPlayer == "black" &&  e.move.to.r <= 2 && promote[piece.t]) || (currentPlayer == "white" &&  e.move.to.r >= 6 && promote[piece.t]);
            if (last[0] == 9 - e.move.to.c && last[1] == e.move.to.r + 1) {
              titleS.textContent = `同${mapping[piece.t].display}${promoted ? "成" : ""}`;
            } else {
              titleS.textContent = `${file}${rank}${mapping[piece.t].display}${promoted ? "成" : ""}`;
            }
          }
          const valueS = document.createElement('h4');
          valueS.className = 'value';
          valueS.textContent = e.value + ' 点';
          shotDiv.appendChild(titleS);
          shotDiv.appendChild(valueS);
          aiDiv.appendChild(shotDiv);
        }
      }

    return bestMove;
}

// === AIのターンを実行 ===
async function aiMove() {
    const bestMove = findBestMove(komadai, boardState, searchDepth);
    console.log(bestMove);
    if (aiMode[currentPlayer]) makeMove(bestMove.from, bestMove.to, true);
}
function makeAttackMap(board) {
    // attackMap[r][c] = [{p: 'black', t: pieceType}, ...]
    const attackMap = Array.from({ length: 9 }, () =>
        Array.from({ length: 9 }, () => [])
    );

    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            const piece = board[r][c];
            if (!piece) continue;

            // その駒の全ての攻撃可能マスを取得
            const moves = getMoveList(board, r, c, true); 
            for (const [rr, cc] of moves) {
                if (rr < 0 || rr >= 9 || cc < 0 || cc >= 9) continue;
                attackMap[rr][cc].push({ p: piece.p, t: piece.t });
            }
        }
    }
    return attackMap;
}
function evaluate(koma, board, p) {
    let score = 0;
    const attackMap = makeAttackMap(board); // 全マスがどちらに攻撃されているか

    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            const piece = board[r][c];
            if (!piece) continue;

            const baseValue = mapping[piece.t].value;
            const posValue = masuValue[reverse(r, p)][c];
            let v = Math.floor(baseValue * posValue * 0.7);

            // 駒の安全性評価
            const attackers = attackMap[r][c].filter(a => a.p !== piece.p);
            const defenders = attackMap[r][c].filter(a => a.p === piece.p);
            if (attackers.length > defenders.length) {
            // ---- ただ取りペナルティ ----
            if (attackers.length > defenders.length) {
                const danger = attackers.length - defenders.length;
                // 駒の価値に比例して減点（たとえば角や飛車なら大損）
                v -= Math.floor(baseValue * (1.5 + 0.3 * danger));
            }
            } else if (defenders.length > attackers.length) {
                // 守られている
                v += Math.floor(baseValue * 0.5);
            }

            // 最終スコア加算
            if (piece.p === p) score += v;
            else score -= v;
        }
    }

    // 持ち駒加算
    for (const player in koma) {
        for (const t in koma[player]) {
            const pieceValue = mapping[t].value * koma[player][t];
            if (player === p) score += pieceValue;
            else score -= pieceValue;
        }
    }

    return score;
}

// === 盤面のコピー関数 ===
function cloneBoard(board) {
    return board.map(row => row.map(cell => cell ? {...cell} : null));
}
function makeMoveSim(koma, board, move, p) {
    const newBoard = cloneBoard(board);
    const newKomadai = JSON.parse(JSON.stringify(koma));
    if (move.from.put) {//
      newBoard[move.to.r][move.to.c] = {t:move.from.t, p: p};
      newKomadai[p][move.from.t]--;
    } else {
      const dest = newBoard[move.to.r][move.to.c];
      const piece = newBoard[move.from.r][move.from.c];
      newBoard[move.to.r][move.to.c] = newBoard[move.from.r][move.from.c];
      if ((move.to.r <= 2 && p == 'black' && promote[piece.t]) || (move.to.r >= 6 && p == 'white' && promote[piece.t])) {
        newBoard[move.to.r][move.to.c].t = promote[piece.t];
      }
      if (dest) {
        if (!newKomadai[p][dest.t]) {
          newKomadai[p][dest.t] = 1;
        } else {
          newKomadai[p][dest.t]++;
        }
      }
      newBoard[move.from.r][move.from.c] = null;
    }
    return {newBoard, newKomadai};
}

function demote(t) {
    const s = promote.indexOf(t);
    return s == -1 ? t : s;
}
function posToSfen(pos) {
  const file = 9 - pos.c;
  const rank = pos.r + 1;
  if (last[0] == file && last[1] == rank) return '同';
  last = [file, rank];
  return `${toJa[file][0]}${toJa[rank][1]}`;
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
      span.textContent = `${mapping[k].display} x${map[k]}`;
      span.dataset.t = k;
      span.dataset.p = ownerKey;
      span.addEventListener('click', onKomadaiClick);
      ownerEl.appendChild(span);
    });
  }
}
function updateTurnUI() {
  turnEl.textContent = currentPlayer === "black" ? "後手 (△)" : "先手 (▲)";
}
function reverse(r,p) {
    return p === "black" ? r : 8 - r;
}
document.getElementById("btn-reset").addEventListener("click", () => {
  if(confirm("本当に初期化しますか？")) init();
});
document.getElementById('btn-ana').addEventListener('click', aiMove);
document.addEventListener("keydown", function(event) {
  if (event.code === "Enter") {
    if (aiMode[currentPlayer]) aiMove();
  }
});
init();
window.getBoardState = () => boardState;
window.getCurrentPlayer = () => currentPlayer;
window.doMove = (from, to) => {
  makeMove(from, to);
};
window.getHistory = () => history;
window.getKomadai = () => komadai;
console.log(
  "将棋GUIロード完了。window.getBoardState(), window.doMove({r,c},{r,c}) などを使えます。"
);
