import { Card } from "../../types";
import "./card.css";

const CardComponent = (props: {card: Card}): JSX.Element => {

  return (
    <div className="card-item">
      <img alt={props.card.code} src={props.card.image} />
    </div>
  )
}

export default CardComponent;