import styles from "./MainForm.module.css";
import Card from "../../UI/Card";
import Input from "../../UI/Input";
import TextArea from "../../UI/TextArea";
import Button from "../../UI/Button";
import { useEffect, useReducer } from "react";
import {
  localStorageSet,
  loadFlashcardList,
} from "../../../util/localStorageUtil";

//Function that passes through the useReducer hook to handle the input form render in the dom
const parseFormDataReducer = (state, action) => {
  if (action.type === "CLEAR")
    return { title: state.title, question: "", answer: "" };
  if (action.type === "TITLE") state.title = action.title;
  if (action.type === "QUESTION") state.question = action.question;
  if (action.type === "ANSWER") state.answer = action.answer;
  return {
    title: state.title,
    question: state.question,
    answer: state.answer,
    key: Math.floor(Math.random() * 10000),
  };
};
const checkValidityReducer = (state, action) => {
  if (action.type === "TITLE") state.title = action.title;
  if (action.type === "QUESTION") state.question = action.question;
  if (action.type === "ANSWER") state.answer = action.answer;
  return {
    title: state.title,
    question: state.question,
    answer: state.answer,
  };
};

const MainForm = () => {
  const [cardState, dispatchCardState] = useReducer(parseFormDataReducer, {});
  const [isValidState, dispatchValidity] = useReducer(checkValidityReducer, {});

  //to check if the inputs are valid;
  /*useEffect(() => {
    const identifier = setTimeout(() => {}, 500);

    return () => {
      clearTimeout(identifier);
    };
  }, [isValidState]);
*/
  const formDataHandler = (event) => {
    event.preventDefault();
    if (!loadedCardList && localStorage.length >= 10)
      return alert(
        "You cannot add any new flashcard sets before deleteing some. (MAX: 10)"
      );
    localStorageSet(cardState);
    dispatchCardState({ type: "CLEAR" });
  };

  //Hanlders for the titular elements of the form
  const titleChangeHanlder = (event) => {
    if (event.target.value.length > 15)
      return dispatchValidity({ type: "TITLE", title: true });
    dispatchCardState({ type: "TITLE", title: event.target.value });
    dispatchValidity({ type: "TITLE", title: false });
  };

  const questionChangeHanlder = (event) => {
    if (event.target.value.length > 500)
      return dispatchValidity({ type: "QUESTION", question: true });
    dispatchCardState({ type: "QUESTION", question: event.target.value });
    dispatchValidity({ type: "QUESTION", question: false });
  };

  const answerChangeHanlder = (event) => {
    if (event.target.value.length > 500)
      return dispatchValidity({ type: "ANSWER", answer: true });
    dispatchCardState({ type: "ANSWER", answer: event.target.value });
    dispatchValidity({ type: "ANSWER", answer: false });
  };

  const loadedCardList = loadFlashcardList(cardState.title);
  return (
    <Card>
      <form
        onSubmit={formDataHandler}
        className="container justify-content-center row my-5 mx-2"
        action=""
      >
        <h2 className="my-3">
          Construct Your Flashcards -
          {loadedCardList && (
            <span className={`${styles["card-count"]}`}>
              - Cards: {loadedCardList.length}
            </span>
          )}
        </h2>
        <Input
          label={`Flashcard Set Name:`}
          type="text"
          className={`m-1 ${isValidState.title && styles["invalid"]}`}
          onChange={titleChangeHanlder}
          value={cardState.title || ""}
          required
        ></Input>
        <TextArea
          onChange={questionChangeHanlder}
          label="Card Front (QUESTION)"
          className={`m-1 ${isValidState.question && styles["invalid"]}`}
          value={cardState.question || ""}
          required
        ></TextArea>
        <TextArea
          onChange={answerChangeHanlder}
          label="Card Back (ANSWER)"
          className={`m-1 ${isValidState.answer && styles["invalid"]}`}
          value={cardState.answer || ""}
          required
        ></TextArea>
        <Button type="submit" label="CREATE" />
      </form>
    </Card>
  );
};

export default MainForm;
