import styles from "./NavMenu.module.css";
import FlashcardList from "./FlashcardList";
import Button from "../UI/Button";
import React, { useState } from "react";

const NavMenu = (props) => {
  const [isVisable, setSavedCardsVisability] = useState(false);

  const changeActiveWindow = (target, ignore) => {
    if (props.activeWindow === ignore) return;
    props.changeWindow(target);
  };

  const toggleSavedCards = () => {
    setSavedCardsVisability((visability) => !visability);
    changeActiveWindow("MainForm", "Flashcard");
  };
  return (
    <nav className="row justify-content-end">
      <div className="col-2 col-lg-5"></div>
      <Button
        label="Create Flashcards"
        className="col-5 col-lg-4 mx-1 my-1 my-lg-2"
        onClick={() => {
          props.changeWindow("MainForm");
        }}
      />
      <Button
        onClick={toggleSavedCards}
        className="col-5 col-lg-2 mx-1 my-1 my-lg-2"
        label="FLASHCARDS"
      />

      {isVisable && (
        <FlashcardList
          setSavedCardsVisability={setSavedCardsVisability}
          chosenFlashCard={props.chosenFlashCard}
          changeWindow={props.changeWindow}
        />
      )}
    </nav>
  );
};

export default NavMenu;
