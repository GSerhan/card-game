export interface Deck {
  success: boolean,
  deck_id: string,
  remaining: number,
  shuffled: boolean
}

export interface Images {
  svg: string,
  png: string
}

export interface Card {
  code: string,
  image: string,
  images: Images,
  value: any,
  suit: string
}

export interface CardsSetup {
  success: boolean,
  deck_id: string,
  remaining: number,
  cards: Card[]
}

export interface Player {
  name: string,
  score: number,
  cards: Card[],
  selectedCard: Card
}
