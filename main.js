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
    14:{display: "王", move: [{pos:[-1,-1],inf:false},{pos:[-1,0],inf:false},{pos:[-1,1],inf:false},{pos:[0,-1],inf:false},{pos:[0,1],inf:false},{pos:[1,-1],inf:false},{pos:[1,0],inf:false},{pos:[1,1],inf:false}], value: 500},
    15:{display: "玉", move: [{pos:[-1,-1],inf:false},{pos:[-1,0],inf:false},{pos:[-1,1],inf:false},{pos:[0,-1],inf:false},{pos:[0,1],inf:false},{pos:[1,-1],inf:false},{pos:[1,0],inf:false},{pos:[1,1],inf:false}], value: 500}
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
const onlyKingsBoard = [
  [null,null,null,null,{t:15,p:'white'},null,null,null,null],
  [null,null,null,null,null,null,null,null,null],
  [null,null,null,null,null,null,null,null,null],
  [null,null,null,null,null,null,null,null,null],
  [null,null,null,null,null,null,null,null,null],
  [null,null,null,null,null,null,null,null,null],
  [null,null,null,null,null,null,null,null,null],
  [null,null,null,null,null,null,null,null,null],
  [null,null,null,null,{t:14,p:'black'},null,null,null,null],
];
const onlyKingsKomadai = {
  black: {1:9, 2:2, 3:2, 4:2, 5:2, 6:1, 7:1},
  white: {1:9, 2:2, 3:2, 4:2, 5:2, 6:1, 7:1}
};
const allKomadai = {
  black: {},
  white: {1:18, 2:4, 3:4, 4:4, 5:4, 6:2, 7:2}
};
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
];


let onlyKings = false;
let allKoma = false;
let boardHistory = [];
let searchDepth = 4;
let maxPutWidth = 30;
let aiMode = {white: false, black: false};
let boardState = [];
let last = [-1,-1];
let currentPlayer = "white";
let selected = null;
let count = 0;
let put = null;
let finish = true;
let nowMoves = [];
let possibleMoves = [];
const komadai = { black: {}, white: {} };
const boardEl = document.getElementById("board");
const turnEl = document.getElementById("turn");
const historyEl = document.getElementById("history");
const komadaiBlackEl = document.getElementById("komadai-black");
const komadaiWhiteEl = document.getElementById("komadai-white");
const modal = document.getElementById('modal');
const aiDiv = document.getElementById('ai');
function init() {
  boardHistory = [];
  boardState = cloneBoard(onlyKings ? onlyKingsBoard : initialSetup);
  last = [-1,-1];
  currentPlayer = "white";
  selected = null;
  count = 0;
  put = null;
  finsih = true;
  if (onlyKings) {
    if (allKoma) {
      komadai.black = allKomadai.black;
      komadai.white = allKomadai.white;
    } else {
      komadai.black = onlyKingsKomadai.black;
      komadai.white = onlyKingsKomadai.white;
    }
  } else {
    komadai.black = {};
    komadai.white = {};
  }
  nowMoves = getLegalMoves(komadai, boardState, currentPlayer).moves;
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
async function onSquareClick(e) {
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
    possibleMoves = nowMoves.filter(e => e.from.put == false && e.from.r == r && e.from.c == c);
    possibleMoves.forEach(e => {
      document.querySelector(`.square[data-r='${e.to.r}'][data-c='${e.to.c}']`).classList.add("highlight");
    });
    return;
  }
  if (selected && possibleMoves.some(move => move.from.put === false && move.to.r === r && move.to.c === c)) {
    const from = { put: false, ...selected };
    const to = { r, c };
    let promoted = null;
    const piece = boardState[selected.r][selected.c];
    if ((to.r <= 2 && piece.p == 'black' && promote[piece.t]) || (to.r >= 6 && piece.p == 'white' && promote[piece.t]) || 
        (from.r <= 2 && piece.p == 'black' && promote[piece.t]) || (from.r >= 6 && piece.p == 'white' && promote[piece.t])) {
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
    to.promoted = promoted;
    makeMove(from, to);
    selected = null;
    put = null;
    clearHighlights();
  }
  if (put && possibleMoves.some(move => move.from.put === true && move.to.r === r && move.to.c === c)) {
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
                const piece = board[r][c];
                getMoveList(board, r, c).forEach(([tr, tc]) => {
                  if ((tr <= 2 && p == 'black' && promote[piece.t]) || (tr >= 6 && p == 'white' && promote[piece.t]) || 
                      (r <= 2 && p == 'black' && promote[piece.t]) || (r >= 6 && p == 'white' && promote[piece.t])) {
                        switch (piece.t) {
                          case 2:
                              if (tr == reverse(0, piece.p)) {
                                moves.push({from: {put: false, r, c}, to: {r: tr, c: tc, promoted: true}});
                              } else {
                                moves.push({from: {put: false, r, c}, to: {r: tr, c: tc, promoted: true}});
                                moves.push({from: {put: false, r, c}, to: {r: tr, c: tc, promoted: false}});
                              }
                              break;
                          case 3:
                              if (tr == reverse(0, piece.p) || tr == reverse(1, piece.p)) {
                                moves.push({from: {put: false, r, c}, to: {r: tr, c: tc, promoted: true}});
                              } else {
                                moves.push({from: {put: false, r, c}, to: {r: tr, c: tc, promoted: true}});
                                moves.push({from: {put: false, r, c}, to: {r: tr, c: tc, promoted: false}});
                              }
                              break;
                          case 4:
                              moves.push({from: {put: false, r, c}, to: {r: tr, c: tc, promoted: true}});
                              moves.push({from: {put: false, r, c}, to: {r: tr, c: tc, promoted: false}});
                              break;
                          default:
                              moves.push({from: {put: false, r, c}, to: {r: tr, c: tc, promoted: true}});
                              break;
                      }
                  } else {
                    moves.push({from: {put: false, r, c}, to: {r: tr, c: tc, promoted: null}});
                  }
                });
              }
        
        }
    }
    const change = moves.length;
    for (const ko in koma[p]) {
      if (!Object.hasOwn(koma[p], ko) || koma[p][ko] <= 0) continue;
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
    
    // === ★ 王が死ぬ手を除外 ===
    const safeMoves = moves.filter(move => {
        const { newBoard, newKomadai } = makeMoveSim(koma, board, move, p);
        return !isKingInCheck(newBoard, p); // 自分の王が攻撃されていないなら合法
    });
    return {moves: safeMoves, change};
}
function makeHistory(txt) {
    const thisIndex = count - 1;
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
    /*historyDiv.addEventListener('click', (event) => {
      const clickedHistory = event.target.closest('.history');
      if (!clickedHistory) return; // 念のため防御
      backTo(thisIndex, clickedHistory);
    });*/
    historyEl.appendChild(historyDiv);
    historyEl.scrollTop = historyEl.scrollHeight;
}
function backTo(n, target) {
  if (0 > n || n >= count) return;
  const e = boardHistory[n];
  komadai.black = JSON.parse(JSON.stringify(e.komadai.black));
  komadai.white = JSON.parse(JSON.stringify(e.komadai.white));
  boardState = e.boardState.map((row) =>
    row.map((cell) => (cell ? { ...cell } : null))
  );
  last = [...e.last];
  currentPlayer = e.currentPlayer;
  count = e.count;
  let next = target.nextElementSibling;

  while (next) {
    const toRemove = next;
    next = next.nextElementSibling;
    toRemove.remove();
  }

  renderBoard();
  renderKomadai();
  updateTurnUI();
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
        selected = null;
        sq.classList.add("selected");
        put = t;
        possibleMoves = nowMoves.filter(e => e.from.put === true && e.from.t === t);
        possibleMoves.forEach(move => {
          document.querySelector(`.square[data-r='${move.to.r}'][data-c='${move.to.c}']`).classList.add("highlight");
        })
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
async function makeMove(from, to) {
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
    let promoted = to.promoted;
    count++;
    if (dest) {
      const captured = { ...dest };
      const base = demote(captured.t);
      const owner = piece.p;
      if (!komadai[owner][base]) komadai[owner][base] = 0;
      komadai[owner][base]++;
    }
    boardState[to.r][to.c] = { ...piece };
    moveStr = `${posToSfen(to)}${mapping[boardState[to.r][to.c].t].display}${promoted === null ? "" : promoted ? "成" : "不成"}`;
    if (promoted) boardState[to.r][to.c].t = promote[boardState[to.r][to.c].t];
    boardState[from.r][from.c] = null;
  }
  currentPlayer = currentPlayer === "black" ? "white" : "black";

  const newKomadai = cloneKomadai(komadai);
  const newBoardState = cloneBoard(boardState)
  boardHistory.push({komadai: newKomadai, boardState: newBoardState, last: [...last], currentPlayer, count});
  makeHistory(moveStr);
  renderBoard();
  renderKomadai();
  updateTurnUI();

  await new Promise(resolve => setTimeout(resolve, 1));

  // 詰み判定
  // --- 合法手の生成 ---
  nowMoves = getLegalMoves(komadai, boardState, currentPlayer).moves;

  // --- 合法手がない場合（詰み or 引き分け） ---
  if (nowMoves.length === 0) {
      const checked = isKingInCheck(boardState, currentPlayer);
      if (checked) {
        alert(`${currentPlayer == "black" ? "先手" : "後手"} の勝ちです。`);
      } else {
          // ステイルメイト（千日手など）→引き分け扱い
        alert("引き分けです。");
      }
  }
  
}
function getAttackSquares(board, player) {
    const attackSquares = [];
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            const e = board[r][c];
            if (!e || e.p !== player) continue;
            // friendFire = true にして「味方を無視した攻撃範囲」を取る
            const moves = getMoveList(board, r, c, true);
            attackSquares.push(...moves.map(([tr, tc]) => [tr, tc]));
        }
    }
    return attackSquares;
}

function isKingInCheck(board, player) {
    const enemy = player === "black" ? "white" : "black";
    // 王の位置を探す
    let kingPos = null;
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            const e = board[r][c];
            if (e && e.p === player && (e.t === 14 || e.t === 15)) {
                kingPos = [r, c];
                break;
            }
        }
    }
    if (!kingPos) return true; // 王がいない（詰み）
    const [kr, kc] = kingPos;

    // 敵の攻撃範囲を取得
    const enemyAttacks = getAttackSquares(board, enemy);
    return enemyAttacks.some(([r, c]) => r === kr && c === kc);
}
function minimaxAB(koma, board, depth, alpha, beta, maximizingPlayer, aiPlayer) {
    const currentP = maximizingPlayer ? aiPlayer : (aiPlayer === "black" ? "white" : "black");

    // --- 終端ノード ---
    if (depth === 0) return evaluate(koma, board, aiPlayer, currentP);

    // --- 合法手の生成 ---
    const { moves, change } = getLegalMoves(koma, board, currentP);

    // --- 合法手がない場合（詰み or 引き分け） ---
    if (moves.length === 0) {
        const checked = isKingInCheck(board, currentP);
        if (checked) {
            // 詰まされている（チェックメイト）
            return (currentP === aiPlayer) ? -Infinity : Infinity;
        } else {
            // ステイルメイト（千日手など）→引き分け扱い
            return 0;
        }
    }

    // --- 探索制限（効率化） ---
    const searchMoves = [...moves.slice(0, change), ...getListRandomly(moves.slice(change))];

    // --- 最大化プレイヤーの場合 ---
    if (maximizingPlayer) {
        let maxEval = -Infinity;

        for (const move of searchMoves) {
            const { newBoard, newKomadai } = makeMoveSim(koma, board, move, currentP);
            const evalValue = minimaxAB(newKomadai, newBoard, depth - 1, alpha, beta, false, aiPlayer);
            maxEval = Math.max(maxEval, evalValue);
            alpha = Math.max(alpha, evalValue);
            if (beta <= alpha) break; // βカット
        }

        return maxEval;
    }

    // --- 最小化プレイヤーの場合 ---
    else {
        let minEval = Infinity;

        for (const move of searchMoves) {
            const { newBoard, newKomadai } = makeMoveSim(koma, board, move, currentP);
            const evalValue = minimaxAB(newKomadai, newBoard, depth - 1, alpha, beta, true, aiPlayer);
            minEval = Math.min(minEval, evalValue);
            beta = Math.min(beta, evalValue);
            if (beta <= alpha) break; // αカット
        }

        return minEval;
    }
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
async function findBestMove(koma, board, depth, aiPlayer) {
    const {moves, change} = getLegalMoves(koma, board, aiPlayer);
    let values = [];
    let bestMove = null;
    let bestValue = -Infinity;
    let n = 5;
    const searchMoves = [...moves.slice(0,change), ...getListRandomly(moves.slice(change))];

    for (const move of searchMoves) {
        const { newBoard, newKomadai } = makeMoveSim(koma, board, move, aiPlayer);
        const value = minimaxAB(newKomadai, newBoard, depth - 1, -Infinity, Infinity, false, aiPlayer)/* + evaluate(newKomadai, newBoard, aiPlayer, aiPlayer == "black" ? "white" : "black")*/;
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
        n--;
        if (n <= 0) {
          n = 10;
          await renderDiv(values);
          
        }
      }
      await renderDiv(values);

    return values[0].move;
}
async function renderDiv(values) {
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
              if (last[0] == 9 - e.move.to.c && last[1] == e.move.to.r + 1) {
                titleS.textContent = `同${mapping[piece.t].display}${e.move.to.promoted === null ? "" : e.move.to.promoted ? "成" : "不成"}`;
              } else {
                titleS.textContent = `${file}${rank}${mapping[piece.t].display}${e.move.to.promoted === null ? "" : e.move.to.promoted ? "成" : "不成"}`;
              }
            }
            const valueS = document.createElement('h4');
            valueS.className = 'value';
            valueS.textContent = e.value + ' 点';
            shotDiv.appendChild(titleS);
            shotDiv.appendChild(valueS);
            aiDiv.appendChild(shotDiv);
            await new Promise(resolve => setTimeout(resolve, 1));
          }
}

// === AIのターンを実行 ===
async function aiMove() {
    aiDiv.innerHTML = '';
    const aiPlayer = currentPlayer;
    const promise = findBestMove(komadai, boardState, searchDepth, aiPlayer);
    promise.then(bestMove => {
      console.log(bestMove);
      if (aiMode[aiPlayer]) makeMove(bestMove.from, bestMove.to);
    })
    /*
    const {mate, entry} = findMateDFPN(komadai, boardState, aiPlayer);
    let matePro = [];
    if (mate) {
      let node = entry;
      while(true) {
        console.log(matePro);
        if (!node.children || node.children.length === 0) {
          const { move } = node.parentMove;
          matePro.push(move);
          break;
        } else {
          const { move, index } = node.bestMove === null ? {move: node.children[0].parentMove.move, index: 0} : node.bestMove;
          matePro.push(move);
          node = node.children[index]; // 次のノードに進む
        }
      }
    }
    promise.then(bestMove => {
      if (mate) {
        const move = matePro[0];
        console.log(move, matePro);
        aiDiv.innerHTML = '';
        const mateDiv = document.createElement('div');
        mateDiv.className = 'shot mate';
        const titleS = document.createElement('h3');
        titleS.className = 'title';
        const file = toJa[9 - move.to.c][0];
        const rank = toJa[move.to.r + 1][1];
        if(move.from.put) {
          titleS.textContent = `${file}${rank}${mapping[move.from.t].display}打`;
        } else {
          const piece = boardState[move.from.r][move.from.c];
          if (last[0] == 9 - move.to.c && last[1] == move.to.r + 1) {
            titleS.textContent = `同${mapping[piece.t].display}${move.to.promoted === null ? "" : move.to.promoted ? "成" : "不成"}`;
          } else {
            titleS.textContent = `${file}${rank}${mapping[piece.t].display}${move.to.promoted === null ? "" : move.to.promoted ? "成" : "不成"}`;
          }
        }
        const valueS = document.createElement('h4');
        valueS.className = 'value';
        valueS.textContent = `#-${matePro.length - 1}`;
        mateDiv.appendChild(titleS);
        mateDiv.appendChild(valueS);
        aiDiv.appendChild(mateDiv);
      } else {
        console.log(bestMove);
        if (aiMode[currentPlayer]) makeMove(bestMove.from, bestMove.to);
      }
    });*/
    /*
    if (mate) {
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
            if (last[0] == 9 - e.move.to.c && last[1] == e.move.to.r + 1) {
              titleS.textContent = `同${mapping[piece.t].display}${e.move.to.promoted === null ? "" : e.move.to.promoted ? "成" : "不成"}`;
            } else {
              titleS.textContent = `${file}${rank}${mapping[piece.t].display}${e.move.to.promoted === null ? "" : e.move.to.promoted ? "成" : "不成"}`;
            }
          }
          const valueS = document.createElement('h4');
          valueS.className = 'value';
          valueS.textContent = e.value + ' 点';
          shotDiv.appendChild(titleS);
          shotDiv.appendChild(valueS);
          aiDiv.appendChild(shotDiv);
      
    }*/
}
function makeAttackMap(board) {
    // attackMap[r][c] = [{p: 'black', t: pieceType}, ...]
    const attackerMap = Array.from({ length: 9 }, () =>
        Array.from({ length: 9 }, () => [])
    );
    const defenderMap = Array.from({ length: 9 }, () =>
        Array.from({ length: 9 }, () => [])
    );

    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            const piece = board[r][c];
            if (!piece) continue;

            // その駒の全ての攻撃可能マスを取得
            const moves = getMoveList(board, r, c, true); 
            for (const [rr, cc] of moves) {
                if (rr < 0 || rr >= 9 || cc < 0 || cc >= 9 || board[rr][cc] === null) continue;
                if (board[rr][cc].p == piece.p) {
                  defenderMap.push({ p: piece.p, t: piece.t, pos: { r, c } });
                } else {
                  attackerMap.push({ p: piece.p, t: piece.t, pos: { r, c } });
                }
            }
        }
    }
    return {attackerMap, defenderMap};
}
let moveV = 2;
let pena = 1;
let komaV = 3;
// && attackers.every(e => defenders[e.pos.r)
function evaluate(koma, board, p, nowP) {
    let score = 300; //げた
    const { attackerMap, defenderMap } = makeAttackMap(board);

    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            const piece = board[r][c];
            if (!piece) continue;

            const baseValue = mapping[piece.t].value;
            //const posValue = masuValue[reverse(r, p)][c];
            let v = Math.floor(baseValue * moveV);

            // 駒の安全性評価
            const attackers = attackerMap[r][c];
            const defenders = defenderMap[r][c];
            
            // ---- ただ取りペナルティ ----
            if (attackers.length > 0) {
              if (attackers.some(a => (mapping[a.t].value < mapping[piece.t].value) && a.p === nowP)) {
                v -= (baseValue + 80) * pena;
              }
              if (defenders.length == 0) {
                if (!attackers.some(a => defenders[a.pos.r][a.pos.c].length == 0 && piece.p === nowP))
                v -= (baseValue + 50) * pena;
              }
            } else {
              v += baseValue;
            }
            if (piece.t == 14 || piece.t == 15) {
              v += defenders.length * 100;
              if (attackers.length > 0) {
                v -= 10000;
              }
            }
            if (defenders.length > attackers.length) {
                // 守られている
                v += Math.floor(baseValue * 0.1);
            }


            // 最終スコア加算
            if (piece.p === p) score += v;
            else score -= v;
        }
    }

    // 持ち駒加算
    for (const player in koma) {
        for (const t in koma[player]) {
            const pieceValue = (t == 14 || t == 15) ? 10000 : mapping[t].value * koma[player][t];
            if (player === p) score += pieceValue * komaV;
            else score -= pieceValue * komaV;
        }
    }

    return score;
}
/* -------------------- 盤面コピー関数 -------------------- */
function cloneBoard(board) {
  return board.map(row => row.map(cell => cell ? {...cell} : null));
}

function cloneKomadai(koma) {
  const newKomadai = {};
  for (const player of Object.keys(koma)) {
    newKomadai[player] = {...koma[player]};
  }
  return newKomadai;
}

/* -------------------- Zobrist Hash -------------------- */
function randomBigInt() {
  const hi = BigInt(Math.floor(Math.random() * 2 ** 32));
  const lo = BigInt(Math.floor(Math.random() * 2 ** 32));
  return (hi << 32n) ^ lo;
}

// Zobrist tables
const PIECE_TYPES = 16;
const MAX_HAND = 18;
const zobristTable = Array.from({length: 9}, () =>
  Array.from({length: 9}, () =>
    Array.from({length: PIECE_TYPES}, () => [randomBigInt(), randomBigInt()])
  )
);
const zobristHand = { black: {}, white: {} };
for (const p of ["black","white"]) {
  for (let t = 0; t < PIECE_TYPES; t++) {
    zobristHand[p][t] = [];
    for (let n = 0; n <= MAX_HAND; n++) {
      zobristHand[p][t][n] = randomBigInt();
    }
  }
}
const zobristTurn = randomBigInt();

function generateHash(koma, board, turn) {
  let hash = 0n;
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      const piece = board[r][c];
      if (piece) {
        const t = piece.t;
        const ownerIndex = piece.p === "black" ? 0 : 1;
        hash ^= zobristTable[r][c][t][ownerIndex];
      }
    }
  }
  for (const p of ["black","white"]) {
    for (const t in koma[p]) {
      const count = koma[p][t];
      if (count > 0) hash ^= zobristHand[p][t][count];
    }
  }
  if (turn === "white") hash ^= zobristTurn;
  return hash;
}

/* -------------------- Transposition Table -------------------- */
const TT = new Map();
function ttGet(hash) { return TT.get(hash); }
function ttSet(hash, entry) { TT.set(hash, entry); return entry; }

/* -------------------- Node生成 -------------------- */
function makeNodeIfAbsent(koma, board, turn, rootAttackSide) {
  const hash = generateHash(koma, board, turn);
  let entry = ttGet(hash);
  if (!entry) {
    entry = {
      hash,
      pn: 1,
      dn: 1,
      status: 'UNEXPANDED',
      children: null,
      bestMove: null,
      turn,
      board,
      koma,
      rootAttackSide,
      depthes: []
    };
    ttSet(hash, entry);
  }
  return entry;
}

/* -------------------- 王手判定 -------------------- */
function hasCheckMove(board, attacker, defender) {
  let kingPos = null;
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      const cell = board[r][c];
      if (cell && cell.p === defender && (cell.t === 14 || cell.t === 15)) {
        kingPos = [r,c]; break;
      }
    }
    if (kingPos) break;
  }
  if (!kingPos) return false;

  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      const cell = board[r][c];
      if (!cell || cell.p !== attacker) continue;
      const moves = getMoveList(board, r, c);
      for (const [tr, tc] of moves) {
        if (tr === kingPos[0] && tc === kingPos[1]) return true;
      }
    }
  }
  return false;
}

/* -------------------- moveシミュレーション -------------------- */
function makeMoveSim(koma, board, move, p) {
  const newBoard = cloneBoard(board);
  const newKomadai = cloneKomadai(koma);

  if (move.from.put) {
    if (newKomadai[p][move.from.t] && newKomadai[p][move.from.t] > 0) {
      newBoard[move.to.r][move.to.c] = { t: move.from.t, p };
      newKomadai[p][move.from.t]--;
      if (newKomadai[p][move.from.t] === 0) delete newKomadai[p][move.from.t];
    }
  } else {
    const dest = newBoard[move.to.r][move.to.c];
    const piece = newBoard[move.from.r][move.from.c];
    newBoard[move.to.r][move.to.c] = { ...piece };
    if (move.to.promoted) newBoard[move.to.r][move.to.c].t = promote[piece.t];
    if (dest) {
      const base = demote(dest.t);
      const owner = piece.p;
      if (!newKomadai[owner][base]) newKomadai[owner][base] = 0;
      newKomadai[owner][base]++;
    }
    newBoard[move.from.r][move.from.c] = null;
  }
  return { newBoard, newKomadai };
}
function scoreMove(koma, board, move, turn) {
  //const dest = board[move.to.r][move.to.c];
  let score = move.from.put ? 150 + pieceValue(move.from.t) : 100;
  // 王手ならさらに加点
  /*const { newBoard } = makeMoveSim(koma, board, move, turn);
  if (hasCheckMove(newBoard, turn, turn === 'black' ? 'white' : 'black')) {
    score += 100;
  }*/
  return score;
}

function pieceValue(type) {
  switch(type){
    case 14: case 15: return 1000; // 王は大きく
    case 5: return 9; // 金
    case 4: return 5; // 銀
    case 3: return 3; // 桂馬
    case 2: return 3; // 香
    case 1: return 1; // 歩
    default: return 0;
  }
}
let considerAllMoves = false;
/* -------------------- PN/DN計算 -------------------- */
function expandAndComputePnDn(entry, depth) {
  if (entry.status === 'PROVED' || entry.status === 'DISPROVED') return;

  const { moves } = getLegalMoves(entry.koma, entry.board, entry.turn);
  const legalMoves = entry.turn === entry.rootAttackSide
    ? moves.filter(move => {
        const { newBoard } = makeMoveSim(entry.koma, entry.board, move, entry.turn);
        return hasCheckMove(newBoard, entry.turn, entry.turn === 'black' ? 'white' : 'black');
      })
    : moves;

  if (legalMoves.length === 0) {
    if (entry.turn === entry.rootAttackSide) {
      entry.pn = Infinity; entry.dn = 0; entry.status = 'DISPROVED';
    } else {
      entry.pn = 0; entry.dn = Infinity; entry.status = 'PROVED';
    }
    entry.children = [];
    return;
  }
  if (!entry.children) {
    entry.children = [];
    for (const move of legalMoves) {
      const { newBoard, newKomadai } = makeMoveSim(entry.koma, entry.board, move, entry.turn);
      const childHash = generateHash(newKomadai, newBoard, entry.turn === 'black' ? 'white' : 'black');
      let child = ttGet(childHash);
      if (!child) {
        child = makeNodeIfAbsent(newKomadai, newBoard,
          entry.turn === 'black' ? 'white' : 'black',
          entry.rootAttackSide
        );
        child.depthes.push(depth + 1);
        ttSet(childHash, child);
      } else {
        child.depthes.push(depth + 1);
        ttSet(childHash, child);
      }

      entry.children.push({child, move});
      child.parentMove = { index: entry.children.length - 1, move };
    }

    // 攻め側なら王手や駒取りを優先
    if (entry.turn === entry.rootAttackSide) {
      entry.children.sort((a, b) => {
        const aScore = scoreMove(entry.koma, entry.board, a.move, entry.turn);
        const bScore = scoreMove(entry.koma, entry.board, b.move, entry.turn);
        return bScore - aScore; // 高いスコアを前に
      });
    }
    
    entry.children.forEach((c, i) => {
      c.child.parentMove.index = i;
    });

    // ソート後に child だけの配列に変換
    entry.children = entry.children.map(e => e.child);
  }

  let bestMove = null;
  if (entry.turn === entry.rootAttackSide) {
    entry.pn = Infinity; entry.dn = 0;
    for (const c of entry.children) {
      if (c.pn < entry.pn) {
        entry.pn = c.pn;
        bestMove = c.parentMove;
      }
      entry.dn += c.dn;
    }
  } else {
    entry.pn = 0; entry.dn = Infinity;
    for (const c of entry.children) {
      entry.pn += c.pn;
      if (c.dn < entry.dn) {
        entry.dn = c.dn;
        bestMove = c.parentMove;
      }
    }
  }

  entry.bestMove = bestMove;
  entry.status = 'EXPANDED';
  const hash = generateHash(entry.koma, entry.board, entry.turn);
  ttSet(hash, entry);
}
// 千日手検出に使う出現回数（将棋では 4 回で千日手判定することが多い）
let REP_LIMIT = 4;
// DFPNwithTCA に pathMap（ハッシュ->出現回数）を追加
/* -------------------- async版 DFPNwithTCA -------------------- */
async function DFPNwithTCA(entry, thpn, thdn, inc_flag, depth = 0, pathMap = new Map()) {
  if (finish) return; // 停止チェック

  // 現ノードのハッシュをパスに追加
  const myHash = entry.hash || generateHash(entry.koma, entry.board, entry.turn);
  entry.hash = myHash;

  const prevCount = pathMap.get(myHash) || 0;
  pathMap.set(myHash, prevCount + 1);

  if (pathMap.get(myHash) >= REP_LIMIT) {
    if (entry.turn === entry.rootAttackSide) {
      entry.pn = Infinity; entry.dn = 0; entry.status = 'DISPROVED';
    } else {
      entry.pn = 0; entry.dn = Infinity; entry.status = 'PROVED';
    }
    pathMap.set(myHash, prevCount);
    return;
  }

  expandAndComputePnDn(entry, depth);
  if (entry.status === 'PROVED' || entry.status === 'DISPROVED') {
    pathMap.set(myHash, prevCount);
    return;
  }

  let firstTime = true;
  while (!finish) { // 停止チェックつきループ
    if (entry.status === 'UNEXPENDED') inc_flag = false;

    expandAndComputePnDn(entry, depth);
    const nonTerminal = entry.children.filter(c => c.status !== 'PROVED' && c.status !== 'DISPROVED');
    if (nonTerminal.length === 0) break;

    if (firstTime && inc_flag) {
      thpn = Math.max(thpn, entry.pn + 1);
      thdn = Math.max(thdn, entry.dn + 1);
    }

    if (entry.pn >= thpn || entry.dn >= thdn) break;
    firstTime = false;

    let bestChild = null, secondBestChild = null;
    if (entry.turn === entry.rootAttackSide) {
      nonTerminal.forEach(c => {
        if (!bestChild || c.pn < bestChild.pn) { secondBestChild = bestChild; bestChild = c; }
        else if (!secondBestChild || c.pn < secondBestChild.pn) secondBestChild = c;
      });
      if (!secondBestChild) secondBestChild = bestChild;
      await DFPNwithTCA(bestChild, Math.min(thpn, secondBestChild.pn + 1), thdn - entry.dn + bestChild.dn, inc_flag, depth + 1, pathMap);
    } else {
      nonTerminal.forEach(c => {
        if (!bestChild || c.dn < bestChild.dn) { secondBestChild = bestChild; bestChild = c; }
        else if (!secondBestChild || c.dn < secondBestChild.dn) secondBestChild = c;
      });
      if (!secondBestChild) secondBestChild = bestChild;
      await DFPNwithTCA(bestChild, thpn - entry.pn + bestChild.pn, Math.min(thdn, secondBestChild.dn + 1), inc_flag, depth + 1, pathMap);
    }

    // イベントループに制御を戻す（キー押しなどの反応を許可）
    if (depth % 10 === 0) await new Promise(r => setTimeout(r));
  }

  pathMap.set(myHash, prevCount);
  if (prevCount === 0) pathMap.delete(myHash);
}

/* -------------------- Root -------------------- */
async function findMateDFPN(koma, board, attacker) {
  finish = false; // 探索前にリセット
  const rootEntry = makeNodeIfAbsent(koma, board, attacker, attacker);
  rootEntry.depthes.push(0);
  let thpn = Number.MAX_SAFE_INTEGER, thdn = Number.MAX_SAFE_INTEGER;
  await DFPNwithTCA(rootEntry, thpn, thdn, false);
  return {
    mate: rootEntry.pn === 0 ? true : rootEntry.dn === 0 ? false : null,
    entry: rootEntry
  };
}

function makeMoveSim(koma, board, move, p) {
    const newBoard = cloneBoard(board);
    const newKomadai = cloneKomadai(koma);
    if (move.from.put) {//
    if (newKomadai[p][move.from.t] || newKomadai[p][move.from.t] > 0) {
        newBoard[move.to.r][move.to.c] = {t:move.from.t, p: p};
        newKomadai[p][move.from.t]--;
        if (newKomadai[p][move.from.t] === 0) delete newKomadai[p][move.from.t]; // 0なら削除
    }
    } else {
      const dest = newBoard[move.to.r][move.to.c];
      const piece = newBoard[move.from.r][move.from.c];
      newBoard[move.to.r][move.to.c] = newBoard[move.from.r][move.from.c];
      if (move.to.promoted) {
        newBoard[move.to.r][move.to.c].t = promote[piece.t];
      }
      if (dest) {
        const captured = { ...dest };
        const base = demote(captured.t);
        const owner = piece.p;
        if (!newKomadai[owner][base]) {
          newKomadai[owner][base] = 0;
        }
        newKomadai[owner][base]++;
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
document.addEventListener("keydown", async function(event) {
  if (event.code === "Enter") {
    aiMove();
  }
  if (event.code === "KeyT") {
    finish = true;
    console.log('finish!');
  }
  if (event.code === "KeyS") {
    finish = false;
    const aiPlayer = currentPlayer;
    const promise = findMateDFPN(komadai, boardState, aiPlayer);
    promise.then(({mate, entry}) => {
      let matePro = [];
      console.log(mate, entry);
      if (mate) {
        let node = entry;
        while(true) {
          console.log(matePro);
          if (!node.children || node.children.length === 0) {
            const { move } = node.parentMove;
            matePro.push(move);
            break;
          } else {
            const { move, index } = node.bestMove === null ? {move: node.children[0].parentMove.move, index: 0} : node.bestMove;
            matePro.push(move);
            node = node.children[index]; // 次のノードに進む
          }
        }
      }
      if (mate) {
        const move = matePro[0];
        console.log(move, matePro);
        aiDiv.innerHTML = '';
        const mateDiv = document.createElement('div');
        mateDiv.className = 'shot mate';
        const titleS = document.createElement('h3');
        titleS.className = 'title';
        const file = toJa[9 - move.to.c][0];
        const rank = toJa[move.to.r + 1][1];
        if(move.from.put) {
          titleS.textContent = `${file}${rank}${mapping[move.from.t].display}打`;
        } else {
          const piece = boardState[move.from.r][move.from.c];
          if (last[0] == 9 - move.to.c && last[1] == move.to.r + 1) {
            titleS.textContent = `同${mapping[piece.t].display}${move.to.promoted === null ? "" : move.to.promoted ? "成" : "不成"}`;
          } else {
            titleS.textContent = `${file}${rank}${mapping[piece.t].display}${move.to.promoted === null ? "" : move.to.promoted ? "成" : "不成"}`;
          }
        }
        const valueS = document.createElement('h4');
        valueS.className = 'value';
        valueS.textContent = `#-${matePro.length - 1}`;
        mateDiv.appendChild(titleS);
        mateDiv.appendChild(valueS);
        aiDiv.appendChild(mateDiv);
      }

    });
  }
});
init();
window.getBoardState = () => boardState;
window.getCurrentPlayer = () => currentPlayer;
window.doMove = (from, to) => {
  makeMove(from, to);
};
window.getKomadai = () => komadai;
console.log(
  "将棋GUIロード完了。window.getBoardState(), window.doMove({r,c},{r,c}) などを使えます。"
);
