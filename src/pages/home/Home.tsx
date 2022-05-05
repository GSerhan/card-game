import { useEffect, useState } from "react";
import { Button, Container, Modal, Navbar } from "react-bootstrap";
import { createDeck, reshuffleCards, retrieveCards } from "../../config/api";
import { Deck, Player, CardsSetup } from "../../types";
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
    name: "Serhan",
    score: 0,
    cards: [],
    selectedCard: {
      code: "",
      image: "",
      images: {
        svg: "",
        png: ""    
      },
      value: "",
      suit: ""
    }
  });
  const [player2, setPlayer2] = useState<Player>({
    name: "Roman",
    score: 0,
    cards: [],
    selectedCard: {
      code: "",
      image: "",
      images: {
        svg: "",
        png: ""    
      },
      value: "",
      suit: ""
    }
  });
  const [loading, setLoading] = useState<boolean>(false);

  // create deck
  useEffect((): void => {
    setLoading(true);
    createDeck().then((res: Deck) => {
      if(!res.success) alert("Something went wrong");
      setDeck(res);
      setLoading(false);
    })
    .catch(error =>  {
      alert(error);
      setLoading(false)
    });
  }, [])

  // split cards for players
  useEffect((): void => {
    if(deck.deck_id) handleRetrieveCards();
  }, [deck.deck_id])

  // compare cards after split
  useEffect((): void => {
    if(player1.selectedCard.value && player1.selectedCard.value) compareCards();
  }, [player1.selectedCard.value, player1.selectedCard.value])

  const handleRetrieveCards = (): void => {
    setLoading(true);
    retrieveCards(deck.deck_id, cardsCount)
    .then((res: CardsSetup) => {
      const {remaining, cards, success} = res;
      if(!success) alert("Something went wrong");
      setDeck(previousState => ({
        ...previousState,
        remaining
      }))
      setPlayer1(prevState => ({
          ...prevState,
          selectedCard: cards[cards.length - 2] 
      }))
      setPlayer2(prevState => ({
          ...prevState,
          selectedCard: cards[cards.length - 1]
      }))
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
    .then((res: Deck) => {
      if(!res.success) alert("Something went wrong");
      handleRetrieveCards();
      setLoading(false);
    })
    .catch(error => {
      alert(error);
      setLoading(false);
    })
  }

  const compareCards = (): void => {
    if(player1.selectedCard.value && player2.selectedCard.value) {
      // player1 wins
      if(player1.selectedCard.value > player2.selectedCard.value) {
        const player1CardsClone = [...player1.cards];
        player1CardsClone.push(player1.selectedCard, player2.selectedCard);
        // set score and cards for player1
        setPlayer1(previousState => ({
          ...previousState,
          score: ++previousState.score,
          cards: player1CardsClone
        }))
      // player2 wins
      } else if (player1.selectedCard.value < player2.selectedCard.value) {
        const player2CardsClone = [...player2.cards];
        player2CardsClone.push(player1.selectedCard, player2.selectedCard);
        // set score and cards for player2
        setPlayer2(prevState => ({
          ...prevState,
          score: ++prevState.score,
          cards: player2CardsClone
        }))
      // draw  
      } else {
        handleReshuffleCards();
      }
    }
  }

  const restartGame = (): void => window.location.reload();

  const displayTextForModal = (a: Player, b: Player): string => {
    if(a.score > b.score) {
      return a.name + " wins"
    } else if (a.score < b.score) {
      return b.name + " wins"
    } else {
      return "It's a draw"
    }
  }

  return (
    <div>
      <Navbar bg="dark" variant="dark" className="mb-5">
        <Container>
          <Navbar.Brand href="https://elbitsystems.com">
            <img
              alt="Elbit Systems"
              src="images/elbit-systems-logo.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            Elbit Systems
          </Navbar.Brand>
          <span className="remaining-cards">Remaining cards: {!loading && deck.remaining}</span>
        </Container>
      </Navbar>
      {deck.remaining ? 
      <div className="container">
        <ScoreBoard player1={player1} player2={player2}></ScoreBoard>
        <Button disabled={loading} variant="primary" onClick={() => handleRetrieveCards()}>next</Button>
        <CardsHolder player1={player1} player2={player2}></CardsHolder>
      </div>
      : !deck.remaining && !loading ?
      <Modal show={!deck.remaining && !loading ? true : false}>
        <Modal.Header>
          <Modal.Title>Cards Game</Modal.Title>
        </Modal.Header>
        <Modal.Body>{displayTextForModal(player1, player2)}</Modal.Body>
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

