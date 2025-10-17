import './Board.scss'

export default function Board({ board }) {
	const size = board.length;
	return (
		<div className="board" style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}>
			{board.map((row, r) => (
				row.map((value, c) => (
					<div key={`${r}-${c}`} className={`cell ${value ? 'filled' : ''}`}>
						{value !== 0 && <div className={`tile tile-${value}`}>{value}</div>}
					</div>
				))
			))}
		</div>
	)
}


