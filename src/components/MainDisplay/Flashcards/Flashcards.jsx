import Card from "../../UI/Card";
import styles from "./Flashcards.module.css";
import Button from "../../UI/Button";

const localStorageGetter = (cardSetTitle) => {
  if (!cardSetTitle)
    return alert("There is not a set of flashcard with that name available");
};

const Flashcards = (props) => {
  const text = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates est quod fugit reprehenderit dolores veritatis consequatur voluptate eos asperiores sunt velit id nisi expedita fugiat quasi, rem, cumque recusandae ex!`;

  return (
    <Card className="justify-content-around">
      <div className={`${styles.flashcard}`}>
        <p>{text}</p>
      </div>
      <div className="row justify-content-around">
        <Button className="col-5 mx-1" label="Back" />
        <Button className="col-5 mx-1" label="Forward" />
      </div>
    </Card>
  );
};

export default Flashcards;
