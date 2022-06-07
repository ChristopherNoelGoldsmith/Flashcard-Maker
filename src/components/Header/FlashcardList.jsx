import FlashcardListItem from './FlashcardListItem';
import styles from './FlashcardList.module.css';
import { useSelector } from 'react-redux';

const createFlashCardList = (cardList, clickEvents) => {
  const { setSavedCardsVisability, setChangeWindow, setFlashCard } =
    clickEvents;

  const clickEventsHandler = (event) => {
    const flashCard = cardList.find(
      (listItem) => listItem.title === event.target.innerText
    );
    setSavedCardsVisability();
    setChangeWindow('FLASHCARD');
    setFlashCard(flashCard.id);
  };

  return cardList.map((cards) => {
    return (
      <FlashcardListItem key={cards.id}>
        <span onClick={clickEventsHandler}>{`${cards.title}`}</span>
        <span>: {`${cards.cards.length}`}</span>
      </FlashcardListItem>
    );
  });
};

const FlashcardList = (props) => {
  const cardList = useSelector((store) => store.cardList);

  const flashCardList = createFlashCardList(cardList, {
    setSavedCardsVisability: props.setSavedCardsVisability,
    setChangeWindow: props.changeWindow,
    setFlashCard: props.setFlashCard,
  });

  return <ul className="row">{flashCardList}</ul>;
};

export default FlashcardList;
