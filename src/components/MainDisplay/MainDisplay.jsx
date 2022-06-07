//import styles from "./MainDisplay.module.css";
import MainForm from './MainForm/Mainform';
import Flashcards from './Flashcards/Flashcards';
import NavMenu from '../Header/NavMenu';
import React, { useState } from 'react';

const MainDisplay = (props) => {
  const [activeWindow, setActiveWindow] = useState('MAINFORM');
  const [chosenFlashCardList, setChosenFlashCardList] = useState('');

  const changeActiveWindowHandler = (target) => {
    setActiveWindow(target);
  };
  console.log(chosenFlashCardList);
  return (
    <div className={`row container-fluid justify-content-center my-5`}>
      <NavMenu
        setFlashCard={setChosenFlashCardList}
        changeWindow={changeActiveWindowHandler}
        activeWindow={activeWindow}
      />
      {activeWindow === 'MAINFORM' && <MainForm />}
      {activeWindow === 'FLASHCARD' && (
        <Flashcards chosenFlashCardList={chosenFlashCardList} />
      )}
    </div>
  );
};

export default MainDisplay;
