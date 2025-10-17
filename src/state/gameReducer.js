import { ActionTypes } from './actions.js';
import { Direction, initBoard, move, placeRandomTile, has2048, canMove, cloneBoard } from '../logic/board.js';

export const defaultSize = 4;

export function initialState(size = defaultSize, rng = Math.random) {
	const { board, score } = initBoard(size, rng);
	return {
		board,
		size,
		score,
		hasWon: false,
		isOver: false,
	};
}

export function gameReducer(state, action) {
	switch (action.type) {
		case ActionTypes.Init: {
			return initialState(action.size ?? state.size);
		}
		case ActionTypes.SetSize: {
			return initialState(action.size);
		}
		case ActionTypes.Restart: {
			return initialState(state.size);
		}
		case ActionTypes.Move: {
			const { board: movedBoard, scoreDelta, moved } = move(state.board, action.direction);
			if (!moved) return state;
			const afterMove = cloneBoard(movedBoard);
			const { board: withSpawn } = placeRandomTile(afterMove);
			const nextScore = state.score + scoreDelta;
			const won = has2048(withSpawn);
			const over = !won && !canMove(withSpawn);
			return { ...state, board: withSpawn, score: nextScore, hasWon: won, isOver: over };
		}
		default:
			return state;
	}
}


