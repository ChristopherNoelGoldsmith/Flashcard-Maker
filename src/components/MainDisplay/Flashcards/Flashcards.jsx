import Card from "../../UI/Card";
import styles from "./Flashcards.module.css";
import Button from "../../UI/Button";

const Flashcards = (props) => {
  const text = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates est quod fugit reprehenderit dolores veritatis consequatur voluptate eos asperiores sunt velit id nisi expedita fugiat quasi, rem, cumque recusandae ex!`;

  return (
    <Card>
      <div className={`${styles.flashcard}`}>
        <p>{text}</p>
      </div>
    </Card>
  );
};

export default Flashcards;
