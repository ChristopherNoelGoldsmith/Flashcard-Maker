import FlashcardListItem from './FlashcardListItem';
import styles from './FlashcardList.module.css';
import { useSelector, useDispatch } from 'react-redux';
import useDeleteItem from '../hooks/useDeleteItem';
import { cardListAction } from '../../store/card-list';

const createFlashCardList = (cardList, clickEvents) => {
  const {
    dispatch,
    deleteItem,
    setSavedCardsVisability,
    setChangeWindow,
    setFlashCard,
  } = clickEvents;

  const clickEventsHandler = (event) => {
    const flashCard = cardList.find(
      (listItem) => listItem.id === event.target.id
    );
    setSavedCardsVisability();
    setChangeWindow('FLASHCARD');
    setFlashCard(flashCard.id);
  };

  const deleteItemHanlder = (item) => {
    dispatch(cardListAction.deleteCard(item));
    deleteItem({ type: 'FLASHCARD', id: item.id });
  };

  return cardList.map((cards) => {
    return (
      <FlashcardListItem
        key={cards.id}
        deleteItem={() => deleteItemHanlder({ id: cards.id })}
      >
        <span
          id={cards.id}
          onClick={clickEventsHandler}
        >{`${cards.title}`}</span>
        <span>: {`${cards.cards.length}`}</span>
      </FlashcardListItem>
    );
  });
};

const FlashcardList = (props) => {
  const cardList = useSelector((store) => store.cardList);
  const deleteItem = useDeleteItem();
  const dispatch = useDispatch();

  const flashCardList = createFlashCardList(cardList, {
    deleteItem,
    dispatch,
    setSavedCardsVisability: props.setSavedCardsVisability,
    setChangeWindow: props.changeWindow,
    setFlashCard: props.setFlashCard,
  });

  return <ul className="row">{flashCardList}</ul>;
};

export default FlashcardList;
