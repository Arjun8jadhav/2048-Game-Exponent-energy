// Pure game logic for 2048 – functional and testable

export const Direction = Object.freeze({
	Left: 'left',
	Right: 'right',
	Up: 'up',
	Down: 'down',
});

export function createEmptyBoard(size) {
	return Array.from({ length: size }, () => Array.from({ length: size }, () => 0));
}

export function getEmptyCells(board) {
	const empty = [];
	for (let r = 0; r < board.length; r++) {
		for (let c = 0; c < board[r].length; c++) {
			if (board[r][c] === 0) empty.push({ r, c });
		}
	}
	return empty;
}

export function placeRandomTile(board, rng = Math.random) {
	const empty = getEmptyCells(board);
	if (empty.length === 0) return { board, placed: false };
	const { r, c } = empty[Math.floor(rng() * empty.length)];
	const value = rng() < 0.9 ? 2 : 4;
	const next = board.map(row => row.slice());
	next[r][c] = value;
	return { board: next, placed: true };
}

export function initBoard(size, rng = Math.random) {
	let board = createEmptyBoard(size);
	({ board } = placeRandomTile(board, rng));
	({ board } = placeRandomTile(board, rng));
	return { board, score: 0 };
}

function compressLine(line) {
	return line.filter(v => v !== 0);
}

function mergeLine(line) {
	let scoreDelta = 0;
	const merged = [];
	for (let i = 0; i < line.length; i++) {
		if (i < line.length - 1 && line[i] !== 0 && line[i] === line[i + 1]) {
			const sum = line[i] + line[i + 1];
			merged.push(sum);
			scoreDelta += sum;
			i++; // skip next
		} else {
			merged.push(line[i]);
		}
	}
	return { line: merged, scoreDelta };
}

function applyLineOps(line, size) {
	const compressed = compressLine(line);
	const { line: merged, scoreDelta } = mergeLine(compressed);
	const result = [...merged, ...Array.from({ length: size - merged.length }, () => 0)];
	return { line: result, scoreDelta };
}

function transpose(board) {
	const size = board.length;
	const t = createEmptyBoard(size);
	for (let r = 0; r < size; r++) {
		for (let c = 0; c < size; c++) {
			t[c][r] = board[r][c];
		}
	}
	return t;
}

function reverseRows(board) {
	return board.map(row => row.slice().reverse());
}

export function move(board, direction) {
	const size = board.length;
	let working = board.map(row => row.slice());
	// Normalize to Left move
	if (direction === Direction.Right) working = reverseRows(working);
	if (direction === Direction.Up) working = transpose(working);
	if (direction === Direction.Down) working = reverseRows(transpose(working));

	let moved = false;
	let scoreDelta = 0;
	const next = working.map(row => {
		const { line, scoreDelta: d } = applyLineOps(row, size);
		if (!moved && line.some((v, i) => v !== row[i])) moved = true;
		scoreDelta += d;
		return line;
	});

	// Denormalize back from Left
	let denorm = next;
	if (direction === Direction.Right) denorm = reverseRows(denorm);
	if (direction === Direction.Up) denorm = transpose(denorm);
	if (direction === Direction.Down) denorm = transpose(reverseRows(denorm));

	return { board: denorm, scoreDelta, moved };
}

export function has2048(board) {
	for (const row of board) {
		for (const v of row) if (v === 2048) return true;
	}
	return false;
}

export function canMove(board) {
	if (getEmptyCells(board).length > 0) return true;
	const size = board.length;
	for (let r = 0; r < size; r++) {
		for (let c = 0; c < size; c++) {
			const v = board[r][c];
			if (r + 1 < size && board[r + 1][c] === v) return true;
			if (c + 1 < size && board[r][c + 1] === v) return true;
		}
	}
	return false;
}

export function cloneBoard(board) {
	return board.map(row => row.slice());
}


