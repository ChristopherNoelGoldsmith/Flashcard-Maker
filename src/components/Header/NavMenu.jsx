import styles from './NavMenu.module.css';
import FlashcardList from './FlashcardList';
import Button from '../UI/Button';
import React, { useState } from 'react';
//import { manageLocalStorage } from "../../util/localStorageUtil";
import { manageServerData } from '../../util/serverStorage';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../../store/authentication';

const NavMenu = (props) => {
  const [isVisable, setSavedCardsVisability] = useState(false);

  //
  const dispatch = useDispatch();
  const loginStatus = useSelector((store) => store.auth);
  //
  const changeActiveWindow = (target, ignore) => {
    if (props.activeWindow === ignore) return;
    props.changeWindow(target);
  };

  //creates an array of the flashcards available in the selected local storage key
  const loadData = async () => {
    const loadedFromServerFlashcardList = await manageServerData({
      type: 'GETALL',
      username: loginStatus.username,
    });

    if (!loadedFromServerFlashcardList.length) return;

    console.log(loadedFromServerFlashcardList);
    return loadedFromServerFlashcardList.map((loadedData, index) => {
      return loadedData;
    });
  };

  const toggleSavedCards = async () => {
    if (!isVisable) await loadData();
    setSavedCardsVisability((visability) => !visability);
    changeActiveWindow('MAINFORM', 'FLASHCARD');
  };

  const logoutHandler = () => {
    return dispatch(authActions.logout());
  };
  return (
    <nav className=" row gx-3 justify-content-center">
      <figure>
        <Button
          label="CREATE"
          className="col-4 col-lg-2 my-1 my-lg-2"
          onClick={() => {
            props.changeWindow('MAINFORM');
            if (isVisable) toggleSavedCards();
          }}
        />
        <Button
          onClick={toggleSavedCards}
          className="col-4 col-lg-2 my-1 my-lg-2"
          label={!isVisable ? `FLASHCARDS` : `CLOSE`}
        />
        <Button
          onClick={logoutHandler}
          className="col-4 col-lg-2 my-1 my-lg-2"
          label={'LOGOUT'}
        />
      </figure>

      {isVisable && (
        <FlashcardList
          setSavedCardsVisability={setSavedCardsVisability}
          setFlashCard={props.setFlashCard}
          changeWindow={props.changeWindow}
        />
      )}
    </nav>
  );
};

export default NavMenu;
