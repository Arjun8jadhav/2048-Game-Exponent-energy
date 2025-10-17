import './ScoreBar.scss'

export default function ScoreBar({ score }) {
	return (
		<div className="scorebar">
			<div className="score">Score: <strong>{score}</strong></div>
		</div>
	)
}



