import animations from '../../../animations.module.css';
import styles from './MainForm.module.css';
import Card from '../../UI/Card';
import Input from '../../UI/Input';
import TextArea from '../../UI/TextArea';
import AlertMessage from '../../UI/AlertMessage';
import Button from '../../UI/Button';
import { useReducer, useEffect } from 'react';
import { manageServerData } from '../../../util/serverStorage';
import { useSelector } from 'react-redux';
import useCardList from '../../hooks/useCardListManager';
import useUserStorage from '../../hooks/useUserStorage';

//Function that passes through the useReducer hook to handle the input form render in the dom
const parseFormDataReducer = (state, action) => {
  if (action.type === 'CLEAR')
    return {
      title: state.title,
      cards: { question: '', answer: '' },
      id: state.id,
    };
  if (action.type === 'TITLE') state.title = action.title;
  if (action.type === 'QUESTION') state.cards.question = action.question;
  if (action.type === 'ANSWER') state.cards.answer = action.answer;

  const card = {
    question: state.cards.question || '',
    answer: state.cards.answer || '',
  };

  return {
    title: state.title,
    cards: card,
    id: state.id || state.title + Math.floor(Math.random() * 10000),
  };
};
const checkValidityReducer = (state, action) => {
  if (action.type === 'TITLE') state.title = action.title;
  if (action.type === 'QUESTION') state.question = action.question;
  if (action.type === 'ANSWER') state.answer = action.answer;
  return {
    title: state.title,
    question: state.question,
    answer: state.answer,
  };
};

const blankCard = {
  title: '',
  cards: { question: '', answer: '' },
};

const MainForm = () => {
  const [cardState, dispatchCardState] = useReducer(
    parseFormDataReducer,
    blankCard
  );
  //Hooks
  const [isValidState, dispatchValidity] = useReducer(checkValidityReducer, {});
  const [cardList, setCardList] = useCardList();
  const loginStatus = useSelector((state) => state.auth);
  useUserStorage();
  //
  const sendToServer = (type) => {
    return {
      type,
      username: loginStatus.username,
      data: cardList,
    };
  };
  //params for max inputs
  const maximum = {
    title: 15,
    answer: 500,
    question: 500,
  };
  //----------------------

  //Hanlders for the titular elements of the form
  const titleChangeHanlder = (event) => {
    if (event.target.value.length > maximum.title)
      return dispatchValidity({ type: 'TITLE', title: true });
    dispatchCardState({ type: 'TITLE', title: event.target.value });
    dispatchValidity({ type: 'TITLE', title: false });
  };

  const questionChangeHanlder = (event) => {
    if (event.target.value.length > maximum.question)
      return dispatchValidity({ type: 'QUESTION', question: true });
    dispatchCardState({ type: 'QUESTION', question: event.target.value });
    dispatchValidity({ type: 'QUESTION', question: false });
  };

  const answerChangeHanlder = (event) => {
    if (event.target.value.length > maximum.answer)
      return dispatchValidity({ type: 'ANSWER', answer: true });
    dispatchCardState({ type: 'ANSWER', answer: event.target.value });
    dispatchValidity({ type: 'ANSWER', answer: false });
  };

  const formDataHandler = (event) => {
    event.preventDefault();

    const writeData = sendToServer('PUT');
    setCardList(cardState);
    dispatchCardState({ type: 'CLEAR' });
    manageServerData(writeData);
  };

  return (
    <Card className={`${animations['fade-in']}`}>
      <form
        onSubmit={formDataHandler}
        className={`container-fluid justify-content-center row my-5 mx-2 `}
      >
        <h2 className={`my-3`}>Construct Your Flashcards</h2>
        <AlertMessage
          classToggle={`${
            isValidState.title ? `${animations['fade-in']}` : ''
          }`}
          note={`Maximum Characters: ${maximum.title}`}
        />
        <Input
          label={`Flashcard Set Name:`}
          type="text"
          className={`m-1 ${isValidState.title && styles['invalid']}`}
          onChange={titleChangeHanlder}
          value={cardState.title || ''}
          required
        ></Input>
        <AlertMessage
          classToggle={`${isValidState.question ? 'vis' : ''}`}
          note={`Maximum Characters: ${maximum.question}`}
        />
        <TextArea
          onChange={questionChangeHanlder}
          label="Card Front (QUESTION)"
          className={`m-1 ${isValidState.question && styles['invalid']}`}
          value={cardState.cards.question || ''}
          required
        ></TextArea>
        <AlertMessage
          classToggle={`${isValidState.answer ? 'vis' : ''}`}
          note={`Maximum Characters: ${maximum.answer}`}
        />
        <TextArea
          onChange={answerChangeHanlder}
          label="Card Back (ANSWER)"
          className={`m-1 ${isValidState.answer && styles['invalid']}`}
          value={cardState.cards.answer || ''}
          required
        ></TextArea>
        <Button type="submit" label="CREATE" />
      </form>
    </Card>
  );
};

export default MainForm;
