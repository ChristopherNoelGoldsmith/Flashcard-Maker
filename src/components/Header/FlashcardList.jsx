import FlashcardListItem from "./FlashcardListItem";
import styles from "./FlashcardList.module.css";
import React, { useState } from "react";
import { getLocalStorageKeys } from "../../util/localStorageUtil";

//!!!!!!!!!!!!!!!!!!!!THIS WORKS BUT IS FUCKING JANK
//REFACTOR CODE SO THE JSX IS NOT CALLED EVERY TIME THERE IS A STATE CHANGE AND MAKE IT MORE READABLE!!!!!!!!

const getSavedFlashcards = (eventsToAdd) => {
  let navList = getLocalStorageKeys();
  //This final section creates the JSX element that willbe inserted into the dom
  navList = navList.map((savedListItemName) => {
    return (
      <FlashcardListItem
        onClick={eventsToAdd}
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
    const updatedList = getSavedFlashcards(deleteFlashcardHandler);
    setListState(updatedList);
  };

  //passes the deleteFlashcardHandler to make it useable in the FlashcardListItem component
  const [listState, setListState] = useState(() => {
    return getSavedFlashcards(deleteFlashcardHandler);
  });

  return <ul className="">{listState}</ul>;
};

export default FlashcardList;
