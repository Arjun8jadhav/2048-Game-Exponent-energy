import { useReducer, useCallback } from 'react';
import { gameReducer, initialState } from '../state/gameReducer.js';
import { ActionTypes } from '../state/actions.js';
import { Direction } from '../logic/board.js';
import { useKeyboard } from '../hooks/useKeyboard.js';
import ScoreBar from './ScoreBar.jsx';
import Board from './Board.jsx';
import Controls from './Controls.jsx';
import '../styles/globals.scss';

export default function Game() {
	const [state, dispatch] = useReducer(gameReducer, undefined, () => initialState());

	const handleKey = useCallback((key) => {
		switch (key) {
			case 'ArrowLeft':
				dispatch({ type: ActionTypes.Move, direction: Direction.Left });
				break;
			case 'ArrowRight':
				dispatch({ type: ActionTypes.Move, direction: Direction.Right });
				break;
			case 'ArrowUp':
				dispatch({ type: ActionTypes.Move, direction: Direction.Up });
				break;
			case 'ArrowDown':
				dispatch({ type: ActionTypes.Move, direction: Direction.Down });
				break;
			default:
				break;
		}
	}, []);

	useKeyboard(handleKey);

	const handleMoveFromControls = (dir) => {
		switch (dir) {
			case 'left':
				dispatch({ type: ActionTypes.Move, direction: Direction.Left });
				break;
			case 'right':
				dispatch({ type: ActionTypes.Move, direction: Direction.Right });
				break;
			case 'up':
				dispatch({ type: ActionTypes.Move, direction: Direction.Up });
				break;
			case 'down':
				dispatch({ type: ActionTypes.Move, direction: Direction.Down });
				break;
			default:
				break;
		}
	};

	return (
		<div className="app-shell">
			<h2 className="title">2048</h2>
			<p className="subtitle">Use arrow keys or buttons to play.</p>
			<ScoreBar score={state.score} />
			<Board board={state.board} />
			<div style={{ height: 12 }} />
			<Controls
				size={state.size}
				onSetSize={(n) => dispatch({ type: ActionTypes.SetSize, size: n })}
				onMove={handleMoveFromControls}
				onRestart={() => dispatch({ type: ActionTypes.Init })}
			/>
			{state.hasWon && <div style={{ marginTop: 8 }}>Congratulations! You reached 2048.</div>}
			{state.isOver && <div style={{ marginTop: 8 }}>No more moves. Game Over.</div>}
		</div>
	);
}


