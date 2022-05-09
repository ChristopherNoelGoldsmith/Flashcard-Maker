//import styles from "./MainDisplay.module.css";
import MainForm from "./MainForm/Mainform";
import Flashcards from "./Flashcards/Flashcards";
import NavMenu from "../Header/NavMenu";
const MainDisplay = (props) => {
  return (
    <div className={`row container my-5`}>
      <NavMenu />
      <Flashcards />
      {!(<MainForm />)}
    </div>
  );
};

export default MainDisplay;
