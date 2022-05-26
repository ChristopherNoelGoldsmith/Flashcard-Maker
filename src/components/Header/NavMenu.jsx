import styles from "./NavMenu.module.css";
import FlashcardList from "./FlashcardList";
import Button from "../UI/Button";
import React, { useState } from "react";
import { manageLocalStorage } from "../../util/localStorageUtil";
import { manageServerData } from "../../util/serverStorage";

const NavMenu = (props) => {
  const [isVisable, setSavedCardsVisability] = useState(false);

  const changeActiveWindow = (target, ignore) => {
    if (props.activeWindow === ignore) return;
    props.changeWindow(target);
  };

  //creates an array of the flashcards available in the selected local storage key
  const loadData = async () => {
    const loadedFromServerFlashcardList = await manageServerData({
      type: "GETALL",
    });

    if (!loadedFromServerFlashcardList.length) return;

    console.log(loadedFromServerFlashcardList);
    return loadedFromServerFlashcardList.forEach((loadedData, index) => {
      const { flashcards } = loadedData;

      return manageLocalStorage({
        type: "PATCH",
        data: flashcards,
      });
    });
  };

  const toggleSavedCards = async () => {
    if (!isVisable) await loadData();
    setSavedCardsVisability((visability) => !visability);
    changeActiveWindow("MainForm", "Flashcard");
  };
  return (
    <nav className=" row gx-3 justify-content-end">
      <figure>
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
          label={!isVisable ? `FLASHCARDS` : `CLOSE`}
        />
      </figure>

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
