//import styles from "./MainDisplay.module.css";
import MainForm from "./MainForm/Mainform";
import Flashcards from "./Flashcards/Flashcards";
import NavMenu from "../Header/NavMenu";
const MainDisplay = (props) => {
  return (
    <div className={`row container justify-content-center my-5`}>
      <NavMenu />
      {<MainForm />}
      {!(<Flashcards />)}
    </div>
  );
};

export default MainDisplay;
