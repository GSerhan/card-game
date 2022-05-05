import { Player } from "../../types";
import "./scoreBoard.css";

const ScoreBoard = (props: {player1: Player, player2: Player}): JSX.Element => {

  return (
    <div className="d-flex justify-content-center mb-5">
      <div className="score-board">
        <h3>Total score</h3>
        <div className="d-flex align-items-center justify-content-between">
          <h4>{props.player1.name}</h4>
          <span className="score">{props.player1.score}</span>
        </div>
        <div className="d-flex align-items-center justify-content-between">
        <h4>{props.player2.name}</h4>
          <span className="score">{props.player2.score}</span>
        </div>
      </div>
    </div>
  )
}

export default ScoreBoard;