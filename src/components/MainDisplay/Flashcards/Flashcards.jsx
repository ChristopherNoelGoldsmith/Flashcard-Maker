import Card from "../../UI/Card";
import styles from "./Flashcards.module.css";
import Button from "../../UI/Button";
import React, { useState, Fragment, useEffect } from "react";
import { loadFlashcardList } from "../../../util/localStorageUtil";

const flashCardListHandler = (props) => {
  const [event, flipState, flipEvent, incrimentFlashcard, flashcardIncriment] =
    props;
  //creates an array of the flashcards available in the selected local storage key
  const loadedCardList = loadFlashcardList(event);
  const flashCardList = loadedCardList.map((flashcard) => {
    const { question, answer, title, key } = flashcard;

    const changeFlashCard = (inc) => {
      console.log(flashcardIncriment, loadedCardList.length);
      if (flashcardIncriment <= 0 && inc === -1) return;
      if (flashcardIncriment === loadedCardList.length - 1 && inc === 1) return;
      if (flipState) flipEvent();
      incrimentFlashcard((prevInc) => prevInc + inc);
    };
    //SHuffle algorith .sort((a, b) => 0.5 - Math.random());
    return (
      <Fragment key={key}>
        <div className={`${styles.flashcard}`}>
          <h2 className="my-3">{title}</h2>
          {!flipState && (
            <p className={`${styles.front}`} onClick={flipEvent}>
              {question}
            </p>
          )}
          {flipState && (
            <p className={`${styles.back}`} onClick={flipEvent}>
              {answer}
            </p>
          )}
        </div>
        <div className="row justify-content-around">
          <Button
            onClick={() => changeFlashCard(-1)}
            className="col-5 mx-1"
            label="Back"
          />
          <Button
            onClick={() => changeFlashCard(1)}
            className="col-5 mx-1"
            label="Forward"
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
