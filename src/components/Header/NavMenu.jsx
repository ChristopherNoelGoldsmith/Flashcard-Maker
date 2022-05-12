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
    <nav className=" row gx-3 justify-content-end">
      <Button
        label="CREATE"
        className="col-6 col-lg-2 my-1 my-lg-2"
        onClick={() => {
          props.changeWindow("MainForm");
          if (isVisable) toggleSavedCards();
        }}
      />
      <Button
        onClick={toggleSavedCards}
        className="col-6 col-lg-2 my-1 my-lg-2"
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
