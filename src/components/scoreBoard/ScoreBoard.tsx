import "./scoreBoard.css";

const ScoreBoard = (props: {player1Score: number, player2Score: number}): JSX.Element => {

  return (
    <div className="d-flex justify-content-center mb-5">
      <div className="score-board">
        <h3>Total score</h3>
        <div className="d-flex align-items-center justify-content-between">
          <h4>Serhan</h4>
          <span className="score">{props.player1Score}</span>
        </div>
        <div className="d-flex align-items-center justify-content-between">
          <h4>Roman</h4>
          <span className="score">{props.player2Score}</span>
        </div>
      </div>
    </div>
  )
}

export default ScoreBoard;