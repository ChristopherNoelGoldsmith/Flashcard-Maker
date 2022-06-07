import Card from '../../UI/Card';
import styles from './Flashcards.module.css';
import Button from '../../UI/Button';
import React, { useState, Fragment, useEffect } from 'react';
//import { loadFlashcardList } from '../../../util/localStorageUtil';
import { useSelector } from 'react-redux';
// const filteredData = loadedFromServerFlashcardList.filter((card) => {
//   if (card.title !== event) return false;
//   return true;
// });

const flashCardListHandler = (props) => {
  const {
    chosenFlashCardList,
    cardSide,
    flipCard,
    incrimentFlashcard,
    flashcardIncriment,
    cardList,
  } = props;

  const loadedCardList = cardList.find(
    (listItem) => listItem.id === chosenFlashCardList
  );
  const { title, id } = loadedCardList;
  const flashCardList = loadedCardList.cards.map((flashcard, cardIndex) => {
    const { question, answer } = flashcard;
    const changeFlashCard = (inc) => {
      //add popup to alert user that that is all the flashcards
      if (flashcardIncriment <= 0 && inc === -1) return;
      if (flashcardIncriment === loadedCardList.cards.length - 1 && inc === 1)
        return;
      if (cardSide) flipCard();
      incrimentFlashcard((prevInc) => prevInc + inc);
    };
    //SHuffle algorith .sort((a, b) => 0.5 - Math.random());
    return (
      <Fragment key={id}>
        <div className={`${styles.flashcard}`}>
          <h2 className="text-uppercase my-3">{`${title} - ${
            !cardSide
              ? `QUESTION: ${cardIndex + 1}`
              : `ANSWER: ${cardIndex + 1}`
          }`}</h2>
          <div
            id="text-container"
            onClick={flipCard}
            className={`${styles['text-container']}`}
          >
            <figure>
              {!cardSide && <p className={`${styles.front}`}>{question}</p>}
              {cardSide && <p className={`${styles.back}`}>{answer}</p>}
            </figure>
          </div>
        </div>
        <div className="row justify-content-around">
          <Button
            onClick={() => changeFlashCard(-1)}
            className="col-5 p-1 mx-1"
            label="Back"
          />
          <Button
            onClick={() => changeFlashCard(1)}
            className="col-5 p-1 mx-1"
            label="Next"
          />
        </div>
      </Fragment>
    );
  });
  return flashCardList[flashcardIncriment];
};

const Flashcards = (props) => {
  const cardList = useSelector((store) => store.cardList);
  const [cardSide, setCardSide] = useState(false);
  const [flashcardList, setCardList] = useState('');
  const [flashcardIncriment, incrimentFlashcard] = useState(0);
  const flipCard = () => {
    setCardSide((flip) => !flip);
  };

  useEffect(() => {
    const flashcardProps = {
      cardList,
      chosenFlashCardList: props.chosenFlashCardList,
      cardSide,
      flipCard,
      incrimentFlashcard,
      flashcardIncriment,
    };
    const flashcards = flashCardListHandler(flashcardProps);
    setCardList(flashcards);
  }, [props.chosenFlashCardList, cardSide, flashcardIncriment, cardList]);

  return <Card className="justify-content-around">{flashcardList}</Card>;
};

export default Flashcards;
