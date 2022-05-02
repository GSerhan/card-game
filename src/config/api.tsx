import { mapCards } from "../helpers/helpersCard";
import { CardsSetup, Deck } from "../types";

export const createDeck = (): Promise<Deck> => {
  return new Promise((resolve, reject) => {
    fetch("https://deckofcardsapi.com/api/deck/new/shuffle/")
    .then(response => response.json())
    .then(data => {
      resolve(data);
    })
    .catch(error => {
      reject(error);
    })
  })
}

export const retrieveCards = (playerId: string, count: number): Promise<CardsSetup> => {
  return new Promise((resolve, reject) => {
    fetch(`https://deckofcardsapi.com/api/deck/${playerId}/draw/?count=${count}`)
    .then(response => response.json())
    .then(data => {
      resolve({data: data, selectedCards: mapCards(data.cards)});
    })
    .catch(error => {
      reject(error);
    })
  })
}

export const reshuffleCards = (deckId: string): Promise<Deck> => {
  return new Promise((resolve, reject) => {
    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/shuffle/?remaining=true`)
    .then(response => response.json())
    .then(data => {
      resolve(data);
    })
    .catch(error => {
      reject(error);
    })
  })
}



