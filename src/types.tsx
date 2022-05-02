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
  value: string,
  suit: string
}

export interface CardsSetup {
  data: {
    success: boolean,
    deck_id: string,
    remaining: number,
    cards: Card[]
  },
  selectedCards: number[]
}

export interface Player {
  score: number,
  cards: Card[]
}
