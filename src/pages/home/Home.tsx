import { useEffect, useState } from "react";
import { Button, Container, Modal, Navbar } from "react-bootstrap";
import { createDeck, reshuffleCards, retrieveCards } from "../../config/api";
import { Card, Deck, Player } from "../../types";
import ScoreBoard from "../../components/scoreBoard/ScoreBoard";
import CardsHolder from "../../components/cardsHolder/CardsHolder";
import "./home.css";

const Home = (): JSX.Element => {
  const cardsCount: number = 2;
  const [deck, setDeck] = useState<Deck>({
    success: false,
    deck_id: "",
    remaining: 0,
    shuffled: false
  });
  const [player1, setPlayer1] = useState<Player>({
    score: 0,
    cards: []
  });
  const [player2, setPlayer2] = useState<Player>({
    score: 0,
    cards: []
  });
  const [selectedPlayer1Card, setSelectedPlayer1Card] = useState<Card>(
    {
        code: "",
        image: "",
        images: {
          svg: "",
          png: ""    
        },
        value: "",
        suit: ""
      }
  );
  const [selectedPlayer2Card, setSelectedPlayer2Card] = useState<Card>(
    {
        code: "",
        image: "",
        images: {
          svg: "",
          png: ""    
        },
        value: "",
        suit: ""
      }
  );
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [remainingCards, setRemainingCards] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  // create deck
  useEffect((): void => {
    createDeck().then((res: Deck) => setDeck(res))
    .catch(error => alert(error));
  }, [])

  // split cards for players
  useEffect((): void => {
    if(deck.deck_id) handleRetrieveCards();
  }, [deck.deck_id])

  // compare cards after split
  useEffect((): void => {
    if(selectedPlayer1Card.value && selectedPlayer2Card.value) compareCards();
  }, [selectedPlayer1Card, selectedPlayer2Card])

  const handleRetrieveCards = (): void => {
    setLoading(true);
    retrieveCards(deck.deck_id, cardsCount)
    .then(res => {
      const {remaining, cards, success} = res.data;
      if(!success) alert("Something went wrong");
      setRemainingCards(remaining);
      setSelectedCards(res.selectedCards);
      setSelectedPlayer1Card(cards[cards.length - 2]);
      setSelectedPlayer2Card(cards[cards.length - 1]);  
      setLoading(false);
    })
    .catch(error => {
      alert(error);
      setLoading(false);
    })
  }

  const handleReshuffleCards = (): void => {
    setLoading(true);
    reshuffleCards(deck.deck_id)
    .then(res => {
      handleRetrieveCards();
      setLoading(false);
    })
    .catch(error => {
      alert(error);
      setLoading(false);
    })
  }

  const compareCards = (): void => {
    if(selectedCards.length) {
      // player1 wins
      if(selectedCards[selectedCards.length - 2] > selectedCards[selectedCards.length - 1]) {
        const player1CardsClone = [...player1.cards];
        player1CardsClone.push(selectedPlayer1Card, selectedPlayer2Card);
        // set score and cards for player1
        setPlayer1({score: player1.score + 1, cards: player1CardsClone})
      // player2 wins
      } else if (selectedCards[selectedCards.length - 2] < selectedCards[selectedCards.length - 1]) {
        const player2CardsClone = [...player2.cards];
        player2CardsClone.push(selectedPlayer2Card, selectedPlayer1Card);
        // set score and cards for player2
        setPlayer2({score: player2.score + 1, cards: player2CardsClone})
      // draw  
      } else {
        handleReshuffleCards();
      }
    }
  }

  const restartGame = (): void => window.location.reload();

  return (
    <div>
      <Navbar bg="dark" variant="dark" className="mb-5">
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt="Elbit Systems"
              src="images/elbit-systems-logo.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            Elbit Systems
          </Navbar.Brand>
          <span className="remaining-cards">Remaining cards: {remainingCards}</span>
        </Container>
      </Navbar>
      {remainingCards ? 
      <div className="container">
        <ScoreBoard player1Score={player1.score} player2Score={player2.score}></ScoreBoard>
        <Button disabled={loading} variant="primary" onClick={() => handleRetrieveCards()}>next</Button>
        <CardsHolder selectedPlayer1Card={selectedPlayer1Card} selectedPlayer2Card={selectedPlayer2Card}></CardsHolder>
      </div>
      : selectedCards.length ?
      <Modal show={selectedCards.length ? true : false}>
        <Modal.Header>
          <Modal.Title>Cards Game</Modal.Title>
        </Modal.Header>
        <Modal.Body>{player1.score > player2.score ? "Serhan wins" : player1.score < player2.score ? "Roman wins" : "It's a draw"}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={restartGame}>
            Restart game
          </Button>
        </Modal.Footer>
      </Modal> : ""
      }
    </div>
  )
}

export default Home;

