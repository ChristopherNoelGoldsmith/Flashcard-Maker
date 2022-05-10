import styles from "./NavMenu.module.css";
import FlashcardList from "./FlashcardList";
import Button from "../UI/Button";
import React, { useState } from "react";

const NavMenu = (props) => {
  const [isVisable, setSavedCardsVisability] = useState(false);

  const toggleSavedCards = () => {
    setSavedCardsVisability((visability) => !visability);
  };
  return (
    <nav className="row">
      <div className="col-9 col-lg-11"></div>
      <Button
        onClick={toggleSavedCards}
        className="col-3 col-lg-1 my-1 my-lg-2"
        label="SAVED"
      ></Button>
      {isVisable && <FlashcardList />}
    </nav>
  );
};

export default NavMenu;
