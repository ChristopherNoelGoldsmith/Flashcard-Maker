import styles from "./MainForm.module.css";
import Card from "../../UI/Card";
import Input from "../../UI/Input";
import TextArea from "../../UI/TextArea";
import Button from "../../UI/Button";
import { useReducer } from "react";

/*Handles setting cards into the local storage.
it takes the title printed into the card handler
and add the question and answers avialable in the cards
to the titled item in local storage.
*/
const localStorageSet = (item) => {
  if (!localStorage.getItem(item.title))
    return localStorage.setItem(item.title, JSON.stringify([item]));
  const json = localStorage.getItem(item.title);
  console.log(json);
  const savedFlashcards = JSON.parse(json);
  console.log(savedFlashcards);
  const newSave = [item, ...savedFlashcards];
  return localStorage.setItem(item.title, JSON.stringify(newSave));
};

//Function that passes through the useReducer hook to handle the input form render in the dom
const parseFormData = (state, action) => {
  if (action.type === "CLEAR")
    return { title: state.title, question: "", answer: "" };
  if (action.type === "TITLE") state.title = action.title;
  if (action.type === "QUESTION") state.question = action.question;
  if (action.type === "ANSWER") state.answer = action.answer;
  return {
    title: state.title,
    question: state.question,
    answer: state.answer,
    key:
      state.title[0] + Math.floor(Math.random() * 10000) + state.title.length,
  };
};

const MainForm = () => {
  const [cardState, dispatchCardState] = useReducer(parseFormData, {});

  const formDataHandler = (event) => {
    event.preventDefault();
    localStorageSet(cardState);
    dispatchCardState({ type: "CLEAR" });
  };

  //Hanlders for the titular elements of the form
  const titleChangeHanlder = (event) => {
    console.log(event);
    dispatchCardState({ type: "TITLE", title: event.target.value });
  };

  const questionChangeHanlder = (event) => {
    dispatchCardState({ type: "QUESTION", question: event.target.value });
  };

  const answerChangeHanlder = (event) => {
    dispatchCardState({ type: "ANSWER", answer: event.target.value });
  };
  console.log(cardState);
  return (
    <Card>
      <form
        onSubmit={formDataHandler}
        className="container row my-5 mx-2"
        action=""
      >
        <h2 className="my-3">Construct Your Flashcard!</h2>
        <Input
          label={`Flashcard Set Name:`}
          type="text"
          className="m-1"
          onChange={titleChangeHanlder}
          value={cardState.title || ""}
          required
        ></Input>
        <TextArea
          onChange={questionChangeHanlder}
          label="Card Front (QUESTION)"
          className="m-1"
          value={cardState.question || ""}
          required
        ></TextArea>
        <TextArea
          onChange={answerChangeHanlder}
          label="Card Back (ANSWER)"
          className="m-1"
          value={cardState.answer || ""}
          required
        ></TextArea>
        <Button type="submit" label="CREATE"></Button>
      </form>
    </Card>
  );
};

export default MainForm;
