import { Card } from "../types";

// map cards to new values for compare
export const mapCards = (cards: Card[]): void => {
  cards.forEach((card: Card, index: number): void => {
    if(card.value === "KING") {
      card.value = "14";
    } else if(card.value === "JACK") {
      card.value = "12";
    } else if(card.value === "QUEEN") {
      card.value = "13";
    } else if(card.value === "ACE") {
      card.value = "11";
    }
    cards[index].value = parseInt(card.value);
  })
}