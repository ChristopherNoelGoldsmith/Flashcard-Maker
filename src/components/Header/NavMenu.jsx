import styles from "./NavMenu.module.css";
import FlashcardList from "./FlashcardList";
import Button from "../UI/Button";

const NavMenu = (props) => {
  return (
    <nav className="row">
      <div className="col-11"></div>
      <Button className="col-1 my-2" label="SAVED"></Button>
      {!(<FlashcardList />)}
    </nav>
  );
};

export default NavMenu;
