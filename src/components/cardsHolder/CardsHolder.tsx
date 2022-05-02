import { Card } from "../../types";
import CardComponent from "../card/Card";
import "./cardsHolder.css"

const CardsHolder = (props: {selectedPlayer1Card: Card, selectedPlayer2Card: Card}): JSX.Element => {

  return (
    <div className="d-flex justify-content-between align-items-center mt-3">
      <div className="w-100 h-100">
        <h3>Serhan</h3>
        {props.selectedPlayer1Card.value && <CardComponent card={props.selectedPlayer1Card}/>}
      </div>
      <div className="w-100 h-100">
        <h3>Roman</h3>
        {props.selectedPlayer2Card.value && <CardComponent card={props.selectedPlayer2Card}/>}
      </div>
    </div>
  )

}

export default CardsHolder;