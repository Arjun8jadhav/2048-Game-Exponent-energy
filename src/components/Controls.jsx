import './Controls.scss'

export default function Controls({ onMove, onRestart, size, onSetSize }) {
	return (
		<div className="controls">
			<div className="size-control">
				<label>
					Board size
					<select value={size} onChange={(e) => onSetSize(Number(e.target.value))}>
						{[3,4,5,6,7,8].map(n => (
							<option key={n} value={n}>{n} × {n}</option>
						))}
					</select>
				</label>
			</div>
			<div className="buttons">
				<button onClick={() => onMove('up')}>↑</button>
				<div className="hgroup">
					<button onClick={() => onMove('left')}>←</button>
					<button onClick={() => onMove('right')}>→</button>
				</div>
				<button onClick={() => onMove('down')}>↓</button>
			</div>
			<button className="restart" onClick={onRestart}>Restart</button>
		</div>
	)
}



