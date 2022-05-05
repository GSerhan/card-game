import { Card, Player } from "../../types";
import CardComponent from "../card/Card";
import "./cardsHolder.css"

const CardsHolder = (props: {player1: Player, player2: Player}): JSX.Element => {

  return (
    <div className="d-flex justify-content-between align-items-center mt-3">
      <div className="w-100 h-100">
        <h3>{props.player1.name}</h3>
        {props.player1.selectedCard.value && <CardComponent card={props.player1.selectedCard}/>}
      </div>
      <div className="w-100 h-100">
      <h3>{props.player2.name}</h3>
        {props.player2.selectedCard.value && <CardComponent card={props.player2.selectedCard}/>}
      </div>
    </div>
  )

}

export default CardsHolder;