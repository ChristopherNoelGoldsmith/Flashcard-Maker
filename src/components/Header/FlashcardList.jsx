import FlashcardListItem from "./FlashcardListItem";
import styles from "./FlashcardList.module.css";
import React, { useState } from "react";
import { getLocalStorageKeys } from "../../util/localStorageUtil";
import { manageServerData } from "../../util/serverStorage";

//!!!!!!!!!!!!!!!!!!!!THIS WORKS BUT IS FUCKING JANK
//REFACTOR CODE SO THE JSX IS NOT CALLED EVERY TIME THERE IS A STATE CHANGE AND MAKE IT MORE READABLE!!!!!!!!

const getSavedFlashcards = (eventsToAdd) => {
  let navList = getLocalStorageKeys();

  const [deleteFlashcardHandler, loadFlashCardHandler] = eventsToAdd;
  //This final section creates the JSX element that will be inserted into the dom
  navList = navList.map((savedListItemName) => {
    //const cardCount = `- ${loadFlashcardList(savedListItemName).length}`;
    return (
      <FlashcardListItem
        loadCard={loadFlashCardHandler}
        //cardCount={cardCount} ADD THIS
        deleteCard={deleteFlashcardHandler}
        key={`${Math.random() * 1000}${savedListItemName[0]}`}
      >
        {savedListItemName}
      </FlashcardListItem>
    );
  });
  return navList;
};

const FlashcardList = (props) => {
  //Accesses the the label's text of the list element you click the del button on
  //then takes that name and matches it to the localStorage for removal, then rerenders the state.

  const deleteFlashcardHandler = (event) => {
    const itemToDelete = event.target.parentNode.firstChild.innerText;
    localStorage.removeItem(itemToDelete);
    manageServerData({ type: "DELETE", title: itemToDelete });
    const updatedList = getSavedFlashcards([
      deleteFlashcardHandler,
      loadFlashCardHandler,
    ]);
    setListState(updatedList);
    props.changeWindow("MainForm");
  };

  const loadFlashCardHandler = (event) => {
    //Uses the name locaed in the label of the flashcardlistitem to inject into the changeWindow state.
    props.changeWindow("Flashcard");
    props.chosenFlashCard(event.target.innerText);
    props.setSavedCardsVisability();
  };

  //passes the deleteFlashcardHandler to make it useable in the FlashcardListItem component
  const [listState, setListState] = useState(() => {
    return getSavedFlashcards([deleteFlashcardHandler, loadFlashCardHandler]);
  });

  return <ul className="row">{listState}</ul>;
};

export default FlashcardList;
