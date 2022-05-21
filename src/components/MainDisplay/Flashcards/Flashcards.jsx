import Card from "../../UI/Card";
import styles from "./Flashcards.module.css";
import Button from "../../UI/Button";
import React, { useState, Fragment, useEffect } from "react";
import { loadFlashcardList, manageServerData } from "../../../util/localStorageUtil";

const flashCardListHandler = (props) => {
  const [event, flipState, flipEvent, incrimentFlashcard, flashcardIncriment] =
    props;
  //creates an array of the flashcards available in the selected local storage key
  const loadData = async () => {
    const loadedFromServerFlashcardList = await manageServerData({type: 'GET'});
    const filtered = loadedFromServerFlashcardList.filter(card => {
      if(card.title !== event) return false;
      return true;
    });
    console.log(filtered);
  }
  loadData();
  const loadedCardList = loadFlashcardList(event);
  const flashCardList = loadedCardList.map((flashcard, cardIndex) => {
    const { question, answer, title, key } = flashcard;

    const changeFlashCard = (inc) => {
      if (flashcardIncriment <= 0 && inc === -1) return;
      if (flashcardIncriment === loadedCardList.length - 1 && inc === 1) return;
      if (flipState) flipEvent();
      incrimentFlashcard((prevInc) => prevInc + inc);
    };
    //SHuffle algorith .sort((a, b) => 0.5 - Math.random());
    return (
      <Fragment key={key}>
        <div className={`${styles.flashcard}`}>
          <h2 className="text-uppercase my-3">{`${title} - ${
            !flipState
              ? `QUESTION: ${cardIndex + 1}`
              : `ANSWER: ${cardIndex + 1}`
          }`}</h2>
          <div
            id="text-container"
            onClick={flipEvent}
            className={`${styles["text-container"]}`}
          >
            {!flipState && <p className={`${styles.front}`}>{question}</p>}
            {flipState && <p className={`${styles.back}`}>{answer}</p>}
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
  const [cardSide, setCardSide] = useState(false);
  const [cardList, setCardList] = useState("");
  const [flashcardIncriment, incrimentFlashcard] = useState(0);
  const flipCard = () => {
    setCardSide((flip) => !flip);
  };

  useEffect(() => {
    const flashcardProps = [
      props.chosenFlashCardList,
      cardSide,
      flipCard,
      incrimentFlashcard,
      flashcardIncriment,
    ];
    const flashcards = flashCardListHandler(flashcardProps);
    setCardList(flashcards);
  }, [props.chosenFlashCardList, cardSide, flashcardIncriment]);

  return <Card className="justify-content-around">{cardList}</Card>;
};

export default Flashcards;
